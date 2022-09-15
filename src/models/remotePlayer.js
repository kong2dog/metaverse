import Weapon from './weapon.js'
import PlayerMod from './playerMod.js';
export default class remotePlayer {
	constructor(
		scene, player
	) {
		console.log('add remote')
		this.player = player;
		const p = new PlayerMod(scene.Scene, player._id);
		p.createPlayer();
		p.holdGun();
		this.scene = scene;
		this.mesh = p;
		this.mesh.player.setEnabled(true);
		this.mesh.player.name = player._id
		this.mesh.player.position.x = player._x;
		this.mesh.player.position.y = player._y;
		this.mesh.player.position.z = player._z;
		// this.scene.shadowGenerator.getShadowMap().renderList.push(this.mesh.player);
		this.weapon = new Weapon(scene, player, this.mesh.player)
		// this.mesh.player.checkCollisions = true;
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
		this.mesh.player.position = new BABYLON.Vector3(pos.x, pos.y, pos.z);
		this.mesh.player.rotation.y = rot.y;
		this.mesh.run();
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
		this.mesh.player.dispose()
	}
}