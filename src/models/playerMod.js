import * as BABYLON from '@babylonjs/core';

export default class PlayerMod {
  constructor(scene, name) {
    this.Scene = scene;
		this.name = name;

  }
	async loadGun() {
		return new Promise(resolve => {
			window.BABYLON.SceneLoader.ImportMesh('', '/', "weapon_2.obj", this.Scene, (mesh) => {
				this.gun = mesh[0];
				this.gun.isVisible = false;
				this.gun.material = new BABYLON.StandardMaterial("Mat", this.Scene);
        this.gun.material.diffuseTexture = new BABYLON.Texture("/weapon_2.png", this.Scene);
        this.gun.material.diffuseTexture.hasAlpha = true;  
				resolve(mesh)
			});
		})
	}
  createPlayer() {
    this.player = new BABYLON.TransformNode("pivot");
		
		this.player.isVisible = false;
		
		this.gun.parent = this.player;
		this.gun.rotation.y = -Math.PI / 2;
		this.gun.isVisible = true;
		this.gun.position.z -= 2;
		this.gun.position.x -= 0.5;
		this.gun.position.y -= 1;
		// const CoTAxis = this.localAxes(2, 0);
		// CoTAxis.parent = this.player;
		// this.player.position = new BABYLON.Vector3(0, 1, 0);
		
		const faceColors = [];
		// faceColors[0] = BABYLON.Color3.Blue();
		// faceColors[1] = BABYLON.Color3.White()
		// faceColors[2] = BABYLON.Color3.Red();
		// faceColors[3] = BABYLON.Color3.Black();
		// faceColors[4] = BABYLON.Color3.Green();
		// faceColors[5] = BABYLON.Color3.Yellow();
		this.head = new BABYLON.MeshBuilder.CreateBox(this.name, {width: 1, height: 0.8, faceColors: faceColors}, this.Scene); 
		this.head.material = new BABYLON.StandardMaterial("headm", this.Scene);
		// head.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);
		this.head.parent = this.player;
		const indices = this.head.getIndices();
		const positions = this.head.getVerticesData(BABYLON.VertexBuffer.PositionKind);
		let colors = this.head.getVerticesData(BABYLON.VertexBuffer.ColorKind);        
		const nbVertices = positions.length / 3;
		if (!colors) {
				colors = new Array(4 * nbVertices);
				colors = colors.fill(1);
		}
		let vertex;
		for (var i = 0; i < 6; i++) {
				vertex = indices[3 * 0 + i];
				colors[4 * vertex] = 1;
				colors[4 * vertex + 1] = 1;
				colors[4 * vertex + 2] = 0;
				colors[4 * vertex + 3] = 1;
		}
		this.head.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
		// head.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
		this.head.locallyTranslate(new BABYLON.Vector3(0, 0.4, 0));;

		const hair = new BABYLON.MeshBuilder.CreateBox(this.name, {width: 1, height: 0.2}, this.Scene);
		hair.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.1, 0))
		hair.parent = this.head;
		hair.locallyTranslate(new BABYLON.Vector3(0, 0.5, 0));;
		hair.material = new BABYLON.StandardMaterial(this.name, this.Scene);
		hair.material.diffuseColor = new BABYLON.Color3(0.61, 0.23, 0.29);

		this.body = new BABYLON.MeshBuilder.CreateBox(this.name, {width:1.2, height: 1.2, depth: 0.5}, this.Scene);
		this.body.parent = this.player;
		this.body.material = new BABYLON.StandardMaterial("bodym", this.Scene);
		this.body.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.body.locallyTranslate(new BABYLON.Vector3(0, -0.6, 0));
		
		const but = new BABYLON.MeshBuilder.CreateBox("but", {width:1.25, height: 0.4, depth: 0.55}, this.Scene);
		but.parent = this.body;
		but.material = new BABYLON.StandardMaterial("butm", this.Scene);
		but.material.diffuseColor = new  BABYLON.Color3(0.1, 0.1, 0.1);
		but.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));
		

		this.leftarm = new BABYLON.MeshBuilder.CreateBox("leftupperarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
		this.leftarm.material = new BABYLON.StandardMaterial("leftupperarmm", this.Scene);
		this.leftarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.leftarm.parent = this.player;
		this.leftarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
		this.leftarm.locallyTranslate(new BABYLON.Vector3(-0.9, -0.4, 0));

		this.leftelbow = new BABYLON.MeshBuilder.CreateBox("leftelbow", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
		this.leftelbow.material = new BABYLON.StandardMaterial("leftelbowm", this.Scene);
		this.leftelbow.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.leftelbow.parent = this.leftarm;
		this.leftelbow.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));

		this.leftlowerarm = new BABYLON.MeshBuilder.CreateBox("leftlowerarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
		this.leftlowerarm.material = new BABYLON.StandardMaterial("leftlowerarmm", this.Scene);
		this.leftlowerarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.leftlowerarm.parent = this.leftarm;
		this.leftlowerarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
		this.leftlowerarm.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));

		const leftwaist = new BABYLON.MeshBuilder.CreateBox("leftwaist", {width:0.44, height: 0.1, depth: 0.44}, this.Scene);
		leftwaist.material = new BABYLON.StandardMaterial("leftwaistm", this.Scene);
		leftwaist.material.diffuseColor = new  BABYLON.Color3(1, 1, 1);
		leftwaist.parent = this.leftlowerarm;
		leftwaist.locallyTranslate(new BABYLON.Vector3(0, -0.4, 0));

		const lefthand = new BABYLON.MeshBuilder.CreateBox("lefthand", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
		lefthand.material = new BABYLON.StandardMaterial("lefthandm", this.Scene);
		lefthand.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);
		lefthand.parent = this.leftlowerarm;
		lefthand.locallyTranslate(new BABYLON.Vector3(0, -0.55, 0));

		this.rihgtupperarm = new BABYLON.MeshBuilder.CreateBox("rihgtupperarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
		this.rihgtupperarm.material = new BABYLON.StandardMaterial("rihgtupperarmm", this.Scene);
		this.rihgtupperarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.rihgtupperarm.parent = this.player;
		this.rihgtupperarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
		this.rihgtupperarm.locallyTranslate(new BABYLON.Vector3(0.9, -0.4, 0));

		const rihgtelbow = new BABYLON.MeshBuilder.CreateBox("rihgtelbow", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
		rihgtelbow.material = new BABYLON.StandardMaterial("rihgtelbowm", this.Scene);
		rihgtelbow.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		rihgtelbow.parent = this.rihgtupperarm;
		rihgtelbow.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));

		this.rihgtlowerarm = new BABYLON.MeshBuilder.CreateBox("rihgtlowerarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
		this.rihgtlowerarm.material = new BABYLON.StandardMaterial("rihgtlowerarmm", this.Scene);
		this.rihgtlowerarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.rihgtlowerarm.parent = this.rihgtupperarm;
		this.rihgtlowerarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
		this.rihgtlowerarm.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));

		const rihgtwaist = new BABYLON.MeshBuilder.CreateBox("rihgtwaist", {width:0.44, height: 0.1, depth: 0.44}, this.Scene);
		rihgtwaist.material = new BABYLON.StandardMaterial("rihgtwaistm", this.Scene);
		rihgtwaist.material.diffuseColor = new  BABYLON.Color3(1, 1, 1);
		rihgtwaist.parent = this.rihgtlowerarm;
		rihgtwaist.locallyTranslate(new BABYLON.Vector3(0, -0.4, 0));

		const rihgthand = new BABYLON.MeshBuilder.CreateBox("rihgthand", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
		rihgthand.material = new BABYLON.StandardMaterial("rihgthandm", this.Scene);
		rihgthand.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);
		rihgthand.parent = this.rihgtlowerarm;
		rihgthand.locallyTranslate(new BABYLON.Vector3(0, -0.55, 0));

		this.leftleg = new BABYLON.MeshBuilder.CreateBox("leftupperleg", {width:0.5, height: 0.8, depth: 0.5}, this.Scene);
		this.leftleg.material = new BABYLON.StandardMaterial("leftupperlegm", this.Scene);
		this.leftleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.leftleg.parent = this.player;
    this.leftleg.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
		this.leftleg.locallyTranslate(new BABYLON.Vector3(-0.26, -2, 0));

		const leftkneel = new BABYLON.MeshBuilder.CreateBox("leftkneel", {width:0.5, height: 0.2, depth: 0.5}, this.Scene);
		leftkneel.material = new BABYLON.StandardMaterial("leftkneelm", this.Scene);
		leftkneel.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		leftkneel.parent = this.leftleg;
		leftkneel.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));

		const leftlowerleg = new BABYLON.MeshBuilder.CreateBox("leftlowerleg", {width:0.5, height: 0.6, depth: 0.5}, this.Scene);
		leftlowerleg.material = new BABYLON.StandardMaterial("leftlowerlegm", this.Scene);
		leftlowerleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		leftlowerleg.parent = this.leftleg;
		leftlowerleg.locallyTranslate(new BABYLON.Vector3(0, -0.9, 0));

		const leftfoot = new BABYLON.MeshBuilder.CreateBox("leftfoot", {width:0.5, height: 0.4, depth: 0.5}, this.Scene);
		leftfoot.material = new BABYLON.StandardMaterial("leftfootm", this.Scene);
		leftfoot.material.diffuseColor = new  BABYLON.Color3(0.1, 0.1, 0.1);
		leftfoot.parent = this.leftleg;
		leftfoot.locallyTranslate(new BABYLON.Vector3(0, -1.4, 0));

		this.rightleg = new BABYLON.MeshBuilder.CreateBox("rightupperleg", {width:0.5, height: 0.8, depth: 0.5}, this.Scene);
		this.rightleg.material = new BABYLON.StandardMaterial("rightupperlegm", this.Scene);
		this.rightleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		this.rightleg.parent = this.player;
		this.rightleg.locallyTranslate(new BABYLON.Vector3(0.26, -2, 0));

		const rightkneel = new BABYLON.MeshBuilder.CreateBox("rightkneel", {width:0.5, height: 0.2, depth: 0.5}, this.Scene);
		rightkneel.material = new BABYLON.StandardMaterial("rightkneelm", this.Scene);
		rightkneel.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		rightkneel.parent = this.rightleg;
		rightkneel.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));

		const rightlowerleg = new BABYLON.MeshBuilder.CreateBox("rightlowerleg", {width:0.5, height: 0.6, depth: 0.5}, this.Scene);
		rightlowerleg.material = new BABYLON.StandardMaterial("rightlowerlegm", this.Scene);
		rightlowerleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
		rightlowerleg.parent = this.rightleg;
		rightlowerleg.locallyTranslate(new BABYLON.Vector3(0, -0.9, 0));

		const rightfoot = new BABYLON.MeshBuilder.CreateBox("rightfoot", {width:0.5, height: 0.4, depth: 0.5}, this.Scene);
		rightfoot.material = new BABYLON.StandardMaterial("rightfootm", this.Scene);
		rightfoot.material.diffuseColor = new  BABYLON.Color3(0.1, 0.1, 0.1);
		rightfoot.parent = this.rightleg;
		rightfoot.locallyTranslate(new BABYLON.Vector3(0, -1.4, 0));
		this.player.setEnabled(false);
  }

  localAxes(size, shade) {
		const pilot_local_axisX = BABYLON.Mesh.CreateLines("pilot_local_axisX", [ 
				new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
				new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
		], this.Scene);
		pilot_local_axisX.color = new BABYLON.Color3(1, shade, shade);

		const pilot_local_axisY = BABYLON.Mesh.CreateLines("pilot_local_axisY", [
				new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
				new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
		], this.Scene);
		pilot_local_axisY.color = new BABYLON.Color3(shade, 1, shade);

		const pilot_local_axisZ = BABYLON.Mesh.CreateLines("pilot_local_axisZ", [
				new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
				new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
		], this.Scene);
		pilot_local_axisZ.color = new BABYLON.Color3(shade, shade, 1);

		const local_origin = BABYLON.MeshBuilder.CreateBox("local_origin", {size:1}, this.Scene);
		local_origin.isVisible = false;

		pilot_local_axisX.parent = local_origin;
		pilot_local_axisY.parent = local_origin;
		pilot_local_axisZ.parent = local_origin; 

		return local_origin;
	}

	holdGun() {
		this.leftarm.rotation.x = -Math.PI / 3;
		this.leftarm.rotation.y = Math.PI / 5;
		this.leftlowerarm.rotation.x = -Math.PI / 5;
		this.leftlowerarm.position.y -= 0.2;
		this.rihgtupperarm.rotation.x =  -Math.PI / 4;
		this.rihgtupperarm.rotation.y =  -Math.PI / 5;
		this.rihgtlowerarm.rotation.x = -Math.PI / 2;
		this.rihgtlowerarm.position.y -= 0.2;
	}

  run() {
    const run = new BABYLON.AnimationGroup("run");
    const frameRate = 5;

    const leftanime = new BABYLON.Animation("xSlide", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames = [];

    keyFrames.push({
        frame: 0,
        value: -Math.PI / 4,
    });

    keyFrames.push({
        frame: frameRate,
        value: Math.PI / 4,
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: -Math.PI / 4,
    });

    leftanime.setKeys(keyFrames);

    const rightanime = new BABYLON.Animation("xSlide", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const rightkeyFrames = [];

    rightkeyFrames.push({
        frame: 0,
        value: Math.PI / 4,
    });

    rightkeyFrames.push({
        frame: frameRate,
        value: -Math.PI / 4,
    });

    rightkeyFrames.push({
        frame: 2 * frameRate,
        value: Math.PI / 4,
    });

    rightanime.setKeys(rightkeyFrames);

    run.addTargetedAnimation(leftanime, this.leftleg);
    run.addTargetedAnimation(rightanime, this.rightleg);
    run.normalize(0, 2 * frameRate);
    run.play(true);
  }
}