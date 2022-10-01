import * as BABYLON from '@babylonjs/core';
import Weapon from './weapon.js';
import PlayerMod from './playerMod.js';
export default class LocalPlayer {
	constructor(
		scene, player
	) {
		this.player = player;
		this.scene = scene;
		const gun = this.scene.gun.createInstance(this.player._id + 'gun');
		gun.rotation.y = -Math.PI / 2;
		gun.isVisible = true;
		gun.position.z -= 2;
		gun.position.x -= 0.5;
		gun.position.y -= 1;
		this.cameraSpeed = 0.6;
		this.jumpHeight = 2.5;
		this.mesh = gun;
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
		this.weapon = new Weapon(scene, player, this.mesh);
		this.mesh.parent = this.scene.camera;
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
		this.scene.camera.ellipsoid = new BABYLON.Vector3(3.2,2,1)
	}

	Create() {
	}

	onKeyUp(event) {
		this.scene.store.onKeyup(event)
	}

	onKeyDown(event) {
		console.log(event)
		this.scene.store.onKeyDown(event)
	}

	gotKilled(killer){
		this.setDead(true)
		this.scene.camera.speed = 0;
	}

	resetCameraCoordinates() {
		this.scene.camera.position.x = this.player._x;
		this.scene.camera.position.y = this.player._y;
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
		console.log('sub')
		//this.mesh.position = new BABYLON.Vector3(this.scene.camera.position.x, this.scene.camera.position.y, this.scene.camera.position.z);
		//this.mesh.rotation.y = this.scene.camera.rotation.y;
		this.scene.controller.sendLocalPlayerMovement(this.scene.camera.position, this.scene.camera.rotation);
    this.lastPosition = new BABYLON.Vector3(this.scene.camera.position.x , this.scene.camera.position.y , this.scene.camera.position.z);
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
		this.isJumping = true;
		this.jumpUp = true;
		const cam = this.scene.camera;
		cam.animations = [];
		const a = new BABYLON.Animation(
			'a',
			'position.y', 3,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
		);
		const keys = [];
		keys.push({ frame: 0, value: cam.position.y });
    keys.push({ frame: 3, value: cam.position.y + this.jumpHeight });
    a.setKeys(keys);

    const easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    a.setEasingFunction(easingFunction);
 
    cam.animations.push(a);

    this.scene.Scene.beginAnimation(cam, 0, 3, false, 1 , () => {
      this.jumpUp = false;
    });
	}

	checkFreeFall(){

	}

	checkJump() {
		let pos, heightOfTerrain ,diff;
    if(this.isJumping && !this.jumpUp){
			let bias = 0.08; 
			pos = this.scene.camera.position;
			heightOfTerrain = this.scene.calcElevation(pos.x, pos.z);
			diff = pos.y - heightOfTerrain -bias;
			if(diff < this.player.getHeight()){
				this.isJumping = false;  
			}
    } 
    else if(!this.isJumping && !this.jumpUp){
			//On low fps, the camera can jump and basicly "ignore" the gravity which means the player can fly
			//To test against that affect this code is here, it checks if a player is off the ground without actually jumping and brings player back down
			pos = this.scene.camera.position;
			heightOfTerrain = this.scene.calcElevation(pos.x, pos.z);
			diff = pos.y - heightOfTerrain;
			if(diff > (0.5 + this.player.getHeight())){
				this.scene.camera.position.y = heightOfTerrain + this.player.getHeight() + 0.1; 
			}
    }
	}

	Destroy() {

	}
}