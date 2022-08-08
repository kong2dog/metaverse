import * as BABYLON from '@babylonjs/core';
import Weapon from './weapon.js'
export default class remotePlayer {
	constructor(
		scene, player
	) {
		console.log('add remote')
		this.player = player;
		this.scene = scene;
		this.mesh = this.scene.soldier.createInstance(player._id);
		this.mesh.position.x = player._x;
		this.mesh.position.y = player._y;
		this.mesh.position.z = player._z;
		this.mesh.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
		this.scene.shadowGenerator.getShadowMap().renderList.push(this.mesh);
		this.weapon = new Weapon(scene, player, this.mesh)
		this.weapon.parent = this.mesh;
		this.mesh.checkCollisions = true;
	}

	Update() {

	}

	bindEvent() {
		window.addEventListener('keyup', (event))
	}

	Create() {

	}

	move(pos, rot) {
		console.log('move')
		console.log(pos)
		this.mesh.position = new BABYLON.Vector3(pos.x, pos.y, pos.z);
		this.mesh.rotation.y = rot.y;
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
		this.mesh.dispose()
	}
}