"use strict";
(self["webpackChunkmetaverse"] = self["webpackChunkmetaverse"] || []).push([[279],{

/***/ 83:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144);



var Player = /*#__PURE__*/function () {
  function Player(x, y, z) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, Player);

    this._name = 'No Name';
    this._x = x;
    this._y = y;
    this._z = z;
    this._rotX = 0;
    this._rotY = 0;
    this._rotZ = 0;
    this._id;
    this._color;
    this._hitPoints = 100;
    this._isDead = false;
    this._height = 6;
    this._deaths = 0;
    this._kills = 0;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(Player, [{
    key: "setID",
    value: function setID(id) {
      this._id = id;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this._name = name;
    }
  }, {
    key: "setColor",
    value: function setColor(r, g, b) {
      this._color = {
        r: r,
        g: g,
        b: b
      };
    }
  }, {
    key: "setXYZ",
    value: function setXYZ(x, y, z) {
      this._x = x;
      this._y = y;
      this._z = z;
    }
  }, {
    key: "getXYZ",
    value: function getXYZ() {
      return {
        x: this._x,
        y: this._y,
        z: this._z
      };
    }
  }, {
    key: "setRotXYZ",
    value: function setRotXYZ(x, y, z) {
      this._rotX = x;
      this._rotY = y;
      this._rotZ = z;
    }
  }, {
    key: "hit",
    value: function hit() {
      this._hitPoints -= 19;

      if (this._hitPoints <= 0) {
        this._isDead = true;
      }

      return this._isDead;
    }
  }, {
    key: "setDead",
    value: function setDead(d) {
      this._isDead = d;
    }
  }, {
    key: "setHitPoints",
    value: function setHitPoints(h) {
      if (h > 100) h = 100;else if (h < 0) h = 0;
      this._hitPoints = h;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this._height;
    }
  }, {
    key: "getHitPoints",
    value: function getHitPoints() {
      return this._hitPoints;
    }
  }, {
    key: "isDead",
    value: function isDead() {
      return this._isDead;
    }
  }, {
    key: "addDeath",
    value: function addDeath() {
      this._deaths += 1;
    }
  }, {
    key: "addKill",
    value: function addKill() {
      this._kills += 1;
    }
  }]);

  return Player;
}();



/***/ }),

/***/ 552:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LocalPlayer)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(144);
/* harmony import */ var _weapon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(251);
/* harmony import */ var _playerMod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);





var LocalPlayer = /*#__PURE__*/function () {
  function LocalPlayer(scene, player) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(this, LocalPlayer);

    this.player = player;
    this.scene = scene;
    var gun = this.scene.gun.createInstance(this.player._id + 'gun');
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
    this.scene.camera.keysUp = [87]; // W

    this.scene.camera.keysDown = [83]; // S 

    this.scene.camera.keysLeft = [65]; // A

    this.scene.camera.keysRight = [68]; // D

    this.resetCameraCoordinates();
    this.initPhysics();
    this.lastPosition = new BABYLON.Vector3(this.scene.camera.position.x, this.scene.camera.position.y, this.scene.camera.position.z);
    this.lastRotation = new BABYLON.Vector3(this.scene.camera.rotation.x, this.scene.camera.rotation.y, this.scene.camera.rotation.z);
    this.bindEvent();
    this.weapon = new _weapon_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(scene, player, this.mesh);
    this.mesh.parent = this.scene.camera;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(LocalPlayer, [{
    key: "Update",
    value: function Update() {
      this.updatePosition();
      this.checkControls();
    }
  }, {
    key: "setColor",
    value: function setColor(r, g, b) {
      this.player._color = {
        r: r,
        g: g,
        b: b
      };
    }
  }, {
    key: "setXYZ",
    value: function setXYZ(x, y, z) {
      this.player._x = x;
      this.player._y = y;
      this.player._z = z;
    }
  }, {
    key: "setRotXYZ",
    value: function setRotXYZ(x, y, z) {
      this.player._rotX = x;
      this.player._rotY = y;
      this.player._rotZ = z;
    }
  }, {
    key: "hit",
    value: function hit() {
      this.player._hitPoints -= 19;

      if (this.player._hitPoints <= 0) {
        this.player._isDead = true;
      }

      return this.player._isDead;
    }
  }, {
    key: "setDead",
    value: function setDead(d) {
      this.player._isDead = d;
    }
  }, {
    key: "setHitPoints",
    value: function setHitPoints(h) {
      if (h > 100) h = 100;else if (h < 0) h = 0;
      this.player._hitPoints = h;
      Pannel.updateHealthBar(this.player.getHitPoints());
    }
  }, {
    key: "isDead",
    value: function isDead() {
      return this.player._isDead;
    }
  }, {
    key: "addDeath",
    value: function addDeath() {
      this.player._deaths += 1;
    }
  }, {
    key: "addKill",
    value: function addKill() {
      this.player._kills += 1;
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;

      window.addEventListener('keyup', function (event) {
        _this.onKeyUp(event);
      }, false);
      window.addEventListener('keydown', function (event) {
        _this.onKeyDown(event);
      }, false);
      window.addEventListener('pointerup', function (event) {
        event.keyCode = event.pointerId;

        _this.onKeyUp(event);
      }, false);
      window.addEventListener('pointerdown', function (event) {
        event.keyCode = event.pointerId;

        _this.onKeyDown(event);
      }, false);
    }
  }, {
    key: "initPhysics",
    value: function initPhysics() {
      this.scene.camera.checkCollisions = true;
      this.scene.camera.useOctreeForCollisions = true;
      this.scene.camera.applyGravity = true;
      this.scene.camera.ellipsoid = new BABYLON.Vector3(1, 2, 1); // this.scene.camera.ellipsoidOffset = new BABYLON.Vector3(0,2,0)
    }
  }, {
    key: "Create",
    value: function Create() {}
  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      this.scene.store.onKeyup(event);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      this.scene.store.onKeyDown(event);
    }
  }, {
    key: "gotKilled",
    value: function gotKilled(killer) {
      this.setDead(true);
      this.scene.camera.speed = 0;
    }
  }, {
    key: "resetCameraCoordinates",
    value: function resetCameraCoordinates() {
      this.scene.camera.position.x = this.player._x;
      this.scene.camera.position.y = this.player._y + 1;
      this.scene.camera.position.z = this.player._z;
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var xOffset = Math.abs(this.lastPosition.x - this.scene.camera.position.x);
      var yOffset = Math.abs(this.lastPosition.y - this.scene.camera.position.y);
      var zOffset = Math.abs(this.lastPosition.z - this.scene.camera.position.z);
      var xRotOffset = Math.abs(this.lastRotation.x - this.scene.camera.rotation.x);
      var yRotOffset = Math.abs(this.lastRotation.y - this.scene.camera.rotation.y);
      var zRotOffset = Math.abs(this.lastRotation.z - this.scene.camera.rotation.z);
      var posOffset = xOffset + yOffset + zOffset;
      var rotOffset = yRotOffset + xRotOffset + zRotOffset;

      if (posOffset > 0.1 || rotOffset > 0.01) {
        this.submitMovement();
      }
    }
  }, {
    key: "submitMovement",
    value: function submitMovement() {
      console.log('sub'); //this.mesh.position = new BABYLON.Vector3(this.scene.camera.position.x, this.scene.camera.position.y, this.scene.camera.position.z);
      //this.mesh.rotation.y = this.scene.camera.rotation.y;

      this.scene.controller.sendLocalPlayerMovement(this.scene.camera.position, this.scene.camera.rotation);
      this.lastPosition = new BABYLON.Vector3(this.scene.camera.position.x - 0.3, this.scene.camera.position.y - 0.5, this.scene.camera.position.z);
      this.lastRotation = new BABYLON.Vector3(this.scene.camera.rotation.x, this.scene.camera.rotation.y, this.scene.camera.rotation.z);
    }
  }, {
    key: "checkControls",
    value: function checkControls() {
      if (this.scene.store.isDown(this.scene.store.state.JUMP)) {
        if (!this.isJumping) {
          this.jump();
        }
      }

      if (this.scene.store.isDown(this.scene.store.state.FIRE)) {
        if (!this.player.isDead()) this.weapon.fire();
      }
    }
  }, {
    key: "jump",
    value: function jump() {
      var _this2 = this;

      this.isJumping = true;
      this.jumpUp = true;
      var cam = this.scene.camera;
      cam.animations = [];
      var a = new BABYLON.Animation('a', 'position.y', 3, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
      var keys = [];
      keys.push({
        frame: 0,
        value: cam.position.y
      });
      keys.push({
        frame: 3,
        value: cam.position.y + this.jumpHeight
      });
      a.setKeys(keys);
      var easingFunction = new BABYLON.CircleEase();
      easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
      a.setEasingFunction(easingFunction);
      cam.animations.push(a);
      this.scene.Scene.beginAnimation(cam, 0, 3, false, 1, function () {
        _this2.jumpUp = false;
      });
    }
  }, {
    key: "checkFreeFall",
    value: function checkFreeFall() {}
  }, {
    key: "checkJump",
    value: function checkJump() {
      var pos, heightOfTerrain, diff;

      if (this.isJumping && !this.jumpUp) {
        var bias = 0.08;
        pos = this.scene.camera.position;
        heightOfTerrain = this.scene.calcElevation(pos.x, pos.z);
        diff = pos.y - heightOfTerrain - bias;

        if (diff < this.player.getHeight()) {
          this.isJumping = false;
        }
      } else if (!this.isJumping && !this.jumpUp) {
        //On low fps, the camera can jump and basicly "ignore" the gravity which means the player can fly
        //To test against that affect this code is here, it checks if a player is off the ground without actually jumping and brings player back down
        pos = this.scene.camera.position;
        heightOfTerrain = this.scene.calcElevation(pos.x, pos.z);
        diff = pos.y - heightOfTerrain;

        if (diff > 0.5 + this.player.getHeight()) {
          this.scene.camera.position.y = heightOfTerrain + this.player.getHeight() + 0.1;
        }
      }
    }
  }, {
    key: "Destroy",
    value: function Destroy() {}
  }]);

  return LocalPlayer;
}();



/***/ }),

/***/ 2:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PlayerMod)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(861);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(757);





var PlayerMod = /*#__PURE__*/function () {
  function PlayerMod(scene, name) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(this, PlayerMod);

    this.Scene = scene;
    this.name = name;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(PlayerMod, [{
    key: "loadGun",
    value: function () {
      var _loadGun = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__.mark(function _callee() {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  window.BABYLON.SceneLoader.ImportMesh('', '/', "weapon_2.obj", _this.Scene, function (mesh) {
                    _this.gun = mesh[0];
                    _this.gun.isVisible = false;
                    _this.gun.material = new BABYLON.StandardMaterial("Mat", _this.Scene);
                    _this.gun.material.diffuseTexture = new BABYLON.Texture("/weapon_2.png", _this.Scene);
                    _this.gun.material.diffuseTexture.hasAlpha = true;
                    resolve(mesh);
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadGun() {
        return _loadGun.apply(this, arguments);
      }

      return loadGun;
    }()
  }, {
    key: "createPlayer",
    value: function createPlayer() {
      this.player = new BABYLON.TransformNode("pivot");
      this.player.isVisible = false;
      this.gun.parent = this.player;
      this.gun.rotation.y = -Math.PI / 2;
      this.gun.isVisible = true;
      this.gun.position.z -= 2;
      this.gun.position.x -= 0.5;
      this.gun.position.y -= 1; // const CoTAxis = this.localAxes(2, 0);
      // CoTAxis.parent = this.player;
      // this.player.position = new BABYLON.Vector3(0, 1, 0);

      var faceColors = []; // faceColors[0] = BABYLON.Color3.Blue();
      // faceColors[1] = BABYLON.Color3.White()
      // faceColors[2] = BABYLON.Color3.Red();
      // faceColors[3] = BABYLON.Color3.Black();
      // faceColors[4] = BABYLON.Color3.Green();
      // faceColors[5] = BABYLON.Color3.Yellow();

      this.head = new BABYLON.MeshBuilder.CreateBox(this.name, {
        width: 1,
        height: 0.8,
        faceColors: faceColors
      }, this.Scene);
      this.head.material = new BABYLON.StandardMaterial("headm", this.Scene); // head.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);

      this.head.parent = this.player;
      var indices = this.head.getIndices();
      var positions = this.head.getVerticesData(BABYLON.VertexBuffer.PositionKind);
      var colors = this.head.getVerticesData(BABYLON.VertexBuffer.ColorKind);
      var nbVertices = positions.length / 3;

      if (!colors) {
        colors = new Array(4 * nbVertices);
        colors = colors.fill(1);
      }

      var vertex;

      for (var i = 0; i < 6; i++) {
        vertex = indices[3 * 0 + i];
        colors[4 * vertex] = 1;
        colors[4 * vertex + 1] = 1;
        colors[4 * vertex + 2] = 0;
        colors[4 * vertex + 3] = 1;
      }

      this.head.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors); // head.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))

      this.head.locallyTranslate(new BABYLON.Vector3(0, 0.4, 0));
      ;
      var hair = new BABYLON.MeshBuilder.CreateBox(this.name, {
        width: 1,
        height: 0.2
      }, this.Scene);
      hair.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.1, 0));
      hair.parent = this.head;
      hair.locallyTranslate(new BABYLON.Vector3(0, 0.5, 0));
      ;
      hair.material = new BABYLON.StandardMaterial(this.name, this.Scene);
      hair.material.diffuseColor = new BABYLON.Color3(0.61, 0.23, 0.29);
      this.body = new BABYLON.MeshBuilder.CreateBox(this.name, {
        width: 1.2,
        height: 1.2,
        depth: 0.5
      }, this.Scene);
      this.body.parent = this.player;
      this.body.material = new BABYLON.StandardMaterial("bodym", this.Scene);
      this.body.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.body.locallyTranslate(new BABYLON.Vector3(0, -0.6, 0));
      var but = new BABYLON.MeshBuilder.CreateBox("but", {
        width: 1.25,
        height: 0.4,
        depth: 0.55
      }, this.Scene);
      but.parent = this.body;
      but.material = new BABYLON.StandardMaterial("butm", this.Scene);
      but.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
      but.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));
      this.leftarm = new BABYLON.MeshBuilder.CreateBox("leftupperarm", {
        width: 0.4,
        height: 0.8,
        depth: 0.4
      }, this.Scene);
      this.leftarm.material = new BABYLON.StandardMaterial("leftupperarmm", this.Scene);
      this.leftarm.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.leftarm.parent = this.player;
      this.leftarm.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.4, 0));
      this.leftarm.locallyTranslate(new BABYLON.Vector3(-0.9, -0.4, 0));
      this.leftelbow = new BABYLON.MeshBuilder.CreateBox("leftelbow", {
        width: 0.4,
        height: 0.2,
        depth: 0.4
      }, this.Scene);
      this.leftelbow.material = new BABYLON.StandardMaterial("leftelbowm", this.Scene);
      this.leftelbow.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.leftelbow.parent = this.leftarm;
      this.leftelbow.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));
      this.leftlowerarm = new BABYLON.MeshBuilder.CreateBox("leftlowerarm", {
        width: 0.4,
        height: 0.8,
        depth: 0.4
      }, this.Scene);
      this.leftlowerarm.material = new BABYLON.StandardMaterial("leftlowerarmm", this.Scene);
      this.leftlowerarm.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.leftlowerarm.parent = this.leftarm;
      this.leftlowerarm.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.4, 0));
      this.leftlowerarm.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));
      var leftwaist = new BABYLON.MeshBuilder.CreateBox("leftwaist", {
        width: 0.44,
        height: 0.1,
        depth: 0.44
      }, this.Scene);
      leftwaist.material = new BABYLON.StandardMaterial("leftwaistm", this.Scene);
      leftwaist.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      leftwaist.parent = this.leftlowerarm;
      leftwaist.locallyTranslate(new BABYLON.Vector3(0, -0.4, 0));
      var lefthand = new BABYLON.MeshBuilder.CreateBox("lefthand", {
        width: 0.4,
        height: 0.2,
        depth: 0.4
      }, this.Scene);
      lefthand.material = new BABYLON.StandardMaterial("lefthandm", this.Scene);
      lefthand.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);
      lefthand.parent = this.leftlowerarm;
      lefthand.locallyTranslate(new BABYLON.Vector3(0, -0.55, 0));
      this.rihgtupperarm = new BABYLON.MeshBuilder.CreateBox("rihgtupperarm", {
        width: 0.4,
        height: 0.8,
        depth: 0.4
      }, this.Scene);
      this.rihgtupperarm.material = new BABYLON.StandardMaterial("rihgtupperarmm", this.Scene);
      this.rihgtupperarm.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.rihgtupperarm.parent = this.player;
      this.rihgtupperarm.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.4, 0));
      this.rihgtupperarm.locallyTranslate(new BABYLON.Vector3(0.9, -0.4, 0));
      var rihgtelbow = new BABYLON.MeshBuilder.CreateBox("rihgtelbow", {
        width: 0.4,
        height: 0.2,
        depth: 0.4
      }, this.Scene);
      rihgtelbow.material = new BABYLON.StandardMaterial("rihgtelbowm", this.Scene);
      rihgtelbow.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      rihgtelbow.parent = this.rihgtupperarm;
      rihgtelbow.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));
      this.rihgtlowerarm = new BABYLON.MeshBuilder.CreateBox("rihgtlowerarm", {
        width: 0.4,
        height: 0.8,
        depth: 0.4
      }, this.Scene);
      this.rihgtlowerarm.material = new BABYLON.StandardMaterial("rihgtlowerarmm", this.Scene);
      this.rihgtlowerarm.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.rihgtlowerarm.parent = this.rihgtupperarm;
      this.rihgtlowerarm.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.4, 0));
      this.rihgtlowerarm.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));
      var rihgtwaist = new BABYLON.MeshBuilder.CreateBox("rihgtwaist", {
        width: 0.44,
        height: 0.1,
        depth: 0.44
      }, this.Scene);
      rihgtwaist.material = new BABYLON.StandardMaterial("rihgtwaistm", this.Scene);
      rihgtwaist.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      rihgtwaist.parent = this.rihgtlowerarm;
      rihgtwaist.locallyTranslate(new BABYLON.Vector3(0, -0.4, 0));
      var rihgthand = new BABYLON.MeshBuilder.CreateBox("rihgthand", {
        width: 0.4,
        height: 0.2,
        depth: 0.4
      }, this.Scene);
      rihgthand.material = new BABYLON.StandardMaterial("rihgthandm", this.Scene);
      rihgthand.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);
      rihgthand.parent = this.rihgtlowerarm;
      rihgthand.locallyTranslate(new BABYLON.Vector3(0, -0.55, 0));
      this.leftleg = new BABYLON.MeshBuilder.CreateBox("leftupperleg", {
        width: 0.5,
        height: 0.8,
        depth: 0.5
      }, this.Scene);
      this.leftleg.material = new BABYLON.StandardMaterial("leftupperlegm", this.Scene);
      this.leftleg.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.leftleg.parent = this.player;
      this.leftleg.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.4, 0));
      this.leftleg.locallyTranslate(new BABYLON.Vector3(-0.26, -2, 0));
      var leftkneel = new BABYLON.MeshBuilder.CreateBox("leftkneel", {
        width: 0.5,
        height: 0.2,
        depth: 0.5
      }, this.Scene);
      leftkneel.material = new BABYLON.StandardMaterial("leftkneelm", this.Scene);
      leftkneel.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      leftkneel.parent = this.leftleg;
      leftkneel.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));
      var leftlowerleg = new BABYLON.MeshBuilder.CreateBox("leftlowerleg", {
        width: 0.5,
        height: 0.6,
        depth: 0.5
      }, this.Scene);
      leftlowerleg.material = new BABYLON.StandardMaterial("leftlowerlegm", this.Scene);
      leftlowerleg.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      leftlowerleg.parent = this.leftleg;
      leftlowerleg.locallyTranslate(new BABYLON.Vector3(0, -0.9, 0));
      var leftfoot = new BABYLON.MeshBuilder.CreateBox("leftfoot", {
        width: 0.5,
        height: 0.4,
        depth: 0.5
      }, this.Scene);
      leftfoot.material = new BABYLON.StandardMaterial("leftfootm", this.Scene);
      leftfoot.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
      leftfoot.parent = this.leftleg;
      leftfoot.locallyTranslate(new BABYLON.Vector3(0, -1.4, 0));
      this.rightleg = new BABYLON.MeshBuilder.CreateBox("rightupperleg", {
        width: 0.5,
        height: 0.8,
        depth: 0.5
      }, this.Scene);
      this.rightleg.material = new BABYLON.StandardMaterial("rightupperlegm", this.Scene);
      this.rightleg.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      this.rightleg.parent = this.player;
      this.rightleg.locallyTranslate(new BABYLON.Vector3(0.26, -2, 0));
      var rightkneel = new BABYLON.MeshBuilder.CreateBox("rightkneel", {
        width: 0.5,
        height: 0.2,
        depth: 0.5
      }, this.Scene);
      rightkneel.material = new BABYLON.StandardMaterial("rightkneelm", this.Scene);
      rightkneel.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      rightkneel.parent = this.rightleg;
      rightkneel.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));
      var rightlowerleg = new BABYLON.MeshBuilder.CreateBox("rightlowerleg", {
        width: 0.5,
        height: 0.6,
        depth: 0.5
      }, this.Scene);
      rightlowerleg.material = new BABYLON.StandardMaterial("rightlowerlegm", this.Scene);
      rightlowerleg.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      rightlowerleg.parent = this.rightleg;
      rightlowerleg.locallyTranslate(new BABYLON.Vector3(0, -0.9, 0));
      var rightfoot = new BABYLON.MeshBuilder.CreateBox("rightfoot", {
        width: 0.5,
        height: 0.4,
        depth: 0.5
      }, this.Scene);
      rightfoot.material = new BABYLON.StandardMaterial("rightfootm", this.Scene);
      rightfoot.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
      rightfoot.parent = this.rightleg;
      rightfoot.locallyTranslate(new BABYLON.Vector3(0, -1.4, 0));
      this.player.setEnabled(false);
    }
  }, {
    key: "localAxes",
    value: function localAxes(size, shade) {
      var pilot_local_axisX = BABYLON.Mesh.CreateLines("pilot_local_axisX", [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)], this.Scene);
      pilot_local_axisX.color = new BABYLON.Color3(1, shade, shade);
      var pilot_local_axisY = BABYLON.Mesh.CreateLines("pilot_local_axisY", [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)], this.Scene);
      pilot_local_axisY.color = new BABYLON.Color3(shade, 1, shade);
      var pilot_local_axisZ = BABYLON.Mesh.CreateLines("pilot_local_axisZ", [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)], this.Scene);
      pilot_local_axisZ.color = new BABYLON.Color3(shade, shade, 1);
      var local_origin = BABYLON.MeshBuilder.CreateBox("local_origin", {
        size: 1
      }, this.Scene);
      local_origin.isVisible = false;
      pilot_local_axisX.parent = local_origin;
      pilot_local_axisY.parent = local_origin;
      pilot_local_axisZ.parent = local_origin;
      this.player.position.y = 0;
      return local_origin;
    }
  }, {
    key: "holdGun",
    value: function holdGun() {
      this.leftarm.rotation.x = -Math.PI / 3;
      this.leftarm.rotation.y = Math.PI / 5;
      this.leftlowerarm.rotation.x = -Math.PI / 5;
      this.leftlowerarm.position.y -= 0.2;
      this.rihgtupperarm.rotation.x = -Math.PI / 4;
      this.rihgtupperarm.rotation.y = -Math.PI / 5;
      this.rihgtlowerarm.rotation.x = -Math.PI / 2;
      this.rihgtlowerarm.position.y -= 0.2;
    }
  }, {
    key: "run",
    value: function run() {
      var run = new BABYLON.AnimationGroup("run");
      var frameRate = 5;
      var leftanime = new BABYLON.Animation("xSlide", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
      var keyFrames = [];
      keyFrames.push({
        frame: 0,
        value: -Math.PI / 4
      });
      keyFrames.push({
        frame: frameRate,
        value: Math.PI / 4
      });
      keyFrames.push({
        frame: 2 * frameRate,
        value: -Math.PI / 4
      });
      leftanime.setKeys(keyFrames);
      var rightanime = new BABYLON.Animation("xSlide", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
      var rightkeyFrames = [];
      rightkeyFrames.push({
        frame: 0,
        value: Math.PI / 4
      });
      rightkeyFrames.push({
        frame: frameRate,
        value: -Math.PI / 4
      });
      rightkeyFrames.push({
        frame: 2 * frameRate,
        value: Math.PI / 4
      });
      rightanime.setKeys(rightkeyFrames);
      run.addTargetedAnimation(leftanime, this.leftleg);
      run.addTargetedAnimation(rightanime, this.rightleg);
      run.normalize(0, 2 * frameRate);
      run.play(true);
    }
  }, {
    key: "clone",
    value: function clone() {
      this.player = this.player.clone();
      return this;
    }
  }]);

  return PlayerMod;
}();



/***/ }),

/***/ 75:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ remotePlayer)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(144);
/* harmony import */ var _weapon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(251);
/* harmony import */ var _playerMod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);





var remotePlayer = /*#__PURE__*/function () {
  function remotePlayer(scene, player) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(this, remotePlayer);

    console.log('add remote');
    this.player = player;
    this.scene = scene;
    var gun = this.scene.gun.createInstance(this.player._id + 'gun');
    var p = new _playerMod_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(this.scene.Scene, this.player._id);
    p.gun = gun;
    p.createPlayer();
    p.holdGun();
    p.run();
    p.head.name = this.player._id;
    this.mesh = p;
    this.mesh.player.setEnabled(true);
    this.mesh.player.name = player._id;
    this.mesh.player.position.x = player._x;
    this.mesh.player.position.y = player._y;
    this.mesh.player.position.z = player._z; // this.scene.shadowGenerator.getShadowMap().renderList.push(this.mesh.player);

    this.weapon = new _weapon_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(scene, player, this.mesh.gun);
    this.mesh.checkCollisions = true;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(remotePlayer, [{
    key: "Update",
    value: function Update() {}
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      window.addEventListener('keyup', event);
    }
  }, {
    key: "Create",
    value: function Create() {}
  }, {
    key: "move",
    value: function move(pos, rot) {
      console.log('move');
      console.log(pos);
      this.mesh.player.position = new BABYLON.Vector3(pos.x, pos.y, pos.z);
      this.mesh.player.rotation.y = rot.y;
      this.mesh.run();
    }
  }, {
    key: "gotKilled",
    value: function gotKilled(killer) {
      this.setDead(true);
      this.scene.camera.speed = 0;
    }
  }, {
    key: "resetCameraCoordinates",
    value: function resetCameraCoordinates() {
      this.scene.camera.position.x = this._x;
      this.scene.camera.position.y = this._y;
      this.scene.camera.position.z = this._z;
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var xOffset = Math.asb(this.last);
    }
  }, {
    key: "submitMovement",
    value: function submitMovement() {}
  }, {
    key: "checkControls",
    value: function checkControls() {}
  }, {
    key: "checkFreeFall",
    value: function checkFreeFall() {}
  }, {
    key: "checkJump",
    value: function checkJump() {}
  }, {
    key: "Destroy",
    value: function Destroy() {
      this.mesh.player.dispose();
    }
  }]);

  return remotePlayer;
}();



/***/ }),

/***/ 251:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Weapon)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(144);



var Weapon = /*#__PURE__*/function () {
  function Weapon(scene, player, mesh) {
    var _this = this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, Weapon);

    this.scene = scene;
    this.player = player;
    this.mesh = mesh; //const wp = this.scene.gun.createInstance(player._id);
    //   console.log(wp)
    //   wp.isVisible = true;
    //   wp.rotationQuaternion = null;
    //   wp.parent = parent;
    //   wp.position = new BABYLON.Vector3(-0.2,-1.2,2); 
    //  // wp.rotation.x = -Math.PI/2;
    //   wp.rotation.y = -Math.PI / 2;
    //   this.mesh = wp;

    this._initialRotation = this.mesh.rotation.clone();
    this.ammoSize = 14;
    this.currentAmmo = this.ammoSize;
    this.fireRate = 250.0;
    this._currentFireRate = this.fireRate;
    this.canFire = true;
    this.reloading = false;
    this.scene.Scene.registerBeforeRender(function () {
      if (!_this.canFire) {
        _this._currentFireRate -= _this.scene.engine.getDeltaTime();

        if (_this._currentFireRate <= 0 && !_this.reloading) {
          _this.canFire = true;
          _this._currentFireRate = _this.fireRate;
        }
      }
    });
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(Weapon, [{
    key: "reload",
    value: function reload() {
      var _this2 = this;

      if (!this.reloading) {
        this.canFire = false;
        this.reloading = true;
        this.animateReload();
        setTimeout(function () {
          _this2.currentAmmo = _this2.ammoSize;
          _this2.canFire = true;
          _this2.reloading = false;
        }, 800);
      }
    }
  }, {
    key: "fire",
    value: function fire() {
      if (this.canFire) {
        if (this.currentAmmo != 0) {
          this.scene.sound.gunFire();
          var width = window.innerWidth;
          var height = window.innerHeight;
          console.log(width);
          console.log(height);
          var pickResult = this.scene.Scene.pick(width / 2, height / 2, null, false, this.scene.camera);

          if (pickResult.pickedMesh) {
            console.log(pickResult.pickedMesh.name);

            for (var i = 0; i < this.scene.store.state.remotePlayers.length; i++) {
              console.log(this.scene.store.state.remotePlayers[i].player);

              if (pickResult.pickedMesh.name === this.scene.store.state.remotePlayers[i].player._id) {
                this.scene.controller.hitPlayer(this.scene.store.state.remotePlayers[i].player);
              }
            }

            if (pickResult.pickedMesh.name != 'skyBox') {// this.drawImpact(pickResult.pickedPoint);
            }
          }

          this.scene.controller.shotFired(); // this.currentAmmo -= 1;
        } else {// 空枪
        }

        this.animate();
        this.canFire = false;
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      var start = this._initialRotation.clone();

      var end = start.clone();
      end.x += Math.PI / 100; // Create the Animation object

      var display = new BABYLON.Animation("fire", "rotation", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT); // Animations keys

      var keys = [{
        frame: 0,
        value: start
      }, {
        frame: 10,
        value: end
      }, {
        frame: 100,
        value: start
      }]; // Add these keys to the animation

      display.setKeys(keys); // Link the animation to the mesh

      this.mesh.animations.push(display);
      this.scene.Scene.beginAnimation(this.mesh, 0, 100, false, 10, function () {});
    }
  }, {
    key: "drawImpact",
    value: function drawImpact(position) {
      var impact = BABYLON.MeshBuilder.CreatePlane('impact', {
        size: 1
      }, this.scene.Scene);
      impact.rotation.x = Math.PI / 2;
      impact.material = new BABYLON.StandardMaterial('impactMat', this.scene.Scene);
      impact.material.diffuseTexture = new BABYLON.Texture("/impact.png", this.scene.Scene);
      impact.material.diffuseTexture.hasAlpha = true;
      impact.position = position;
    }
  }, {
    key: "animateReload",
    value: function animateReload() {// 播放动画
    }
  }]);

  return Weapon;
}();



/***/ }),

/***/ 919:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ BabylonScene)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(861);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(144);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(757);
/* harmony import */ var _controller_controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(249);
/* harmony import */ var _controller_sound_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(268);
/* harmony import */ var _store_initData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(842);








var BabylonScene = /*#__PURE__*/function () {
  function BabylonScene(engine, canvas, store) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(this, BabylonScene);

    this.canvas = canvas;
    this.store = store;
    this.boxes = [];
    this.engine = engine;
    this.Scene = new BABYLON.Scene(engine);
    this.controller = new _controller_controller_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(this);
    this.sound = new _controller_sound_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(this.Scene);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(BabylonScene, [{
    key: "Create",
    value: function Create() {
      this.initCamera();
      this.loadLight();
      this.loadPhysics();
      this.initSky();
      this.loadGround(); // this.loadBoxes();

      this.loadGun().then(function () {// this.loadSolider()
      });
    }
  }, {
    key: "initCamera",
    value: function initCamera() {
      this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1.5, 7), this.Scene);
      this.camera.setTarget(new BABYLON.Vector3(0, 0, -1));
      this.camera.attachControl(this.canvas, false);
      this.Scene.activeCameras.push(this.camera); // this.camera2 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(10, 1, 0), this.Scene);
      // this.camera2.setTarget(new BABYLON.Vector3(0, 1, 0))
      // this.camera2.attachControl(this.canvas, false);
      // this.camera2.inputs.addMouseWheel();
      // this.Scene.activeCameras.push(this.camera2)
      // this.camera.viewport = new BABYLON.Viewport(0.5,0,0.5,1)
      // this.camera2.viewport = new BABYLON.Viewport(0,0,0.5,1)
    }
  }, {
    key: "initSky",
    value: function initSky() {
      BABYLON.Engine.ShadersRepository = "../shaders/";
      var skybox = BABYLON.MeshBuilder.CreateSphere("skyBox", {
        segments: 10,
        diameter: 2500
      }, this.Scene);
      var shader = new BABYLON.ShaderMaterial("gradient", this.Scene, "gradient", {});
      shader.setFloat("offset", 0);
      shader.setFloat("exponent", 0.6);
      shader.setColor3("topColor", BABYLON.Color3.FromInts(0, 119, 255));
      shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240, 240, 255));
      shader.backFaceCulling = false;
      skybox.material = shader; //Create Fog  

      this.Scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
      this.Scene.fogDensity = 0.003;
      this.Scene.fogColor = new BABYLON.Color3(0.8, 0.83, 0.8);
    }
  }, {
    key: "loadGround",
    value: function loadGround() {
      this.groundDivs = 64;
      this.tileSize = 1000;
      this.bottomPoint = -15;
      this.topPoint = 1;
      this.ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', '/map.jpg', {
        width: this.tileSize,
        height: this.tileSize,
        subdivisions: this.subdivisions,
        minHeight: this.bottomPoint,
        maxHeight: this.topPoint,
        updatable: true
      }, this.Scene);
      var groundMaterial1 = new BABYLON.StandardMaterial("groundMat", this.Scene);
      groundMaterial1.diffuseTexture = new BABYLON.Texture("/gras1.jpg", this.Scene);
      groundMaterial1.diffuseTexture.uScale = 10.0;
      groundMaterial1.diffuseTexture.vScale = 10.0;
      this.ground.material = groundMaterial1;
      this.ground.receiveShadows = true;
      this.ground.checkCollisions = true;
      this.shadowGenerator.getShadowMap().renderList.push(this.ground); // this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this.Scene); 
    }
  }, {
    key: "calcElevation",
    value: function calcElevation(x, z) {
      var ray = new BABYLON.Ray(new BABYLON.Vector3(0, this.topPoint + 10, 0), new BABYLON.Vector3(0, this.bottomPoint - 10, 0), this.topPoint - this.bottomPoint + 20);
      ray.origin.x = x;
      ray.origin.z = z;
      var i = this.ground.intersects(ray);

      if (!i || !i.pickedPoint) {
        return false;
      }

      return i.pickedPoint.y;
    }
  }, {
    key: "loadGun",
    value: function () {
      var _loadGun = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__.mark(function _callee() {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  window.BABYLON.SceneLoader.ImportMesh('', '/', "weapon_2.obj", _this.Scene, function (mesh) {
                    _this.gun = mesh[0];

                    _this.gun.setEnabled(false);

                    _this.gun.isVisible = false;
                    _this.gun.material = new BABYLON.StandardMaterial("Mat", _this.Scene);
                    _this.gun.material.diffuseTexture = new BABYLON.Texture("/weapon_2.png", _this.Scene);
                    _this.gun.material.diffuseTexture.hasAlpha = true;
                    resolve(mesh);
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadGun() {
        return _loadGun.apply(this, arguments);
      }

      return loadGun;
    }()
  }, {
    key: "loadSolider",
    value: function loadSolider() {
      var soldier = new BABYLON.MeshBuilder.CreateBox("soldier", {
        size: 8
      }, this.Scene);
      soldier.material = new BABYLON.StandardMaterial("Mat1", this.Scene);
      soldier.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
      this.soldier = soldier;
      this.soldier.isVisible = false;
      this.soldier.position = new BABYLON.Vector3(0, 0, 0);
    }
  }, {
    key: "loadPhysics",
    value: function loadPhysics() {
      // const gravityVector = new BABYLON.Vector3(0,-9.81, 0);
      // const physicsPlugin = new BABYLON.CannonJSPlugin();
      // this.Scene.enablePhysics(gravityVector, physicsPlugin);
      // this.Scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin())
      this.Scene.gravity = new BABYLON.Vector3(0, -0.04, 0);
      this.Scene.collisionsEnabled = true;
    }
  }, {
    key: "loadBoxes",
    value: function loadBoxes() {
      var box = new BABYLON.MeshBuilder.CreateBox("crate", {
        size: 8
      }, this.Scene);
      box.material = new BABYLON.StandardMaterial("Mat", this.Scene);
      box.material.diffuseTexture = new BABYLON.Texture("/crate.jpg", this.Scene);
      box.material.diffuseTexture.hasAlpha = true;
      box.position = new BABYLON.Vector3(10, 0, 10);
      box.receiveShadows = true;
      this.shadowGenerator.getShadowMap().renderList.push(box);
      box.checkCollisions = true;
      this.boxes.push(box); //this.box.position.y = this.render.terrain.calcElevation(5, 10) + 5;

      for (var i = 0; i < _store_initData_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].boxSize */ .Z.boxSize; i++) {
        var clone = box.createInstance("box" + i);
        clone.type = 'box';
        clone.position.x = _store_initData_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].boxPosition */ .Z.boxPosition[i * 2];
        clone.position.z = _store_initData_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].boxPosition */ .Z.boxPosition[i * 2 + 1];
        clone.rotation.y = _store_initData_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].boxRotation */ .Z.boxRotation[i]; //Add Lights and Physics

        this.shadowGenerator.getShadowMap().renderList.push(clone);
        clone.checkCollisions = true; // clone.physicsImpostor = new BABYLON.PhysicsImpostor(clone, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1 }, this.Scene);

        this.boxes.push(clone);
      }
    }
  }, {
    key: "loadLight",
    value: function loadLight() {
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
  }, {
    key: "Update",
    value: function Update() {
      this.render();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {}
  }, {
    key: "loadLocalPlayer",
    value: function loadLocalPlayer() {}
  }, {
    key: "loadOponent",
    value: function loadOponent() {}
  }, {
    key: "render",
    value: function render() {
      this.Scene.render();

      if (this.load) {
        this.controller.Update();
      }
    }
  }, {
    key: "resize",
    value: function resize() {}
  }, {
    key: "Destroy",
    value: function Destroy() {}
  }]);

  return BabylonScene;
}();



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWQsR0FBMEIsR0FBMUI7TUFDRixLQUFLbEIsZUFBTCxHQUF1QixJQUFJOU8sT0FBTyxDQUFDcVEsZUFBWixDQUE0QixJQUE1QixFQUFrQyxLQUFLSixRQUF2QyxDQUF2QjtNQUNFLEtBQUtuQixlQUFMLENBQXFCd0Isb0JBQXJCLEdBQTRDLEtBQTVDO0lBQ0Y7OztXQUVELGtCQUFTO01BQ1IsS0FBS0MsTUFBTDtJQUNBOzs7V0FFRCxxQkFBWSxDQUVYOzs7V0FFRCwyQkFBaUIsQ0FFaEI7OztXQUVELHVCQUFjLENBRWI7OztXQUVELGtCQUFTO01BQ1IsS0FBS3ZNLEtBQUwsQ0FBV3VNLE1BQVg7O01BQ0EsSUFBRyxLQUFLQyxJQUFSLEVBQWE7UUFDWixLQUFLbE8sVUFBTCxDQUFnQm1PLE1BQWhCO01BQ0E7SUFDRDs7O1dBRUQsa0JBQVMsQ0FFUjs7O1dBRUQsbUJBQVUsQ0FFVCIsInNvdXJjZXMiOlsid2VicGFjazovL21ldGF2ZXJzZS8uL3NyYy9tb2RlbHMvUGxheWVyLmpzIiwid2VicGFjazovL21ldGF2ZXJzZS8uL3NyYy9tb2RlbHMvbG9jYWxQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL21vZGVscy9wbGF5ZXJNb2QuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL21vZGVscy9yZW1vdGVQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL21vZGVscy93ZWFwb24uanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL3NjZW5lcy9iYWJ5bG9uU2NlbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcblx0Y29uc3RydWN0b3IoXG5cdFx0eCwgeSwgelxuXHQpIHtcblx0XHR0aGlzLl9uYW1lID0gJ05vIE5hbWUnO1xuXHRcdHRoaXMuX3ggPSB4O1xuXHRcdHRoaXMuX3kgPSB5O1xuXHRcdHRoaXMuX3ogPSB6O1xuXHRcdHRoaXMuX3JvdFggPSAwO1xuXHRcdHRoaXMuX3JvdFkgPSAwO1xuXHRcdHRoaXMuX3JvdFogPSAwO1xuXHRcdHRoaXMuX2lkO1xuXHRcdHRoaXMuX2NvbG9yO1xuXHRcdHRoaXMuX2hpdFBvaW50cyA9IDEwMDtcblx0XHR0aGlzLl9pc0RlYWQgPSBmYWxzZTtcblx0XHR0aGlzLl9oZWlnaHQgPSA2O1xuXG5cdFx0dGhpcy5fZGVhdGhzID0gMDtcblx0XHR0aGlzLl9raWxscyA9IDA7XG5cdH1cblxuXHRzZXRJRChpZCkge1xuXHRcdHRoaXMuX2lkID0gaWQ7XG5cdH1cblxuXHRzZXROYW1lKG5hbWUpIHtcblx0XHR0aGlzLl9uYW1lID0gbmFtZTtcblx0fVxuXG5cdHNldENvbG9yKHIsZyxiKSB7XG5cdFx0dGhpcy5fY29sb3IgPSB7XG5cdFx0XHRyLGcsYlxuXHRcdH1cblx0fVxuXG5cdHNldFhZWih4LCB5LCB6KSB7XG5cdFx0dGhpcy5feCA9IHg7XG5cdFx0dGhpcy5feSA9IHk7XG5cdFx0dGhpcy5feiA9IHo7XG5cdH1cblxuXHRnZXRYWVooKSB7XG5cdFx0cmV0dXJuIHt4IDogdGhpcy5feCwgeSA6IHRoaXMuX3kgLCB6IDogdGhpcy5fen07XG5cdH1cblxuXHRzZXRSb3RYWVooeCwgeSwgeikge1xuXHRcdHRoaXMuX3JvdFggPSB4O1xuXHRcdHRoaXMuX3JvdFkgPSB5O1xuXHRcdHRoaXMuX3JvdFogPSB6O1xuXHR9XG5cblx0aGl0KCkge1xuXHRcdHRoaXMuX2hpdFBvaW50cyAtPSAxOTtcblx0XHRpZih0aGlzLl9oaXRQb2ludHMgPD0gMCl7XG5cdFx0XHR0aGlzLl9pc0RlYWQgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5faXNEZWFkO1xuXHR9XG5cblx0c2V0RGVhZChkKSB7XG5cdFx0dGhpcy5faXNEZWFkID0gZDtcblx0fVxuXG5cdHNldEhpdFBvaW50cyhoKSB7XG5cdFx0aWYoaCA+IDEwMCkgaCA9IDEwMDtcblx0XHRlbHNlIGlmKGggPCAwKSBoID0gMDtcblx0XHR0aGlzLl9oaXRQb2ludHMgPSBoO1xuXHR9XG5cblx0Z2V0SGVpZ2h0KCkge1xuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblxuXHRnZXRIaXRQb2ludHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpdFBvaW50cztcblx0fVxuXG5cdGlzRGVhZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNEZWFkO1xuXHR9XG5cblx0YWRkRGVhdGgoKSB7XG5cdFx0dGhpcy5fZGVhdGhzICs9IDE7XG5cdH1cblxuXHRhZGRLaWxsKCkge1xuXHRcdHRoaXMuX2tpbGxzICs9IDE7XG5cdH1cbn0iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vd2VhcG9uLmpzJztcbmltcG9ydCBQbGF5ZXJNb2QgZnJvbSAnLi9wbGF5ZXJNb2QuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxQbGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRzY2VuZSwgcGxheWVyXG5cdCkge1xuXHRcdHRoaXMucGxheWVyID0gcGxheWVyO1xuXHRcdHRoaXMuc2NlbmUgPSBzY2VuZTtcblx0XHRjb25zdCBndW4gPSB0aGlzLnNjZW5lLmd1bi5jcmVhdGVJbnN0YW5jZSh0aGlzLnBsYXllci5faWQgKyAnZ3VuJyk7XG5cdFx0Z3VuLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDI7XG5cdFx0Z3VuLmlzVmlzaWJsZSA9IHRydWU7XG5cdFx0Z3VuLnBvc2l0aW9uLnogLT0gMjtcblx0XHRndW4ucG9zaXRpb24ueCAtPSAwLjU7XG5cdFx0Z3VuLnBvc2l0aW9uLnkgLT0gMTtcblx0XHR0aGlzLmNhbWVyYVNwZWVkID0gMC42O1xuXHRcdHRoaXMuanVtcEhlaWdodCA9IDIuNTtcblx0XHR0aGlzLm1lc2ggPSBndW47XG5cdFx0dGhpcy5qdW1wVXAgPSBmYWxzZTtcblx0XHR0aGlzLmlzSnVtcGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnNwZWVkID0gdGhpcy5jYW1lcmFTcGVlZDtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5rZXlzVXAgPSBbODddIC8vIFdcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5rZXlzRG93biA9IFs4M107IC8vIFMgXG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEua2V5c0xlZnQgPSBbNjVdOyAvLyBBXG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEua2V5c1JpZ2h0ID0gWzY4XTsgLy8gRFxuXHRcdHRoaXMucmVzZXRDYW1lcmFDb29yZGluYXRlcygpO1xuXHRcdHRoaXMuaW5pdFBoeXNpY3MoKTtcblxuXHRcdHRoaXMubGFzdFBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyh0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi54LCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55LCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56KVxuXHRcdHRoaXMubGFzdFJvdGF0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyh0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi54LCB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi55LCB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi56KVxuXHRcdFxuXHRcdHRoaXMuYmluZEV2ZW50KClcblx0XHR0aGlzLndlYXBvbiA9IG5ldyBXZWFwb24oc2NlbmUsIHBsYXllciwgdGhpcy5tZXNoKTtcblx0XHR0aGlzLm1lc2gucGFyZW50ID0gdGhpcy5zY2VuZS5jYW1lcmE7XG5cdH1cblxuXHRVcGRhdGUoKSB7XG5cdFx0dGhpcy51cGRhdGVQb3NpdGlvbigpXG5cdFx0dGhpcy5jaGVja0NvbnRyb2xzKCk7XG5cdH1cblx0c2V0Q29sb3IocixnLGIpIHtcblx0XHR0aGlzLnBsYXllci5fY29sb3IgPSB7XG5cdFx0XHRyLGcsYlxuXHRcdH1cblx0fVxuXG5cdHNldFhZWih4LCB5LCB6KSB7XG5cdFx0dGhpcy5wbGF5ZXIuX3ggPSB4O1xuXHRcdHRoaXMucGxheWVyLl95ID0geTtcblx0XHR0aGlzLnBsYXllci5feiA9IHo7XG5cdH1cblxuXHRzZXRSb3RYWVooeCwgeSwgeikge1xuXHRcdHRoaXMucGxheWVyLl9yb3RYID0geDtcblx0XHR0aGlzLnBsYXllci5fcm90WSA9IHk7XG5cdFx0dGhpcy5wbGF5ZXIuX3JvdFogPSB6O1xuXHR9XG5cblx0aGl0KCkge1xuXHRcdHRoaXMucGxheWVyLl9oaXRQb2ludHMgLT0gMTk7XG5cdFx0aWYodGhpcy5wbGF5ZXIuX2hpdFBvaW50cyA8PSAwKXtcblx0XHRcdHRoaXMucGxheWVyLl9pc0RlYWQgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5wbGF5ZXIuX2lzRGVhZDtcblx0fVxuXG5cdHNldERlYWQoZCkge1xuXHRcdHRoaXMucGxheWVyLl9pc0RlYWQgPSBkO1xuXHR9XG5cblx0c2V0SGl0UG9pbnRzKGgpIHtcblx0XHRpZihoID4gMTAwKSBoID0gMTAwO1xuXHRcdGVsc2UgaWYoaCA8IDApIGggPSAwO1xuXHRcdHRoaXMucGxheWVyLl9oaXRQb2ludHMgPSBoO1xuXHRcdFBhbm5lbC51cGRhdGVIZWFsdGhCYXIodGhpcy5wbGF5ZXIuZ2V0SGl0UG9pbnRzKCkpO1xuXHR9XG5cblx0aXNEZWFkKCkge1xuXHRcdHJldHVybiB0aGlzLnBsYXllci5faXNEZWFkO1xuXHR9XG5cblx0YWRkRGVhdGgoKSB7XG5cdFx0dGhpcy5wbGF5ZXIuX2RlYXRocyArPSAxO1xuXHR9XG5cblx0YWRkS2lsbCgpIHtcblx0XHR0aGlzLnBsYXllci5fa2lsbHMgKz0gMTtcblx0fVxuXG5cdGJpbmRFdmVudCgpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMub25LZXlVcChldmVudClcblx0XHR9LCBmYWxzZSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMub25LZXlEb3duKGV2ZW50KVxuXHRcdH0sIGZhbHNlKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5rZXlDb2RlID0gZXZlbnQucG9pbnRlcklkO1xuXHRcdFx0dGhpcy5vbktleVVwKGV2ZW50KVxuXHRcdH0sIGZhbHNlKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQua2V5Q29kZSA9IGV2ZW50LnBvaW50ZXJJZDtcblx0XHRcdHRoaXMub25LZXlEb3duKGV2ZW50KTtcblx0XHR9LCBmYWxzZSlcblx0fVxuXG5cdGluaXRQaHlzaWNzKCkge1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEudXNlT2N0cmVlRm9yQ29sbGlzaW9ucyA9IHRydWU7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5lbGxpcHNvaWQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsMiwxKVxuXHRcdC8vIHRoaXMuc2NlbmUuY2FtZXJhLmVsbGlwc29pZE9mZnNldCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwyLDApXG5cdH1cblxuXHRDcmVhdGUoKSB7XG5cdH1cblxuXHRvbktleVVwKGV2ZW50KSB7XG5cdFx0dGhpcy5zY2VuZS5zdG9yZS5vbktleXVwKGV2ZW50KVxuXHR9XG5cblx0b25LZXlEb3duKGV2ZW50KSB7XG5cdFx0dGhpcy5zY2VuZS5zdG9yZS5vbktleURvd24oZXZlbnQpXG5cdH1cblxuXHRnb3RLaWxsZWQoa2lsbGVyKXtcblx0XHR0aGlzLnNldERlYWQodHJ1ZSlcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5zcGVlZCA9IDA7XG5cdH1cblxuXHRyZXNldENhbWVyYUNvb3JkaW5hdGVzKCkge1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLnBsYXllci5feDtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5wbGF5ZXIuX3kgKyAxO1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLnBsYXllci5fejtcblx0fVxuXG5cdHVwZGF0ZVBvc2l0aW9uKCkge1xuXHRcdFxuXHRcdGNvbnN0IHhPZmZzZXQgPSBNYXRoLmFicyh0aGlzLmxhc3RQb3NpdGlvbi54IC0gdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueCk7XG4gICAgY29uc3QgeU9mZnNldCA9IE1hdGguYWJzKHRoaXMubGFzdFBvc2l0aW9uLnkgLSB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55KTtcbiAgICBjb25zdCB6T2Zmc2V0ID0gTWF0aC5hYnModGhpcy5sYXN0UG9zaXRpb24ueiAtIHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnopO1xuICAgIFxuICAgIGNvbnN0IHhSb3RPZmZzZXQgPSBNYXRoLmFicyh0aGlzLmxhc3RSb3RhdGlvbi54IC0gdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueCk7XG4gICAgY29uc3QgeVJvdE9mZnNldCA9IE1hdGguYWJzKHRoaXMubGFzdFJvdGF0aW9uLnkgLSB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi55KTtcbiAgICBjb25zdCB6Um90T2Zmc2V0ID0gTWF0aC5hYnModGhpcy5sYXN0Um90YXRpb24ueiAtIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLnopO1xuICAgIFxuICAgIGNvbnN0IHBvc09mZnNldCA9IHhPZmZzZXQgKyB5T2Zmc2V0ICsgek9mZnNldDtcbiAgICBjb25zdCByb3RPZmZzZXQgPSB5Um90T2Zmc2V0ICsgeFJvdE9mZnNldCArIHpSb3RPZmZzZXQ7XG5cbiAgICBpZihwb3NPZmZzZXQgPiAwLjEgfHwgcm90T2Zmc2V0ID4gMC4wMSl7IFxuICAgICAgICB0aGlzLnN1Ym1pdE1vdmVtZW50KCk7XG4gICAgfSBcblx0fVxuXG5cdHN1Ym1pdE1vdmVtZW50KCkge1xuXHRcdGNvbnNvbGUubG9nKCdzdWInKVxuXHRcdC8vdGhpcy5tZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyh0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi54LCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55LCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56KTtcblx0XHQvL3RoaXMubWVzaC5yb3RhdGlvbi55ID0gdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueTtcblx0XHR0aGlzLnNjZW5lLmNvbnRyb2xsZXIuc2VuZExvY2FsUGxheWVyTW92ZW1lbnQodGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24sIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uKTtcbiAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjModGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueCAtIDAuMywgdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSAtMC41LCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56KTtcbiAgICB0aGlzLmxhc3RSb3RhdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjModGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueCAsIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLnkgLCB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi56KTtcblx0fVxuXG5cdGNoZWNrQ29udHJvbHMoKSB7XG5cdFx0aWYodGhpcy5zY2VuZS5zdG9yZS5pc0Rvd24odGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5KVU1QKSl7XG5cdFx0XHRpZighdGhpcy5pc0p1bXBpbmcpe1xuXHRcdFx0XHR0aGlzLmp1bXAoKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZih0aGlzLnNjZW5lLnN0b3JlLmlzRG93bih0aGlzLnNjZW5lLnN0b3JlLnN0YXRlLkZJUkUpKXtcblx0XHRcdGlmKCF0aGlzLnBsYXllci5pc0RlYWQoKSlcblx0XHRcdFx0XHR0aGlzLndlYXBvbi5maXJlKCk7XG5cdFx0fVxuXHR9XG5cblx0anVtcCgpIHtcblx0XHR0aGlzLmlzSnVtcGluZyA9IHRydWU7XG5cdFx0dGhpcy5qdW1wVXAgPSB0cnVlO1xuXHRcdGNvbnN0IGNhbSA9IHRoaXMuc2NlbmUuY2FtZXJhO1xuXHRcdGNhbS5hbmltYXRpb25zID0gW107XG5cdFx0Y29uc3QgYSA9IG5ldyBCQUJZTE9OLkFuaW1hdGlvbihcblx0XHRcdCdhJyxcblx0XHRcdCdwb3NpdGlvbi55JywgMyxcblx0XHRcdEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsXG4gICAgICBCQUJZTE9OLkFuaW1hdGlvbi5BTklNQVRJT05MT09QTU9ERV9DWUNMRVxuXHRcdCk7XG5cdFx0Y29uc3Qga2V5cyA9IFtdO1xuXHRcdGtleXMucHVzaCh7IGZyYW1lOiAwLCB2YWx1ZTogY2FtLnBvc2l0aW9uLnkgfSk7XG4gICAga2V5cy5wdXNoKHsgZnJhbWU6IDMsIHZhbHVlOiBjYW0ucG9zaXRpb24ueSArIHRoaXMuanVtcEhlaWdodCB9KTtcbiAgICBhLnNldEtleXMoa2V5cyk7XG5cbiAgICBjb25zdCBlYXNpbmdGdW5jdGlvbiA9IG5ldyBCQUJZTE9OLkNpcmNsZUVhc2UoKTtcbiAgICBlYXNpbmdGdW5jdGlvbi5zZXRFYXNpbmdNb2RlKEJBQllMT04uRWFzaW5nRnVuY3Rpb24uRUFTSU5HTU9ERV9FQVNFSU5PVVQpO1xuICAgIGEuc2V0RWFzaW5nRnVuY3Rpb24oZWFzaW5nRnVuY3Rpb24pO1xuIFxuICAgIGNhbS5hbmltYXRpb25zLnB1c2goYSk7XG5cbiAgICB0aGlzLnNjZW5lLlNjZW5lLmJlZ2luQW5pbWF0aW9uKGNhbSwgMCwgMywgZmFsc2UsIDEgLCAoKSA9PiB7XG4gICAgICB0aGlzLmp1bXBVcCA9IGZhbHNlO1xuICAgIH0pO1xuXHR9XG5cblx0Y2hlY2tGcmVlRmFsbCgpe1xuXG5cdH1cblxuXHRjaGVja0p1bXAoKSB7XG5cdFx0bGV0IHBvcywgaGVpZ2h0T2ZUZXJyYWluICxkaWZmO1xuICAgIGlmKHRoaXMuaXNKdW1waW5nICYmICF0aGlzLmp1bXBVcCl7XG5cdFx0XHRsZXQgYmlhcyA9IDAuMDg7IFxuXHRcdFx0cG9zID0gdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb247XG5cdFx0XHRoZWlnaHRPZlRlcnJhaW4gPSB0aGlzLnNjZW5lLmNhbGNFbGV2YXRpb24ocG9zLngsIHBvcy56KTtcblx0XHRcdGRpZmYgPSBwb3MueSAtIGhlaWdodE9mVGVycmFpbiAtYmlhcztcblx0XHRcdGlmKGRpZmYgPCB0aGlzLnBsYXllci5nZXRIZWlnaHQoKSl7XG5cdFx0XHRcdHRoaXMuaXNKdW1waW5nID0gZmFsc2U7ICBcblx0XHRcdH1cbiAgICB9IFxuICAgIGVsc2UgaWYoIXRoaXMuaXNKdW1waW5nICYmICF0aGlzLmp1bXBVcCl7XG5cdFx0XHQvL09uIGxvdyBmcHMsIHRoZSBjYW1lcmEgY2FuIGp1bXAgYW5kIGJhc2ljbHkgXCJpZ25vcmVcIiB0aGUgZ3Jhdml0eSB3aGljaCBtZWFucyB0aGUgcGxheWVyIGNhbiBmbHlcblx0XHRcdC8vVG8gdGVzdCBhZ2FpbnN0IHRoYXQgYWZmZWN0IHRoaXMgY29kZSBpcyBoZXJlLCBpdCBjaGVja3MgaWYgYSBwbGF5ZXIgaXMgb2ZmIHRoZSBncm91bmQgd2l0aG91dCBhY3R1YWxseSBqdW1waW5nIGFuZCBicmluZ3MgcGxheWVyIGJhY2sgZG93blxuXHRcdFx0cG9zID0gdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb247XG5cdFx0XHRoZWlnaHRPZlRlcnJhaW4gPSB0aGlzLnNjZW5lLmNhbGNFbGV2YXRpb24ocG9zLngsIHBvcy56KTtcblx0XHRcdGRpZmYgPSBwb3MueSAtIGhlaWdodE9mVGVycmFpbjtcblx0XHRcdGlmKGRpZmYgPiAoMC41ICsgdGhpcy5wbGF5ZXIuZ2V0SGVpZ2h0KCkpKXtcblx0XHRcdFx0dGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSA9IGhlaWdodE9mVGVycmFpbiArIHRoaXMucGxheWVyLmdldEhlaWdodCgpICsgMC4xOyBcblx0XHRcdH1cbiAgICB9XG5cdH1cblxuXHREZXN0cm95KCkge1xuXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJNb2Qge1xuICBjb25zdHJ1Y3RvcihzY2VuZSwgbmFtZSkge1xuICAgIHRoaXMuU2NlbmUgPSBzY2VuZTtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cdGFzeW5jIGxvYWRHdW4oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdFx0d2luZG93LkJBQllMT04uU2NlbmVMb2FkZXIuSW1wb3J0TWVzaCgnJywgJy8nLCBcIndlYXBvbl8yLm9ialwiLCB0aGlzLlNjZW5lLCAobWVzaCkgPT4ge1xuXHRcdFx0XHR0aGlzLmd1biA9IG1lc2hbMF07XG5cdFx0XHRcdHRoaXMuZ3VuLmlzVmlzaWJsZSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLmd1bi5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJNYXRcIiwgdGhpcy5TY2VuZSk7XG4gICAgICAgIHRoaXMuZ3VuLm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcIi93ZWFwb25fMi5wbmdcIiwgdGhpcy5TY2VuZSk7XG4gICAgICAgIHRoaXMuZ3VuLm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTsgIFxuXHRcdFx0XHRyZXNvbHZlKG1lc2gpXG5cdFx0XHR9KTtcblx0XHR9KVxuXHR9XG4gIGNyZWF0ZVBsYXllcigpIHtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBCQUJZTE9OLlRyYW5zZm9ybU5vZGUoXCJwaXZvdFwiKTtcblx0XHRcblx0XHR0aGlzLnBsYXllci5pc1Zpc2libGUgPSBmYWxzZTtcblx0XHRcblx0XHR0aGlzLmd1bi5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHR0aGlzLmd1bi5yb3RhdGlvbi55ID0gLU1hdGguUEkgLyAyO1xuXHRcdHRoaXMuZ3VuLmlzVmlzaWJsZSA9IHRydWU7XG5cdFx0dGhpcy5ndW4ucG9zaXRpb24ueiAtPSAyO1xuXHRcdHRoaXMuZ3VuLnBvc2l0aW9uLnggLT0gMC41O1xuXHRcdHRoaXMuZ3VuLnBvc2l0aW9uLnkgLT0gMTtcblx0XHQvLyBjb25zdCBDb1RBeGlzID0gdGhpcy5sb2NhbEF4ZXMoMiwgMCk7XG5cdFx0Ly8gQ29UQXhpcy5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHQvLyB0aGlzLnBsYXllci5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgMCk7XG5cdFx0XG5cdFx0Y29uc3QgZmFjZUNvbG9ycyA9IFtdO1xuXHRcdC8vIGZhY2VDb2xvcnNbMF0gPSBCQUJZTE9OLkNvbG9yMy5CbHVlKCk7XG5cdFx0Ly8gZmFjZUNvbG9yc1sxXSA9IEJBQllMT04uQ29sb3IzLldoaXRlKClcblx0XHQvLyBmYWNlQ29sb3JzWzJdID0gQkFCWUxPTi5Db2xvcjMuUmVkKCk7XG5cdFx0Ly8gZmFjZUNvbG9yc1szXSA9IEJBQllMT04uQ29sb3IzLkJsYWNrKCk7XG5cdFx0Ly8gZmFjZUNvbG9yc1s0XSA9IEJBQllMT04uQ29sb3IzLkdyZWVuKCk7XG5cdFx0Ly8gZmFjZUNvbG9yc1s1XSA9IEJBQllMT04uQ29sb3IzLlllbGxvdygpO1xuXHRcdHRoaXMuaGVhZCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveCh0aGlzLm5hbWUsIHt3aWR0aDogMSwgaGVpZ2h0OiAwLjgsIGZhY2VDb2xvcnM6IGZhY2VDb2xvcnN9LCB0aGlzLlNjZW5lKTsgXG5cdFx0dGhpcy5oZWFkLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImhlYWRtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdC8vIGhlYWQubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAuNzgsIDAuMjcsIDAuMzkpO1xuXHRcdHRoaXMuaGVhZC5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHRjb25zdCBpbmRpY2VzID0gdGhpcy5oZWFkLmdldEluZGljZXMoKTtcblx0XHRjb25zdCBwb3NpdGlvbnMgPSB0aGlzLmhlYWQuZ2V0VmVydGljZXNEYXRhKEJBQllMT04uVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCk7XG5cdFx0bGV0IGNvbG9ycyA9IHRoaXMuaGVhZC5nZXRWZXJ0aWNlc0RhdGEoQkFCWUxPTi5WZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kKTsgICAgICAgIFxuXHRcdGNvbnN0IG5iVmVydGljZXMgPSBwb3NpdGlvbnMubGVuZ3RoIC8gMztcblx0XHRpZiAoIWNvbG9ycykge1xuXHRcdFx0XHRjb2xvcnMgPSBuZXcgQXJyYXkoNCAqIG5iVmVydGljZXMpO1xuXHRcdFx0XHRjb2xvcnMgPSBjb2xvcnMuZmlsbCgxKTtcblx0XHR9XG5cdFx0bGV0IHZlcnRleDtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xuXHRcdFx0XHR2ZXJ0ZXggPSBpbmRpY2VzWzMgKiAwICsgaV07XG5cdFx0XHRcdGNvbG9yc1s0ICogdmVydGV4XSA9IDE7XG5cdFx0XHRcdGNvbG9yc1s0ICogdmVydGV4ICsgMV0gPSAxO1xuXHRcdFx0XHRjb2xvcnNbNCAqIHZlcnRleCArIDJdID0gMDtcblx0XHRcdFx0Y29sb3JzWzQgKiB2ZXJ0ZXggKyAzXSA9IDE7XG5cdFx0fVxuXHRcdHRoaXMuaGVhZC5zZXRWZXJ0aWNlc0RhdGEoQkFCWUxPTi5WZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kLCBjb2xvcnMpO1xuXHRcdC8vIGhlYWQuc2V0UGl2b3RNYXRyaXgobmV3IEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjQsIDApKVxuXHRcdHRoaXMuaGVhZC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMC40LCAwKSk7O1xuXG5cdFx0Y29uc3QgaGFpciA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveCh0aGlzLm5hbWUsIHt3aWR0aDogMSwgaGVpZ2h0OiAwLjJ9LCB0aGlzLlNjZW5lKTtcblx0XHRoYWlyLnNldFBpdm90TWF0cml4KG5ldyBCQUJZTE9OLk1hdHJpeC5UcmFuc2xhdGlvbigwLCAtMC4xLCAwKSlcblx0XHRoYWlyLnBhcmVudCA9IHRoaXMuaGVhZDtcblx0XHRoYWlyLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAwLjUsIDApKTs7XG5cdFx0aGFpci5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwodGhpcy5uYW1lLCB0aGlzLlNjZW5lKTtcblx0XHRoYWlyLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLjYxLCAwLjIzLCAwLjI5KTtcblxuXHRcdHRoaXMuYm9keSA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveCh0aGlzLm5hbWUsIHt3aWR0aDoxLjIsIGhlaWdodDogMS4yLCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5ib2R5LnBhcmVudCA9IHRoaXMucGxheWVyO1xuXHRcdHRoaXMuYm9keS5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJib2R5bVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmJvZHkubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmJvZHkubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjYsIDApKTtcblx0XHRcblx0XHRjb25zdCBidXQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJidXRcIiwge3dpZHRoOjEuMjUsIGhlaWdodDogMC40LCBkZXB0aDogMC41NX0sIHRoaXMuU2NlbmUpO1xuXHRcdGJ1dC5wYXJlbnQgPSB0aGlzLmJvZHk7XG5cdFx0YnV0Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImJ1dG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0YnV0Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4xLCAwLjEsIDAuMSk7XG5cdFx0YnV0LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC44LCAwKSk7XG5cdFx0XG5cblx0XHR0aGlzLmxlZnRhcm0gPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0dXBwZXJhcm1cIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjgsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRhcm0ubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdHVwcGVyYXJtbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRhcm0ubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmxlZnRhcm0ucGFyZW50ID0gdGhpcy5wbGF5ZXI7XG5cdFx0dGhpcy5sZWZ0YXJtLnNldFBpdm90TWF0cml4KEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjQsIDApKVxuXHRcdHRoaXMubGVmdGFybS5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoLTAuOSwgLTAuNCwgMCkpO1xuXG5cdFx0dGhpcy5sZWZ0ZWxib3cgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0ZWxib3dcIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjIsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRlbGJvdy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJsZWZ0ZWxib3dtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMubGVmdGVsYm93Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0dGhpcy5sZWZ0ZWxib3cucGFyZW50ID0gdGhpcy5sZWZ0YXJtO1xuXHRcdHRoaXMubGVmdGVsYm93LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC41LCAwKSk7XG5cblx0XHR0aGlzLmxlZnRsb3dlcmFybSA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRsb3dlcmFybVwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuOCwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMubGVmdGxvd2VyYXJtLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRsb3dlcmFybW1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0ubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmxlZnRsb3dlcmFybS5wYXJlbnQgPSB0aGlzLmxlZnRhcm07XG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0uc2V0UGl2b3RNYXRyaXgoQkFCWUxPTi5NYXRyaXguVHJhbnNsYXRpb24oMCwgLTAuNCwgMCkpXG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0ubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjgsIDApKTtcblxuXHRcdGNvbnN0IGxlZnR3YWlzdCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnR3YWlzdFwiLCB7d2lkdGg6MC40NCwgaGVpZ2h0OiAwLjEsIGRlcHRoOiAwLjQ0fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdHdhaXN0Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnR3YWlzdG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdHdhaXN0Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMSwgMSwgMSk7XG5cdFx0bGVmdHdhaXN0LnBhcmVudCA9IHRoaXMubGVmdGxvd2VyYXJtO1xuXHRcdGxlZnR3YWlzdC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuNCwgMCkpO1xuXG5cdFx0Y29uc3QgbGVmdGhhbmQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0aGFuZFwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuMiwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRoYW5kLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRoYW5kbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRsZWZ0aGFuZC5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC43OCwgMC4yNywgMC4zOSk7XG5cdFx0bGVmdGhhbmQucGFyZW50ID0gdGhpcy5sZWZ0bG93ZXJhcm07XG5cdFx0bGVmdGhhbmQubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjU1LCAwKSk7XG5cblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0gPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndHVwcGVyYXJtXCIsIHt3aWR0aDowLjQsIGhlaWdodDogMC44LCBkZXB0aDogMC40fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5yaWhndHVwcGVyYXJtLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpaGd0dXBwZXJhcm1tXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0uc2V0UGl2b3RNYXRyaXgoQkFCWUxPTi5NYXRyaXguVHJhbnNsYXRpb24oMCwgLTAuNCwgMCkpXG5cdFx0dGhpcy5yaWhndHVwcGVyYXJtLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLjksIC0wLjQsIDApKTtcblxuXHRcdGNvbnN0IHJpaGd0ZWxib3cgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndGVsYm93XCIsIHt3aWR0aDowLjQsIGhlaWdodDogMC4yLCBkZXB0aDogMC40fSwgdGhpcy5TY2VuZSk7XG5cdFx0cmloZ3RlbGJvdy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWhndGVsYm93bVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndGVsYm93Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0cmloZ3RlbGJvdy5wYXJlbnQgPSB0aGlzLnJpaGd0dXBwZXJhcm07XG5cdFx0cmloZ3RlbGJvdy5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuNSwgMCkpO1xuXG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwicmloZ3Rsb3dlcmFybVwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuOCwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMucmloZ3Rsb3dlcmFybS5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWhndGxvd2VyYXJtbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ucGFyZW50ID0gdGhpcy5yaWhndHVwcGVyYXJtO1xuXHRcdHRoaXMucmloZ3Rsb3dlcmFybS5zZXRQaXZvdE1hdHJpeChCQUJZTE9OLk1hdHJpeC5UcmFuc2xhdGlvbigwLCAtMC40LCAwKSlcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjgsIDApKTtcblxuXHRcdGNvbnN0IHJpaGd0d2Fpc3QgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndHdhaXN0XCIsIHt3aWR0aDowLjQ0LCBoZWlnaHQ6IDAuMSwgZGVwdGg6IDAuNDR9LCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndHdhaXN0Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpaGd0d2Fpc3RtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpaGd0d2Fpc3QubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcblx0XHRyaWhndHdhaXN0LnBhcmVudCA9IHRoaXMucmloZ3Rsb3dlcmFybTtcblx0XHRyaWhndHdhaXN0LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC40LCAwKSk7XG5cblx0XHRjb25zdCByaWhndGhhbmQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndGhhbmRcIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjIsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndGhhbmQubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmloZ3RoYW5kbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndGhhbmQubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAuNzgsIDAuMjcsIDAuMzkpO1xuXHRcdHJpaGd0aGFuZC5wYXJlbnQgPSB0aGlzLnJpaGd0bG93ZXJhcm07XG5cdFx0cmloZ3RoYW5kLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC41NSwgMCkpO1xuXG5cdFx0dGhpcy5sZWZ0bGVnID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdHVwcGVybGVnXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC44LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0bGVnLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnR1cHBlcmxlZ21cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0bGVnLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0dGhpcy5sZWZ0bGVnLnBhcmVudCA9IHRoaXMucGxheWVyO1xuICAgIHRoaXMubGVmdGxlZy5zZXRQaXZvdE1hdHJpeChCQUJZTE9OLk1hdHJpeC5UcmFuc2xhdGlvbigwLCAtMC40LCAwKSlcblx0XHR0aGlzLmxlZnRsZWcubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKC0wLjI2LCAtMiwgMCkpO1xuXG5cdFx0Y29uc3QgbGVmdGtuZWVsID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdGtuZWVsXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC4yLCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGtuZWVsLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRrbmVlbG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGtuZWVsLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0bGVmdGtuZWVsLnBhcmVudCA9IHRoaXMubGVmdGxlZztcblx0XHRsZWZ0a25lZWwubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjUsIDApKTtcblxuXHRcdGNvbnN0IGxlZnRsb3dlcmxlZyA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRsb3dlcmxlZ1wiLCB7d2lkdGg6MC41LCBoZWlnaHQ6IDAuNiwgZGVwdGg6IDAuNX0sIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRsb3dlcmxlZy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJsZWZ0bG93ZXJsZWdtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRsb3dlcmxlZy5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdGxlZnRsb3dlcmxlZy5wYXJlbnQgPSB0aGlzLmxlZnRsZWc7XG5cdFx0bGVmdGxvd2VybGVnLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC45LCAwKSk7XG5cblx0XHRjb25zdCBsZWZ0Zm9vdCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRmb290XCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC40LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGZvb3QubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdGZvb3RtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRmb290Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4xLCAwLjEsIDAuMSk7XG5cdFx0bGVmdGZvb3QucGFyZW50ID0gdGhpcy5sZWZ0bGVnO1xuXHRcdGxlZnRmb290LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMS40LCAwKSk7XG5cblx0XHR0aGlzLnJpZ2h0bGVnID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwicmlnaHR1cHBlcmxlZ1wiLCB7d2lkdGg6MC41LCBoZWlnaHQ6IDAuOCwgZGVwdGg6IDAuNX0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMucmlnaHRsZWcubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmlnaHR1cHBlcmxlZ21cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5yaWdodGxlZy5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdHRoaXMucmlnaHRsZWcucGFyZW50ID0gdGhpcy5wbGF5ZXI7XG5cdFx0dGhpcy5yaWdodGxlZy5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMC4yNiwgLTIsIDApKTtcblxuXHRcdGNvbnN0IHJpZ2h0a25lZWwgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWdodGtuZWVsXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC4yLCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0cmlnaHRrbmVlbC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWdodGtuZWVsbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWdodGtuZWVsLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0cmlnaHRrbmVlbC5wYXJlbnQgPSB0aGlzLnJpZ2h0bGVnO1xuXHRcdHJpZ2h0a25lZWwubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjUsIDApKTtcblxuXHRcdGNvbnN0IHJpZ2h0bG93ZXJsZWcgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWdodGxvd2VybGVnXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC42LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0cmlnaHRsb3dlcmxlZy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWdodGxvd2VybGVnbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWdodGxvd2VybGVnLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0cmlnaHRsb3dlcmxlZy5wYXJlbnQgPSB0aGlzLnJpZ2h0bGVnO1xuXHRcdHJpZ2h0bG93ZXJsZWcubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjksIDApKTtcblxuXHRcdGNvbnN0IHJpZ2h0Zm9vdCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpZ2h0Zm9vdFwiLCB7d2lkdGg6MC41LCBoZWlnaHQ6IDAuNCwgZGVwdGg6IDAuNX0sIHRoaXMuU2NlbmUpO1xuXHRcdHJpZ2h0Zm9vdC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWdodGZvb3RtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpZ2h0Zm9vdC5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMSwgMC4xLCAwLjEpO1xuXHRcdHJpZ2h0Zm9vdC5wYXJlbnQgPSB0aGlzLnJpZ2h0bGVnO1xuXHRcdHJpZ2h0Zm9vdC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTEuNCwgMCkpO1xuXHRcdHRoaXMucGxheWVyLnNldEVuYWJsZWQoZmFsc2UpO1xuICB9XG5cbiAgbG9jYWxBeGVzKHNpemUsIHNoYWRlKSB7XG5cdFx0Y29uc3QgcGlsb3RfbG9jYWxfYXhpc1ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlTGluZXMoXCJwaWxvdF9sb2NhbF9heGlzWFwiLCBbIFxuXHRcdFx0XHRuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgbmV3IEJBQllMT04uVmVjdG9yMyhzaXplLCAwLCAwKSwgbmV3IEJBQllMT04uVmVjdG9yMyhzaXplICogMC45NSwgMC4wNSAqIHNpemUsIDApLCBcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMyhzaXplLCAwLCAwKSwgbmV3IEJBQllMT04uVmVjdG9yMyhzaXplICogMC45NSwgLTAuMDUgKiBzaXplLCAwKVxuXHRcdF0sIHRoaXMuU2NlbmUpO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNYLmNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDEsIHNoYWRlLCBzaGFkZSk7XG5cblx0XHRjb25zdCBwaWxvdF9sb2NhbF9heGlzWSA9IEJBQllMT04uTWVzaC5DcmVhdGVMaW5lcyhcInBpbG90X2xvY2FsX2F4aXNZXCIsIFtcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMy5aZXJvKCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgc2l6ZSwgMCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoLTAuMDUgKiBzaXplLCBzaXplICogMC45NSwgMCksXG5cdFx0XHRcdG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgc2l6ZSwgMCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoMC4wNSAqIHNpemUsIHNpemUgKiAwLjk1LCAwKVxuXHRcdF0sIHRoaXMuU2NlbmUpO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNZLmNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKHNoYWRlLCAxLCBzaGFkZSk7XG5cblx0XHRjb25zdCBwaWxvdF9sb2NhbF9heGlzWiA9IEJBQllMT04uTWVzaC5DcmVhdGVMaW5lcyhcInBpbG90X2xvY2FsX2F4aXNaXCIsIFtcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMy5aZXJvKCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgc2l6ZSksIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAgLCAtMC4wNSAqIHNpemUsIHNpemUgKiAwLjk1KSxcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMygwLCAwLCBzaXplKSwgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMC4wNSAqIHNpemUsIHNpemUgKiAwLjk1KVxuXHRcdF0sIHRoaXMuU2NlbmUpO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNaLmNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKHNoYWRlLCBzaGFkZSwgMSk7XG5cblx0XHRjb25zdCBsb2NhbF9vcmlnaW4gPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxvY2FsX29yaWdpblwiLCB7c2l6ZToxfSwgdGhpcy5TY2VuZSk7XG5cdFx0bG9jYWxfb3JpZ2luLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG5cdFx0cGlsb3RfbG9jYWxfYXhpc1gucGFyZW50ID0gbG9jYWxfb3JpZ2luO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNZLnBhcmVudCA9IGxvY2FsX29yaWdpbjtcblx0XHRwaWxvdF9sb2NhbF9heGlzWi5wYXJlbnQgPSBsb2NhbF9vcmlnaW47IFxuXG5cdFx0dGhpcy5wbGF5ZXIucG9zaXRpb24ueSA9IDA7XG5cdFx0cmV0dXJuIGxvY2FsX29yaWdpbjtcblx0fVxuXG5cdGhvbGRHdW4oKSB7XG5cdFx0dGhpcy5sZWZ0YXJtLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDM7XG5cdFx0dGhpcy5sZWZ0YXJtLnJvdGF0aW9uLnkgPSBNYXRoLlBJIC8gNTtcblx0XHR0aGlzLmxlZnRsb3dlcmFybS5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyA1O1xuXHRcdHRoaXMubGVmdGxvd2VyYXJtLnBvc2l0aW9uLnkgLT0gMC4yO1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5yb3RhdGlvbi54ID0gIC1NYXRoLlBJIC8gNDtcblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0ucm90YXRpb24ueSA9ICAtTWF0aC5QSSAvIDU7XG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtLnBvc2l0aW9uLnkgLT0gMC4yO1xuXHR9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0IHJ1biA9IG5ldyBCQUJZTE9OLkFuaW1hdGlvbkdyb3VwKFwicnVuXCIpO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IDU7XG5cbiAgICBjb25zdCBsZWZ0YW5pbWUgPSBuZXcgQkFCWUxPTi5BbmltYXRpb24oXCJ4U2xpZGVcIiwgXCJyb3RhdGlvbi54XCIsIGZyYW1lUmF0ZSwgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OTE9PUE1PREVfQ1lDTEUpO1xuICAgIGNvbnN0IGtleUZyYW1lcyA9IFtdO1xuXG4gICAga2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogMCxcbiAgICAgICAgdmFsdWU6IC1NYXRoLlBJIC8gNCxcbiAgICB9KTtcblxuICAgIGtleUZyYW1lcy5wdXNoKHtcbiAgICAgICAgZnJhbWU6IGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IE1hdGguUEkgLyA0LFxuICAgIH0pO1xuXG4gICAga2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogMiAqIGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IC1NYXRoLlBJIC8gNCxcbiAgICB9KTtcblxuICAgIGxlZnRhbmltZS5zZXRLZXlzKGtleUZyYW1lcyk7XG5cbiAgICBjb25zdCByaWdodGFuaW1lID0gbmV3IEJBQllMT04uQW5pbWF0aW9uKFwieFNsaWRlXCIsIFwicm90YXRpb24ueFwiLCBmcmFtZVJhdGUsIEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTkxPT1BNT0RFX0NZQ0xFKTtcbiAgICBjb25zdCByaWdodGtleUZyYW1lcyA9IFtdO1xuXG4gICAgcmlnaHRrZXlGcmFtZXMucHVzaCh7XG4gICAgICAgIGZyYW1lOiAwLFxuICAgICAgICB2YWx1ZTogTWF0aC5QSSAvIDQsXG4gICAgfSk7XG5cbiAgICByaWdodGtleUZyYW1lcy5wdXNoKHtcbiAgICAgICAgZnJhbWU6IGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IC1NYXRoLlBJIC8gNCxcbiAgICB9KTtcblxuICAgIHJpZ2h0a2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogMiAqIGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IE1hdGguUEkgLyA0LFxuICAgIH0pO1xuXG4gICAgcmlnaHRhbmltZS5zZXRLZXlzKHJpZ2h0a2V5RnJhbWVzKTtcblxuICAgIHJ1bi5hZGRUYXJnZXRlZEFuaW1hdGlvbihsZWZ0YW5pbWUsIHRoaXMubGVmdGxlZyk7XG4gICAgcnVuLmFkZFRhcmdldGVkQW5pbWF0aW9uKHJpZ2h0YW5pbWUsIHRoaXMucmlnaHRsZWcpO1xuICAgIHJ1bi5ub3JtYWxpemUoMCwgMiAqIGZyYW1lUmF0ZSk7XG4gICAgcnVuLnBsYXkodHJ1ZSk7XG4gIH1cblxuXHRjbG9uZSgpIHtcblx0XHR0aGlzLnBsYXllciA9IHRoaXMucGxheWVyLmNsb25lKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vd2VhcG9uLmpzJ1xuaW1wb3J0IFBsYXllck1vZCBmcm9tICcuL3BsYXllck1vZC5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZW1vdGVQbGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRzY2VuZSwgcGxheWVyXG5cdCkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgcmVtb3RlJylcblx0XHR0aGlzLnBsYXllciA9IHBsYXllcjtcblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XG5cdFx0Y29uc3QgZ3VuID0gdGhpcy5zY2VuZS5ndW4uY3JlYXRlSW5zdGFuY2UodGhpcy5wbGF5ZXIuX2lkICsgJ2d1bicpO1xuXHRcdGNvbnN0IHAgPSBuZXcgUGxheWVyTW9kKHRoaXMuc2NlbmUuU2NlbmUsIHRoaXMucGxheWVyLl9pZCk7XG5cdFx0cC5ndW4gPSBndW47XG5cdFx0cC5jcmVhdGVQbGF5ZXIoKTtcblx0XHRwLmhvbGRHdW4oKTtcblx0XHRwLnJ1bigpO1xuXHRcdHAuaGVhZC5uYW1lID0gdGhpcy5wbGF5ZXIuX2lkO1xuXHRcdHRoaXMubWVzaCA9IHA7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5zZXRFbmFibGVkKHRydWUpO1xuXHRcdHRoaXMubWVzaC5wbGF5ZXIubmFtZSA9IHBsYXllci5faWRcblx0XHR0aGlzLm1lc2gucGxheWVyLnBvc2l0aW9uLnggPSBwbGF5ZXIuX3g7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5wb3NpdGlvbi55ID0gcGxheWVyLl95O1xuXHRcdHRoaXMubWVzaC5wbGF5ZXIucG9zaXRpb24ueiA9IHBsYXllci5fejtcblx0XHQvLyB0aGlzLnNjZW5lLnNoYWRvd0dlbmVyYXRvci5nZXRTaGFkb3dNYXAoKS5yZW5kZXJMaXN0LnB1c2godGhpcy5tZXNoLnBsYXllcik7XG5cdFx0dGhpcy53ZWFwb24gPSBuZXcgV2VhcG9uKHNjZW5lLCBwbGF5ZXIsIHRoaXMubWVzaC5ndW4pO1xuXHRcdHRoaXMubWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuXHR9XG5cblx0VXBkYXRlKCkge1xuXG5cdH1cblxuXHRiaW5kRXZlbnQoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSlcblx0fVxuXG5cdENyZWF0ZSgpIHtcblxuXHR9XG5cblx0bW92ZShwb3MsIHJvdCkge1xuXHRcdGNvbnNvbGUubG9nKCdtb3ZlJylcblx0XHRjb25zb2xlLmxvZyhwb3MpXG5cdFx0dGhpcy5tZXNoLnBsYXllci5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMocG9zLngsIHBvcy55LCBwb3Mueik7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5yb3RhdGlvbi55ID0gcm90Lnk7XG5cdFx0dGhpcy5tZXNoLnJ1bigpO1xuXHR9XG5cblx0Z290S2lsbGVkKGtpbGxlcil7XG5cdFx0dGhpcy5zZXREZWFkKHRydWUpXG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEuc3BlZWQgPSAwO1xuXHR9XG5cblx0cmVzZXRDYW1lcmFDb29yZGluYXRlcygpIHtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi54ID0gdGhpcy5feDtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5feTtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56ID0gdGhpcy5fejtcblx0fVxuXG5cdHVwZGF0ZVBvc2l0aW9uKCkge1xuXHRcdGNvbnN0IHhPZmZzZXQgPSBNYXRoLmFzYih0aGlzLmxhc3QpXG5cdH1cblxuXHRzdWJtaXRNb3ZlbWVudCgpIHtcblx0XHRcblx0fVxuXG5cdGNoZWNrQ29udHJvbHMoKSB7XG5cblx0fVxuXG5cdGNoZWNrRnJlZUZhbGwoKXtcblxuXHR9XG5cblx0Y2hlY2tKdW1wKCkge1xuXG5cdH1cblxuXHREZXN0cm95KCkge1xuXHRcdHRoaXMubWVzaC5wbGF5ZXIuZGlzcG9zZSgpXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXZWFwb24ge1xuICBjb25zdHJ1Y3RvcihzY2VuZSwgcGxheWVyLCBtZXNoKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMubWVzaCA9IG1lc2g7XG4gICAgLy9jb25zdCB3cCA9IHRoaXMuc2NlbmUuZ3VuLmNyZWF0ZUluc3RhbmNlKHBsYXllci5faWQpO1xuICAvLyAgIGNvbnNvbGUubG9nKHdwKVxuICAvLyAgIHdwLmlzVmlzaWJsZSA9IHRydWU7XG4gIC8vICAgd3Aucm90YXRpb25RdWF0ZXJuaW9uID0gbnVsbDtcbiAgLy8gICB3cC5wYXJlbnQgPSBwYXJlbnQ7XG4gIC8vICAgd3AucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC0wLjIsLTEuMiwyKTsgXG4gIC8vICAvLyB3cC5yb3RhdGlvbi54ID0gLU1hdGguUEkvMjtcbiAgLy8gICB3cC5yb3RhdGlvbi55ID0gLU1hdGguUEkgLyAyO1xuICAvLyAgIHRoaXMubWVzaCA9IHdwO1xuICAgIHRoaXMuX2luaXRpYWxSb3RhdGlvbiA9IHRoaXMubWVzaC5yb3RhdGlvbi5jbG9uZSgpO1xuICAgIHRoaXMuYW1tb1NpemUgPSAxNDtcbiAgICB0aGlzLmN1cnJlbnRBbW1vID0gdGhpcy5hbW1vU2l6ZTtcbiAgICB0aGlzLmZpcmVSYXRlID0gMjUwLjA7XG4gICAgdGhpcy5fY3VycmVudEZpcmVSYXRlID0gdGhpcy5maXJlUmF0ZTtcbiAgICB0aGlzLmNhbkZpcmUgPSB0cnVlO1xuICAgIHRoaXMucmVsb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zY2VuZS5TY2VuZS5yZWdpc3RlckJlZm9yZVJlbmRlcigoKSA9PiB7XG4gICAgICBpZighdGhpcy5jYW5GaXJlKXtcbiAgICAgICAgdGhpcy5fY3VycmVudEZpcmVSYXRlIC09IHRoaXMuc2NlbmUuZW5naW5lLmdldERlbHRhVGltZSgpO1xuICAgICAgICBpZih0aGlzLl9jdXJyZW50RmlyZVJhdGUgPD0gMCAmJiAhdGhpcy5yZWxvYWRpbmcpe1xuICAgICAgICAgIHRoaXMuY2FuRmlyZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5fY3VycmVudEZpcmVSYXRlID0gdGhpcy5maXJlUmF0ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBcbiAgcmVsb2FkKCkge1xuICAgIGlmKCF0aGlzLnJlbG9hZGluZyl7XG4gICAgICB0aGlzLmNhbkZpcmUgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVsb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuYW5pbWF0ZVJlbG9hZCgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudEFtbW8gPSB0aGlzLmFtbW9TaXplO1xuICAgICAgICB0aGlzLmNhbkZpcmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSwgODAwKVxuICAgIH1cbiAgfVxuXG4gIGZpcmUoKSB7XG4gICAgaWYodGhpcy5jYW5GaXJlKXtcbiAgICAgIGlmKHRoaXMuY3VycmVudEFtbW8gIT0gMCl7XG4gICAgICAgIHRoaXMuc2NlbmUuc291bmQuZ3VuRmlyZSgpO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHdpZHRoKVxuICAgICAgICBjb25zb2xlLmxvZyhoZWlnaHQpXG4gICAgICAgIGNvbnN0IHBpY2tSZXN1bHQgPSB0aGlzLnNjZW5lLlNjZW5lLnBpY2sod2lkdGgvMiwgaGVpZ2h0LzIsIG51bGwsIGZhbHNlLCB0aGlzLnNjZW5lLmNhbWVyYSk7XG4gICAgICAgIGlmKHBpY2tSZXN1bHQucGlja2VkTWVzaCl7XG4gICAgICAgICAgY29uc29sZS5sb2cocGlja1Jlc3VsdC5waWNrZWRNZXNoLm5hbWUpXG4gICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2NlbmUuc3RvcmUuc3RhdGUucmVtb3RlUGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzW2ldLnBsYXllcilcbiAgICAgICAgICAgIGlmKHBpY2tSZXN1bHQucGlja2VkTWVzaC5uYW1lID09PSB0aGlzLnNjZW5lLnN0b3JlLnN0YXRlLnJlbW90ZVBsYXllcnNbaV0ucGxheWVyLl9pZCl7XG4gICAgICAgICAgICAgIHRoaXMuc2NlbmUuY29udHJvbGxlci5oaXRQbGF5ZXIodGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzW2ldLnBsYXllcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocGlja1Jlc3VsdC5waWNrZWRNZXNoLm5hbWUgIT0gJ3NreUJveCcpe1xuICAgICAgICAgICAgLy8gdGhpcy5kcmF3SW1wYWN0KHBpY2tSZXN1bHQucGlja2VkUG9pbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjZW5lLmNvbnRyb2xsZXIuc2hvdEZpcmVkKCk7XG4gICAgICAgIC8vIHRoaXMuY3VycmVudEFtbW8gLT0gMTtcbiAgICAgICAgXG4gICAgICB9ZWxzZXtcbiAgICAgICAgLy8g56m65p6qXG4gICAgICB9XG4gICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICAgIHRoaXMuY2FuRmlyZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9pbml0aWFsUm90YXRpb24uY2xvbmUoKTtcbiAgICBjb25zdCBlbmQgPSBzdGFydC5jbG9uZSgpO1xuICAgIGVuZC54ICs9IE1hdGguUEkvMTAwO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBBbmltYXRpb24gb2JqZWN0XG4gICAgY29uc3QgZGlzcGxheSA9IG5ldyBCQUJZTE9OLkFuaW1hdGlvbihcbiAgICAgICAgXCJmaXJlXCIsXG4gICAgICAgIFwicm90YXRpb25cIixcbiAgICAgICAgNjAsXG4gICAgICAgIEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfVkVDVE9SMyxcbiAgICAgICAgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OTE9PUE1PREVfQ09OU1RBTlQpO1xuXG4gICAgLy8gQW5pbWF0aW9ucyBrZXlzXG4gICAgY29uc3Qga2V5cyA9IFt7IFxuICAgICAgICBmcmFtZTogMCxcbiAgICAgICAgdmFsdWU6IHN0YXJ0XG4gICAgfSx7XG4gICAgICAgIGZyYW1lOiAxMCxcbiAgICAgICAgdmFsdWU6IGVuZFxuICAgIH0se1xuICAgICAgICBmcmFtZTogMTAwLFxuICAgICAgICB2YWx1ZTogc3RhcnRcbiAgICB9XTtcblxuICAgIC8vIEFkZCB0aGVzZSBrZXlzIHRvIHRoZSBhbmltYXRpb25cbiAgICBkaXNwbGF5LnNldEtleXMoa2V5cyk7XG5cbiAgICAvLyBMaW5rIHRoZSBhbmltYXRpb24gdG8gdGhlIG1lc2hcbiAgICB0aGlzLm1lc2guYW5pbWF0aW9ucy5wdXNoKGRpc3BsYXkpO1xuXG4gICAgdGhpcy5zY2VuZS5TY2VuZS5iZWdpbkFuaW1hdGlvbih0aGlzLm1lc2gsIDAsIDEwMCwgZmFsc2UsIDEwLCBmdW5jdGlvbigpIHtcblxuICAgIH0pO1xuICB9XG5cbiAgZHJhd0ltcGFjdChwb3NpdGlvbikge1xuICAgIGNvbnN0IGltcGFjdCA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlUGxhbmUoJ2ltcGFjdCcsIHtzaXplOiAxfSwgdGhpcy5zY2VuZS5TY2VuZSk7XG4gICAgaW1wYWN0LnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICBpbXBhY3QubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCdpbXBhY3RNYXQnLCB0aGlzLnNjZW5lLlNjZW5lKTtcbiAgICBpbXBhY3QubWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwiL2ltcGFjdC5wbmdcIiwgdGhpcy5zY2VuZS5TY2VuZSk7XG4gICAgaW1wYWN0Lm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTsgXG4gICAgaW1wYWN0LnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBhbmltYXRlUmVsb2FkKCkge1xuICAgIC8vIOaSreaUvuWKqOeUu1xuICB9XG59IiwiaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlci9jb250cm9sbGVyLmpzJ1xuaW1wb3J0IFNvdW5kIGZyb20gJy4uL2NvbnRyb2xsZXIvc291bmQuanMnO1xuaW1wb3J0IGluaXREYXRhIGZyb20gJy4uL3N0b3JlL2luaXREYXRhLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhYnlsb25TY2VuZSB7XG5cdGNvbnN0cnVjdG9yKFxuXHRcdGVuZ2luZSwgY2FudmFzLCBzdG9yZVxuXHQpIHtcblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhcztcblx0XHR0aGlzLnN0b3JlID0gc3RvcmU7XG5cdFx0dGhpcy5ib3hlcyA9IFtdXG5cdFx0dGhpcy5lbmdpbmUgPSBlbmdpbmU7XG5cdFx0dGhpcy5TY2VuZSA9ICBuZXcgQkFCWUxPTi5TY2VuZShlbmdpbmUpO1xuXHRcdHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMpO1xuXHRcdHRoaXMuc291bmQgPSBuZXcgU291bmQodGhpcy5TY2VuZSk7XG5cdH1cblxuXHRDcmVhdGUoKSB7XG5cdFx0dGhpcy5pbml0Q2FtZXJhKCk7XG5cdFx0dGhpcy5sb2FkTGlnaHQoKTtcblx0XHR0aGlzLmxvYWRQaHlzaWNzKCk7XG5cdFx0dGhpcy5pbml0U2t5KCk7XG5cdFx0dGhpcy5sb2FkR3JvdW5kKCk7XG5cdFx0Ly8gdGhpcy5sb2FkQm94ZXMoKTtcblx0XHR0aGlzLmxvYWRHdW4oKS50aGVuKCgpID0+IHtcblx0XHRcdC8vIHRoaXMubG9hZFNvbGlkZXIoKVxuXHRcdH0pXG5cdH1cblxuXHRpbml0Q2FtZXJhKCkge1xuXHRcdHRoaXMuY2FtZXJhID0gbmV3IEJBQllMT04uRnJlZUNhbWVyYSgnY2FtZXJhMScsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMS41LCA3KSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5jYW1lcmEuc2V0VGFyZ2V0KG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgLTEpKVxuXHRcdHRoaXMuY2FtZXJhLmF0dGFjaENvbnRyb2wodGhpcy5jYW52YXMsIGZhbHNlKTtcblx0XHR0aGlzLlNjZW5lLmFjdGl2ZUNhbWVyYXMucHVzaCh0aGlzLmNhbWVyYSlcblx0XHQvLyB0aGlzLmNhbWVyYTIgPSBuZXcgQkFCWUxPTi5GcmVlQ2FtZXJhKCdjYW1lcmExJywgbmV3IEJBQllMT04uVmVjdG9yMygxMCwgMSwgMCksIHRoaXMuU2NlbmUpO1xuXHRcdC8vIHRoaXMuY2FtZXJhMi5zZXRUYXJnZXQobmV3IEJBQllMT04uVmVjdG9yMygwLCAxLCAwKSlcblx0XHQvLyB0aGlzLmNhbWVyYTIuYXR0YWNoQ29udHJvbCh0aGlzLmNhbnZhcywgZmFsc2UpO1xuXHRcdC8vIHRoaXMuY2FtZXJhMi5pbnB1dHMuYWRkTW91c2VXaGVlbCgpO1xuXHRcdC8vIHRoaXMuU2NlbmUuYWN0aXZlQ2FtZXJhcy5wdXNoKHRoaXMuY2FtZXJhMilcblx0XHQvLyB0aGlzLmNhbWVyYS52aWV3cG9ydCA9IG5ldyBCQUJZTE9OLlZpZXdwb3J0KDAuNSwwLDAuNSwxKVxuXHRcdC8vIHRoaXMuY2FtZXJhMi52aWV3cG9ydCA9IG5ldyBCQUJZTE9OLlZpZXdwb3J0KDAsMCwwLjUsMSlcblx0fVxuXG5cdGluaXRTa3koKSB7XG5cdFx0QkFCWUxPTi5FbmdpbmUuU2hhZGVyc1JlcG9zaXRvcnkgPSBcIi4uL3NoYWRlcnMvXCI7XG4gICAgY29uc3Qgc2t5Ym94ID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVTcGhlcmUoXCJza3lCb3hcIiwgeyBzZWdtZW50czogMTAsIGRpYW1ldGVyOiAyNTAwIH0sIHRoaXMuU2NlbmUpO1xuICAgIGNvbnN0IHNoYWRlciA9IG5ldyBCQUJZTE9OLlNoYWRlck1hdGVyaWFsKFwiZ3JhZGllbnRcIiwgdGhpcy5TY2VuZSwgXCJncmFkaWVudFwiLCB7fSk7XG4gICAgc2hhZGVyLnNldEZsb2F0KFwib2Zmc2V0XCIsIDApO1xuICAgIHNoYWRlci5zZXRGbG9hdChcImV4cG9uZW50XCIsIDAuNik7XG4gICAgc2hhZGVyLnNldENvbG9yMyhcInRvcENvbG9yXCIsIEJBQllMT04uQ29sb3IzLkZyb21JbnRzKDAsMTE5LDI1NSkpO1xuICAgIHNoYWRlci5zZXRDb2xvcjMoXCJib3R0b21Db2xvclwiLCBCQUJZTE9OLkNvbG9yMy5Gcm9tSW50cygyNDAsMjQwLCAyNTUpKTtcbiAgICBzaGFkZXIuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XG4gICAgc2t5Ym94Lm1hdGVyaWFsID0gc2hhZGVyOyBcbiAgICBcbiAgICAvL0NyZWF0ZSBGb2cgIFxuICAgIHRoaXMuU2NlbmUuZm9nTW9kZSA9IEJBQllMT04uU2NlbmUuRk9HTU9ERV9FWFAyO1xuICAgIHRoaXMuU2NlbmUuZm9nRGVuc2l0eSA9IDAuMDAzO1xuICAgIHRoaXMuU2NlbmUuZm9nQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC44LDAuODMsMC44KTtcblx0fVxuXG5cdGxvYWRHcm91bmQoKSB7XG5cdFx0dGhpcy5ncm91bmREaXZzID0gNjQ7XG5cdFx0dGhpcy50aWxlU2l6ZSA9IDEwMDA7XG5cdFx0dGhpcy5ib3R0b21Qb2ludCA9IC0xNTtcblx0XHR0aGlzLnRvcFBvaW50ID0gMTtcblx0XHR0aGlzLmdyb3VuZCA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlR3JvdW5kRnJvbUhlaWdodE1hcCgnZ3JvdW5kJywgJy9tYXAuanBnJywge1xuXHRcdFx0d2lkdGg6IHRoaXMudGlsZVNpemUsXG5cdFx0XHRoZWlnaHQ6IHRoaXMudGlsZVNpemUsXG5cdFx0XHRzdWJkaXZpc2lvbnM6IHRoaXMuc3ViZGl2aXNpb25zLFxuXHRcdFx0bWluSGVpZ2h0OiBcdHRoaXMuYm90dG9tUG9pbnQsXG5cdFx0XHRtYXhIZWlnaHQ6IHRoaXMudG9wUG9pbnQsXG5cdFx0XHR1cGRhdGFibGU6IHRydWVcblx0XHR9LCB0aGlzLlNjZW5lKVxuXHRcdGNvbnN0IGdyb3VuZE1hdGVyaWFsMSA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRNYXRcIiwgdGhpcy5TY2VuZSk7XG5cdFx0Z3JvdW5kTWF0ZXJpYWwxLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcIi9ncmFzMS5qcGdcIiwgdGhpcy5TY2VuZSk7XG5cdFx0Z3JvdW5kTWF0ZXJpYWwxLmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDEwLjA7XG5cdFx0Z3JvdW5kTWF0ZXJpYWwxLmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDEwLjA7XHRcblx0XHR0aGlzLmdyb3VuZC5tYXRlcmlhbCA9IGdyb3VuZE1hdGVyaWFsMTtcblx0XHR0aGlzLmdyb3VuZC5yZWNlaXZlU2hhZG93cyA9IHRydWU7XG5cdFx0dGhpcy5ncm91bmQuY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcblx0XHR0aGlzLnNoYWRvd0dlbmVyYXRvci5nZXRTaGFkb3dNYXAoKS5yZW5kZXJMaXN0LnB1c2godGhpcy5ncm91bmQpO1xuXHRcdC8vIHRoaXMuZ3JvdW5kLnBoeXNpY3NJbXBvc3RvciA9IG5ldyBCQUJZTE9OLlBoeXNpY3NJbXBvc3Rvcih0aGlzLmdyb3VuZCwgQkFCWUxPTi5QaHlzaWNzSW1wb3N0b3IuQm94SW1wb3N0b3IsIHsgbWFzczogMCwgZnJpY3Rpb246IDAuNSwgcmVzdGl0dXRpb246IDAuNyB9LCB0aGlzLlNjZW5lKTsgXG5cdH1cblxuXHRjYWxjRWxldmF0aW9uKHgsIHopIHtcblx0XHRjb25zdCByYXkgPSBuZXcgQkFCWUxPTi5SYXkobmV3IEJBQllMT04uVmVjdG9yMygwLCB0aGlzLnRvcFBvaW50ICsgMTAgLCAwKSwgbmV3IEJBQllMT04uVmVjdG9yMygwLCB0aGlzLmJvdHRvbVBvaW50IC0gMTAsMCksICgodGhpcy50b3BQb2ludCAtIHRoaXMuYm90dG9tUG9pbnQpKzIwKSk7XG5cdFx0cmF5Lm9yaWdpbi54ID0geDtcblx0XHRyYXkub3JpZ2luLnogPSB6OyAgXG5cdFx0Y29uc3QgaSA9IHRoaXMuZ3JvdW5kLmludGVyc2VjdHMocmF5KTtcblx0XHRcdFxuXHRcdGlmICghaSB8fCAhaS5waWNrZWRQb2ludCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBpLnBpY2tlZFBvaW50Lnk7XG5cdH1cblxuXHRhc3luYyBsb2FkR3VuKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdHdpbmRvdy5CQUJZTE9OLlNjZW5lTG9hZGVyLkltcG9ydE1lc2goJycsICcvJywgXCJ3ZWFwb25fMi5vYmpcIiwgdGhpcy5TY2VuZSwgKG1lc2gpID0+IHtcblx0XHRcdFx0dGhpcy5ndW4gPSBtZXNoWzBdO1xuXHRcdFx0XHR0aGlzLmd1bi5zZXRFbmFibGVkKGZhbHNlKVxuXHRcdFx0XHR0aGlzLmd1bi5pc1Zpc2libGUgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5ndW4ubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiTWF0XCIsIHRoaXMuU2NlbmUpO1xuICAgICAgICB0aGlzLmd1bi5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCIvd2VhcG9uXzIucG5nXCIsIHRoaXMuU2NlbmUpO1xuICAgICAgICB0aGlzLmd1bi5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7ICBcblx0XHRcdFx0cmVzb2x2ZShtZXNoKVxuXHRcdFx0fSk7XG5cdFx0fSlcblx0fVxuXG5cdGxvYWRTb2xpZGVyKCkge1xuXHRcdGNvbnN0IHNvbGRpZXIgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJzb2xkaWVyXCIsIHtzaXplOiA4fSwgdGhpcy5TY2VuZSk7XG5cdFx0c29sZGllci5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJNYXQxXCIsIHRoaXMuU2NlbmUpO1xuICAgIHNvbGRpZXIubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAsIDAsIDEpO1xuXHRcdHRoaXMuc29sZGllciA9IHNvbGRpZXI7XG5cdFx0dGhpcy5zb2xkaWVyLmlzVmlzaWJsZSA9IGZhbHNlO1xuXHRcdHRoaXMuc29sZGllci5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgMCk7XG5cdH1cblxuXHRsb2FkUGh5c2ljcygpIHtcblx0XHQvLyBjb25zdCBncmF2aXR5VmVjdG9yID0gbmV3IEJBQllMT04uVmVjdG9yMygwLC05LjgxLCAwKTtcblx0XHQvLyBjb25zdCBwaHlzaWNzUGx1Z2luID0gbmV3IEJBQllMT04uQ2Fubm9uSlNQbHVnaW4oKTtcblx0XHQvLyB0aGlzLlNjZW5lLmVuYWJsZVBoeXNpY3MoZ3Jhdml0eVZlY3RvciwgcGh5c2ljc1BsdWdpbik7XG5cdFx0Ly8gdGhpcy5TY2VuZS5lbmFibGVQaHlzaWNzKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwtOS44MSwgMCksIG5ldyBCQUJZTE9OLk9pbW9KU1BsdWdpbigpKVxuXHRcdHRoaXMuU2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuMDQsIDApXG5cdFx0dGhpcy5TY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XG5cdH1cblxuXHRsb2FkQm94ZXMoKSB7XG5cdFx0Y29uc3QgYm94ID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwiY3JhdGVcIiwge3NpemU6IDh9LCB0aGlzLlNjZW5lKTtcbiAgICBcbiAgICBib3gubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiTWF0XCIsIHRoaXMuU2NlbmUpO1xuICAgIGJveC5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCIvY3JhdGUuanBnXCIsIHRoaXMuU2NlbmUpO1xuICAgIGJveC5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7XG4gICAgXG4gICAgYm94LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygxMCwgMCwgMTApOyBcblx0XHRib3gucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuXHRcdHRoaXMuc2hhZG93R2VuZXJhdG9yLmdldFNoYWRvd01hcCgpLnJlbmRlckxpc3QucHVzaChib3gpO1xuICAgIGJveC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuICAgIHRoaXMuYm94ZXMucHVzaChib3gpO1xuICAgIC8vdGhpcy5ib3gucG9zaXRpb24ueSA9IHRoaXMucmVuZGVyLnRlcnJhaW4uY2FsY0VsZXZhdGlvbig1LCAxMCkgKyA1O1xuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdERhdGEuYm94U2l6ZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNsb25lID0gYm94LmNyZWF0ZUluc3RhbmNlKFwiYm94XCIgKyBpKTtcbiAgICAgICAgY2xvbmUudHlwZSA9ICdib3gnO1xuICAgICAgICBjbG9uZS5wb3NpdGlvbi54ID0gaW5pdERhdGEuYm94UG9zaXRpb25baSoyXTsgXG4gICAgICAgIGNsb25lLnBvc2l0aW9uLnogPSBpbml0RGF0YS5ib3hQb3NpdGlvbltpKjIgKyAxXTtcbiAgICAgICAgY2xvbmUucm90YXRpb24ueSA9IGluaXREYXRhLmJveFJvdGF0aW9uW2ldO1xuICAgICAgICBcbiAgICAgICAgLy9BZGQgTGlnaHRzIGFuZCBQaHlzaWNzXG5cdFx0XHRcdHRoaXMuc2hhZG93R2VuZXJhdG9yLmdldFNoYWRvd01hcCgpLnJlbmRlckxpc3QucHVzaChjbG9uZSk7XG5cdFx0XHRcdGNsb25lLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7IFxuXHRcdFx0XHQvLyBjbG9uZS5waHlzaWNzSW1wb3N0b3IgPSBuZXcgQkFCWUxPTi5QaHlzaWNzSW1wb3N0b3IoY2xvbmUsIEJBQllMT04uUGh5c2ljc0ltcG9zdG9yLkJveEltcG9zdG9yLCB7IG1hc3M6IDAuMSB9LCB0aGlzLlNjZW5lKTtcblx0XHRcdFx0dGhpcy5ib3hlcy5wdXNoKGNsb25lKTtcbiAgICB9XG5cdH1cblxuXHRsb2FkTGlnaHQoKSB7XG5cdFx0dGhpcy5saWdodEhlbSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJsaWdodEhlbVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIDApLCB0aGlzLlNjZW5lKTtcbiAgICB0aGlzLmxpZ2h0SGVtLmludGVuc2l0eSA9IDAuODtcblx0XHR0aGlzLmxpZ2h0RGlyID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0RGlyXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMiwgNCwgMiksIHRoaXMuU2NlbmUpOyAgICBcblx0XHR0aGlzLmxpZ2h0RGlyLmRpZmZ1c2UgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMSwgMSwgMSk7XHRcblx0XHR0aGlzLmxpZ2h0RGlyLnNwZWN1bGFyID0gbmV3IEJBQllMT04uQ29sb3IzKDAsIDAsIDApO1xuXHRcdHRoaXMubGlnaHREaXIucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDI1MCwgNDAwLCAwKTtcbiAgICB0aGlzLmxpZ2h0RGlyLmludGVuc2l0eSA9IDEuODtcblx0XHR0aGlzLnNoYWRvd0dlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcig0MTkyLCB0aGlzLmxpZ2h0RGlyKTtcbiAgICB0aGlzLnNoYWRvd0dlbmVyYXRvci51c2VWYXJpYW5jZVNoYWRvd01hcCA9IGZhbHNlOyBcblx0fVxuXG5cdFVwZGF0ZSgpIHtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHR9XG5cblx0YmluZEV2ZW50KCkge1xuXG5cdH1cblxuXHRsb2FkTG9jYWxQbGF5ZXIoKXtcblxuXHR9XG5cblx0bG9hZE9wb25lbnQoKSB7XG5cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLlNjZW5lLnJlbmRlcigpO1xuXHRcdGlmKHRoaXMubG9hZCl7XG5cdFx0XHR0aGlzLmNvbnRyb2xsZXIuVXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cmVzaXplKCkge1xuXG5cdH1cblxuXHREZXN0cm95KCkge1xuXG5cdH1cbn0iXSwibmFtZXMiOlsiUGxheWVyIiwieCIsInkiLCJ6IiwiX25hbWUiLCJfeCIsIl95IiwiX3oiLCJfcm90WCIsIl9yb3RZIiwiX3JvdFoiLCJfaWQiLCJfY29sb3IiLCJfaGl0UG9pbnRzIiwiX2lzRGVhZCIsIl9oZWlnaHQiLCJfZGVhdGhzIiwiX2tpbGxzIiwiaWQiLCJuYW1lIiwiciIsImciLCJiIiwiZCIsImgiLCJXZWFwb24iLCJQbGF5ZXJNb2QiLCJMb2NhbFBsYXllciIsInNjZW5lIiwicGxheWVyIiwiZ3VuIiwiY3JlYXRlSW5zdGFuY2UiLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsImlzVmlzaWJsZSIsInBvc2l0aW9uIiwiY2FtZXJhU3BlZWQiLCJqdW1wSGVpZ2h0IiwibWVzaCIsImp1bXBVcCIsImlzSnVtcGluZyIsImNhbWVyYSIsInNwZWVkIiwia2V5c1VwIiwia2V5c0Rvd24iLCJrZXlzTGVmdCIsImtleXNSaWdodCIsInJlc2V0Q2FtZXJhQ29vcmRpbmF0ZXMiLCJpbml0UGh5c2ljcyIsImxhc3RQb3NpdGlvbiIsIkJBQllMT04iLCJWZWN0b3IzIiwibGFzdFJvdGF0aW9uIiwiYmluZEV2ZW50Iiwid2VhcG9uIiwicGFyZW50IiwidXBkYXRlUG9zaXRpb24iLCJjaGVja0NvbnRyb2xzIiwiUGFubmVsIiwidXBkYXRlSGVhbHRoQmFyIiwiZ2V0SGl0UG9pbnRzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25LZXlVcCIsIm9uS2V5RG93biIsImtleUNvZGUiLCJwb2ludGVySWQiLCJjaGVja0NvbGxpc2lvbnMiLCJ1c2VPY3RyZWVGb3JDb2xsaXNpb25zIiwiYXBwbHlHcmF2aXR5IiwiZWxsaXBzb2lkIiwic3RvcmUiLCJvbktleXVwIiwia2lsbGVyIiwic2V0RGVhZCIsInhPZmZzZXQiLCJhYnMiLCJ5T2Zmc2V0Iiwiek9mZnNldCIsInhSb3RPZmZzZXQiLCJ5Um90T2Zmc2V0IiwielJvdE9mZnNldCIsInBvc09mZnNldCIsInJvdE9mZnNldCIsInN1Ym1pdE1vdmVtZW50IiwiY29uc29sZSIsImxvZyIsImNvbnRyb2xsZXIiLCJzZW5kTG9jYWxQbGF5ZXJNb3ZlbWVudCIsImlzRG93biIsInN0YXRlIiwiSlVNUCIsImp1bXAiLCJGSVJFIiwiaXNEZWFkIiwiZmlyZSIsImNhbSIsImFuaW1hdGlvbnMiLCJhIiwiQW5pbWF0aW9uIiwiQU5JTUFUSU9OVFlQRV9GTE9BVCIsIkFOSU1BVElPTkxPT1BNT0RFX0NZQ0xFIiwia2V5cyIsInB1c2giLCJmcmFtZSIsInZhbHVlIiwic2V0S2V5cyIsImVhc2luZ0Z1bmN0aW9uIiwiQ2lyY2xlRWFzZSIsInNldEVhc2luZ01vZGUiLCJFYXNpbmdGdW5jdGlvbiIsIkVBU0lOR01PREVfRUFTRUlOT1VUIiwic2V0RWFzaW5nRnVuY3Rpb24iLCJTY2VuZSIsImJlZ2luQW5pbWF0aW9uIiwicG9zIiwiaGVpZ2h0T2ZUZXJyYWluIiwiZGlmZiIsImJpYXMiLCJjYWxjRWxldmF0aW9uIiwiZ2V0SGVpZ2h0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJTY2VuZUxvYWRlciIsIkltcG9ydE1lc2giLCJtYXRlcmlhbCIsIlN0YW5kYXJkTWF0ZXJpYWwiLCJkaWZmdXNlVGV4dHVyZSIsIlRleHR1cmUiLCJoYXNBbHBoYSIsIlRyYW5zZm9ybU5vZGUiLCJmYWNlQ29sb3JzIiwiaGVhZCIsIk1lc2hCdWlsZGVyIiwiQ3JlYXRlQm94Iiwid2lkdGgiLCJoZWlnaHQiLCJpbmRpY2VzIiwiZ2V0SW5kaWNlcyIsInBvc2l0aW9ucyIsImdldFZlcnRpY2VzRGF0YSIsIlZlcnRleEJ1ZmZlciIsIlBvc2l0aW9uS2luZCIsImNvbG9ycyIsIkNvbG9yS2luZCIsIm5iVmVydGljZXMiLCJsZW5ndGgiLCJBcnJheSIsImZpbGwiLCJ2ZXJ0ZXgiLCJpIiwic2V0VmVydGljZXNEYXRhIiwibG9jYWxseVRyYW5zbGF0ZSIsImhhaXIiLCJzZXRQaXZvdE1hdHJpeCIsIk1hdHJpeCIsIlRyYW5zbGF0aW9uIiwiZGlmZnVzZUNvbG9yIiwiQ29sb3IzIiwiYm9keSIsImRlcHRoIiwiYnV0IiwibGVmdGFybSIsImxlZnRlbGJvdyIsImxlZnRsb3dlcmFybSIsImxlZnR3YWlzdCIsImxlZnRoYW5kIiwicmloZ3R1cHBlcmFybSIsInJpaGd0ZWxib3ciLCJyaWhndGxvd2VyYXJtIiwicmloZ3R3YWlzdCIsInJpaGd0aGFuZCIsImxlZnRsZWciLCJsZWZ0a25lZWwiLCJsZWZ0bG93ZXJsZWciLCJsZWZ0Zm9vdCIsInJpZ2h0bGVnIiwicmlnaHRrbmVlbCIsInJpZ2h0bG93ZXJsZWciLCJyaWdodGZvb3QiLCJzZXRFbmFibGVkIiwic2l6ZSIsInNoYWRlIiwicGlsb3RfbG9jYWxfYXhpc1giLCJNZXNoIiwiQ3JlYXRlTGluZXMiLCJaZXJvIiwiY29sb3IiLCJwaWxvdF9sb2NhbF9heGlzWSIsInBpbG90X2xvY2FsX2F4aXNaIiwibG9jYWxfb3JpZ2luIiwicnVuIiwiQW5pbWF0aW9uR3JvdXAiLCJmcmFtZVJhdGUiLCJsZWZ0YW5pbWUiLCJrZXlGcmFtZXMiLCJyaWdodGFuaW1lIiwicmlnaHRrZXlGcmFtZXMiLCJhZGRUYXJnZXRlZEFuaW1hdGlvbiIsIm5vcm1hbGl6ZSIsInBsYXkiLCJjbG9uZSIsInJlbW90ZVBsYXllciIsInAiLCJjcmVhdGVQbGF5ZXIiLCJob2xkR3VuIiwicm90IiwiYXNiIiwibGFzdCIsImRpc3Bvc2UiLCJfaW5pdGlhbFJvdGF0aW9uIiwiYW1tb1NpemUiLCJjdXJyZW50QW1tbyIsImZpcmVSYXRlIiwiX2N1cnJlbnRGaXJlUmF0ZSIsImNhbkZpcmUiLCJyZWxvYWRpbmciLCJyZWdpc3RlckJlZm9yZVJlbmRlciIsImVuZ2luZSIsImdldERlbHRhVGltZSIsImFuaW1hdGVSZWxvYWQiLCJzZXRUaW1lb3V0Iiwic291bmQiLCJndW5GaXJlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwicGlja1Jlc3VsdCIsInBpY2siLCJwaWNrZWRNZXNoIiwicmVtb3RlUGxheWVycyIsImhpdFBsYXllciIsInNob3RGaXJlZCIsImFuaW1hdGUiLCJzdGFydCIsImVuZCIsImRpc3BsYXkiLCJBTklNQVRJT05UWVBFX1ZFQ1RPUjMiLCJBTklNQVRJT05MT09QTU9ERV9DT05TVEFOVCIsImltcGFjdCIsIkNyZWF0ZVBsYW5lIiwiQ29udHJvbGxlciIsIlNvdW5kIiwiaW5pdERhdGEiLCJCYWJ5bG9uU2NlbmUiLCJjYW52YXMiLCJib3hlcyIsImluaXRDYW1lcmEiLCJsb2FkTGlnaHQiLCJsb2FkUGh5c2ljcyIsImluaXRTa3kiLCJsb2FkR3JvdW5kIiwibG9hZEd1biIsInRoZW4iLCJGcmVlQ2FtZXJhIiwic2V0VGFyZ2V0IiwiYXR0YWNoQ29udHJvbCIsImFjdGl2ZUNhbWVyYXMiLCJFbmdpbmUiLCJTaGFkZXJzUmVwb3NpdG9yeSIsInNreWJveCIsIkNyZWF0ZVNwaGVyZSIsInNlZ21lbnRzIiwiZGlhbWV0ZXIiLCJzaGFkZXIiLCJTaGFkZXJNYXRlcmlhbCIsInNldEZsb2F0Iiwic2V0Q29sb3IzIiwiRnJvbUludHMiLCJiYWNrRmFjZUN1bGxpbmciLCJmb2dNb2RlIiwiRk9HTU9ERV9FWFAyIiwiZm9nRGVuc2l0eSIsImZvZ0NvbG9yIiwiZ3JvdW5kRGl2cyIsInRpbGVTaXplIiwiYm90dG9tUG9pbnQiLCJ0b3BQb2ludCIsImdyb3VuZCIsIkNyZWF0ZUdyb3VuZEZyb21IZWlnaHRNYXAiLCJzdWJkaXZpc2lvbnMiLCJtaW5IZWlnaHQiLCJtYXhIZWlnaHQiLCJ1cGRhdGFibGUiLCJncm91bmRNYXRlcmlhbDEiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJyZWNlaXZlU2hhZG93cyIsInNoYWRvd0dlbmVyYXRvciIsImdldFNoYWRvd01hcCIsInJlbmRlckxpc3QiLCJyYXkiLCJSYXkiLCJvcmlnaW4iLCJpbnRlcnNlY3RzIiwicGlja2VkUG9pbnQiLCJzb2xkaWVyIiwiZ3Jhdml0eSIsImNvbGxpc2lvbnNFbmFibGVkIiwiYm94IiwiYm94U2l6ZSIsInR5cGUiLCJib3hQb3NpdGlvbiIsImJveFJvdGF0aW9uIiwibGlnaHRIZW0iLCJIZW1pc3BoZXJpY0xpZ2h0IiwiaW50ZW5zaXR5IiwibGlnaHREaXIiLCJEaXJlY3Rpb25hbExpZ2h0IiwiZGlmZnVzZSIsInNwZWN1bGFyIiwiU2hhZG93R2VuZXJhdG9yIiwidXNlVmFyaWFuY2VTaGFkb3dNYXAiLCJyZW5kZXIiLCJsb2FkIiwiVXBkYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==