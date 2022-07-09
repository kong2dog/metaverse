import * as BABYLON from '@babylonjs/core';
import Controller from '../controller/controller.js'
export default class BabylonScene {
	constructor({
		engine, canvas,store
	}) {
		this.canvas = canvas;
		this.store = store;
		this.engine = engine;
		this.Scene =  new BABYLON.Scene(engine);
		this.controller = new Controller(this.Scene);
		this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, -8, -20), this.Scene);
	}

	Create() {
		this.camera.setTarget(BABYLON.Vector3.Zero())
		this.camera.attachControl(this.canvas, false);
		this.camera.inputs.addMouseWheel();
		this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.Scene);
		const box = BABYLON.MeshBuilder.CreateBox('box', {size: 1}, this.Scene);
		box.position.y = 1; 
	}

	Update() {
		this.render();
	}

	bindEvent() {

	}

	loadLocalPlayer(){

	}

	loadOponent() {

	}

	render() {
		this.Scene.render();

	}

	resize() {

	}

	Destroy() {

	}
}