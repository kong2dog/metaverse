import * as BABYLON from '@babylonjs/core';
import 'babylonjs-loaders'
import PlayerMod from '../models/playerMod.js';
import Controller from '../controller/controller.js'
import Sound from '../controller/sound.js';
import initData from '../store/initData.js';
export default class BabylonScene {
	constructor(
		engine, canvas, store
	) {
		this.canvas = canvas;
		console.log(store)
		this.store = store;
		this.boxes = []
		this.engine = engine;
		this.Scene =  new BABYLON.Scene(engine);
		this.controller = new Controller(this);
		this.sound = new Sound(this.Scene);
	}

	Create() {
		this.initCamera();
		this.loadLight();
		this.loadPhysics();
		this.initSky();
		this.loadGround();
		// this.loadBoxes();
		this.loadGun().then(() => {
			this.loadSolider()
		})
	}

	initCamera() {
		this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1.5, 7), this.Scene);
		this.camera.setTarget(new BABYLON.Vector3(0, 0, -1))
		this.camera.attachControl(this.canvas, false);
		this.Scene.activeCameras.push(this.camera)
		// this.camera2 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(10, 1, 0), this.Scene);
		// this.camera2.setTarget(new BABYLON.Vector3(0, 1, 0))
		// this.camera2.attachControl(this.canvas, false);
		// this.camera2.inputs.addMouseWheel();
		// this.Scene.activeCameras.push(this.camera2)
		// this.camera.viewport = new BABYLON.Viewport(0.5,0,0.5,1)
		// this.camera2.viewport = new BABYLON.Viewport(0,0,0.5,1)
	}

	initSky() {
		BABYLON.Engine.ShadersRepository = "../shaders/";
    const skybox = BABYLON.MeshBuilder.CreateSphere("skyBox", { segments: 10, diameter: 2500 }, this.Scene);
    const shader = new BABYLON.ShaderMaterial("gradient", this.Scene, "gradient", {});
    shader.setFloat("offset", 0);
    shader.setFloat("exponent", 0.6);
    shader.setColor3("topColor", BABYLON.Color3.FromInts(0,119,255));
    shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240,240, 255));
    shader.backFaceCulling = false;
    skybox.material = shader; 
    
    //Create Fog  
    this.Scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    this.Scene.fogDensity = 0.003;
    this.Scene.fogColor = new BABYLON.Color3(0.8,0.83,0.8);
	}

	loadGround() {
		this.groundDivs = 64;
		this.tileSize = 1000;
		this.bottomPoint = -15;
		this.topPoint = 1;
		this.ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', '/map.jpg', {
			width: this.tileSize,
			height: this.tileSize,
			subdivisions: this.subdivisions,
			minHeight: 	this.bottomPoint,
			maxHeight: this.topPoint,
			updatable: true
		}, this.Scene)
		const groundMaterial1 = new BABYLON.StandardMaterial("groundMat", this.Scene);
		groundMaterial1.diffuseTexture = new BABYLON.Texture("/gras1.jpg", this.Scene);
		groundMaterial1.diffuseTexture.uScale = 10.0;
		groundMaterial1.diffuseTexture.vScale = 10.0;	
		this.ground.material = groundMaterial1;
		this.ground.receiveShadows = true;
		this.ground.checkCollisions = true;
		this.shadowGenerator.getShadowMap().renderList.push(this.ground);
		// this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this.Scene); 
	}

	async loadGun() {
		return new Promise(resolve => {
			window.BABYLON.SceneLoader.ImportMesh('', '/', "weapon_2.obj", this.Scene, (mesh) => {
				this.gun = mesh;
				this.gun[0].isVisible = false;
				this.gun[0].material = new BABYLON.StandardMaterial("Mat", this.Scene);
        this.gun[0].material.diffuseTexture = new BABYLON.Texture("/weapon_2.png", this.Scene);
        this.gun[0].material.diffuseTexture.hasAlpha = true;  
				resolve(mesh)
			});
		})
	}

	loadSolider() {
		const p = new PlayerMod(this.Scene);
		this.showAxis(10);
		p.createPlayer();
		p.holdGun();
		p.run()
		this.soldier = p;
		this.controller.requestAllPlayers()
	}
	showAxis(size) {
			const makeTextPlane = (text, color, size) => {
				let dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, this.Scene, true);
				dynamicTexture.hasAlpha = true;
				dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
				const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, this.Scene, true);
				plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", this.Scene);
				plane.material.backFaceCulling = false;
				plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
				plane.material.diffuseTexture = dynamicTexture;
				return plane;
			};
		
			const axisX = BABYLON.Mesh.CreateLines("axisX", [ 
				new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
				new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
				], this.Scene);
			axisX.color = new BABYLON.Color3(1, 0, 0);
			const xChar = makeTextPlane("X", "red", size / 10);
			xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
			const axisY = BABYLON.Mesh.CreateLines("axisY", [
					new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
					new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
					], this.Scene);
			axisY.color = new BABYLON.Color3(0, 1, 0);
			const yChar = makeTextPlane("Y", "green", size / 10);
			yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
			const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
					new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
					new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
					], this.Scene);
			axisZ.color = new BABYLON.Color3(0, 0, 1);
			const zChar = makeTextPlane("Z", "blue", size / 10);
			zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	}

	loadPhysics() {
		// const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
		// const physicsPlugin = new BABYLON.CannonJSPlugin();
		// this.Scene.enablePhysics(gravityVector, physicsPlugin);
		// this.Scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin())
		this.Scene.gravity = new BABYLON.Vector3(0, -0.04, 0)
		this.Scene.collisionsEnabled = true;
	}

	loadBoxes() {
		const box = new BABYLON.MeshBuilder.CreateBox("crate", {size: 8}, this.Scene);
    
    box.material = new BABYLON.StandardMaterial("Mat", this.Scene);
    box.material.diffuseTexture = new BABYLON.Texture("/crate.jpg", this.Scene);
    box.material.diffuseTexture.hasAlpha = true;
    
    box.position = new BABYLON.Vector3(10, 0, 10); 
		box.receiveShadows = true;
		this.shadowGenerator.getShadowMap().renderList.push(box);
    box.checkCollisions = true;
    this.boxes.push(box);
    //this.box.position.y = this.render.terrain.calcElevation(5, 10) + 5;
    
    for (var i = 0; i < initData.boxSize; i++) {
        const clone = box.createInstance("box" + i);
        clone.type = 'box';
        clone.position.x = initData.boxPosition[i*2]; 
        clone.position.z = initData.boxPosition[i*2 + 1];
        clone.rotation.y = initData.boxRotation[i];
        
        //Add Lights and Physics
				this.shadowGenerator.getShadowMap().renderList.push(clone);
				clone.checkCollisions = true; 
				// clone.physicsImpostor = new BABYLON.PhysicsImpostor(clone, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1 }, this.Scene);
				this.boxes.push(clone);
    }
	}

	loadLight() {
		this.lightHem = new BABYLON.HemisphericLight("lightHem", new BABYLON.Vector3(0, 0, 0), this.Scene);
    this.lightHem.intensity = 0.8;
		this.lightDir = new BABYLON.DirectionalLight("lightDir", new BABYLON.Vector3(2, 4, 2), this.Scene);    
		this.lightDir.diffuse = new BABYLON.Color3(1, 1, 1);	
		this.lightDir.specular = new BABYLON.Color3(0, 0, 0);
		this.lightDir.position = new BABYLON.Vector3(250, 400, 0);
    this.lightDir.intensity = 1.8;
		this.shadowGenerator = new BABYLON.ShadowGenerator(4192, this.lightDir);
    this.shadowGenerator.useVarianceShadowMap = false; 
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
		if(this.load){
			this.controller.Update();
		}
	}

	resize() {

	}

	Destroy() {

	}
}