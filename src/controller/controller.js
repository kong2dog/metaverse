import LocalPlayer from "../models/localPlayer.js";
const ws = new WebSocket('ws://localhost:9988')
import RemotePlayer from "../models/remotePlayer.js";
import Player from '../models/Player.js';
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
        const data = {
            cmd: 'setId',
            id: params.id
        }
        this.client.send(JSON.stringify(data))
    }

    onStartRender() {
        this.store.setState('gameStarted', true)
    }

    addGameEvents() {
        this.client.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log('client: %s', event);
            if(data.cmd === 'start render'){
                this.onStartRender()
            }else if(data.cmd === 'new player'){
                this.onNewPlayer(data)
            }else if(data.cmd === 'init game'){
                console.log(data)
                this.onInitGame(data);
            }else if(data.cmd === 'move player'){
                console.log(data)
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
        if(this.store.state.localPlayer.player._id === player._id){
            this.store.state.localPlayer.player.setDead(player._isDead);
            this.store.state.localPlayer.player.setHitPoints(player._hitPoints);
            this.store.state.localPlayer.player.setXYZ(player._x, player._y, player._z);
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
        this.setLocalPlayer(data.localPlayer);
        // this.store.state.localPlayer = data.localPlayer;
        for (var i = 0; i < data.remotePlayers.length; i++) {
            this.addRemotePlayer(data.remotePlayers[i]); 
        };
        this.initPlayersDone();
    }

    setLocalPlayer(player) {
        console.log('set local')
        console.log(player)
        const p = this.clonePlayer(player)
        this.store.state.localPlayer = new LocalPlayer(this.scene, p);
        console.log(this.store.state.localPlayer.Update)
        this.scene.load = true
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
        console.log(id)
        if(!player) throw new Error("Player not found " + id);
        player.Destroy();
        this.store.state.remotePlayers.splice(this.store.state.remotePlayers.indexOf(player), 1)
        console.log(this.store)
    }

    addRemotePlayer(player) {
        const p = this.clonePlayer(player);
        const remotePlayer = new RemotePlayer(this.scene, p)
        console.log(remotePlayer)
        this.store.state.remotePlayers.push(remotePlayer);
    }

    onMovePlayer(data) {
        this.movePlayer(data.id, data.pos, data.rot)
    }

    movePlayer(id, pos, rot) {
        console.log(id)
        const player = this._findPlayer(id);
        console.log(player)
        if(!player) return;
        player.move(pos, rot)
        player.player.setXYZ(pos.x, pos.y, pos.z);
        player.player.setRotXYZ(rot.x, rot.y, rot.z);
    }

    _findPlayer(id) {
        for(let i = 0; i < this.store.state.remotePlayers.length; i++){
            if(this.store.state.remotePlayers[i].player._id === id){
                return this.store.state.remotePlayers[i]
            }
        }
        return false;
    }

    Update() {
        this.store.state.localPlayer.Update();
    }

    Create() {

    }

    Destroy() {

    }

    requestAllPlayers () {
        console.log('request to load players')
        const data = {
            cmd: 'request init game'
        }
        this.client.send(JSON.stringify(data))
    }

    initPlayersDone() {
        console.log('initial all players done')
    }

    sendLocalPlayerMovement(pos, rot) {
        const position = { x: pos.x, y : pos.y , z : pos.z}; 
        const rotation = { x: rot.x, y : rot.y , z : rot.z};
        //Send new position and rotation to the server
        this.client.send(JSON.stringify({
            cmd: 'update position',
            pos: position,
            rot: rotation
        }))
        //Update the localPlayer model on the Client
        this.store.state.localPlayer.player.setXYZ(pos.x, pos.y, pos.z);
        this.store.state.localPlayer.player.setRotXYZ(rot.x, rot.y, rot.z);
    }

    clonePlayer(p) {
        const player = new Player(p._x, p._y, p._z);
        player.setRotXYZ( p._x , p._y , p._z );
        player.setID(p._id);
        player.setColor(p._color.r , p._color.g , p._color.b);
        player.setHitPoints(p._hitPoints);
        player.setName(p._name);
        player._isDead = p._isDead;
        player._kills = p._kills;
        player._deaths = p._deaths;
        return player;
    }
}
