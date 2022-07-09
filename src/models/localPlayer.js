import * as BABYLON from '@babylonjs/core';
import Player from './Player.js'
export default class localPlayer extends Player {
	constructor({
		scene, x, y, z
	}) {
		super(x, y, z)
		this.scene = scene;
		this.lastPosition = new BABYLON.Vector3(this.scene.camera.position.x, this.scene.camera.position.y, this.scene.camera.position.z)
		this.lastRotation = new BABYLON.Vector3(this.scene.camera.rotation.x, this.scene.camera.rotation.y, this.scene.camera.rotation.z)
		this.cameraSpeed = 0.6;
		this.jumpHeight = 2.5;
		this.jumpUp = false;
		this.isJumping = false;
		this.scene.camera.speed = this.cameraSpeed;
		this.scene.camera.keysUp = [87] // W
		this.scene.camera.keysDown = [83]; // S 
		this.scene.camera.keysLeft = [65]; // A
		this.scene.camera.keysRight = [68]; // D

	}

	Update() {

	}

	bindEvent() {
		window.addEventListener('keyup', (event))
	}

	Create() {

	}

	gotKilled(killer){
		this.setDead(true)
		this.scene.camera.speed = 0;
	}

	resetCameraCoordinates() {
		this.scene.camera.position.x = this._x;
		this.scene.camera.position.y = this._y;
		this.scene.camera.position.z = this._z;
	}

	updatePosition() {
		const xOffset = Math.asb(this.last)
	}

	submitMovement() {
		
	}

	checkControls() {

	}

	checkFreeFall(){

	}

	checkJump() {

	}

	Destroy() {

	}
}