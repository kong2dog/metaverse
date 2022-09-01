import ws, {WebSocketServer, WebSocket} from 'ws'
import util from 'util'
import Player from './src/models/Player.js'
const players = [];
const spread = 400;

const wss = new WebSocketServer({
	port: 9988,
	perMessageDeflate: {
		zlibDeflateOptions: {
			// See zlib defaults.
			chunkSize: 1024,
			memLevel: 7,
			level: 3
		},
		zlibInflateOptions: {
		  	chunkSize: 10 * 1024
		},
		// Other options settable:
		clientNoContextTakeover: true, // Defaults to negotiated value.
		serverNoContextTakeover: true, // Defaults to negotiated value.
		serverMaxWindowBits: 10, // Defaults to negotiated value.
		// Below options specified as default values.
		concurrencyLimit: 10, // Limits zlib concurrency for perf.
		threshold: 1024 // Size (in bytes) below which messages
		// should not be compressed if context takeover is disabled.
	}
})
function heartbeat() {
  this.isAlive = true;
}
wss.on('connection', function connection(wsclient) {
	wsclient.isAlive = true;
  wsclient.on('pong', heartbeat);
	wsclient.on('message', (bu) => {
		let data 
		try{
			data = JSON.parse(bu.toString())
		} catch (e) {
			data = bu.toString()
		}
		if(data.cmd === 'setId'){
			wsclient.id = data.id
			onClientConnect(wsclient)
			onSetUserName(wsclient, {userName: data.id})
		}else	if(data.cmd === 'set userName'){
			onSetUserName(wsclient, data)
		}else if(data.cmd === 'disconnect'){
			onClientDisconnect(wsclient, data)
		}else if(data.cmd === 'request init game'){
			onClientRequestInit(wsclient, data);
		}else if(data.cmd === 'update position'){
			onUpdatePosition(wsclient, data);
		}else if(data.cmd === 'hit player'){
			onPlayerHit(data);
		}else if(data.cmd === 'player suicide'){
			onPlayerSuicide(data);
		}else if(data.cmd === 'request respawn'){
			onRespawnPlayer()
		}else if(data.cmd === 'player fired shot'){
			onShotFired(data)
		}else if(data.cmd === 'send msg'){
			onClientSentMsg(data)
		}
	});
	wsclient.on('close', () => {
		onClientDisconnect(wsclient)
	})
});

function onSetUserName(wsclient, data) {
	const player = playerById(wsclient.id)
	player._name = data.userName;
	wss.clients.forEach((client) => {
		if (client !== wsclient && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({cmd: 'start render', player: player}));
		}
	});
}

function onClientConnect(client) {
	util.log("New Player has connected: " + client.id);
  //Create a player for this ID
	//ToDo: Check if position is available for the loaded level
	const newPlayer = new Player((Math.random() - 0.5) * spread , 1 , (Math.random() - 0.5) * spread); 
	// const newPlayer = new Player(0, 0 , 7); 
	newPlayer._id = client.id;   
	newPlayer.setColor(Math.random(), Math.random(), Math.random()); 
	players.push(newPlayer);
	console.log(newPlayer)
}

function onClientRequestInit(wsclient, data) {
	console.log(wsclient.id)
	// Find clients player
  const clientPlayer = playerById(wsclient.id);
  // Player not found
	if (!clientPlayer) {
		util.log("Player not found: "+wsclient.id);
		return;
	};  
  // Get all Infos of the other Players
  const remotePlayers = [];
  // Emitting all players to the new player
	for (let i = 0; i < players.length; i++) {
		if(players[i]._id != wsclient.id) 
	       remotePlayers.push(players[i]);	 
	}
  // Send the init information to the Client

  wsclient.send(JSON.stringify({cmd: 'init game', localPlayer: clientPlayer , remotePlayers : remotePlayers }));
  // Tell all current players, there is a new player
	wss.clients.forEach((client) => {
		console.log(client.id)
		console.log(wsclient.id)
		if (client !== wsclient && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({cmd: 'new player', player: clientPlayer}, { binary: false }));
		}
	});
}

function onClientDisconnect(wsclient) {
	util.log("Player has disconnected: "+wsclient.id);
	const removePlayer = playerById(wsclient.id);
	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+wsclient.id);
		return;
	};
	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);
	// Broadcast removed player to connected socket clients
	wss.clients.forEach((client) => {
		if (client.id !== wsclient.id && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({cmd: 'remove player', id: wsclient.id}, { binary: false }));
		}
	});
}

function onUpdatePosition(wsclient, data) {
	const movedPlayer = playerById(wsclient.id);
	// Player not found
	if (!movedPlayer) {
		util.log("Player not found (onUpdatePosition): " + wsclient.id);
		return;
	} 
	//Update model player instance on Server 
	movedPlayer.setXYZ(data.pos.x, data.pos.y, data.pos.z); 
	movedPlayer.setRotXYZ(data.rot.x, data.rot.y, data.rot.z);      
	//Broadcast position change to all other players 
	wss.clients.forEach((client) => {
		if (client !== wsclient && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({cmd: 'move player', id: wsclient.id, rot : data.rot, pos : data.pos}));
		}
	});
}

function onPlayerHit(data) {
	const hitPlayer = playerById(data.id);
  const shooter = playerById(data.shooterId);
    
	// Player not found
	if (!hitPlayer || !shooter) {
		util.log("Player not found (onPlayerHit)");
		return;
	}
    
	//Check if hit player is already dead ... dead people cant die
	//or if the shooter is dead ... because dead people also cant shoot anybody
	if(hitPlayer.isDead() || shooter.isDead()){
			return;
	}
        
	const isDead = hitPlayer.hit();
	if(isDead){
		hitPlayer.addDeath();
		shooter.addKill(); 
		//Send all players that this player is dead (plus the sender itself, thast why no broadcast is used)
		wss.clients.forEach((client) => {
			if (client !== this && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({
					cmd: 'player dead', 
					id : data.id, 
					killer: data.shooterId
				}));
			}
		});
	} else{
      //Send player his new hitpoints
			wss.clients.forEach((client) => {
				if(+client.id === +data.id) {
					client.send(
						JSON.stringify({
							cmd: 'update hitpoints',
							hitPoints : hitPlayer.getHitPoints() 
						})
					)
				}
			})
    }
}

function onRespawnPlayer() {
	const respawnPlayer = playerById(this.id);
	if(respawnPlayer.isDead()){ 
		respawnPlayer.setDead(false);
		respawnPlayer.setHitPoints(100);
		respawnPlayer.setXYZ(Math.random() * spread , 0 , Math.random() * spread); 
		wss.clients.forEach((client) => {
			if (client !== this && client.readyState === WebSocket.OPEN) {
				client.send({cmd: 'respawn player', player: respawnPlayer });
			}
		});
	}
}

function onPlayerSuicide(){
	const suicidePlayer = playerById(this.id);
	if(!suicidePlayer.isDead()){
		suicidePlayer.addDeath();
		suicidePlayer.setDead(true);  
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send({cmd: 'player dead',  id: this.id , killer: this.id });
			}
		});
	}
}

function onShotFired(data){
	const shooter = playerById(data.id);
	const position = shooter.getXYZ(); 
	wss.clients.forEach((client) => {
		if (+client.id !== +data.id && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({cmd: 'shot fired', pos: position }));
		}
	});
}

//data.msg => msg content
function onClientSentMsg(data){
	//Send this msg to all other clients (including self)
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send({cmd: 'recived msg', from: this.id, msg: data.msg});
		}
	});
}

function playerById(id) {
	for(let i = 0; i < players.length; i++){
		if(players[i]._id === id){
			return players[i]
		}
	}
	return false;
}

const interval = setInterval(()=> {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
			onClientDisconnect(ws)
			return;
		}
		
    ws.isAlive = false;
    ws.ping();
  });
}, 3000);
wss.on('close', function close() {
  console.log('closeserver')
});
