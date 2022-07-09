const ws = require('ws')
const util = require('util')
const Player = require('../models/Player.js')
const players = [];
const spread = 400;

const wss = new ws.WebSocketServer({
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

wss.on('connection', function connection(ws) {
	ws.on('message', function message(data) {
		console.log(data.toString())
		if(data.cmd === 'setId'){
			onClientConnect(ws)
		}else	if(data.cmd === 'set userName'){
			onSetUserName(data)
		}else if(data.cmd === 'disconnect'){
			onClientDisconnect(data);
		}else if(data.cmd === 'request init game'){
			onClientRequestInit(data);
		}else if(data.cmd === 'update position'){
			onUpdatePosition(data);
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
});

function onSetUserName(data) {
	const player = playerById(this.id)
	player._name = data.userName;
	wss.clients.forEach((client) => {
		if (client !== this && client.readyState === WebSocket.OPEN) {
			client.send({cmd: 'start render', player: clientPlayer}, { binary: false });
		}
	});
}

function onClientConnect(client) {
	util.log("New Player has connected: " + client.id);
  //Create a player for this ID
	//ToDo: Check if position is available for the loaded level
	const newPlayer = new Player((Math.random() - 0.5) * spread , 0 , (Math.random() - 0.5) * spread); 
	newPlayer._id = client.id;   
	newPlayer.setColor(Math.random(), Math.random(), Math.random()); 
	players.push(newPlayer);
	console.log(newPlayer)
}

function onClientRequestInit() {
	//Find clients player
  const clientPlayer = playerById(this.id);
  // Player not found
	if (!clientPlayer) {
		util.log("Player not found: "+this.id);
		return;
	};  
    //Get all Infos of the other Players
    const remotePlayer = [];
    //Emitting all players to the new player
	for (let i = 0; i < players.length; i++) {
		if(players[i]._id != this.id && players[i]._name != "") 
	       remotePlayer.push(players[i]);	 
	}
  //Send the init information to the Client

  this.send({cmd: 'init game', localPlayer: clientPlayer , remotePlayers : remotePlayer });
  //Tell all current players, there is a new player
	wss.clients.forEach((client) => {
		if (client !== this && client.readyState === WebSocket.OPEN) {
			client.send({cmd: 'new plahyer', player: clientPlayer}, { binary: false });
		}
	});
}

function onClientDisconnect() {
	util.log("Player has disconnected: "+this.id);
	const removePlayer = playerById(this.id);
	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};
	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);
	// Broadcast removed player to connected socket clients
	wss.clients.forEach((client) => {
		if (client !== this && client.readyState === WebSocket.OPEN) {
			client.send({cmd: 'remove player', player: clientPlayer}, { binary: false });
		}
	});
}

function onUpdatePosition(data) {
	const movedPlayer = playerById(this.id);
	// Player not found
	if (!movedPlayer) {
		util.log("Player not found (onUpdatePosition): " + this.id);
		return;
	} 
	//Update model player instance on Server 
	movedPlayer.setXYZ(data.pos.x, data.pos.y, data.pos.z); 
	movedPlayer.setRotXYZ(data.rot.x, data.rot.y, data.rot.z);      
	//Broadcast position change to all other players 
	wss.clients.forEach((client) => {
		if (client !== this && client.readyState === WebSocket.OPEN) {
			client.send({cmd: 'move player', data: { id: this.id, rot : data.rot, pos : data.pos}});
		}
	});
}

function onPlayerHit(data) {
	const hitPlayer = playerById(data.id);
  const shooter = playerById(this.id);
    
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
				client.send({cmd: 'player dead', id : data.id, killer: this.id});
			}
		});
	} else{
      //Send player his new hitpoints
			wss.clients.find(c => c.id === data.id).send({
				cmd: 'update hitpoints',
				hitPoints : hitPlayer.getHitPoints() 
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

function onShotFired(){
	const shooter = playerById(this.id);
	const position = shooter.getXYZ(); 
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send({cmd: 'shot fired', pos: position });
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