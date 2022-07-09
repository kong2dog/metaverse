const ws = new WebSocket('ws://127.0.0.1:9988')

export default class Controller {
    constructor(scene) {
        this.isController = true;
        this.scene = scene;
        this.store = scene.store;
        this.client = ws;
        this.addEvents();
        this.addGameEvents();
    }

    addEvents() {
        this.client.addEventListener('open', () => {
            this.socketOpen()
        })
    }

    socketOpen() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        console.log(params.id)
        console.log('connected');
        this.client.send('hello')
        const data = {
            cmd: 'setId',
            id: params.id
        }
        this.client.send(JSON.stringify(data))
        
    }

    onStartRender() {
        if(!this.store.state.gameStarted){
            this.addGameEvents();
        }
        this.store.setState('gameStarted', true)
    }

    addGameEvents() {
        this.client.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log('client: %s', event);
            if(data.cmd === 'new player'){
                this.onNewPlayer(data)
            }else if(data.cmd === 'init game'){
                this.onInitGame(data);
            }else if(data.cmd === 'move player'){
                this.onMovePlayer(data);
            }else if(data.cmd === 'remove player'){
                this.onRemovePlayer(data);
            }else if(data.cmd === 'player dead'){
                this.onPlayerDead(data);
            }else if(data.cmd === 'update hitpoints'){
                this.onUpdateHitPoints(data)
            }else if(data.cmd === 'respawn player'){
                this.onRespawnPlayer(data)
            }else if(data.cmd === 'shot fired'){
                this.onShotFired(data)
            }else if(data.cmd === 'recived msg'){
                this.onReceiveMsg(data)
            }
        })
    }

    onReceiveMsg(data) {
        this.receiveMsg(data.from, data.msg)
    }

    receiveMsg(id, msg) {
        let sender;
        if(id === this.store.state.localPlayer._id){
            sender = this.store.state.localPlayer;
        }else{
            sender = this._findPlayer(id)
        }
    }

    onShotFired(data) {
        this.showFired(data.pos)
    }

    shotFired(pos) {
        // 播放声音
    }

    onRespawnPlayer(data) {
        this.respawnPlayer(data.player)
    }

    respawnPlayer(player) {
        if(this.store.state.localPlayer._id === player._id){
            this.store.state.localPlayer.setDead(player._isDead);
            this.store.state.localPlayer.setHitPoints(player._hitPoints);
            this.store.state.localPlayer.setXYZ(player._x, player._y, player._z);
        }else{
            const remotePlayer = this._findPlayer(player._id);
            remotePlayer.setDead(player._isDead);
            remotePlayer.setHitPoints(player._hitPoints);
            remotePlayer.setXYZ(player._x, player._y, player._z);
        }
    }

    onUpdateHitPoints(data) {
        this.updateHitPointsLocalPlayer(data.hitPoints)
    }

    updateHitPointsLocalPlayer(hitPoints){
        this.store.state.localPlayer.setHitPoints(hitPoints)
    }

    onNewPlayer(data) {
        console.log("New player connected");
        this.addRemotePlayer(data.player)
    }

    onInitGame(data) {
        this.store.state.localPlayer = data.localPlayer;
        for (var i = 0; i < data.remotePlayers.length; i++) {
            this.addRemotePlayer(data.remotePlayers[i]); 
        };
        this.initPlayersDone();
    }

    onRemovePlayer(data) {
        this.removeRemotePlayer(data.id)
    }

    onPlayerDead(data) {
        this.playerDied(data.id, data.killer)
    }

    playerDied(id, killer) {
        if(id === this.store.state.localPlayer._id) {
            this.store.state.localPlayer.addDeath();
            // 非自杀
            let remotePlayer 
            if(killer !== id){
                remotePlayer = this._findPlayer(killer);
                remotePlayer.addKill()
            }else{
                remotePlayer = this.store.state.localPlayer;
            }
            this.store.state.localPlayer.gotKilled(remotePlayer)
        }else{
            let killer
            const dead = this._findPlayer(id);
            dead.addDeath();
            if(killer === this.store.state.localPlayer._id){
                killer = this.store.state.localPlayer;
                this.store.state.localPlayer.addKill()
            }else{
                killer = this._findPlayer(killer)
            }
            killer.addKill();

            dead.gotKilled(killer)
        }
    }

    removeRemotePlayer(id) {
        const player = this._findPlayer(id)
        if(!player) throw new Error("Player not found " + id);
        this.store.state.remotePlayers.splice(this.store.state.remotePlayers.indexOf(player), 1)
    }

    addRemotePlayer(player) {
        const remotePlayer = player;
        this.store.state.remotePlayers.push(remotePlayer);
    }

    onMovePlayer(data) {
        this.movePlayer(data.id, data.pos, data.rot)
    }

    movePlayer(id, pos, rot) {
        const player = this._findPlayer(id);
        if(!player) return;
        player.setXYZ(pos.x, pos.y, pos.z);
        player.setRotXYZ(rot.x, rot.y, rot.z);
    }

    _findPlayer(id) {
        for(let i = 0; i < this.store.state.remotePlayers.length; i++){
            if(this.store.state.remotePlayers[i]._id === id){
                return this.store.state.remotePlayers[i]
            }
        }
        return false;
    }

    Update() {

    }

    Create() {

    }

    Destroy() {

    }

    requestAllPlayers () {
        console.log('request to load players')
    }

    initPlayersDone() {
        console.log('initial all players done')
    }

    setLocalPlayer(player) {
        this.localPlayer = player
    }

    addRemotePlayer(player) {
        const rp = this._clonePlayer(player)
        this.remotePlayers.push(rp);
    }

    sendLocalPlayerMovement(pos, rot) {

    }
}
