import Weapon from './weapon.js';
import PlayerMod from './playerMod.js';
export default class LocalPlayer {
	constructor(
		scene, player
	) {
		this.player = player;
		this.scene = scene;
		
		this.cameraSpeed = 0.6;
		this.jumpHeight = 2.5;
		const p = new PlayerMod(scene.Scene, player._id);
		p.createPlayer();
		p.holdGun();
		p.run();
		this.mesh = p;
		this.mesh.name = player._id
		this.mesh.player.setEnabled(true);
		this.jumpUp = false;
		this.isJumping = false;
		this.scene.camera.speed = this.cameraSpeed;
		this.scene.camera.keysUp = [87] // W
		this.scene.camera.keysDown = [83]; // S 
		this.scene.camera.keysLeft = [65]; // A
		this.scene.camera.keysRight = [68]; // D
		this.resetCameraCoordinates();
		this.initPhysics();

		this.lastPosition = new BABYLON.Vector3(this.scene.camera.position.x, this.scene.camera.position.y, this.scene.camera.position.z)
		this.lastRotation = new BABYLON.Vector3(this.scene.camera.rotation.x, this.scene.camera.rotation.y, this.scene.camera.rotation.z)
		
		this.bindEvent()
		this.weapon = new Weapon(scene, player, this.mesh.player)
	}

	Update() {
		this.updatePosition()
		this.checkControls();
	}
	setColor(r,g,b) {
		this.player._color = {
			r,g,b
		}
	}

	setXYZ(x, y, z) {
		this.player._x = x;
		this.player._y = y;
		this.player._z = z;
	}

	setRotXYZ(x, y, z) {
		this.player._rotX = x;
		this.player._rotY = y;
		this.player._rotZ = z;
	}

	hit() {
		this.player._hitPoints -= 19;
		if(this.player._hitPoints <= 0){
			this.player._isDead = true;
		}
		return this.player._isDead;
	}

	setDead(d) {
		this.player._isDead = d;
	}

	setHitPoints(h) {
		if(h > 100) h = 100;
		else if(h < 0) h = 0;
		this.player._hitPoints = h;
		Pannel.updateHealthBar(this.player.getHitPoints());
	}

	isDead() {
		return this.player._isDead;
	}

	addDeath() {
		this.player._deaths += 1;
	}

	addKill() {
		this.player._kills += 1;
	}

	bindEvent() {
		window.addEventListener('keyup', (event) => {
			this.onKeyUp(event)
		}, false);
		window.addEventListener('keydown', (event) => {
			this.onKeyDown(event)
		}, false);
		window.addEventListener('pointerup', (event) => {
			event.keyCode = event.pointerId;
			this.onKeyUp(event)
		}, false)
		window.addEventListener('pointerdown', (event) => {
			event.keyCode = event.pointerId;
			this.onKeyDown(event);
		}, false)
	}

	initPhysics() {
		this.scene.camera.checkCollisions = true;
		this.scene.camera.useOctreeForCollisions = true;
		this.scene.camera.applyGravity = true;
		this.scene.camera.ellipsoid = new BABYLON.Vector3(1,2,1)
		// this.scene.camera.ellipsoidOffset = new BABYLON.Vector3(0,2,0)
	}

	Create() {
	}

	onKeyUp(event) {
		this.scene.store.onKeyup(event)
	}

	onKeyDown(event) {
		this.scene.store.onKeyDown(event)
	}

	gotKilled(killer){
		this.setDead(true)
		this.scene.camera.speed = 0;
	}

	resetCameraCoordinates() {
		this.scene.camera.position.x = this.player._x;
		this.scene.camera.position.y = this.player._y + 1;
		this.scene.camera.position.z = this.player._z;
	}

	updatePosition() {
		const xOffset = Math.abs(this.lastPosition.x - this.scene.camera.position.x);
    const yOffset = Math.abs(this.lastPosition.y - this.scene.camera.position.y);
    const zOffset = Math.abs(this.lastPosition.z - this.scene.camera.position.z);
    
    const xRotOffset = Math.abs(this.lastRotation.x - this.scene.camera.rotation.x);
    const yRotOffset = Math.abs(this.lastRotation.y - this.scene.camera.rotation.y);
    const zRotOffset = Math.abs(this.lastRotation.z - this.scene.camera.rotation.z);
    
    const posOffset = xOffset + yOffset + zOffset;
    const rotOffset = yRotOffset + xRotOffset + zRotOffset;

    if(posOffset > 0.1 || rotOffset > 0.01){ 
        this.submitMovement();
    } 
	}

	submitMovement() {
		this.mesh.run();
		this.mesh.player.position = new BABYLON.Vector3(this.scene.camera.position.x - 0.3, this.scene.camera.position.y - 0.5, this.scene.camera.position.z);
		this.mesh.player.rotation.y = this.scene.camera.rotation.y;
		this.mesh.player.rotation = this.scene.camera.rotation;
		this.scene.controller.sendLocalPlayerMovement(this.scene.camera.position, this.scene.camera.rotation);
    this.lastPosition = new BABYLON.Vector3(this.scene.camera.position.x - 0.3, this.scene.camera.position.y -0.5, this.scene.camera.position.z);
    this.lastRotation = new BABYLON.Vector3(this.scene.camera.rotation.x , this.scene.camera.rotation.y , this.scene.camera.rotation.z);
	}

	checkControls() {
		if(this.scene.store.isDown(this.scene.store.state.JUMP)){
			if(!this.isJumping){
				this.jump()
			}
		}
		if(this.scene.store.isDown(this.scene.store.state.FIRE)){
			if(!this.player.isDead())
					this.weapon.fire();
		}
	}

	jump() {

	}

	checkFreeFall(){

	}

	checkJump() {

	}

	Destroy() {

	}
}