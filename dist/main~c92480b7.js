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
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144);
/* harmony import */ var _weapon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(251);




var LocalPlayer = /*#__PURE__*/function () {
  function LocalPlayer(scene, player) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, LocalPlayer);

    this.player = player;
    this.scene = scene;
    this.cameraSpeed = 0.6;
    this.jumpHeight = 2.5;
    this.mesh = this.scene.soldier;
    this.mesh.name = player._id;
    this.mesh.player.setEnabled(true);
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
    this.weapon = new _weapon_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(scene, player, this.mesh.player);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(LocalPlayer, [{
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
      console.log(event);
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
      console.log('sub');
      this.mesh.run();
      this.mesh.player.position = new BABYLON.Vector3(this.scene.camera.position.x - 0.3, this.scene.camera.position.y - 0.5, this.scene.camera.position.z);
      this.mesh.player.rotation.y = this.scene.camera.rotation.y;
      this.mesh.player.rotation = this.scene.camera.rotation;
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
    value: function jump() {}
  }, {
    key: "checkFreeFall",
    value: function checkFreeFall() {}
  }, {
    key: "checkJump",
    value: function checkJump() {}
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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(687);





var PlayerMod = /*#__PURE__*/function () {
  function PlayerMod(scene) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(this, PlayerMod);

    this.Scene = scene;
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
      this.player.setEnabled(false); // this.gun.parent = this.player;
      // this.gun.rotation.y = -Math.PI / 2;
      // this.gun.setEnabled(false);
      // this.gun.position.z -= 2;
      // this.gun.position.x -= 0.5;
      // this.gun.position.y -= 1;
      // const CoTAxis = this.localAxes(2, 0);
      // CoTAxis.parent = this.player;

      this.player.position = new BABYLON.Vector3(0, 0.1, 0);
      var faceColors = []; // faceColors[0] = BABYLON.Color3.Blue();
      // faceColors[1] = BABYLON.Color3.White()
      // faceColors[2] = BABYLON.Color3.Red();
      // faceColors[3] = BABYLON.Color3.Black();
      // faceColors[4] = BABYLON.Color3.Green();
      // faceColors[5] = BABYLON.Color3.Yellow();

      this.head = new BABYLON.MeshBuilder.CreateBox("head", {
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

      this.head.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors); // head.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.4, 0))

      this.head.locallyTranslate(new BABYLON.Vector3(0, 0.4, 0));
      ;
      var hair = new BABYLON.MeshBuilder.CreateBox("hair", {
        width: 1,
        height: 0.2
      }, this.Scene);
      hair.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.1, 0));
      hair.parent = this.head;
      hair.locallyTranslate(new BABYLON.Vector3(0, 0.5, 0));
      ;
      hair.material = new BABYLON.StandardMaterial("hairm", this.Scene);
      hair.material.diffuseColor = new BABYLON.Color3(0.61, 0.23, 0.29);
      this.body = new BABYLON.MeshBuilder.CreateBox("body", {
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
    var p = new _playerMod_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(scene.Scene);
    p.createPlayer();
    p.holdGun();
    this.scene = scene;
    this.mesh = p;
    this.mesh.player.setEnabled(true);
    this.mesh.player.name = player._id;
    this.mesh.player.position.x = player._x;
    this.mesh.player.position.y = player._y;
    this.mesh.player.position.z = player._z; // this.scene.shadowGenerator.getShadowMap().renderList.push(this.mesh.player);

    this.weapon = new _weapon_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(scene, player, this.mesh.player); // this.mesh.player.checkCollisions = true;
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
  function Weapon(scene, player, parent) {
    var _this = this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this, Weapon);

    this.scene = scene;
    this.player = player;
    var wp = this.scene.gun.createInstance(player._id);
    console.log(wp);
    wp.isVisible = true;
    wp.rotationQuaternion = null;
    wp.parent = parent; // wp.position = new BABYLON.Vector3(-0.2, 0 ,2); 

    wp.locallyTranslate(new BABYLON.Vector3(-0.5, -0.8, -1.8)); // wp.rotation.x = -Math.PI/2;

    wp.rotation.y = -Math.PI / 2;
    this.mesh = wp;
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
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(861);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(144);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(687);
/* harmony import */ var _models_playerMod_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _controller_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(249);
/* harmony import */ var _controller_sound_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(268);
/* harmony import */ var _store_initData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(842);









var BabylonScene = /*#__PURE__*/function () {
  function BabylonScene(engine, canvas, store) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(this, BabylonScene);

    this.canvas = canvas;
    console.log(store);
    this.store = store;
    this.boxes = [];
    this.engine = engine;
    this.Scene = new BABYLON.Scene(engine);
    this.controller = new _controller_controller_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(this);
    this.sound = new _controller_sound_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z(this.Scene);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(BabylonScene, [{
    key: "Create",
    value: function Create() {
      var _this = this;

      this.initCamera();
      this.loadLight();
      this.loadPhysics();
      this.initSky();
      this.loadGround(); // this.loadBoxes();

      this.loadGun().then(function () {
        _this.loadSolider();
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
    key: "loadGun",
    value: function () {
      var _loadGun = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__.mark(function _callee() {
        var mesh;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return window.BABYLON.SceneLoader.ImportMeshAsync('', './', "weapon_2.obj", this.Scene);

              case 2:
                mesh = _context.sent;
                console.log(mesh);
                this.gun = mesh.meshes[0];
                this.gun.isVisible = false;
                this.gun.material = new BABYLON.StandardMaterial("Mat", this.Scene);
                this.gun.material.diffuseTexture = new BABYLON.Texture("/weapon_2.png", this.Scene);
                this.gun.material.diffuseTexture.hasAlpha = true;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadGun() {
        return _loadGun.apply(this, arguments);
      }

      return loadGun;
    }()
  }, {
    key: "loadSolider",
    value: function loadSolider() {
      var _this2 = this;

      var p = new _models_playerMod_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(this.Scene); // this.showAxis(10);

      p.createPlayer();
      p.holdGun();
      p.run();
      this.soldier = p;
      setTimeout(function () {
        _this2.controller.requestAllPlayers();
      }, 5000);
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

      for (var i = 0; i < _store_initData_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].boxSize */ .Z.boxSize; i++) {
        var clone = box.createInstance("box" + i);
        clone.type = 'box';
        clone.position.x = _store_initData_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].boxPosition */ .Z.boxPosition[i * 2];
        clone.position.z = _store_initData_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].boxPosition */ .Z.boxPosition[i * 2 + 1];
        clone.rotation.y = _store_initData_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].boxRotation */ .Z.boxRotation[i]; //Add Lights and Physics

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbn5jOTI0ODBiNy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkE7RUFDcEIsZ0JBQ0NDLENBREQsRUFDSUMsQ0FESixFQUNPQyxDQURQLEVBRUU7SUFBQTs7SUFDRCxLQUFLQyxLQUFMLEdBQWEsU0FBYjtJQUNBLEtBQUtDLEVBQUwsR0FBVUosQ0FBVjtJQUNBLEtBQUtLLEVBQUwsR0FBVUosQ0FBVjtJQUNBLEtBQUtLLEVBQUwsR0FBVUosQ0FBVjtJQUNBLEtBQUtLLEtBQUwsR0FBYSxDQUFiO0lBQ0EsS0FBS0MsS0FBTCxHQUFhLENBQWI7SUFDQSxLQUFLQyxLQUFMLEdBQWEsQ0FBYjtJQUNBLEtBQUtDLEdBQUw7SUFDQSxLQUFLQyxNQUFMO0lBQ0EsS0FBS0MsVUFBTCxHQUFrQixHQUFsQjtJQUNBLEtBQUtDLE9BQUwsR0FBZSxLQUFmO0lBQ0EsS0FBS0MsT0FBTCxHQUFlLENBQWY7SUFFQSxLQUFLQyxPQUFMLEdBQWUsQ0FBZjtJQUNBLEtBQUtDLE1BQUwsR0FBYyxDQUFkO0VBQ0E7Ozs7V0FFRCxlQUFNQyxFQUFOLEVBQVU7TUFDVCxLQUFLUCxHQUFMLEdBQVdPLEVBQVg7SUFDQTs7O1dBRUQsaUJBQVFDLElBQVIsRUFBYztNQUNiLEtBQUtmLEtBQUwsR0FBYWUsSUFBYjtJQUNBOzs7V0FFRCxrQkFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZ0I7TUFDZixLQUFLVixNQUFMLEdBQWM7UUFDYlEsQ0FBQyxFQUFEQSxDQURhO1FBQ1hDLENBQUMsRUFBREEsQ0FEVztRQUNUQyxDQUFDLEVBQURBO01BRFMsQ0FBZDtJQUdBOzs7V0FFRCxnQkFBT3JCLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO01BQ2YsS0FBS0UsRUFBTCxHQUFVSixDQUFWO01BQ0EsS0FBS0ssRUFBTCxHQUFVSixDQUFWO01BQ0EsS0FBS0ssRUFBTCxHQUFVSixDQUFWO0lBQ0E7OztXQUVELGtCQUFTO01BQ1IsT0FBTztRQUFDRixDQUFDLEVBQUcsS0FBS0ksRUFBVjtRQUFjSCxDQUFDLEVBQUcsS0FBS0ksRUFBdkI7UUFBNEJILENBQUMsRUFBRyxLQUFLSTtNQUFyQyxDQUFQO0lBQ0E7OztXQUVELG1CQUFVTixDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CO01BQ2xCLEtBQUtLLEtBQUwsR0FBYVAsQ0FBYjtNQUNBLEtBQUtRLEtBQUwsR0FBYVAsQ0FBYjtNQUNBLEtBQUtRLEtBQUwsR0FBYVAsQ0FBYjtJQUNBOzs7V0FFRCxlQUFNO01BQ0wsS0FBS1UsVUFBTCxJQUFtQixFQUFuQjs7TUFDQSxJQUFHLEtBQUtBLFVBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7UUFDdkIsS0FBS0MsT0FBTCxHQUFlLElBQWY7TUFDQTs7TUFDRCxPQUFPLEtBQUtBLE9BQVo7SUFDQTs7O1dBRUQsaUJBQVFTLENBQVIsRUFBVztNQUNWLEtBQUtULE9BQUwsR0FBZVMsQ0FBZjtJQUNBOzs7V0FFRCxzQkFBYUMsQ0FBYixFQUFnQjtNQUNmLElBQUdBLENBQUMsR0FBRyxHQUFQLEVBQVlBLENBQUMsR0FBRyxHQUFKLENBQVosS0FDSyxJQUFHQSxDQUFDLEdBQUcsQ0FBUCxFQUFVQSxDQUFDLEdBQUcsQ0FBSjtNQUNmLEtBQUtYLFVBQUwsR0FBa0JXLENBQWxCO0lBQ0E7OztXQUVELHdCQUFlO01BQ1osT0FBTyxLQUFLWCxVQUFaO0lBQ0Y7OztXQUVELGtCQUFTO01BQ1IsT0FBTyxLQUFLQyxPQUFaO0lBQ0E7OztXQUVELG9CQUFXO01BQ1YsS0FBS0UsT0FBTCxJQUFnQixDQUFoQjtJQUNBOzs7V0FFRCxtQkFBVTtNQUNULEtBQUtDLE1BQUwsSUFBZSxDQUFmO0lBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25GRjs7SUFDcUJTO0VBQ3BCLHFCQUNDQyxLQURELEVBQ1FDLE1BRFIsRUFFRTtJQUFBOztJQUNELEtBQUtBLE1BQUwsR0FBY0EsTUFBZDtJQUNBLEtBQUtELEtBQUwsR0FBYUEsS0FBYjtJQUVBLEtBQUtFLFdBQUwsR0FBbUIsR0FBbkI7SUFDQSxLQUFLQyxVQUFMLEdBQWtCLEdBQWxCO0lBQ0EsS0FBS0MsSUFBTCxHQUFZLEtBQUtKLEtBQUwsQ0FBV0ssT0FBdkI7SUFDQSxLQUFLRCxJQUFMLENBQVVaLElBQVYsR0FBaUJTLE1BQU0sQ0FBQ2pCLEdBQXhCO0lBQ0EsS0FBS29CLElBQUwsQ0FBVUgsTUFBVixDQUFpQkssVUFBakIsQ0FBNEIsSUFBNUI7SUFDQSxLQUFLQyxNQUFMLEdBQWMsS0FBZDtJQUNBLEtBQUtDLFNBQUwsR0FBaUIsS0FBakI7SUFDQSxLQUFLUixLQUFMLENBQVdTLE1BQVgsQ0FBa0JDLEtBQWxCLEdBQTBCLEtBQUtSLFdBQS9CO0lBQ0EsS0FBS0YsS0FBTCxDQUFXUyxNQUFYLENBQWtCRSxNQUFsQixHQUEyQixDQUFDLEVBQUQsQ0FBM0IsQ0FaQyxDQVkrQjs7SUFDaEMsS0FBS1gsS0FBTCxDQUFXUyxNQUFYLENBQWtCRyxRQUFsQixHQUE2QixDQUFDLEVBQUQsQ0FBN0IsQ0FiQyxDQWFrQzs7SUFDbkMsS0FBS1osS0FBTCxDQUFXUyxNQUFYLENBQWtCSSxRQUFsQixHQUE2QixDQUFDLEVBQUQsQ0FBN0IsQ0FkQyxDQWNrQzs7SUFDbkMsS0FBS2IsS0FBTCxDQUFXUyxNQUFYLENBQWtCSyxTQUFsQixHQUE4QixDQUFDLEVBQUQsQ0FBOUIsQ0FmQyxDQWVtQzs7SUFDcEMsS0FBS0Msc0JBQUw7SUFDQSxLQUFLQyxXQUFMO0lBRUEsS0FBS0MsWUFBTCxHQUFvQixJQUFJQyxPQUFPLENBQUNDLE9BQVosQ0FBb0IsS0FBS25CLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQlcsUUFBbEIsQ0FBMkI5QyxDQUEvQyxFQUFrRCxLQUFLMEIsS0FBTCxDQUFXUyxNQUFYLENBQWtCVyxRQUFsQixDQUEyQjdDLENBQTdFLEVBQWdGLEtBQUt5QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCNUMsQ0FBM0csQ0FBcEI7SUFDQSxLQUFLNkMsWUFBTCxHQUFvQixJQUFJSCxPQUFPLENBQUNDLE9BQVosQ0FBb0IsS0FBS25CLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQmEsUUFBbEIsQ0FBMkJoRCxDQUEvQyxFQUFrRCxLQUFLMEIsS0FBTCxDQUFXUyxNQUFYLENBQWtCYSxRQUFsQixDQUEyQi9DLENBQTdFLEVBQWdGLEtBQUt5QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JhLFFBQWxCLENBQTJCOUMsQ0FBM0csQ0FBcEI7SUFFQSxLQUFLK0MsU0FBTDtJQUNBLEtBQUtDLE1BQUwsR0FBYyxJQUFJMUIsMkRBQUosQ0FBV0UsS0FBWCxFQUFrQkMsTUFBbEIsRUFBMEIsS0FBS0csSUFBTCxDQUFVSCxNQUFwQyxDQUFkO0VBQ0E7Ozs7V0FFRCxrQkFBUztNQUNSLEtBQUt3QixjQUFMO01BQ0EsS0FBS0MsYUFBTDtJQUNBOzs7V0FDRCxrQkFBU2pDLENBQVQsRUFBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWdCO01BQ2YsS0FBS00sTUFBTCxDQUFZaEIsTUFBWixHQUFxQjtRQUNwQlEsQ0FBQyxFQUFEQSxDQURvQjtRQUNsQkMsQ0FBQyxFQUFEQSxDQURrQjtRQUNoQkMsQ0FBQyxFQUFEQTtNQURnQixDQUFyQjtJQUdBOzs7V0FFRCxnQkFBT3JCLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO01BQ2YsS0FBS3lCLE1BQUwsQ0FBWXZCLEVBQVosR0FBaUJKLENBQWpCO01BQ0EsS0FBSzJCLE1BQUwsQ0FBWXRCLEVBQVosR0FBaUJKLENBQWpCO01BQ0EsS0FBSzBCLE1BQUwsQ0FBWXJCLEVBQVosR0FBaUJKLENBQWpCO0lBQ0E7OztXQUVELG1CQUFVRixDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CO01BQ2xCLEtBQUt5QixNQUFMLENBQVlwQixLQUFaLEdBQW9CUCxDQUFwQjtNQUNBLEtBQUsyQixNQUFMLENBQVluQixLQUFaLEdBQW9CUCxDQUFwQjtNQUNBLEtBQUswQixNQUFMLENBQVlsQixLQUFaLEdBQW9CUCxDQUFwQjtJQUNBOzs7V0FFRCxlQUFNO01BQ0wsS0FBS3lCLE1BQUwsQ0FBWWYsVUFBWixJQUEwQixFQUExQjs7TUFDQSxJQUFHLEtBQUtlLE1BQUwsQ0FBWWYsVUFBWixJQUEwQixDQUE3QixFQUErQjtRQUM5QixLQUFLZSxNQUFMLENBQVlkLE9BQVosR0FBc0IsSUFBdEI7TUFDQTs7TUFDRCxPQUFPLEtBQUtjLE1BQUwsQ0FBWWQsT0FBbkI7SUFDQTs7O1dBRUQsaUJBQVFTLENBQVIsRUFBVztNQUNWLEtBQUtLLE1BQUwsQ0FBWWQsT0FBWixHQUFzQlMsQ0FBdEI7SUFDQTs7O1dBRUQsc0JBQWFDLENBQWIsRUFBZ0I7TUFDZixJQUFHQSxDQUFDLEdBQUcsR0FBUCxFQUFZQSxDQUFDLEdBQUcsR0FBSixDQUFaLEtBQ0ssSUFBR0EsQ0FBQyxHQUFHLENBQVAsRUFBVUEsQ0FBQyxHQUFHLENBQUo7TUFDZixLQUFLSSxNQUFMLENBQVlmLFVBQVosR0FBeUJXLENBQXpCO01BQ0E4QixNQUFNLENBQUNDLGVBQVAsQ0FBdUIsS0FBSzNCLE1BQUwsQ0FBWTRCLFlBQVosRUFBdkI7SUFDQTs7O1dBRUQsa0JBQVM7TUFDUixPQUFPLEtBQUs1QixNQUFMLENBQVlkLE9BQW5CO0lBQ0E7OztXQUVELG9CQUFXO01BQ1YsS0FBS2MsTUFBTCxDQUFZWixPQUFaLElBQXVCLENBQXZCO0lBQ0E7OztXQUVELG1CQUFVO01BQ1QsS0FBS1ksTUFBTCxDQUFZWCxNQUFaLElBQXNCLENBQXRCO0lBQ0E7OztXQUVELHFCQUFZO01BQUE7O01BQ1h3QyxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQUNDLEtBQUQsRUFBVztRQUMzQyxLQUFJLENBQUNDLE9BQUwsQ0FBYUQsS0FBYjtNQUNBLENBRkQsRUFFRyxLQUZIO01BR0FGLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsVUFBQ0MsS0FBRCxFQUFXO1FBQzdDLEtBQUksQ0FBQ0UsU0FBTCxDQUFlRixLQUFmO01BQ0EsQ0FGRCxFQUVHLEtBRkg7TUFHQUYsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxVQUFDQyxLQUFELEVBQVc7UUFDL0NBLEtBQUssQ0FBQ0csT0FBTixHQUFnQkgsS0FBSyxDQUFDSSxTQUF0Qjs7UUFDQSxLQUFJLENBQUNILE9BQUwsQ0FBYUQsS0FBYjtNQUNBLENBSEQsRUFHRyxLQUhIO01BSUFGLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsYUFBeEIsRUFBdUMsVUFBQ0MsS0FBRCxFQUFXO1FBQ2pEQSxLQUFLLENBQUNHLE9BQU4sR0FBZ0JILEtBQUssQ0FBQ0ksU0FBdEI7O1FBQ0EsS0FBSSxDQUFDRixTQUFMLENBQWVGLEtBQWY7TUFDQSxDQUhELEVBR0csS0FISDtJQUlBOzs7V0FFRCx1QkFBYztNQUNiLEtBQUtoQyxLQUFMLENBQVdTLE1BQVgsQ0FBa0I0QixlQUFsQixHQUFvQyxJQUFwQztNQUNBLEtBQUtyQyxLQUFMLENBQVdTLE1BQVgsQ0FBa0I2QixzQkFBbEIsR0FBMkMsSUFBM0M7TUFDQSxLQUFLdEMsS0FBTCxDQUFXUyxNQUFYLENBQWtCOEIsWUFBbEIsR0FBaUMsSUFBakM7TUFDQSxLQUFLdkMsS0FBTCxDQUFXUyxNQUFYLENBQWtCK0IsU0FBbEIsR0FBOEIsSUFBSXRCLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUFzQixDQUF0QixFQUF3QixDQUF4QixDQUE5QixDQUphLENBS2I7SUFDQTs7O1dBRUQsa0JBQVMsQ0FDUjs7O1dBRUQsaUJBQVFhLEtBQVIsRUFBZTtNQUNkLEtBQUtoQyxLQUFMLENBQVd5QyxLQUFYLENBQWlCQyxPQUFqQixDQUF5QlYsS0FBekI7SUFDQTs7O1dBRUQsbUJBQVVBLEtBQVYsRUFBaUI7TUFDaEJXLE9BQU8sQ0FBQ0MsR0FBUixDQUFZWixLQUFaO01BQ0EsS0FBS2hDLEtBQUwsQ0FBV3lDLEtBQVgsQ0FBaUJQLFNBQWpCLENBQTJCRixLQUEzQjtJQUNBOzs7V0FFRCxtQkFBVWEsTUFBVixFQUFpQjtNQUNoQixLQUFLQyxPQUFMLENBQWEsSUFBYjtNQUNBLEtBQUs5QyxLQUFMLENBQVdTLE1BQVgsQ0FBa0JDLEtBQWxCLEdBQTBCLENBQTFCO0lBQ0E7OztXQUVELGtDQUF5QjtNQUN4QixLQUFLVixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCOUMsQ0FBM0IsR0FBK0IsS0FBSzJCLE1BQUwsQ0FBWXZCLEVBQTNDO01BQ0EsS0FBS3NCLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQlcsUUFBbEIsQ0FBMkI3QyxDQUEzQixHQUErQixLQUFLMEIsTUFBTCxDQUFZdEIsRUFBWixHQUFpQixDQUFoRDtNQUNBLEtBQUtxQixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCNUMsQ0FBM0IsR0FBK0IsS0FBS3lCLE1BQUwsQ0FBWXJCLEVBQTNDO0lBQ0E7OztXQUVELDBCQUFpQjtNQUNoQixJQUFNbUUsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLaEMsWUFBTCxDQUFrQjNDLENBQWxCLEdBQXNCLEtBQUswQixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCOUMsQ0FBMUQsQ0FBaEI7TUFDRSxJQUFNNEUsT0FBTyxHQUFHRixJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLaEMsWUFBTCxDQUFrQjFDLENBQWxCLEdBQXNCLEtBQUt5QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCN0MsQ0FBMUQsQ0FBaEI7TUFDQSxJQUFNNEUsT0FBTyxHQUFHSCxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLaEMsWUFBTCxDQUFrQnpDLENBQWxCLEdBQXNCLEtBQUt3QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCNUMsQ0FBMUQsQ0FBaEI7TUFFQSxJQUFNNEUsVUFBVSxHQUFHSixJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLNUIsWUFBTCxDQUFrQi9DLENBQWxCLEdBQXNCLEtBQUswQixLQUFMLENBQVdTLE1BQVgsQ0FBa0JhLFFBQWxCLENBQTJCaEQsQ0FBMUQsQ0FBbkI7TUFDQSxJQUFNK0UsVUFBVSxHQUFHTCxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLNUIsWUFBTCxDQUFrQjlDLENBQWxCLEdBQXNCLEtBQUt5QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JhLFFBQWxCLENBQTJCL0MsQ0FBMUQsQ0FBbkI7TUFDQSxJQUFNK0UsVUFBVSxHQUFHTixJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLNUIsWUFBTCxDQUFrQjdDLENBQWxCLEdBQXNCLEtBQUt3QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JhLFFBQWxCLENBQTJCOUMsQ0FBMUQsQ0FBbkI7TUFFQSxJQUFNK0UsU0FBUyxHQUFHUixPQUFPLEdBQUdHLE9BQVYsR0FBb0JDLE9BQXRDO01BQ0EsSUFBTUssU0FBUyxHQUFHSCxVQUFVLEdBQUdELFVBQWIsR0FBMEJFLFVBQTVDOztNQUVBLElBQUdDLFNBQVMsR0FBRyxHQUFaLElBQW1CQyxTQUFTLEdBQUcsSUFBbEMsRUFBdUM7UUFDbkMsS0FBS0MsY0FBTDtNQUNIO0lBQ0g7OztXQUVELDBCQUFpQjtNQUNoQmQsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBWjtNQUNBLEtBQUt4QyxJQUFMLENBQVVzRCxHQUFWO01BQ0EsS0FBS3RELElBQUwsQ0FBVUgsTUFBVixDQUFpQm1CLFFBQWpCLEdBQTRCLElBQUlGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixLQUFLbkIsS0FBTCxDQUFXUyxNQUFYLENBQWtCVyxRQUFsQixDQUEyQjlDLENBQTNCLEdBQStCLEdBQW5ELEVBQXdELEtBQUswQixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCN0MsQ0FBM0IsR0FBK0IsR0FBdkYsRUFBNEYsS0FBS3lCLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQlcsUUFBbEIsQ0FBMkI1QyxDQUF2SCxDQUE1QjtNQUNBLEtBQUs0QixJQUFMLENBQVVILE1BQVYsQ0FBaUJxQixRQUFqQixDQUEwQi9DLENBQTFCLEdBQThCLEtBQUt5QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JhLFFBQWxCLENBQTJCL0MsQ0FBekQ7TUFDQSxLQUFLNkIsSUFBTCxDQUFVSCxNQUFWLENBQWlCcUIsUUFBakIsR0FBNEIsS0FBS3RCLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQmEsUUFBOUM7TUFDQSxLQUFLdEIsS0FBTCxDQUFXMkQsVUFBWCxDQUFzQkMsdUJBQXRCLENBQThDLEtBQUs1RCxLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWhFLEVBQTBFLEtBQUtwQixLQUFMLENBQVdTLE1BQVgsQ0FBa0JhLFFBQTVGO01BQ0UsS0FBS0wsWUFBTCxHQUFvQixJQUFJQyxPQUFPLENBQUNDLE9BQVosQ0FBb0IsS0FBS25CLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQlcsUUFBbEIsQ0FBMkI5QyxDQUEzQixHQUErQixHQUFuRCxFQUF3RCxLQUFLMEIsS0FBTCxDQUFXUyxNQUFYLENBQWtCVyxRQUFsQixDQUEyQjdDLENBQTNCLEdBQThCLEdBQXRGLEVBQTJGLEtBQUt5QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCNUMsQ0FBdEgsQ0FBcEI7TUFDQSxLQUFLNkMsWUFBTCxHQUFvQixJQUFJSCxPQUFPLENBQUNDLE9BQVosQ0FBb0IsS0FBS25CLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQmEsUUFBbEIsQ0FBMkJoRCxDQUEvQyxFQUFtRCxLQUFLMEIsS0FBTCxDQUFXUyxNQUFYLENBQWtCYSxRQUFsQixDQUEyQi9DLENBQTlFLEVBQWtGLEtBQUt5QixLQUFMLENBQVdTLE1BQVgsQ0FBa0JhLFFBQWxCLENBQTJCOUMsQ0FBN0csQ0FBcEI7SUFDRjs7O1dBRUQseUJBQWdCO01BQ2YsSUFBRyxLQUFLd0IsS0FBTCxDQUFXeUMsS0FBWCxDQUFpQm9CLE1BQWpCLENBQXdCLEtBQUs3RCxLQUFMLENBQVd5QyxLQUFYLENBQWlCcUIsS0FBakIsQ0FBdUJDLElBQS9DLENBQUgsRUFBd0Q7UUFDdkQsSUFBRyxDQUFDLEtBQUt2RCxTQUFULEVBQW1CO1VBQ2xCLEtBQUt3RCxJQUFMO1FBQ0E7TUFDRDs7TUFDRCxJQUFHLEtBQUtoRSxLQUFMLENBQVd5QyxLQUFYLENBQWlCb0IsTUFBakIsQ0FBd0IsS0FBSzdELEtBQUwsQ0FBV3lDLEtBQVgsQ0FBaUJxQixLQUFqQixDQUF1QkcsSUFBL0MsQ0FBSCxFQUF3RDtRQUN2RCxJQUFHLENBQUMsS0FBS2hFLE1BQUwsQ0FBWWlFLE1BQVosRUFBSixFQUNFLEtBQUsxQyxNQUFMLENBQVkyQyxJQUFaO01BQ0Y7SUFDRDs7O1dBRUQsZ0JBQU8sQ0FFTjs7O1dBRUQseUJBQWUsQ0FFZDs7O1dBRUQscUJBQVksQ0FFWDs7O1dBRUQsbUJBQVUsQ0FFVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3pMbUJDO0VBQ25CLG1CQUFZcEUsS0FBWixFQUFtQjtJQUFBOztJQUNqQixLQUFLcUUsS0FBTCxHQUFhckUsS0FBYjtFQUVEOzs7Ozs2TEFDRjtRQUFBOztRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBLGlDQUNRLElBQUlzRSxPQUFKLENBQVksVUFBQUMsT0FBTyxFQUFJO2tCQUM3QnpDLE1BQU0sQ0FBQ1osT0FBUCxDQUFlc0QsV0FBZixDQUEyQkMsVUFBM0IsQ0FBc0MsRUFBdEMsRUFBMEMsR0FBMUMsRUFBK0MsY0FBL0MsRUFBK0QsS0FBSSxDQUFDSixLQUFwRSxFQUEyRSxVQUFDakUsSUFBRCxFQUFVO29CQUNwRixLQUFJLENBQUNzRSxHQUFMLEdBQVd0RSxJQUFJLENBQUMsQ0FBRCxDQUFmO29CQUNBLEtBQUksQ0FBQ3NFLEdBQUwsQ0FBU0MsU0FBVCxHQUFxQixLQUFyQjtvQkFDQSxLQUFJLENBQUNELEdBQUwsQ0FBU0UsUUFBVCxHQUFvQixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsS0FBN0IsRUFBb0MsS0FBSSxDQUFDUixLQUF6QyxDQUFwQjtvQkFDSSxLQUFJLENBQUNLLEdBQUwsQ0FBU0UsUUFBVCxDQUFrQkUsY0FBbEIsR0FBbUMsSUFBSTVELE9BQU8sQ0FBQzZELE9BQVosQ0FBb0IsZUFBcEIsRUFBcUMsS0FBSSxDQUFDVixLQUExQyxDQUFuQztvQkFDQSxLQUFJLENBQUNLLEdBQUwsQ0FBU0UsUUFBVCxDQUFrQkUsY0FBbEIsQ0FBaUNFLFFBQWpDLEdBQTRDLElBQTVDO29CQUNKVCxPQUFPLENBQUNuRSxJQUFELENBQVA7a0JBQ0EsQ0FQRDtnQkFRQSxDQVRNLENBRFI7O2NBQUE7Y0FBQTtnQkFBQTtZQUFBO1VBQUE7UUFBQTtNQUFBOzs7Ozs7Ozs7O1dBWUMsd0JBQWU7TUFFYixLQUFLSCxNQUFMLEdBQWMsSUFBSWlCLE9BQU8sQ0FBQytELGFBQVosQ0FBMEIsT0FBMUIsQ0FBZDtNQUNGLEtBQUtoRixNQUFMLENBQVlLLFVBQVosQ0FBdUIsS0FBdkIsRUFIZSxDQUlmO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7O01BQ0EsS0FBS0wsTUFBTCxDQUFZbUIsUUFBWixHQUF1QixJQUFJRixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEIsQ0FBNUIsQ0FBdkI7TUFFQSxJQUFNK0QsVUFBVSxHQUFHLEVBQW5CLENBZGUsQ0FlZjtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7O01BQ0EsS0FBS0MsSUFBTCxHQUFZLElBQUlqRSxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxNQUFsQyxFQUEwQztRQUFDQyxLQUFLLEVBQUUsQ0FBUjtRQUFXQyxNQUFNLEVBQUUsR0FBbkI7UUFBd0JMLFVBQVUsRUFBRUE7TUFBcEMsQ0FBMUMsRUFBMkYsS0FBS2IsS0FBaEcsQ0FBWjtNQUNBLEtBQUtjLElBQUwsQ0FBVVAsUUFBVixHQUFxQixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsS0FBS1IsS0FBM0MsQ0FBckIsQ0F0QmUsQ0F1QmY7O01BQ0EsS0FBS2MsSUFBTCxDQUFVSyxNQUFWLEdBQW1CLEtBQUt2RixNQUF4QjtNQUNBLElBQU13RixPQUFPLEdBQUcsS0FBS04sSUFBTCxDQUFVTyxVQUFWLEVBQWhCO01BQ0EsSUFBTUMsU0FBUyxHQUFHLEtBQUtSLElBQUwsQ0FBVVMsZUFBVixDQUEwQjFFLE9BQU8sQ0FBQzJFLFlBQVIsQ0FBcUJDLFlBQS9DLENBQWxCO01BQ0EsSUFBSUMsTUFBTSxHQUFHLEtBQUtaLElBQUwsQ0FBVVMsZUFBVixDQUEwQjFFLE9BQU8sQ0FBQzJFLFlBQVIsQ0FBcUJHLFNBQS9DLENBQWI7TUFDQSxJQUFNQyxVQUFVLEdBQUdOLFNBQVMsQ0FBQ08sTUFBVixHQUFtQixDQUF0Qzs7TUFDQSxJQUFJLENBQUNILE1BQUwsRUFBYTtRQUNYQSxNQUFNLEdBQUcsSUFBSUksS0FBSixDQUFVLElBQUlGLFVBQWQsQ0FBVDtRQUNBRixNQUFNLEdBQUdBLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLENBQVosQ0FBVDtNQUNEOztNQUNELElBQUlDLE1BQUo7O01BQ0EsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTRCO1FBQzFCRCxNQUFNLEdBQUdaLE9BQU8sQ0FBQyxJQUFJLENBQUosR0FBUWEsQ0FBVCxDQUFoQjtRQUNBUCxNQUFNLENBQUMsSUFBSU0sTUFBTCxDQUFOLEdBQXFCLENBQXJCO1FBQ0FOLE1BQU0sQ0FBQyxJQUFJTSxNQUFKLEdBQWEsQ0FBZCxDQUFOLEdBQXlCLENBQXpCO1FBQ0FOLE1BQU0sQ0FBQyxJQUFJTSxNQUFKLEdBQWEsQ0FBZCxDQUFOLEdBQXlCLENBQXpCO1FBQ0FOLE1BQU0sQ0FBQyxJQUFJTSxNQUFKLEdBQWEsQ0FBZCxDQUFOLEdBQXlCLENBQXpCO01BQ0Q7O01BQ0QsS0FBS2xCLElBQUwsQ0FBVW9CLGVBQVYsQ0FBMEJyRixPQUFPLENBQUMyRSxZQUFSLENBQXFCRyxTQUEvQyxFQUEwREQsTUFBMUQsRUF6Q2UsQ0EwQ2Y7O01BQ0EsS0FBS1osSUFBTCxDQUFVcUIsZ0JBQVYsQ0FBMkIsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixHQUF2QixFQUE0QixDQUE1QixDQUEzQjtNQUEyRDtNQUUzRCxJQUFNc0YsSUFBSSxHQUFHLElBQUl2RixPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxNQUFsQyxFQUEwQztRQUFDQyxLQUFLLEVBQUUsQ0FBUjtRQUFXQyxNQUFNLEVBQUU7TUFBbkIsQ0FBMUMsRUFBbUUsS0FBS2xCLEtBQXhFLENBQWI7TUFDQW9DLElBQUksQ0FBQ0MsY0FBTCxDQUFvQnhGLE9BQU8sQ0FBQ3lGLE1BQVIsQ0FBZUMsV0FBZixDQUEyQixDQUEzQixFQUE4QixDQUFDLEdBQS9CLEVBQW9DLENBQXBDLENBQXBCO01BQ0FILElBQUksQ0FBQ2pCLE1BQUwsR0FBYyxLQUFLTCxJQUFuQjtNQUNBc0IsSUFBSSxDQUFDRCxnQkFBTCxDQUFzQixJQUFJdEYsT0FBTyxDQUFDQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCLENBQTVCLENBQXRCO01BQXNEO01BQ3REc0YsSUFBSSxDQUFDN0IsUUFBTCxHQUFnQixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsS0FBS1IsS0FBM0MsQ0FBaEI7TUFDQW9DLElBQUksQ0FBQzdCLFFBQUwsQ0FBY2lDLFlBQWQsR0FBNkIsSUFBSTNGLE9BQU8sQ0FBQzRGLE1BQVosQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsQ0FBN0I7TUFHQSxLQUFLQyxJQUFMLEdBQVksSUFBSTdGLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLE1BQWxDLEVBQTBDO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUExQyxFQUFnRixLQUFLM0MsS0FBckYsQ0FBWjtNQUNBLEtBQUswQyxJQUFMLENBQVV2QixNQUFWLEdBQW1CLEtBQUt2RixNQUF4QjtNQUNBLEtBQUs4RyxJQUFMLENBQVVuQyxRQUFWLEdBQXFCLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxLQUFLUixLQUEzQyxDQUFyQjtNQUNBLEtBQUswQyxJQUFMLENBQVVuQyxRQUFWLENBQW1CaUMsWUFBbkIsR0FBa0MsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBbEM7TUFDQSxLQUFLQyxJQUFMLENBQVVQLGdCQUFWLENBQTJCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUE3QixDQUEzQjtNQUdBLElBQU04RixHQUFHLEdBQUcsSUFBSS9GLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLEtBQWxDLEVBQXlDO1FBQUNDLEtBQUssRUFBQyxJQUFQO1FBQWFDLE1BQU0sRUFBRSxHQUFyQjtRQUEwQnlCLEtBQUssRUFBRTtNQUFqQyxDQUF6QyxFQUFpRixLQUFLM0MsS0FBdEYsQ0FBWjtNQUNBNEMsR0FBRyxDQUFDekIsTUFBSixHQUFhLEtBQUt1QixJQUFsQjtNQUNBRSxHQUFHLENBQUNyQyxRQUFKLEdBQWUsSUFBSTFELE9BQU8sQ0FBQzJELGdCQUFaLENBQTZCLE1BQTdCLEVBQXFDLEtBQUtSLEtBQTFDLENBQWY7TUFDQTRDLEdBQUcsQ0FBQ3JDLFFBQUosQ0FBYWlDLFlBQWIsR0FBNEIsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBNUI7TUFDQUcsR0FBRyxDQUFDVCxnQkFBSixDQUFxQixJQUFJdEYsT0FBTyxDQUFDQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQUMsR0FBeEIsRUFBNkIsQ0FBN0IsQ0FBckI7TUFHQSxLQUFLK0YsT0FBTCxHQUFlLElBQUloRyxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxjQUFsQyxFQUFrRDtRQUFDQyxLQUFLLEVBQUMsR0FBUDtRQUFZQyxNQUFNLEVBQUUsR0FBcEI7UUFBeUJ5QixLQUFLLEVBQUU7TUFBaEMsQ0FBbEQsRUFBd0YsS0FBSzNDLEtBQTdGLENBQWY7TUFDQSxLQUFLNkMsT0FBTCxDQUFhdEMsUUFBYixHQUF3QixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsZUFBN0IsRUFBOEMsS0FBS1IsS0FBbkQsQ0FBeEI7TUFDQSxLQUFLNkMsT0FBTCxDQUFhdEMsUUFBYixDQUFzQmlDLFlBQXRCLEdBQXFDLElBQUszRixPQUFPLENBQUM0RixNQUFiLENBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCLENBQXJDO01BQ0EsS0FBS0ksT0FBTCxDQUFhMUIsTUFBYixHQUFzQixLQUFLdkYsTUFBM0I7TUFDQSxLQUFLaUgsT0FBTCxDQUFhUixjQUFiLENBQTRCeEYsT0FBTyxDQUFDeUYsTUFBUixDQUFlQyxXQUFmLENBQTJCLENBQTNCLEVBQThCLENBQUMsR0FBL0IsRUFBb0MsQ0FBcEMsQ0FBNUI7TUFDQSxLQUFLTSxPQUFMLENBQWFWLGdCQUFiLENBQThCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBQyxHQUFyQixFQUEwQixDQUFDLEdBQTNCLEVBQWdDLENBQWhDLENBQTlCO01BRUEsS0FBS2dHLFNBQUwsR0FBaUIsSUFBSWpHLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLFdBQWxDLEVBQStDO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUEvQyxFQUFxRixLQUFLM0MsS0FBMUYsQ0FBakI7TUFDQSxLQUFLOEMsU0FBTCxDQUFldkMsUUFBZixHQUEwQixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsWUFBN0IsRUFBMkMsS0FBS1IsS0FBaEQsQ0FBMUI7TUFDQSxLQUFLOEMsU0FBTCxDQUFldkMsUUFBZixDQUF3QmlDLFlBQXhCLEdBQXVDLElBQUszRixPQUFPLENBQUM0RixNQUFiLENBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCLENBQXZDO01BQ0EsS0FBS0ssU0FBTCxDQUFlM0IsTUFBZixHQUF3QixLQUFLMEIsT0FBN0I7TUFDQSxLQUFLQyxTQUFMLENBQWVYLGdCQUFmLENBQWdDLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUE3QixDQUFoQztNQUVBLEtBQUtpRyxZQUFMLEdBQW9CLElBQUlsRyxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxjQUFsQyxFQUFrRDtRQUFDQyxLQUFLLEVBQUMsR0FBUDtRQUFZQyxNQUFNLEVBQUUsR0FBcEI7UUFBeUJ5QixLQUFLLEVBQUU7TUFBaEMsQ0FBbEQsRUFBd0YsS0FBSzNDLEtBQTdGLENBQXBCO01BQ0EsS0FBSytDLFlBQUwsQ0FBa0J4QyxRQUFsQixHQUE2QixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsZUFBN0IsRUFBOEMsS0FBS1IsS0FBbkQsQ0FBN0I7TUFDQSxLQUFLK0MsWUFBTCxDQUFrQnhDLFFBQWxCLENBQTJCaUMsWUFBM0IsR0FBMEMsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBMUM7TUFDQSxLQUFLTSxZQUFMLENBQWtCNUIsTUFBbEIsR0FBMkIsS0FBSzBCLE9BQWhDO01BQ0EsS0FBS0UsWUFBTCxDQUFrQlYsY0FBbEIsQ0FBaUN4RixPQUFPLENBQUN5RixNQUFSLENBQWVDLFdBQWYsQ0FBMkIsQ0FBM0IsRUFBOEIsQ0FBQyxHQUEvQixFQUFvQyxDQUFwQyxDQUFqQztNQUNBLEtBQUtRLFlBQUwsQ0FBa0JaLGdCQUFsQixDQUFtQyxJQUFJdEYsT0FBTyxDQUFDQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQUMsR0FBeEIsRUFBNkIsQ0FBN0IsQ0FBbkM7TUFFQSxJQUFNa0csU0FBUyxHQUFHLElBQUluRyxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxXQUFsQyxFQUErQztRQUFDQyxLQUFLLEVBQUMsSUFBUDtRQUFhQyxNQUFNLEVBQUUsR0FBckI7UUFBMEJ5QixLQUFLLEVBQUU7TUFBakMsQ0FBL0MsRUFBdUYsS0FBSzNDLEtBQTVGLENBQWxCO01BQ0FnRCxTQUFTLENBQUN6QyxRQUFWLEdBQXFCLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixZQUE3QixFQUEyQyxLQUFLUixLQUFoRCxDQUFyQjtNQUNBZ0QsU0FBUyxDQUFDekMsUUFBVixDQUFtQmlDLFlBQW5CLEdBQWtDLElBQUszRixPQUFPLENBQUM0RixNQUFiLENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQWxDO01BQ0FPLFNBQVMsQ0FBQzdCLE1BQVYsR0FBbUIsS0FBSzRCLFlBQXhCO01BQ0FDLFNBQVMsQ0FBQ2IsZ0JBQVYsQ0FBMkIsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUFDLEdBQXhCLEVBQTZCLENBQTdCLENBQTNCO01BRUEsSUFBTW1HLFFBQVEsR0FBRyxJQUFJcEcsT0FBTyxDQUFDa0UsV0FBUixDQUFvQkMsU0FBeEIsQ0FBa0MsVUFBbEMsRUFBOEM7UUFBQ0MsS0FBSyxFQUFDLEdBQVA7UUFBWUMsTUFBTSxFQUFFLEdBQXBCO1FBQXlCeUIsS0FBSyxFQUFFO01BQWhDLENBQTlDLEVBQW9GLEtBQUszQyxLQUF6RixDQUFqQjtNQUNBaUQsUUFBUSxDQUFDMUMsUUFBVCxHQUFvQixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMEMsS0FBS1IsS0FBL0MsQ0FBcEI7TUFDQWlELFFBQVEsQ0FBQzFDLFFBQVQsQ0FBa0JpQyxZQUFsQixHQUFpQyxJQUFJM0YsT0FBTyxDQUFDNEYsTUFBWixDQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQixDQUFqQztNQUNBUSxRQUFRLENBQUM5QixNQUFULEdBQWtCLEtBQUs0QixZQUF2QjtNQUNBRSxRQUFRLENBQUNkLGdCQUFULENBQTBCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxJQUF4QixFQUE4QixDQUE5QixDQUExQjtNQUVBLEtBQUtvRyxhQUFMLEdBQXFCLElBQUlyRyxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxlQUFsQyxFQUFtRDtRQUFDQyxLQUFLLEVBQUMsR0FBUDtRQUFZQyxNQUFNLEVBQUUsR0FBcEI7UUFBeUJ5QixLQUFLLEVBQUU7TUFBaEMsQ0FBbkQsRUFBeUYsS0FBSzNDLEtBQTlGLENBQXJCO01BQ0EsS0FBS2tELGFBQUwsQ0FBbUIzQyxRQUFuQixHQUE4QixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsZ0JBQTdCLEVBQStDLEtBQUtSLEtBQXBELENBQTlCO01BQ0EsS0FBS2tELGFBQUwsQ0FBbUIzQyxRQUFuQixDQUE0QmlDLFlBQTVCLEdBQTJDLElBQUszRixPQUFPLENBQUM0RixNQUFiLENBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCLENBQTNDO01BQ0EsS0FBS1MsYUFBTCxDQUFtQi9CLE1BQW5CLEdBQTRCLEtBQUt2RixNQUFqQztNQUNBLEtBQUtzSCxhQUFMLENBQW1CYixjQUFuQixDQUFrQ3hGLE9BQU8sQ0FBQ3lGLE1BQVIsQ0FBZUMsV0FBZixDQUEyQixDQUEzQixFQUE4QixDQUFDLEdBQS9CLEVBQW9DLENBQXBDLENBQWxDO01BQ0EsS0FBS1csYUFBTCxDQUFtQmYsZ0JBQW5CLENBQW9DLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsR0FBcEIsRUFBeUIsQ0FBQyxHQUExQixFQUErQixDQUEvQixDQUFwQztNQUVBLElBQU1xRyxVQUFVLEdBQUcsSUFBSXRHLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLFlBQWxDLEVBQWdEO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUFoRCxFQUFzRixLQUFLM0MsS0FBM0YsQ0FBbkI7TUFDQW1ELFVBQVUsQ0FBQzVDLFFBQVgsR0FBc0IsSUFBSTFELE9BQU8sQ0FBQzJELGdCQUFaLENBQTZCLGFBQTdCLEVBQTRDLEtBQUtSLEtBQWpELENBQXRCO01BQ0FtRCxVQUFVLENBQUM1QyxRQUFYLENBQW9CaUMsWUFBcEIsR0FBbUMsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBbkM7TUFDQVUsVUFBVSxDQUFDaEMsTUFBWCxHQUFvQixLQUFLK0IsYUFBekI7TUFDQUMsVUFBVSxDQUFDaEIsZ0JBQVgsQ0FBNEIsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUFDLEdBQXhCLEVBQTZCLENBQTdCLENBQTVCO01BRUEsS0FBS3NHLGFBQUwsR0FBcUIsSUFBSXZHLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLGVBQWxDLEVBQW1EO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUFuRCxFQUF5RixLQUFLM0MsS0FBOUYsQ0FBckI7TUFDQSxLQUFLb0QsYUFBTCxDQUFtQjdDLFFBQW5CLEdBQThCLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixnQkFBN0IsRUFBK0MsS0FBS1IsS0FBcEQsQ0FBOUI7TUFDQSxLQUFLb0QsYUFBTCxDQUFtQjdDLFFBQW5CLENBQTRCaUMsWUFBNUIsR0FBMkMsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBM0M7TUFDQSxLQUFLVyxhQUFMLENBQW1CakMsTUFBbkIsR0FBNEIsS0FBSytCLGFBQWpDO01BQ0EsS0FBS0UsYUFBTCxDQUFtQmYsY0FBbkIsQ0FBa0N4RixPQUFPLENBQUN5RixNQUFSLENBQWVDLFdBQWYsQ0FBMkIsQ0FBM0IsRUFBOEIsQ0FBQyxHQUEvQixFQUFvQyxDQUFwQyxDQUFsQztNQUNBLEtBQUthLGFBQUwsQ0FBbUJqQixnQkFBbkIsQ0FBb0MsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUFDLEdBQXhCLEVBQTZCLENBQTdCLENBQXBDO01BRUEsSUFBTXVHLFVBQVUsR0FBRyxJQUFJeEcsT0FBTyxDQUFDa0UsV0FBUixDQUFvQkMsU0FBeEIsQ0FBa0MsWUFBbEMsRUFBZ0Q7UUFBQ0MsS0FBSyxFQUFDLElBQVA7UUFBYUMsTUFBTSxFQUFFLEdBQXJCO1FBQTBCeUIsS0FBSyxFQUFFO01BQWpDLENBQWhELEVBQXdGLEtBQUszQyxLQUE3RixDQUFuQjtNQUNBcUQsVUFBVSxDQUFDOUMsUUFBWCxHQUFzQixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsYUFBN0IsRUFBNEMsS0FBS1IsS0FBakQsQ0FBdEI7TUFDQXFELFVBQVUsQ0FBQzlDLFFBQVgsQ0FBb0JpQyxZQUFwQixHQUFtQyxJQUFLM0YsT0FBTyxDQUFDNEYsTUFBYixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixDQUFuQztNQUNBWSxVQUFVLENBQUNsQyxNQUFYLEdBQW9CLEtBQUtpQyxhQUF6QjtNQUNBQyxVQUFVLENBQUNsQixnQkFBWCxDQUE0QixJQUFJdEYsT0FBTyxDQUFDQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQUMsR0FBeEIsRUFBNkIsQ0FBN0IsQ0FBNUI7TUFFQSxJQUFNd0csU0FBUyxHQUFHLElBQUl6RyxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxXQUFsQyxFQUErQztRQUFDQyxLQUFLLEVBQUMsR0FBUDtRQUFZQyxNQUFNLEVBQUUsR0FBcEI7UUFBeUJ5QixLQUFLLEVBQUU7TUFBaEMsQ0FBL0MsRUFBcUYsS0FBSzNDLEtBQTFGLENBQWxCO01BQ0FzRCxTQUFTLENBQUMvQyxRQUFWLEdBQXFCLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixZQUE3QixFQUEyQyxLQUFLUixLQUFoRCxDQUFyQjtNQUNBc0QsU0FBUyxDQUFDL0MsUUFBVixDQUFtQmlDLFlBQW5CLEdBQWtDLElBQUkzRixPQUFPLENBQUM0RixNQUFaLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLENBQWxDO01BQ0FhLFNBQVMsQ0FBQ25DLE1BQVYsR0FBbUIsS0FBS2lDLGFBQXhCO01BQ0FFLFNBQVMsQ0FBQ25CLGdCQUFWLENBQTJCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxJQUF4QixFQUE4QixDQUE5QixDQUEzQjtNQUVBLEtBQUt5RyxPQUFMLEdBQWUsSUFBSTFHLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLGNBQWxDLEVBQWtEO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUFsRCxFQUF3RixLQUFLM0MsS0FBN0YsQ0FBZjtNQUNBLEtBQUt1RCxPQUFMLENBQWFoRCxRQUFiLEdBQXdCLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixlQUE3QixFQUE4QyxLQUFLUixLQUFuRCxDQUF4QjtNQUNBLEtBQUt1RCxPQUFMLENBQWFoRCxRQUFiLENBQXNCaUMsWUFBdEIsR0FBcUMsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBckM7TUFDQSxLQUFLYyxPQUFMLENBQWFwQyxNQUFiLEdBQXNCLEtBQUt2RixNQUEzQjtNQUNFLEtBQUsySCxPQUFMLENBQWFsQixjQUFiLENBQTRCeEYsT0FBTyxDQUFDeUYsTUFBUixDQUFlQyxXQUFmLENBQTJCLENBQTNCLEVBQThCLENBQUMsR0FBL0IsRUFBb0MsQ0FBcEMsQ0FBNUI7TUFDRixLQUFLZ0IsT0FBTCxDQUFhcEIsZ0JBQWIsQ0FBOEIsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFDLElBQXJCLEVBQTJCLENBQUMsQ0FBNUIsRUFBK0IsQ0FBL0IsQ0FBOUI7TUFFQSxJQUFNMEcsU0FBUyxHQUFHLElBQUkzRyxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxXQUFsQyxFQUErQztRQUFDQyxLQUFLLEVBQUMsR0FBUDtRQUFZQyxNQUFNLEVBQUUsR0FBcEI7UUFBeUJ5QixLQUFLLEVBQUU7TUFBaEMsQ0FBL0MsRUFBcUYsS0FBSzNDLEtBQTFGLENBQWxCO01BQ0F3RCxTQUFTLENBQUNqRCxRQUFWLEdBQXFCLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixZQUE3QixFQUEyQyxLQUFLUixLQUFoRCxDQUFyQjtNQUNBd0QsU0FBUyxDQUFDakQsUUFBVixDQUFtQmlDLFlBQW5CLEdBQWtDLElBQUszRixPQUFPLENBQUM0RixNQUFiLENBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCLENBQWxDO01BQ0FlLFNBQVMsQ0FBQ3JDLE1BQVYsR0FBbUIsS0FBS29DLE9BQXhCO01BQ0FDLFNBQVMsQ0FBQ3JCLGdCQUFWLENBQTJCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUE3QixDQUEzQjtNQUVBLElBQU0yRyxZQUFZLEdBQUcsSUFBSTVHLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLGNBQWxDLEVBQWtEO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUFsRCxFQUF3RixLQUFLM0MsS0FBN0YsQ0FBckI7TUFDQXlELFlBQVksQ0FBQ2xELFFBQWIsR0FBd0IsSUFBSTFELE9BQU8sQ0FBQzJELGdCQUFaLENBQTZCLGVBQTdCLEVBQThDLEtBQUtSLEtBQW5ELENBQXhCO01BQ0F5RCxZQUFZLENBQUNsRCxRQUFiLENBQXNCaUMsWUFBdEIsR0FBcUMsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBckM7TUFDQWdCLFlBQVksQ0FBQ3RDLE1BQWIsR0FBc0IsS0FBS29DLE9BQTNCO01BQ0FFLFlBQVksQ0FBQ3RCLGdCQUFiLENBQThCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUE3QixDQUE5QjtNQUVBLElBQU00RyxRQUFRLEdBQUcsSUFBSTdHLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLFVBQWxDLEVBQThDO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUE5QyxFQUFvRixLQUFLM0MsS0FBekYsQ0FBakI7TUFDQTBELFFBQVEsQ0FBQ25ELFFBQVQsR0FBb0IsSUFBSTFELE9BQU8sQ0FBQzJELGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDLEtBQUtSLEtBQS9DLENBQXBCO01BQ0EwRCxRQUFRLENBQUNuRCxRQUFULENBQWtCaUMsWUFBbEIsR0FBaUMsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBakM7TUFDQWlCLFFBQVEsQ0FBQ3ZDLE1BQVQsR0FBa0IsS0FBS29DLE9BQXZCO01BQ0FHLFFBQVEsQ0FBQ3ZCLGdCQUFULENBQTBCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUE3QixDQUExQjtNQUVBLEtBQUs2RyxRQUFMLEdBQWdCLElBQUk5RyxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxlQUFsQyxFQUFtRDtRQUFDQyxLQUFLLEVBQUMsR0FBUDtRQUFZQyxNQUFNLEVBQUUsR0FBcEI7UUFBeUJ5QixLQUFLLEVBQUU7TUFBaEMsQ0FBbkQsRUFBeUYsS0FBSzNDLEtBQTlGLENBQWhCO01BQ0EsS0FBSzJELFFBQUwsQ0FBY3BELFFBQWQsR0FBeUIsSUFBSTFELE9BQU8sQ0FBQzJELGdCQUFaLENBQTZCLGdCQUE3QixFQUErQyxLQUFLUixLQUFwRCxDQUF6QjtNQUNBLEtBQUsyRCxRQUFMLENBQWNwRCxRQUFkLENBQXVCaUMsWUFBdkIsR0FBc0MsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBdEM7TUFDQSxLQUFLa0IsUUFBTCxDQUFjeEMsTUFBZCxHQUF1QixLQUFLdkYsTUFBNUI7TUFDQSxLQUFLK0gsUUFBTCxDQUFjeEIsZ0JBQWQsQ0FBK0IsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixJQUFwQixFQUEwQixDQUFDLENBQTNCLEVBQThCLENBQTlCLENBQS9CO01BRUEsSUFBTThHLFVBQVUsR0FBRyxJQUFJL0csT0FBTyxDQUFDa0UsV0FBUixDQUFvQkMsU0FBeEIsQ0FBa0MsWUFBbEMsRUFBZ0Q7UUFBQ0MsS0FBSyxFQUFDLEdBQVA7UUFBWUMsTUFBTSxFQUFFLEdBQXBCO1FBQXlCeUIsS0FBSyxFQUFFO01BQWhDLENBQWhELEVBQXNGLEtBQUszQyxLQUEzRixDQUFuQjtNQUNBNEQsVUFBVSxDQUFDckQsUUFBWCxHQUFzQixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsYUFBN0IsRUFBNEMsS0FBS1IsS0FBakQsQ0FBdEI7TUFDQTRELFVBQVUsQ0FBQ3JELFFBQVgsQ0FBb0JpQyxZQUFwQixHQUFtQyxJQUFLM0YsT0FBTyxDQUFDNEYsTUFBYixDQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QixHQUE5QixDQUFuQztNQUNBbUIsVUFBVSxDQUFDekMsTUFBWCxHQUFvQixLQUFLd0MsUUFBekI7TUFDQUMsVUFBVSxDQUFDekIsZ0JBQVgsQ0FBNEIsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUFDLEdBQXhCLEVBQTZCLENBQTdCLENBQTVCO01BRUEsSUFBTStHLGFBQWEsR0FBRyxJQUFJaEgsT0FBTyxDQUFDa0UsV0FBUixDQUFvQkMsU0FBeEIsQ0FBa0MsZUFBbEMsRUFBbUQ7UUFBQ0MsS0FBSyxFQUFDLEdBQVA7UUFBWUMsTUFBTSxFQUFFLEdBQXBCO1FBQXlCeUIsS0FBSyxFQUFFO01BQWhDLENBQW5ELEVBQXlGLEtBQUszQyxLQUE5RixDQUF0QjtNQUNBNkQsYUFBYSxDQUFDdEQsUUFBZCxHQUF5QixJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsZ0JBQTdCLEVBQStDLEtBQUtSLEtBQXBELENBQXpCO01BQ0E2RCxhQUFhLENBQUN0RCxRQUFkLENBQXVCaUMsWUFBdkIsR0FBc0MsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBdEM7TUFDQW9CLGFBQWEsQ0FBQzFDLE1BQWQsR0FBdUIsS0FBS3dDLFFBQTVCO01BQ0FFLGFBQWEsQ0FBQzFCLGdCQUFkLENBQStCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUE3QixDQUEvQjtNQUVBLElBQU1nSCxTQUFTLEdBQUcsSUFBSWpILE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXhCLENBQWtDLFdBQWxDLEVBQStDO1FBQUNDLEtBQUssRUFBQyxHQUFQO1FBQVlDLE1BQU0sRUFBRSxHQUFwQjtRQUF5QnlCLEtBQUssRUFBRTtNQUFoQyxDQUEvQyxFQUFxRixLQUFLM0MsS0FBMUYsQ0FBbEI7TUFDQThELFNBQVMsQ0FBQ3ZELFFBQVYsR0FBcUIsSUFBSTFELE9BQU8sQ0FBQzJELGdCQUFaLENBQTZCLFlBQTdCLEVBQTJDLEtBQUtSLEtBQWhELENBQXJCO01BQ0E4RCxTQUFTLENBQUN2RCxRQUFWLENBQW1CaUMsWUFBbkIsR0FBa0MsSUFBSzNGLE9BQU8sQ0FBQzRGLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUIsQ0FBbEM7TUFDQXFCLFNBQVMsQ0FBQzNDLE1BQVYsR0FBbUIsS0FBS3dDLFFBQXhCO01BQ0FHLFNBQVMsQ0FBQzNCLGdCQUFWLENBQTJCLElBQUl0RixPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUE3QixDQUEzQjtJQUNDOzs7V0FFRCxtQkFBVWlILElBQVYsRUFBZ0JDLEtBQWhCLEVBQXVCO01BQ3ZCLElBQU1DLGlCQUFpQixHQUFHcEgsT0FBTyxDQUFDcUgsSUFBUixDQUFhQyxXQUFiLENBQXlCLG1CQUF6QixFQUE4QyxDQUN0RSxJQUFJdEgsT0FBTyxDQUFDQyxPQUFSLENBQWdCc0gsSUFBcEIsRUFEc0UsRUFDMUMsSUFBSXZILE9BQU8sQ0FBQ0MsT0FBWixDQUFvQmlILElBQXBCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLENBRDBDLEVBQ1QsSUFBSWxILE9BQU8sQ0FBQ0MsT0FBWixDQUFvQmlILElBQUksR0FBRyxJQUEzQixFQUFpQyxPQUFPQSxJQUF4QyxFQUE4QyxDQUE5QyxDQURTLEVBRXRFLElBQUlsSCxPQUFPLENBQUNDLE9BQVosQ0FBb0JpSCxJQUFwQixFQUEwQixDQUExQixFQUE2QixDQUE3QixDQUZzRSxFQUVyQyxJQUFJbEgsT0FBTyxDQUFDQyxPQUFaLENBQW9CaUgsSUFBSSxHQUFHLElBQTNCLEVBQWlDLENBQUMsSUFBRCxHQUFRQSxJQUF6QyxFQUErQyxDQUEvQyxDQUZxQyxDQUE5QyxFQUd2QixLQUFLL0QsS0FIa0IsQ0FBMUI7TUFJQWlFLGlCQUFpQixDQUFDSSxLQUFsQixHQUEwQixJQUFJeEgsT0FBTyxDQUFDNEYsTUFBWixDQUFtQixDQUFuQixFQUFzQnVCLEtBQXRCLEVBQTZCQSxLQUE3QixDQUExQjtNQUVBLElBQU1NLGlCQUFpQixHQUFHekgsT0FBTyxDQUFDcUgsSUFBUixDQUFhQyxXQUFiLENBQXlCLG1CQUF6QixFQUE4QyxDQUN0RSxJQUFJdEgsT0FBTyxDQUFDQyxPQUFSLENBQWdCc0gsSUFBcEIsRUFEc0UsRUFDMUMsSUFBSXZILE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QmlILElBQXZCLEVBQTZCLENBQTdCLENBRDBDLEVBQ1QsSUFBSWxILE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFDLElBQUQsR0FBUWlILElBQTVCLEVBQWtDQSxJQUFJLEdBQUcsSUFBekMsRUFBK0MsQ0FBL0MsQ0FEUyxFQUV0RSxJQUFJbEgsT0FBTyxDQUFDQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCaUgsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FGc0UsRUFFckMsSUFBSWxILE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixPQUFPaUgsSUFBM0IsRUFBaUNBLElBQUksR0FBRyxJQUF4QyxFQUE4QyxDQUE5QyxDQUZxQyxDQUE5QyxFQUd2QixLQUFLL0QsS0FIa0IsQ0FBMUI7TUFJQXNFLGlCQUFpQixDQUFDRCxLQUFsQixHQUEwQixJQUFJeEgsT0FBTyxDQUFDNEYsTUFBWixDQUFtQnVCLEtBQW5CLEVBQTBCLENBQTFCLEVBQTZCQSxLQUE3QixDQUExQjtNQUVBLElBQU1PLGlCQUFpQixHQUFHMUgsT0FBTyxDQUFDcUgsSUFBUixDQUFhQyxXQUFiLENBQXlCLG1CQUF6QixFQUE4QyxDQUN0RSxJQUFJdEgsT0FBTyxDQUFDQyxPQUFSLENBQWdCc0gsSUFBcEIsRUFEc0UsRUFDMUMsSUFBSXZILE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQmlILElBQTFCLENBRDBDLEVBQ1QsSUFBSWxILE9BQU8sQ0FBQ0MsT0FBWixDQUFxQixDQUFyQixFQUF5QixDQUFDLElBQUQsR0FBUWlILElBQWpDLEVBQXVDQSxJQUFJLEdBQUcsSUFBOUMsQ0FEUyxFQUV0RSxJQUFJbEgsT0FBTyxDQUFDQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCaUgsSUFBMUIsQ0FGc0UsRUFFckMsSUFBSWxILE9BQU8sQ0FBQ0MsT0FBWixDQUFxQixDQUFyQixFQUF3QixPQUFPaUgsSUFBL0IsRUFBcUNBLElBQUksR0FBRyxJQUE1QyxDQUZxQyxDQUE5QyxFQUd2QixLQUFLL0QsS0FIa0IsQ0FBMUI7TUFJQXVFLGlCQUFpQixDQUFDRixLQUFsQixHQUEwQixJQUFJeEgsT0FBTyxDQUFDNEYsTUFBWixDQUFtQnVCLEtBQW5CLEVBQTBCQSxLQUExQixFQUFpQyxDQUFqQyxDQUExQjtNQUVBLElBQU1RLFlBQVksR0FBRzNILE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JDLFNBQXBCLENBQThCLGNBQTlCLEVBQThDO1FBQUMrQyxJQUFJLEVBQUM7TUFBTixDQUE5QyxFQUF3RCxLQUFLL0QsS0FBN0QsQ0FBckI7TUFDQXdFLFlBQVksQ0FBQ2xFLFNBQWIsR0FBeUIsS0FBekI7TUFFQTJELGlCQUFpQixDQUFDOUMsTUFBbEIsR0FBMkJxRCxZQUEzQjtNQUNBRixpQkFBaUIsQ0FBQ25ELE1BQWxCLEdBQTJCcUQsWUFBM0I7TUFDQUQsaUJBQWlCLENBQUNwRCxNQUFsQixHQUEyQnFELFlBQTNCO01BRUEsS0FBSzVJLE1BQUwsQ0FBWW1CLFFBQVosQ0FBcUI3QyxDQUFyQixHQUF5QixDQUF6QjtNQUNBLE9BQU9zSyxZQUFQO0lBQ0E7OztXQUVELG1CQUFVO01BQ1QsS0FBSzNCLE9BQUwsQ0FBYTVGLFFBQWIsQ0FBc0JoRCxDQUF0QixHQUEwQixDQUFDMEUsSUFBSSxDQUFDOEYsRUFBTixHQUFXLENBQXJDO01BQ0EsS0FBSzVCLE9BQUwsQ0FBYTVGLFFBQWIsQ0FBc0IvQyxDQUF0QixHQUEwQnlFLElBQUksQ0FBQzhGLEVBQUwsR0FBVSxDQUFwQztNQUNBLEtBQUsxQixZQUFMLENBQWtCOUYsUUFBbEIsQ0FBMkJoRCxDQUEzQixHQUErQixDQUFDMEUsSUFBSSxDQUFDOEYsRUFBTixHQUFXLENBQTFDO01BQ0EsS0FBSzFCLFlBQUwsQ0FBa0JoRyxRQUFsQixDQUEyQjdDLENBQTNCLElBQWdDLEdBQWhDO01BQ0EsS0FBS2dKLGFBQUwsQ0FBbUJqRyxRQUFuQixDQUE0QmhELENBQTVCLEdBQWlDLENBQUMwRSxJQUFJLENBQUM4RixFQUFOLEdBQVcsQ0FBNUM7TUFDQSxLQUFLdkIsYUFBTCxDQUFtQmpHLFFBQW5CLENBQTRCL0MsQ0FBNUIsR0FBaUMsQ0FBQ3lFLElBQUksQ0FBQzhGLEVBQU4sR0FBVyxDQUE1QztNQUNBLEtBQUtyQixhQUFMLENBQW1CbkcsUUFBbkIsQ0FBNEJoRCxDQUE1QixHQUFnQyxDQUFDMEUsSUFBSSxDQUFDOEYsRUFBTixHQUFXLENBQTNDO01BQ0EsS0FBS3JCLGFBQUwsQ0FBbUJyRyxRQUFuQixDQUE0QjdDLENBQTVCLElBQWlDLEdBQWpDO0lBQ0E7OztXQUVBLGVBQU07TUFDSixJQUFNbUYsR0FBRyxHQUFHLElBQUl4QyxPQUFPLENBQUM2SCxjQUFaLENBQTJCLEtBQTNCLENBQVo7TUFDQSxJQUFNQyxTQUFTLEdBQUcsQ0FBbEI7TUFFQSxJQUFNQyxTQUFTLEdBQUcsSUFBSS9ILE9BQU8sQ0FBQ2dJLFNBQVosQ0FBc0IsUUFBdEIsRUFBZ0MsWUFBaEMsRUFBOENGLFNBQTlDLEVBQXlEOUgsT0FBTyxDQUFDZ0ksU0FBUixDQUFrQkMsbUJBQTNFLEVBQWdHakksT0FBTyxDQUFDZ0ksU0FBUixDQUFrQkUsdUJBQWxILENBQWxCO01BQ0EsSUFBTUMsU0FBUyxHQUFHLEVBQWxCO01BRUFBLFNBQVMsQ0FBQ0MsSUFBVixDQUFlO1FBQ1hDLEtBQUssRUFBRSxDQURJO1FBRVhDLEtBQUssRUFBRSxDQUFDeEcsSUFBSSxDQUFDOEYsRUFBTixHQUFXO01BRlAsQ0FBZjtNQUtBTyxTQUFTLENBQUNDLElBQVYsQ0FBZTtRQUNYQyxLQUFLLEVBQUVQLFNBREk7UUFFWFEsS0FBSyxFQUFFeEcsSUFBSSxDQUFDOEYsRUFBTCxHQUFVO01BRk4sQ0FBZjtNQUtBTyxTQUFTLENBQUNDLElBQVYsQ0FBZTtRQUNYQyxLQUFLLEVBQUUsSUFBSVAsU0FEQTtRQUVYUSxLQUFLLEVBQUUsQ0FBQ3hHLElBQUksQ0FBQzhGLEVBQU4sR0FBVztNQUZQLENBQWY7TUFLQUcsU0FBUyxDQUFDUSxPQUFWLENBQWtCSixTQUFsQjtNQUVBLElBQU1LLFVBQVUsR0FBRyxJQUFJeEksT0FBTyxDQUFDZ0ksU0FBWixDQUFzQixRQUF0QixFQUFnQyxZQUFoQyxFQUE4Q0YsU0FBOUMsRUFBeUQ5SCxPQUFPLENBQUNnSSxTQUFSLENBQWtCQyxtQkFBM0UsRUFBZ0dqSSxPQUFPLENBQUNnSSxTQUFSLENBQWtCRSx1QkFBbEgsQ0FBbkI7TUFDQSxJQUFNTyxjQUFjLEdBQUcsRUFBdkI7TUFFQUEsY0FBYyxDQUFDTCxJQUFmLENBQW9CO1FBQ2hCQyxLQUFLLEVBQUUsQ0FEUztRQUVoQkMsS0FBSyxFQUFFeEcsSUFBSSxDQUFDOEYsRUFBTCxHQUFVO01BRkQsQ0FBcEI7TUFLQWEsY0FBYyxDQUFDTCxJQUFmLENBQW9CO1FBQ2hCQyxLQUFLLEVBQUVQLFNBRFM7UUFFaEJRLEtBQUssRUFBRSxDQUFDeEcsSUFBSSxDQUFDOEYsRUFBTixHQUFXO01BRkYsQ0FBcEI7TUFLQWEsY0FBYyxDQUFDTCxJQUFmLENBQW9CO1FBQ2hCQyxLQUFLLEVBQUUsSUFBSVAsU0FESztRQUVoQlEsS0FBSyxFQUFFeEcsSUFBSSxDQUFDOEYsRUFBTCxHQUFVO01BRkQsQ0FBcEI7TUFLQVksVUFBVSxDQUFDRCxPQUFYLENBQW1CRSxjQUFuQjtNQUVBakcsR0FBRyxDQUFDa0csb0JBQUosQ0FBeUJYLFNBQXpCLEVBQW9DLEtBQUtyQixPQUF6QztNQUNBbEUsR0FBRyxDQUFDa0csb0JBQUosQ0FBeUJGLFVBQXpCLEVBQXFDLEtBQUsxQixRQUExQztNQUNBdEUsR0FBRyxDQUFDbUcsU0FBSixDQUFjLENBQWQsRUFBaUIsSUFBSWIsU0FBckI7TUFDQXRGLEdBQUcsQ0FBQ29HLElBQUosQ0FBUyxJQUFUO0lBQ0Q7OztXQUVGLGlCQUFRO01BQ1AsS0FBSzdKLE1BQUwsR0FBYyxLQUFLQSxNQUFMLENBQVk4SixLQUFaLEVBQWQ7TUFDQSxPQUFPLElBQVA7SUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BTRjtBQUNBOztJQUNxQkM7RUFDcEIsc0JBQ0NoSyxLQURELEVBQ1FDLE1BRFIsRUFFRTtJQUFBOztJQUNEMEMsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtJQUNBLEtBQUszQyxNQUFMLEdBQWNBLE1BQWQ7SUFDQSxJQUFNZ0ssQ0FBQyxHQUFHLElBQUk3Riw4REFBSixDQUFjcEUsS0FBSyxDQUFDcUUsS0FBcEIsQ0FBVjtJQUNBNEYsQ0FBQyxDQUFDQyxZQUFGO0lBQ0FELENBQUMsQ0FBQ0UsT0FBRjtJQUNBLEtBQUtuSyxLQUFMLEdBQWFBLEtBQWI7SUFDQSxLQUFLSSxJQUFMLEdBQVk2SixDQUFaO0lBQ0EsS0FBSzdKLElBQUwsQ0FBVUgsTUFBVixDQUFpQkssVUFBakIsQ0FBNEIsSUFBNUI7SUFDQSxLQUFLRixJQUFMLENBQVVILE1BQVYsQ0FBaUJULElBQWpCLEdBQXdCUyxNQUFNLENBQUNqQixHQUEvQjtJQUNBLEtBQUtvQixJQUFMLENBQVVILE1BQVYsQ0FBaUJtQixRQUFqQixDQUEwQjlDLENBQTFCLEdBQThCMkIsTUFBTSxDQUFDdkIsRUFBckM7SUFDQSxLQUFLMEIsSUFBTCxDQUFVSCxNQUFWLENBQWlCbUIsUUFBakIsQ0FBMEI3QyxDQUExQixHQUE4QjBCLE1BQU0sQ0FBQ3RCLEVBQXJDO0lBQ0EsS0FBS3lCLElBQUwsQ0FBVUgsTUFBVixDQUFpQm1CLFFBQWpCLENBQTBCNUMsQ0FBMUIsR0FBOEJ5QixNQUFNLENBQUNyQixFQUFyQyxDQVpDLENBYUQ7O0lBQ0EsS0FBSzRDLE1BQUwsR0FBYyxJQUFJMUIsMkRBQUosQ0FBV0UsS0FBWCxFQUFrQkMsTUFBbEIsRUFBMEIsS0FBS0csSUFBTCxDQUFVSCxNQUFwQyxDQUFkLENBZEMsQ0FlRDtFQUNBOzs7O1dBRUQsa0JBQVMsQ0FFUjs7O1dBRUQscUJBQVk7TUFDWDZCLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0NDLEtBQWxDO0lBQ0E7OztXQUVELGtCQUFTLENBRVI7OztXQUVELGNBQUtvSSxHQUFMLEVBQVVDLEdBQVYsRUFBZTtNQUNkMUgsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtNQUNBRCxPQUFPLENBQUNDLEdBQVIsQ0FBWXdILEdBQVo7TUFDQSxLQUFLaEssSUFBTCxDQUFVSCxNQUFWLENBQWlCbUIsUUFBakIsR0FBNEIsSUFBSUYsT0FBTyxDQUFDQyxPQUFaLENBQW9CaUosR0FBRyxDQUFDOUwsQ0FBeEIsRUFBMkI4TCxHQUFHLENBQUM3TCxDQUEvQixFQUFrQzZMLEdBQUcsQ0FBQzVMLENBQXRDLENBQTVCO01BQ0EsS0FBSzRCLElBQUwsQ0FBVUgsTUFBVixDQUFpQnFCLFFBQWpCLENBQTBCL0MsQ0FBMUIsR0FBOEI4TCxHQUFHLENBQUM5TCxDQUFsQztNQUNBLEtBQUs2QixJQUFMLENBQVVzRCxHQUFWO0lBQ0E7OztXQUVELG1CQUFVYixNQUFWLEVBQWlCO01BQ2hCLEtBQUtDLE9BQUwsQ0FBYSxJQUFiO01BQ0EsS0FBSzlDLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQkMsS0FBbEIsR0FBMEIsQ0FBMUI7SUFDQTs7O1dBRUQsa0NBQXlCO01BQ3hCLEtBQUtWLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQlcsUUFBbEIsQ0FBMkI5QyxDQUEzQixHQUErQixLQUFLSSxFQUFwQztNQUNBLEtBQUtzQixLQUFMLENBQVdTLE1BQVgsQ0FBa0JXLFFBQWxCLENBQTJCN0MsQ0FBM0IsR0FBK0IsS0FBS0ksRUFBcEM7TUFDQSxLQUFLcUIsS0FBTCxDQUFXUyxNQUFYLENBQWtCVyxRQUFsQixDQUEyQjVDLENBQTNCLEdBQStCLEtBQUtJLEVBQXBDO0lBQ0E7OztXQUVELDBCQUFpQjtNQUNoQixJQUFNbUUsT0FBTyxHQUFHQyxJQUFJLENBQUNzSCxHQUFMLENBQVMsS0FBS0MsSUFBZCxDQUFoQjtJQUNBOzs7V0FFRCwwQkFBaUIsQ0FFaEI7OztXQUVELHlCQUFnQixDQUVmOzs7V0FFRCx5QkFBZSxDQUVkOzs7V0FFRCxxQkFBWSxDQUVYOzs7V0FFRCxtQkFBVTtNQUNULEtBQUtuSyxJQUFMLENBQVVILE1BQVYsQ0FBaUJ1SyxPQUFqQjtJQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM1RW1CMUs7RUFDbkIsZ0JBQVlFLEtBQVosRUFBbUJDLE1BQW5CLEVBQTJCdUYsTUFBM0IsRUFBbUM7SUFBQTs7SUFBQTs7SUFDakMsS0FBS3hGLEtBQUwsR0FBYUEsS0FBYjtJQUNBLEtBQUtDLE1BQUwsR0FBY0EsTUFBZDtJQUNBLElBQU13SyxFQUFFLEdBQUcsS0FBS3pLLEtBQUwsQ0FBVzBFLEdBQVgsQ0FBZWdHLGNBQWYsQ0FBOEJ6SyxNQUFNLENBQUNqQixHQUFyQyxDQUFYO0lBQ0EyRCxPQUFPLENBQUNDLEdBQVIsQ0FBWTZILEVBQVo7SUFDQUEsRUFBRSxDQUFDOUYsU0FBSCxHQUFlLElBQWY7SUFDQThGLEVBQUUsQ0FBQ0Usa0JBQUgsR0FBd0IsSUFBeEI7SUFDQUYsRUFBRSxDQUFDakYsTUFBSCxHQUFZQSxNQUFaLENBUGlDLENBUWpDOztJQUNBaUYsRUFBRSxDQUFDakUsZ0JBQUgsQ0FBb0IsSUFBSXRGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFDLEdBQXJCLEVBQTBCLENBQUMsR0FBM0IsRUFBZ0MsQ0FBQyxHQUFqQyxDQUFwQixFQVRpQyxDQVVqQzs7SUFDQXNKLEVBQUUsQ0FBQ25KLFFBQUgsQ0FBWS9DLENBQVosR0FBZ0IsQ0FBQ3lFLElBQUksQ0FBQzhGLEVBQU4sR0FBVyxDQUEzQjtJQUNBLEtBQUsxSSxJQUFMLEdBQVlxSyxFQUFaO0lBQ0EsS0FBS0csZ0JBQUwsR0FBd0IsS0FBS3hLLElBQUwsQ0FBVWtCLFFBQVYsQ0FBbUJ5SSxLQUFuQixFQUF4QjtJQUNBLEtBQUtjLFFBQUwsR0FBZ0IsRUFBaEI7SUFDQSxLQUFLQyxXQUFMLEdBQW1CLEtBQUtELFFBQXhCO0lBQ0EsS0FBS0UsUUFBTCxHQUFnQixLQUFoQjtJQUNBLEtBQUtDLGdCQUFMLEdBQXdCLEtBQUtELFFBQTdCO0lBQ0EsS0FBS0UsT0FBTCxHQUFlLElBQWY7SUFDQSxLQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0lBQ0EsS0FBS2xMLEtBQUwsQ0FBV3FFLEtBQVgsQ0FBaUI4RyxvQkFBakIsQ0FBc0MsWUFBTTtNQUMxQyxJQUFHLENBQUMsS0FBSSxDQUFDRixPQUFULEVBQWlCO1FBQ2YsS0FBSSxDQUFDRCxnQkFBTCxJQUF5QixLQUFJLENBQUNoTCxLQUFMLENBQVdvTCxNQUFYLENBQWtCQyxZQUFsQixFQUF6Qjs7UUFDQSxJQUFHLEtBQUksQ0FBQ0wsZ0JBQUwsSUFBeUIsQ0FBekIsSUFBOEIsQ0FBQyxLQUFJLENBQUNFLFNBQXZDLEVBQWlEO1VBQy9DLEtBQUksQ0FBQ0QsT0FBTCxHQUFlLElBQWY7VUFDQSxLQUFJLENBQUNELGdCQUFMLEdBQXdCLEtBQUksQ0FBQ0QsUUFBN0I7UUFDRDtNQUNGO0lBQ0YsQ0FSRDtFQVNEOzs7O1dBRUQsa0JBQVM7TUFBQTs7TUFDUCxJQUFHLENBQUMsS0FBS0csU0FBVCxFQUFtQjtRQUNqQixLQUFLRCxPQUFMLEdBQWUsS0FBZjtRQUNBLEtBQUtDLFNBQUwsR0FBaUIsSUFBakI7UUFDQSxLQUFLSSxhQUFMO1FBQ0FDLFVBQVUsQ0FBQyxZQUFNO1VBQ2YsTUFBSSxDQUFDVCxXQUFMLEdBQW1CLE1BQUksQ0FBQ0QsUUFBeEI7VUFDQSxNQUFJLENBQUNJLE9BQUwsR0FBZSxJQUFmO1VBQ0EsTUFBSSxDQUFDQyxTQUFMLEdBQWlCLEtBQWpCO1FBQ0QsQ0FKUyxFQUlQLEdBSk8sQ0FBVjtNQUtEO0lBQ0Y7OztXQUVELGdCQUFPO01BQ0wsSUFBRyxLQUFLRCxPQUFSLEVBQWdCO1FBQ2QsSUFBRyxLQUFLSCxXQUFMLElBQW9CLENBQXZCLEVBQXlCO1VBQ3ZCLEtBQUs5SyxLQUFMLENBQVd3TCxLQUFYLENBQWlCQyxPQUFqQjtVQUNBLElBQU1uRyxLQUFLLEdBQUd4RCxNQUFNLENBQUM0SixVQUFyQjtVQUNBLElBQU1uRyxNQUFNLEdBQUd6RCxNQUFNLENBQUM2SixXQUF0QjtVQUNBaEosT0FBTyxDQUFDQyxHQUFSLENBQVkwQyxLQUFaO1VBQ0EzQyxPQUFPLENBQUNDLEdBQVIsQ0FBWTJDLE1BQVo7VUFDQSxJQUFNcUcsVUFBVSxHQUFHLEtBQUs1TCxLQUFMLENBQVdxRSxLQUFYLENBQWlCd0gsSUFBakIsQ0FBc0J2RyxLQUFLLEdBQUMsQ0FBNUIsRUFBK0JDLE1BQU0sR0FBQyxDQUF0QyxFQUF5QyxJQUF6QyxFQUErQyxLQUEvQyxFQUFzRCxLQUFLdkYsS0FBTCxDQUFXUyxNQUFqRSxDQUFuQjs7VUFDQSxJQUFHbUwsVUFBVSxDQUFDRSxVQUFkLEVBQXlCO1lBQ3ZCbkosT0FBTyxDQUFDQyxHQUFSLENBQVlnSixVQUFVLENBQUNFLFVBQVgsQ0FBc0J0TSxJQUFsQzs7WUFDQSxLQUFJLElBQUk4RyxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUcsS0FBS3RHLEtBQUwsQ0FBV3lDLEtBQVgsQ0FBaUJxQixLQUFqQixDQUF1QmlJLGFBQXZCLENBQXFDN0YsTUFBeEQsRUFBZ0VJLENBQUMsRUFBakUsRUFBcUU7Y0FDbkUsSUFBR3NGLFVBQVUsQ0FBQ0UsVUFBWCxDQUFzQnRNLElBQXRCLEtBQStCLEtBQUtRLEtBQUwsQ0FBV3lDLEtBQVgsQ0FBaUJxQixLQUFqQixDQUF1QmlJLGFBQXZCLENBQXFDekYsQ0FBckMsRUFBd0NyRyxNQUF4QyxDQUErQ2pCLEdBQWpGLEVBQXFGO2dCQUNuRixLQUFLZ0IsS0FBTCxDQUFXMkQsVUFBWCxDQUFzQnFJLFNBQXRCLENBQWdDLEtBQUtoTSxLQUFMLENBQVd5QyxLQUFYLENBQWlCcUIsS0FBakIsQ0FBdUJpSSxhQUF2QixDQUFxQ3pGLENBQXJDLEVBQXdDckcsTUFBeEU7Y0FDRDtZQUNGOztZQUNELElBQUcyTCxVQUFVLENBQUNFLFVBQVgsQ0FBc0J0TSxJQUF0QixJQUE4QixRQUFqQyxFQUEwQyxDQUN4QztZQUNEO1VBQ0Y7O1VBQ0QsS0FBS1EsS0FBTCxDQUFXMkQsVUFBWCxDQUFzQnNJLFNBQXRCLEdBbEJ1QixDQW1CdkI7UUFFRCxDQXJCRCxNQXFCSyxDQUNIO1FBQ0Q7O1FBQ0QsS0FBS0MsT0FBTDtRQUNBLEtBQUtqQixPQUFMLEdBQWUsS0FBZjtNQUNEO0lBQ0Y7OztXQUVELG1CQUFVO01BQ1IsSUFBTWtCLEtBQUssR0FBRyxLQUFLdkIsZ0JBQUwsQ0FBc0JiLEtBQXRCLEVBQWQ7O01BQ0EsSUFBTXFDLEdBQUcsR0FBR0QsS0FBSyxDQUFDcEMsS0FBTixFQUFaO01BQ0FxQyxHQUFHLENBQUM5TixDQUFKLElBQVMwRSxJQUFJLENBQUM4RixFQUFMLEdBQVEsR0FBakIsQ0FIUSxDQUtSOztNQUNBLElBQU11RCxPQUFPLEdBQUcsSUFBSW5MLE9BQU8sQ0FBQ2dJLFNBQVosQ0FDWixNQURZLEVBRVosVUFGWSxFQUdaLEVBSFksRUFJWmhJLE9BQU8sQ0FBQ2dJLFNBQVIsQ0FBa0JvRCxxQkFKTixFQUtacEwsT0FBTyxDQUFDZ0ksU0FBUixDQUFrQnFELDBCQUxOLENBQWhCLENBTlEsQ0FhUjs7TUFDQSxJQUFNQyxJQUFJLEdBQUcsQ0FBQztRQUNWakQsS0FBSyxFQUFFLENBREc7UUFFVkMsS0FBSyxFQUFFMkM7TUFGRyxDQUFELEVBR1g7UUFDRTVDLEtBQUssRUFBRSxFQURUO1FBRUVDLEtBQUssRUFBRTRDO01BRlQsQ0FIVyxFQU1YO1FBQ0U3QyxLQUFLLEVBQUUsR0FEVDtRQUVFQyxLQUFLLEVBQUUyQztNQUZULENBTlcsQ0FBYixDQWRRLENBeUJSOztNQUNBRSxPQUFPLENBQUM1QyxPQUFSLENBQWdCK0MsSUFBaEIsRUExQlEsQ0E0QlI7O01BQ0EsS0FBS3BNLElBQUwsQ0FBVXFNLFVBQVYsQ0FBcUJuRCxJQUFyQixDQUEwQitDLE9BQTFCO01BRUEsS0FBS3JNLEtBQUwsQ0FBV3FFLEtBQVgsQ0FBaUJxSSxjQUFqQixDQUFnQyxLQUFLdE0sSUFBckMsRUFBMkMsQ0FBM0MsRUFBOEMsR0FBOUMsRUFBbUQsS0FBbkQsRUFBMEQsRUFBMUQsRUFBOEQsWUFBVyxDQUV4RSxDQUZEO0lBR0Q7OztXQUVELG9CQUFXZ0IsUUFBWCxFQUFxQjtNQUNuQixJQUFNdUwsTUFBTSxHQUFHekwsT0FBTyxDQUFDa0UsV0FBUixDQUFvQndILFdBQXBCLENBQWdDLFFBQWhDLEVBQTBDO1FBQUN4RSxJQUFJLEVBQUU7TUFBUCxDQUExQyxFQUFxRCxLQUFLcEksS0FBTCxDQUFXcUUsS0FBaEUsQ0FBZjtNQUNBc0ksTUFBTSxDQUFDckwsUUFBUCxDQUFnQmhELENBQWhCLEdBQW9CMEUsSUFBSSxDQUFDOEYsRUFBTCxHQUFVLENBQTlCO01BQ0E2RCxNQUFNLENBQUMvSCxRQUFQLEdBQWtCLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLN0UsS0FBTCxDQUFXcUUsS0FBckQsQ0FBbEI7TUFDQXNJLE1BQU0sQ0FBQy9ILFFBQVAsQ0FBZ0JFLGNBQWhCLEdBQWlDLElBQUk1RCxPQUFPLENBQUM2RCxPQUFaLENBQW9CLGFBQXBCLEVBQW1DLEtBQUsvRSxLQUFMLENBQVdxRSxLQUE5QyxDQUFqQztNQUNBc0ksTUFBTSxDQUFDL0gsUUFBUCxDQUFnQkUsY0FBaEIsQ0FBK0JFLFFBQS9CLEdBQTBDLElBQTFDO01BQ0EySCxNQUFNLENBQUN2TCxRQUFQLEdBQWtCQSxRQUFsQjtJQUNEOzs7V0FFRCx5QkFBZ0IsQ0FDZDtJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0hIO0FBQ0E7QUFDQTtBQUNBOztJQUNxQjRMO0VBQ3BCLHNCQUNDNUIsTUFERCxFQUNTNkIsTUFEVCxFQUNpQnhLLEtBRGpCLEVBRUU7SUFBQTs7SUFDRCxLQUFLd0ssTUFBTCxHQUFjQSxNQUFkO0lBQ0F0SyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsS0FBWjtJQUNBLEtBQUtBLEtBQUwsR0FBYUEsS0FBYjtJQUNBLEtBQUt5SyxLQUFMLEdBQWEsRUFBYjtJQUNBLEtBQUs5QixNQUFMLEdBQWNBLE1BQWQ7SUFDQSxLQUFLL0csS0FBTCxHQUFjLElBQUluRCxPQUFPLENBQUNtRCxLQUFaLENBQWtCK0csTUFBbEIsQ0FBZDtJQUNBLEtBQUt6SCxVQUFMLEdBQWtCLElBQUlrSiwwRUFBSixDQUFlLElBQWYsQ0FBbEI7SUFDQSxLQUFLckIsS0FBTCxHQUFhLElBQUlzQixxRUFBSixDQUFVLEtBQUt6SSxLQUFmLENBQWI7RUFDQTs7OztXQUVELGtCQUFTO01BQUE7O01BQ1IsS0FBSzhJLFVBQUw7TUFDQSxLQUFLQyxTQUFMO01BQ0EsS0FBS0MsV0FBTDtNQUNBLEtBQUtDLE9BQUw7TUFDQSxLQUFLQyxVQUFMLEdBTFEsQ0FNUjs7TUFDQSxLQUFLQyxPQUFMLEdBQWVDLElBQWYsQ0FBb0IsWUFBTTtRQUN6QixLQUFJLENBQUNDLFdBQUw7TUFDQSxDQUZEO0lBR0E7OztXQUVELHNCQUFhO01BQ1osS0FBS2pOLE1BQUwsR0FBYyxJQUFJUyxPQUFPLENBQUN5TSxVQUFaLENBQXVCLFNBQXZCLEVBQWtDLElBQUl6TSxPQUFPLENBQUNDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEIsQ0FBNUIsQ0FBbEMsRUFBa0UsS0FBS2tELEtBQXZFLENBQWQ7TUFDQSxLQUFLNUQsTUFBTCxDQUFZbU4sU0FBWixDQUFzQixJQUFJMU0sT0FBTyxDQUFDQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQUMsQ0FBM0IsQ0FBdEI7TUFDQSxLQUFLVixNQUFMLENBQVlvTixhQUFaLENBQTBCLEtBQUtaLE1BQS9CLEVBQXVDLEtBQXZDO01BQ0EsS0FBSzVJLEtBQUwsQ0FBV3lKLGFBQVgsQ0FBeUJ4RSxJQUF6QixDQUE4QixLQUFLN0ksTUFBbkMsRUFKWSxDQUtaO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0E7OztXQUVELG1CQUFVO01BQ1RTLE9BQU8sQ0FBQzZNLE1BQVIsQ0FBZUMsaUJBQWYsR0FBbUMsYUFBbkM7TUFDRSxJQUFNQyxNQUFNLEdBQUcvTSxPQUFPLENBQUNrRSxXQUFSLENBQW9COEksWUFBcEIsQ0FBaUMsUUFBakMsRUFBMkM7UUFBRUMsUUFBUSxFQUFFLEVBQVo7UUFBZ0JDLFFBQVEsRUFBRTtNQUExQixDQUEzQyxFQUE2RSxLQUFLL0osS0FBbEYsQ0FBZjtNQUNBLElBQU1nSyxNQUFNLEdBQUcsSUFBSW5OLE9BQU8sQ0FBQ29OLGNBQVosQ0FBMkIsVUFBM0IsRUFBdUMsS0FBS2pLLEtBQTVDLEVBQW1ELFVBQW5ELEVBQStELEVBQS9ELENBQWY7TUFDQWdLLE1BQU0sQ0FBQ0UsUUFBUCxDQUFnQixRQUFoQixFQUEwQixDQUExQjtNQUNBRixNQUFNLENBQUNFLFFBQVAsQ0FBZ0IsVUFBaEIsRUFBNEIsR0FBNUI7TUFDQUYsTUFBTSxDQUFDRyxTQUFQLENBQWlCLFVBQWpCLEVBQTZCdE4sT0FBTyxDQUFDNEYsTUFBUixDQUFlMkgsUUFBZixDQUF3QixDQUF4QixFQUEwQixHQUExQixFQUE4QixHQUE5QixDQUE3QjtNQUNBSixNQUFNLENBQUNHLFNBQVAsQ0FBaUIsYUFBakIsRUFBZ0N0TixPQUFPLENBQUM0RixNQUFSLENBQWUySCxRQUFmLENBQXdCLEdBQXhCLEVBQTRCLEdBQTVCLEVBQWlDLEdBQWpDLENBQWhDO01BQ0FKLE1BQU0sQ0FBQ0ssZUFBUCxHQUF5QixLQUF6QjtNQUNBVCxNQUFNLENBQUNySixRQUFQLEdBQWtCeUosTUFBbEIsQ0FUTyxDQVdQOztNQUNBLEtBQUtoSyxLQUFMLENBQVdzSyxPQUFYLEdBQXFCek4sT0FBTyxDQUFDbUQsS0FBUixDQUFjdUssWUFBbkM7TUFDQSxLQUFLdkssS0FBTCxDQUFXd0ssVUFBWCxHQUF3QixLQUF4QjtNQUNBLEtBQUt4SyxLQUFMLENBQVd5SyxRQUFYLEdBQXNCLElBQUk1TixPQUFPLENBQUM0RixNQUFaLENBQW1CLEdBQW5CLEVBQXVCLElBQXZCLEVBQTRCLEdBQTVCLENBQXRCO0lBQ0Y7OztXQUVELHNCQUFhO01BQ1osS0FBS2lJLFVBQUwsR0FBa0IsRUFBbEI7TUFDQSxLQUFLQyxRQUFMLEdBQWdCLElBQWhCO01BQ0EsS0FBS0MsV0FBTCxHQUFtQixDQUFDLEVBQXBCO01BQ0EsS0FBS0MsUUFBTCxHQUFnQixDQUFoQjtNQUNBLEtBQUtDLE1BQUwsR0FBY2pPLE9BQU8sQ0FBQ2tFLFdBQVIsQ0FBb0JnSyx5QkFBcEIsQ0FBOEMsUUFBOUMsRUFBd0QsVUFBeEQsRUFBb0U7UUFDakY5SixLQUFLLEVBQUUsS0FBSzBKLFFBRHFFO1FBRWpGekosTUFBTSxFQUFFLEtBQUt5SixRQUZvRTtRQUdqRkssWUFBWSxFQUFFLEtBQUtBLFlBSDhEO1FBSWpGQyxTQUFTLEVBQUcsS0FBS0wsV0FKZ0U7UUFLakZNLFNBQVMsRUFBRSxLQUFLTCxRQUxpRTtRQU1qRk0sU0FBUyxFQUFFO01BTnNFLENBQXBFLEVBT1gsS0FBS25MLEtBUE0sQ0FBZDtNQVFBLElBQU1vTCxlQUFlLEdBQUcsSUFBSXZPLE9BQU8sQ0FBQzJELGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDLEtBQUtSLEtBQS9DLENBQXhCO01BQ0FvTCxlQUFlLENBQUMzSyxjQUFoQixHQUFpQyxJQUFJNUQsT0FBTyxDQUFDNkQsT0FBWixDQUFvQixZQUFwQixFQUFrQyxLQUFLVixLQUF2QyxDQUFqQztNQUNBb0wsZUFBZSxDQUFDM0ssY0FBaEIsQ0FBK0I0SyxNQUEvQixHQUF3QyxJQUF4QztNQUNBRCxlQUFlLENBQUMzSyxjQUFoQixDQUErQjZLLE1BQS9CLEdBQXdDLElBQXhDO01BQ0EsS0FBS1IsTUFBTCxDQUFZdkssUUFBWixHQUF1QjZLLGVBQXZCO01BQ0EsS0FBS04sTUFBTCxDQUFZUyxjQUFaLEdBQTZCLElBQTdCO01BQ0EsS0FBS1QsTUFBTCxDQUFZOU0sZUFBWixHQUE4QixJQUE5QjtNQUNBLEtBQUt3TixlQUFMLENBQXFCQyxZQUFyQixHQUFvQ0MsVUFBcEMsQ0FBK0N6RyxJQUEvQyxDQUFvRCxLQUFLNkYsTUFBekQsRUFwQlksQ0FxQlo7SUFDQTs7Ozs2TEFFRDtRQUFBO1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUEsT0FDcUJyTixNQUFNLENBQUNaLE9BQVAsQ0FBZXNELFdBQWYsQ0FBMkJ3TCxlQUEzQixDQUEyQyxFQUEzQyxFQUErQyxJQUEvQyxFQUFxRCxjQUFyRCxFQUFxRSxLQUFLM0wsS0FBMUUsQ0FEckI7O2NBQUE7Z0JBQ1FqRSxJQURSO2dCQUVFdUMsT0FBTyxDQUFDQyxHQUFSLENBQVl4QyxJQUFaO2dCQUNBLEtBQUtzRSxHQUFMLEdBQVd0RSxJQUFJLENBQUM2UCxNQUFMLENBQVksQ0FBWixDQUFYO2dCQUNBLEtBQUt2TCxHQUFMLENBQVNDLFNBQVQsR0FBcUIsS0FBckI7Z0JBQ0EsS0FBS0QsR0FBTCxDQUFTRSxRQUFULEdBQW9CLElBQUkxRCxPQUFPLENBQUMyRCxnQkFBWixDQUE2QixLQUE3QixFQUFvQyxLQUFLUixLQUF6QyxDQUFwQjtnQkFDQSxLQUFLSyxHQUFMLENBQVNFLFFBQVQsQ0FBa0JFLGNBQWxCLEdBQW1DLElBQUk1RCxPQUFPLENBQUM2RCxPQUFaLENBQW9CLGVBQXBCLEVBQXFDLEtBQUtWLEtBQTFDLENBQW5DO2dCQUNBLEtBQUtLLEdBQUwsQ0FBU0UsUUFBVCxDQUFrQkUsY0FBbEIsQ0FBaUNFLFFBQWpDLEdBQTRDLElBQTVDOztjQVBGO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQTs7Ozs7Ozs7OztXQVVBLHVCQUFjO01BQUE7O01BQ2IsSUFBTWlGLENBQUMsR0FBRyxJQUFJN0YscUVBQUosQ0FBYyxLQUFLQyxLQUFuQixDQUFWLENBRGEsQ0FFYjs7TUFDQTRGLENBQUMsQ0FBQ0MsWUFBRjtNQUNBRCxDQUFDLENBQUNFLE9BQUY7TUFDQUYsQ0FBQyxDQUFDdkcsR0FBRjtNQUNBLEtBQUtyRCxPQUFMLEdBQWU0SixDQUFmO01BQ0FzQixVQUFVLENBQUMsWUFBTTtRQUNoQixNQUFJLENBQUM1SCxVQUFMLENBQWdCdU0saUJBQWhCO01BQ0EsQ0FGUyxFQUVQLElBRk8sQ0FBVjtJQUdBOzs7V0FFRCx1QkFBYztNQUNiO01BQ0E7TUFDQTtNQUNBO01BQ0EsS0FBSzdMLEtBQUwsQ0FBVzhMLE9BQVgsR0FBcUIsSUFBSWpQLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUFDLElBQXhCLEVBQThCLENBQTlCLENBQXJCO01BQ0EsS0FBS2tELEtBQUwsQ0FBVytMLGlCQUFYLEdBQStCLElBQS9CO0lBQ0E7OztXQUVELHFCQUFZO01BQ1gsSUFBTUMsR0FBRyxHQUFHLElBQUluUCxPQUFPLENBQUNrRSxXQUFSLENBQW9CQyxTQUF4QixDQUFrQyxPQUFsQyxFQUEyQztRQUFDK0MsSUFBSSxFQUFFO01BQVAsQ0FBM0MsRUFBc0QsS0FBSy9ELEtBQTNELENBQVo7TUFFRWdNLEdBQUcsQ0FBQ3pMLFFBQUosR0FBZSxJQUFJMUQsT0FBTyxDQUFDMkQsZ0JBQVosQ0FBNkIsS0FBN0IsRUFBb0MsS0FBS1IsS0FBekMsQ0FBZjtNQUNBZ00sR0FBRyxDQUFDekwsUUFBSixDQUFhRSxjQUFiLEdBQThCLElBQUk1RCxPQUFPLENBQUM2RCxPQUFaLENBQW9CLFlBQXBCLEVBQWtDLEtBQUtWLEtBQXZDLENBQTlCO01BQ0FnTSxHQUFHLENBQUN6TCxRQUFKLENBQWFFLGNBQWIsQ0FBNEJFLFFBQTVCLEdBQXVDLElBQXZDO01BRUFxTCxHQUFHLENBQUNqUCxRQUFKLEdBQWUsSUFBSUYsT0FBTyxDQUFDQyxPQUFaLENBQW9CLEVBQXBCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLENBQWY7TUFDRmtQLEdBQUcsQ0FBQ1QsY0FBSixHQUFxQixJQUFyQjtNQUNBLEtBQUtDLGVBQUwsQ0FBcUJDLFlBQXJCLEdBQW9DQyxVQUFwQyxDQUErQ3pHLElBQS9DLENBQW9EK0csR0FBcEQ7TUFDRUEsR0FBRyxDQUFDaE8sZUFBSixHQUFzQixJQUF0QjtNQUNBLEtBQUs2SyxLQUFMLENBQVc1RCxJQUFYLENBQWdCK0csR0FBaEIsRUFYUyxDQVlUOztNQUVBLEtBQUssSUFBSS9KLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5RyxtRkFBcEIsRUFBc0N6RyxDQUFDLEVBQXZDLEVBQTJDO1FBQ3ZDLElBQU15RCxLQUFLLEdBQUdzRyxHQUFHLENBQUMzRixjQUFKLENBQW1CLFFBQVFwRSxDQUEzQixDQUFkO1FBQ0F5RCxLQUFLLENBQUN3RyxJQUFOLEdBQWEsS0FBYjtRQUNBeEcsS0FBSyxDQUFDM0ksUUFBTixDQUFlOUMsQ0FBZixHQUFtQnlPLDJGQUFBLENBQXFCekcsQ0FBQyxHQUFDLENBQXZCLENBQW5CO1FBQ0F5RCxLQUFLLENBQUMzSSxRQUFOLENBQWU1QyxDQUFmLEdBQW1CdU8sMkZBQUEsQ0FBcUJ6RyxDQUFDLEdBQUMsQ0FBRixHQUFNLENBQTNCLENBQW5CO1FBQ0F5RCxLQUFLLENBQUN6SSxRQUFOLENBQWUvQyxDQUFmLEdBQW1Cd08sMkZBQUEsQ0FBcUJ6RyxDQUFyQixDQUFuQixDQUx1QyxDQU92Qzs7UUFDSixLQUFLdUosZUFBTCxDQUFxQkMsWUFBckIsR0FBb0NDLFVBQXBDLENBQStDekcsSUFBL0MsQ0FBb0RTLEtBQXBEO1FBQ0FBLEtBQUssQ0FBQzFILGVBQU4sR0FBd0IsSUFBeEIsQ0FUMkMsQ0FVM0M7O1FBQ0EsS0FBSzZLLEtBQUwsQ0FBVzVELElBQVgsQ0FBZ0JTLEtBQWhCO01BQ0M7SUFDSDs7O1dBRUQscUJBQVk7TUFDWCxLQUFLMkcsUUFBTCxHQUFnQixJQUFJeFAsT0FBTyxDQUFDeVAsZ0JBQVosQ0FBNkIsVUFBN0IsRUFBeUMsSUFBSXpQLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixDQUF6QyxFQUF1RSxLQUFLa0QsS0FBNUUsQ0FBaEI7TUFDRSxLQUFLcU0sUUFBTCxDQUFjRSxTQUFkLEdBQTBCLEdBQTFCO01BQ0YsS0FBS0MsUUFBTCxHQUFnQixJQUFJM1AsT0FBTyxDQUFDNFAsZ0JBQVosQ0FBNkIsVUFBN0IsRUFBeUMsSUFBSTVQLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixDQUF6QyxFQUF1RSxLQUFLa0QsS0FBNUUsQ0FBaEI7TUFDQSxLQUFLd00sUUFBTCxDQUFjRSxPQUFkLEdBQXdCLElBQUk3UCxPQUFPLENBQUM0RixNQUFaLENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLENBQXhCO01BQ0EsS0FBSytKLFFBQUwsQ0FBY0csUUFBZCxHQUF5QixJQUFJOVAsT0FBTyxDQUFDNEYsTUFBWixDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixDQUF6QjtNQUNBLEtBQUsrSixRQUFMLENBQWN6UCxRQUFkLEdBQXlCLElBQUlGLE9BQU8sQ0FBQ0MsT0FBWixDQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QixDQUE5QixDQUF6QjtNQUNFLEtBQUswUCxRQUFMLENBQWNELFNBQWQsR0FBMEIsR0FBMUI7TUFDRixLQUFLZixlQUFMLEdBQXVCLElBQUkzTyxPQUFPLENBQUMrUCxlQUFaLENBQTRCLElBQTVCLEVBQWtDLEtBQUtKLFFBQXZDLENBQXZCO01BQ0UsS0FBS2hCLGVBQUwsQ0FBcUJxQixvQkFBckIsR0FBNEMsS0FBNUM7SUFDRjs7O1dBRUQsa0JBQVM7TUFDUixLQUFLQyxNQUFMO0lBQ0E7OztXQUVELHFCQUFZLENBRVg7OztXQUVELDJCQUFpQixDQUVoQjs7O1dBRUQsdUJBQWMsQ0FFYjs7O1dBRUQsa0JBQVM7TUFDUixLQUFLOU0sS0FBTCxDQUFXOE0sTUFBWDs7TUFDQSxJQUFHLEtBQUtDLElBQVIsRUFBYTtRQUNaLEtBQUt6TixVQUFMLENBQWdCME4sTUFBaEI7TUFDQTtJQUNEOzs7V0FFRCxrQkFBUyxDQUVSOzs7V0FFRCxtQkFBVSxDQUVUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL21vZGVscy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL21vZGVscy9sb2NhbFBsYXllci5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvbW9kZWxzL3BsYXllck1vZC5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvbW9kZWxzL3JlbW90ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvbW9kZWxzL3dlYXBvbi5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvc2NlbmVzL2JhYnlsb25TY2VuZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHR4LCB5LCB6XG5cdCkge1xuXHRcdHRoaXMuX25hbWUgPSAnTm8gTmFtZSc7XG5cdFx0dGhpcy5feCA9IHg7XG5cdFx0dGhpcy5feSA9IHk7XG5cdFx0dGhpcy5feiA9IHo7XG5cdFx0dGhpcy5fcm90WCA9IDA7XG5cdFx0dGhpcy5fcm90WSA9IDA7XG5cdFx0dGhpcy5fcm90WiA9IDA7XG5cdFx0dGhpcy5faWQ7XG5cdFx0dGhpcy5fY29sb3I7XG5cdFx0dGhpcy5faGl0UG9pbnRzID0gMTAwO1xuXHRcdHRoaXMuX2lzRGVhZCA9IGZhbHNlO1xuXHRcdHRoaXMuX2hlaWdodCA9IDY7XG5cblx0XHR0aGlzLl9kZWF0aHMgPSAwO1xuXHRcdHRoaXMuX2tpbGxzID0gMDtcblx0fVxuXG5cdHNldElEKGlkKSB7XG5cdFx0dGhpcy5faWQgPSBpZDtcblx0fVxuXG5cdHNldE5hbWUobmFtZSkge1xuXHRcdHRoaXMuX25hbWUgPSBuYW1lO1xuXHR9XG5cblx0c2V0Q29sb3IocixnLGIpIHtcblx0XHR0aGlzLl9jb2xvciA9IHtcblx0XHRcdHIsZyxiXG5cdFx0fVxuXHR9XG5cblx0c2V0WFlaKHgsIHksIHopIHtcblx0XHR0aGlzLl94ID0geDtcblx0XHR0aGlzLl95ID0geTtcblx0XHR0aGlzLl96ID0gejtcblx0fVxuXG5cdGdldFhZWigpIHtcblx0XHRyZXR1cm4ge3ggOiB0aGlzLl94LCB5IDogdGhpcy5feSAsIHogOiB0aGlzLl96fTtcblx0fVxuXG5cdHNldFJvdFhZWih4LCB5LCB6KSB7XG5cdFx0dGhpcy5fcm90WCA9IHg7XG5cdFx0dGhpcy5fcm90WSA9IHk7XG5cdFx0dGhpcy5fcm90WiA9IHo7XG5cdH1cblxuXHRoaXQoKSB7XG5cdFx0dGhpcy5faGl0UG9pbnRzIC09IDE5O1xuXHRcdGlmKHRoaXMuX2hpdFBvaW50cyA8PSAwKXtcblx0XHRcdHRoaXMuX2lzRGVhZCA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9pc0RlYWQ7XG5cdH1cblxuXHRzZXREZWFkKGQpIHtcblx0XHR0aGlzLl9pc0RlYWQgPSBkO1xuXHR9XG5cblx0c2V0SGl0UG9pbnRzKGgpIHtcblx0XHRpZihoID4gMTAwKSBoID0gMTAwO1xuXHRcdGVsc2UgaWYoaCA8IDApIGggPSAwO1xuXHRcdHRoaXMuX2hpdFBvaW50cyA9IGg7XG5cdH1cblxuXHRnZXRIaXRQb2ludHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpdFBvaW50cztcblx0fVxuXG5cdGlzRGVhZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNEZWFkO1xuXHR9XG5cblx0YWRkRGVhdGgoKSB7XG5cdFx0dGhpcy5fZGVhdGhzICs9IDE7XG5cdH1cblxuXHRhZGRLaWxsKCkge1xuXHRcdHRoaXMuX2tpbGxzICs9IDE7XG5cdH1cbn0iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vd2VhcG9uLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsUGxheWVyIHtcblx0Y29uc3RydWN0b3IoXG5cdFx0c2NlbmUsIHBsYXllclxuXHQpIHtcblx0XHR0aGlzLnBsYXllciA9IHBsYXllcjtcblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XG5cdFx0XG5cdFx0dGhpcy5jYW1lcmFTcGVlZCA9IDAuNjtcblx0XHR0aGlzLmp1bXBIZWlnaHQgPSAyLjU7XG5cdFx0dGhpcy5tZXNoID0gdGhpcy5zY2VuZS5zb2xkaWVyO1xuXHRcdHRoaXMubWVzaC5uYW1lID0gcGxheWVyLl9pZFxuXHRcdHRoaXMubWVzaC5wbGF5ZXIuc2V0RW5hYmxlZCh0cnVlKTtcblx0XHR0aGlzLmp1bXBVcCA9IGZhbHNlO1xuXHRcdHRoaXMuaXNKdW1waW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEuc3BlZWQgPSB0aGlzLmNhbWVyYVNwZWVkO1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLmtleXNVcCA9IFs4N10gLy8gV1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLmtleXNEb3duID0gWzgzXTsgLy8gUyBcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5rZXlzTGVmdCA9IFs2NV07IC8vIEFcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5rZXlzUmlnaHQgPSBbNjhdOyAvLyBEXG5cdFx0dGhpcy5yZXNldENhbWVyYUNvb3JkaW5hdGVzKCk7XG5cdFx0dGhpcy5pbml0UGh5c2ljcygpO1xuXG5cdFx0dGhpcy5sYXN0UG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLngsIHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnksIHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnopXG5cdFx0dGhpcy5sYXN0Um90YXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLngsIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLnksIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLnopXG5cdFx0XG5cdFx0dGhpcy5iaW5kRXZlbnQoKVxuXHRcdHRoaXMud2VhcG9uID0gbmV3IFdlYXBvbihzY2VuZSwgcGxheWVyLCB0aGlzLm1lc2gucGxheWVyKVxuXHR9XG5cblx0VXBkYXRlKCkge1xuXHRcdHRoaXMudXBkYXRlUG9zaXRpb24oKVxuXHRcdHRoaXMuY2hlY2tDb250cm9scygpO1xuXHR9XG5cdHNldENvbG9yKHIsZyxiKSB7XG5cdFx0dGhpcy5wbGF5ZXIuX2NvbG9yID0ge1xuXHRcdFx0cixnLGJcblx0XHR9XG5cdH1cblxuXHRzZXRYWVooeCwgeSwgeikge1xuXHRcdHRoaXMucGxheWVyLl94ID0geDtcblx0XHR0aGlzLnBsYXllci5feSA9IHk7XG5cdFx0dGhpcy5wbGF5ZXIuX3ogPSB6O1xuXHR9XG5cblx0c2V0Um90WFlaKHgsIHksIHopIHtcblx0XHR0aGlzLnBsYXllci5fcm90WCA9IHg7XG5cdFx0dGhpcy5wbGF5ZXIuX3JvdFkgPSB5O1xuXHRcdHRoaXMucGxheWVyLl9yb3RaID0gejtcblx0fVxuXG5cdGhpdCgpIHtcblx0XHR0aGlzLnBsYXllci5faGl0UG9pbnRzIC09IDE5O1xuXHRcdGlmKHRoaXMucGxheWVyLl9oaXRQb2ludHMgPD0gMCl7XG5cdFx0XHR0aGlzLnBsYXllci5faXNEZWFkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMucGxheWVyLl9pc0RlYWQ7XG5cdH1cblxuXHRzZXREZWFkKGQpIHtcblx0XHR0aGlzLnBsYXllci5faXNEZWFkID0gZDtcblx0fVxuXG5cdHNldEhpdFBvaW50cyhoKSB7XG5cdFx0aWYoaCA+IDEwMCkgaCA9IDEwMDtcblx0XHRlbHNlIGlmKGggPCAwKSBoID0gMDtcblx0XHR0aGlzLnBsYXllci5faGl0UG9pbnRzID0gaDtcblx0XHRQYW5uZWwudXBkYXRlSGVhbHRoQmFyKHRoaXMucGxheWVyLmdldEhpdFBvaW50cygpKTtcblx0fVxuXG5cdGlzRGVhZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5wbGF5ZXIuX2lzRGVhZDtcblx0fVxuXG5cdGFkZERlYXRoKCkge1xuXHRcdHRoaXMucGxheWVyLl9kZWF0aHMgKz0gMTtcblx0fVxuXG5cdGFkZEtpbGwoKSB7XG5cdFx0dGhpcy5wbGF5ZXIuX2tpbGxzICs9IDE7XG5cdH1cblxuXHRiaW5kRXZlbnQoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XG5cdFx0XHR0aGlzLm9uS2V5VXAoZXZlbnQpXG5cdFx0fSwgZmFsc2UpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG5cdFx0XHR0aGlzLm9uS2V5RG93bihldmVudClcblx0XHR9LCBmYWxzZSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQua2V5Q29kZSA9IGV2ZW50LnBvaW50ZXJJZDtcblx0XHRcdHRoaXMub25LZXlVcChldmVudClcblx0XHR9LCBmYWxzZSlcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoZXZlbnQpID0+IHtcblx0XHRcdGV2ZW50LmtleUNvZGUgPSBldmVudC5wb2ludGVySWQ7XG5cdFx0XHR0aGlzLm9uS2V5RG93bihldmVudCk7XG5cdFx0fSwgZmFsc2UpXG5cdH1cblxuXHRpbml0UGh5c2ljcygpIHtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnVzZU9jdHJlZUZvckNvbGxpc2lvbnMgPSB0cnVlO1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLmFwcGx5R3Jhdml0eSA9IHRydWU7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMygxLDIsMSlcblx0XHQvLyB0aGlzLnNjZW5lLmNhbWVyYS5lbGxpcHNvaWRPZmZzZXQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsMiwwKVxuXHR9XG5cblx0Q3JlYXRlKCkge1xuXHR9XG5cblx0b25LZXlVcChldmVudCkge1xuXHRcdHRoaXMuc2NlbmUuc3RvcmUub25LZXl1cChldmVudClcblx0fVxuXG5cdG9uS2V5RG93bihldmVudCkge1xuXHRcdGNvbnNvbGUubG9nKGV2ZW50KVxuXHRcdHRoaXMuc2NlbmUuc3RvcmUub25LZXlEb3duKGV2ZW50KVxuXHR9XG5cblx0Z290S2lsbGVkKGtpbGxlcil7XG5cdFx0dGhpcy5zZXREZWFkKHRydWUpXG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEuc3BlZWQgPSAwO1xuXHR9XG5cblx0cmVzZXRDYW1lcmFDb29yZGluYXRlcygpIHtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi54ID0gdGhpcy5wbGF5ZXIuX3g7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMucGxheWVyLl95ICsgMTtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56ID0gdGhpcy5wbGF5ZXIuX3o7XG5cdH1cblxuXHR1cGRhdGVQb3NpdGlvbigpIHtcblx0XHRjb25zdCB4T2Zmc2V0ID0gTWF0aC5hYnModGhpcy5sYXN0UG9zaXRpb24ueCAtIHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLngpO1xuICAgIGNvbnN0IHlPZmZzZXQgPSBNYXRoLmFicyh0aGlzLmxhc3RQb3NpdGlvbi55IC0gdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSk7XG4gICAgY29uc3Qgek9mZnNldCA9IE1hdGguYWJzKHRoaXMubGFzdFBvc2l0aW9uLnogLSB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56KTtcbiAgICBcbiAgICBjb25zdCB4Um90T2Zmc2V0ID0gTWF0aC5hYnModGhpcy5sYXN0Um90YXRpb24ueCAtIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLngpO1xuICAgIGNvbnN0IHlSb3RPZmZzZXQgPSBNYXRoLmFicyh0aGlzLmxhc3RSb3RhdGlvbi55IC0gdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueSk7XG4gICAgY29uc3QgelJvdE9mZnNldCA9IE1hdGguYWJzKHRoaXMubGFzdFJvdGF0aW9uLnogLSB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi56KTtcbiAgICBcbiAgICBjb25zdCBwb3NPZmZzZXQgPSB4T2Zmc2V0ICsgeU9mZnNldCArIHpPZmZzZXQ7XG4gICAgY29uc3Qgcm90T2Zmc2V0ID0geVJvdE9mZnNldCArIHhSb3RPZmZzZXQgKyB6Um90T2Zmc2V0O1xuXG4gICAgaWYocG9zT2Zmc2V0ID4gMC4xIHx8IHJvdE9mZnNldCA+IDAuMDEpeyBcbiAgICAgICAgdGhpcy5zdWJtaXRNb3ZlbWVudCgpO1xuICAgIH0gXG5cdH1cblxuXHRzdWJtaXRNb3ZlbWVudCgpIHtcblx0XHRjb25zb2xlLmxvZygnc3ViJylcblx0XHR0aGlzLm1lc2gucnVuKCk7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjModGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueCAtIDAuMywgdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSAtIDAuNSwgdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueik7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5yb3RhdGlvbi55ID0gdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueTtcblx0XHR0aGlzLm1lc2gucGxheWVyLnJvdGF0aW9uID0gdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb247XG5cdFx0dGhpcy5zY2VuZS5jb250cm9sbGVyLnNlbmRMb2NhbFBsYXllck1vdmVtZW50KHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLCB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbik7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnggLSAwLjMsIHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnkgLTAuNSwgdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueik7XG4gICAgdGhpcy5sYXN0Um90YXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLnggLCB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi55ICwgdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueik7XG5cdH1cblxuXHRjaGVja0NvbnRyb2xzKCkge1xuXHRcdGlmKHRoaXMuc2NlbmUuc3RvcmUuaXNEb3duKHRoaXMuc2NlbmUuc3RvcmUuc3RhdGUuSlVNUCkpe1xuXHRcdFx0aWYoIXRoaXMuaXNKdW1waW5nKXtcblx0XHRcdFx0dGhpcy5qdW1wKClcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYodGhpcy5zY2VuZS5zdG9yZS5pc0Rvd24odGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5GSVJFKSl7XG5cdFx0XHRpZighdGhpcy5wbGF5ZXIuaXNEZWFkKCkpXG5cdFx0XHRcdFx0dGhpcy53ZWFwb24uZmlyZSgpO1xuXHRcdH1cblx0fVxuXG5cdGp1bXAoKSB7XG5cblx0fVxuXG5cdGNoZWNrRnJlZUZhbGwoKXtcblxuXHR9XG5cblx0Y2hlY2tKdW1wKCkge1xuXG5cdH1cblxuXHREZXN0cm95KCkge1xuXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJNb2Qge1xuICBjb25zdHJ1Y3RvcihzY2VuZSkge1xuICAgIHRoaXMuU2NlbmUgPSBzY2VuZTtcblxuICB9XG5cdGFzeW5jIGxvYWRHdW4oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdFx0d2luZG93LkJBQllMT04uU2NlbmVMb2FkZXIuSW1wb3J0TWVzaCgnJywgJy8nLCBcIndlYXBvbl8yLm9ialwiLCB0aGlzLlNjZW5lLCAobWVzaCkgPT4ge1xuXHRcdFx0XHR0aGlzLmd1biA9IG1lc2hbMF07XG5cdFx0XHRcdHRoaXMuZ3VuLmlzVmlzaWJsZSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLmd1bi5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJNYXRcIiwgdGhpcy5TY2VuZSk7XG4gICAgICAgIHRoaXMuZ3VuLm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcIi93ZWFwb25fMi5wbmdcIiwgdGhpcy5TY2VuZSk7XG4gICAgICAgIHRoaXMuZ3VuLm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTsgIFxuXHRcdFx0XHRyZXNvbHZlKG1lc2gpXG5cdFx0XHR9KTtcblx0XHR9KVxuXHR9XG4gIGNyZWF0ZVBsYXllcigpIHtcblxuICAgIHRoaXMucGxheWVyID0gbmV3IEJBQllMT04uVHJhbnNmb3JtTm9kZShcInBpdm90XCIpO1xuXHRcdHRoaXMucGxheWVyLnNldEVuYWJsZWQoZmFsc2UpO1xuXHRcdC8vIHRoaXMuZ3VuLnBhcmVudCA9IHRoaXMucGxheWVyO1xuXHRcdC8vIHRoaXMuZ3VuLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDI7XG5cdFx0Ly8gdGhpcy5ndW4uc2V0RW5hYmxlZChmYWxzZSk7XG5cdFx0Ly8gdGhpcy5ndW4ucG9zaXRpb24ueiAtPSAyO1xuXHRcdC8vIHRoaXMuZ3VuLnBvc2l0aW9uLnggLT0gMC41O1xuXHRcdC8vIHRoaXMuZ3VuLnBvc2l0aW9uLnkgLT0gMTtcblx0XHQvLyBjb25zdCBDb1RBeGlzID0gdGhpcy5sb2NhbEF4ZXMoMiwgMCk7XG5cdFx0Ly8gQ29UQXhpcy5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHR0aGlzLnBsYXllci5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMC4xLCAwKTtcblx0XHRcblx0XHRjb25zdCBmYWNlQ29sb3JzID0gW107XG5cdFx0Ly8gZmFjZUNvbG9yc1swXSA9IEJBQllMT04uQ29sb3IzLkJsdWUoKTtcblx0XHQvLyBmYWNlQ29sb3JzWzFdID0gQkFCWUxPTi5Db2xvcjMuV2hpdGUoKVxuXHRcdC8vIGZhY2VDb2xvcnNbMl0gPSBCQUJZTE9OLkNvbG9yMy5SZWQoKTtcblx0XHQvLyBmYWNlQ29sb3JzWzNdID0gQkFCWUxPTi5Db2xvcjMuQmxhY2soKTtcblx0XHQvLyBmYWNlQ29sb3JzWzRdID0gQkFCWUxPTi5Db2xvcjMuR3JlZW4oKTtcblx0XHQvLyBmYWNlQ29sb3JzWzVdID0gQkFCWUxPTi5Db2xvcjMuWWVsbG93KCk7XG5cdFx0dGhpcy5oZWFkID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwiaGVhZFwiLCB7d2lkdGg6IDEsIGhlaWdodDogMC44LCBmYWNlQ29sb3JzOiBmYWNlQ29sb3JzfSwgdGhpcy5TY2VuZSk7IFxuXHRcdHRoaXMuaGVhZC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJoZWFkbVwiLCB0aGlzLlNjZW5lKTtcblx0XHQvLyBoZWFkLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLjc4LCAwLjI3LCAwLjM5KTtcblx0XHR0aGlzLmhlYWQucGFyZW50ID0gdGhpcy5wbGF5ZXI7XG5cdFx0Y29uc3QgaW5kaWNlcyA9IHRoaXMuaGVhZC5nZXRJbmRpY2VzKCk7XG5cdFx0Y29uc3QgcG9zaXRpb25zID0gdGhpcy5oZWFkLmdldFZlcnRpY2VzRGF0YShCQUJZTE9OLlZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQpO1xuXHRcdGxldCBjb2xvcnMgPSB0aGlzLmhlYWQuZ2V0VmVydGljZXNEYXRhKEJBQllMT04uVmVydGV4QnVmZmVyLkNvbG9yS2luZCk7ICAgICAgICBcblx0XHRjb25zdCBuYlZlcnRpY2VzID0gcG9zaXRpb25zLmxlbmd0aCAvIDM7XG5cdFx0aWYgKCFjb2xvcnMpIHtcblx0XHRcdFx0Y29sb3JzID0gbmV3IEFycmF5KDQgKiBuYlZlcnRpY2VzKTtcblx0XHRcdFx0Y29sb3JzID0gY29sb3JzLmZpbGwoMSk7XG5cdFx0fVxuXHRcdGxldCB2ZXJ0ZXg7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcblx0XHRcdFx0dmVydGV4ID0gaW5kaWNlc1szICogMCArIGldO1xuXHRcdFx0XHRjb2xvcnNbNCAqIHZlcnRleF0gPSAxO1xuXHRcdFx0XHRjb2xvcnNbNCAqIHZlcnRleCArIDFdID0gMTtcblx0XHRcdFx0Y29sb3JzWzQgKiB2ZXJ0ZXggKyAyXSA9IDA7XG5cdFx0XHRcdGNvbG9yc1s0ICogdmVydGV4ICsgM10gPSAxO1xuXHRcdH1cblx0XHR0aGlzLmhlYWQuc2V0VmVydGljZXNEYXRhKEJBQllMT04uVmVydGV4QnVmZmVyLkNvbG9yS2luZCwgY29sb3JzKTtcblx0XHQvLyBoZWFkLnNldFBpdm90TWF0cml4KEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjQsIDApKVxuXHRcdHRoaXMuaGVhZC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMC40LCAwKSk7O1xuXG5cdFx0Y29uc3QgaGFpciA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImhhaXJcIiwge3dpZHRoOiAxLCBoZWlnaHQ6IDAuMn0sIHRoaXMuU2NlbmUpO1xuXHRcdGhhaXIuc2V0UGl2b3RNYXRyaXgoQkFCWUxPTi5NYXRyaXguVHJhbnNsYXRpb24oMCwgLTAuMSwgMCkpXG5cdFx0aGFpci5wYXJlbnQgPSB0aGlzLmhlYWQ7XG5cdFx0aGFpci5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMC41LCAwKSk7O1xuXHRcdGhhaXIubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiaGFpcm1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0aGFpci5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC42MSwgMC4yMywgMC4yOSk7XG5cdFx0XG5cblx0XHR0aGlzLmJvZHkgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJib2R5XCIsIHt3aWR0aDoxLjIsIGhlaWdodDogMS4yLCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5ib2R5LnBhcmVudCA9IHRoaXMucGxheWVyO1xuXHRcdHRoaXMuYm9keS5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJib2R5bVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmJvZHkubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmJvZHkubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjYsIDApKTtcblx0XHRcblxuXHRcdGNvbnN0IGJ1dCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImJ1dFwiLCB7d2lkdGg6MS4yNSwgaGVpZ2h0OiAwLjQsIGRlcHRoOiAwLjU1fSwgdGhpcy5TY2VuZSk7XG5cdFx0YnV0LnBhcmVudCA9IHRoaXMuYm9keTtcblx0XHRidXQubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiYnV0bVwiLCB0aGlzLlNjZW5lKTtcblx0XHRidXQubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjEsIDAuMSwgMC4xKTtcblx0XHRidXQubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjgsIDApKTtcblx0XHRcblxuXHRcdHRoaXMubGVmdGFybSA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnR1cHBlcmFybVwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuOCwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMubGVmdGFybS5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJsZWZ0dXBwZXJhcm1tXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMubGVmdGFybS5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdHRoaXMubGVmdGFybS5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHR0aGlzLmxlZnRhcm0uc2V0UGl2b3RNYXRyaXgoQkFCWUxPTi5NYXRyaXguVHJhbnNsYXRpb24oMCwgLTAuNCwgMCkpXG5cdFx0dGhpcy5sZWZ0YXJtLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygtMC45LCAtMC40LCAwKSk7XG5cblx0XHR0aGlzLmxlZnRlbGJvdyA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRlbGJvd1wiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuMiwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMubGVmdGVsYm93Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRlbGJvd21cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0ZWxib3cubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmxlZnRlbGJvdy5wYXJlbnQgPSB0aGlzLmxlZnRhcm07XG5cdFx0dGhpcy5sZWZ0ZWxib3cubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjUsIDApKTtcblxuXHRcdHRoaXMubGVmdGxvd2VyYXJtID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdGxvd2VyYXJtXCIsIHt3aWR0aDowLjQsIGhlaWdodDogMC44LCBkZXB0aDogMC40fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0ubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdGxvd2VyYXJtbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRsb3dlcmFybS5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdHRoaXMubGVmdGxvd2VyYXJtLnBhcmVudCA9IHRoaXMubGVmdGFybTtcblx0XHR0aGlzLmxlZnRsb3dlcmFybS5zZXRQaXZvdE1hdHJpeChCQUJZTE9OLk1hdHJpeC5UcmFuc2xhdGlvbigwLCAtMC40LCAwKSlcblx0XHR0aGlzLmxlZnRsb3dlcmFybS5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuOCwgMCkpO1xuXG5cdFx0Y29uc3QgbGVmdHdhaXN0ID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdHdhaXN0XCIsIHt3aWR0aDowLjQ0LCBoZWlnaHQ6IDAuMSwgZGVwdGg6IDAuNDR9LCB0aGlzLlNjZW5lKTtcblx0XHRsZWZ0d2Fpc3QubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdHdhaXN0bVwiLCB0aGlzLlNjZW5lKTtcblx0XHRsZWZ0d2Fpc3QubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcblx0XHRsZWZ0d2Fpc3QucGFyZW50ID0gdGhpcy5sZWZ0bG93ZXJhcm07XG5cdFx0bGVmdHdhaXN0LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC40LCAwKSk7XG5cblx0XHRjb25zdCBsZWZ0aGFuZCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRoYW5kXCIsIHt3aWR0aDowLjQsIGhlaWdodDogMC4yLCBkZXB0aDogMC40fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGhhbmQubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdGhhbmRtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRoYW5kLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLjc4LCAwLjI3LCAwLjM5KTtcblx0XHRsZWZ0aGFuZC5wYXJlbnQgPSB0aGlzLmxlZnRsb3dlcmFybTtcblx0XHRsZWZ0aGFuZC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuNTUsIDApKTtcblxuXHRcdHRoaXMucmloZ3R1cHBlcmFybSA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpaGd0dXBwZXJhcm1cIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjgsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0ubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmloZ3R1cHBlcmFybW1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5yaWhndHVwcGVyYXJtLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0dGhpcy5yaWhndHVwcGVyYXJtLnBhcmVudCA9IHRoaXMucGxheWVyO1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5zZXRQaXZvdE1hdHJpeChCQUJZTE9OLk1hdHJpeC5UcmFuc2xhdGlvbigwLCAtMC40LCAwKSlcblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0ubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAuOSwgLTAuNCwgMCkpO1xuXG5cdFx0Y29uc3QgcmloZ3RlbGJvdyA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpaGd0ZWxib3dcIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjIsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndGVsYm93Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpaGd0ZWxib3dtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpaGd0ZWxib3cubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHRyaWhndGVsYm93LnBhcmVudCA9IHRoaXMucmloZ3R1cHBlcmFybTtcblx0XHRyaWhndGVsYm93LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC41LCAwKSk7XG5cblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0gPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndGxvd2VyYXJtXCIsIHt3aWR0aDowLjQsIGhlaWdodDogMC44LCBkZXB0aDogMC40fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpaGd0bG93ZXJhcm1tXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMucmloZ3Rsb3dlcmFybS5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdHRoaXMucmloZ3Rsb3dlcmFybS5wYXJlbnQgPSB0aGlzLnJpaGd0dXBwZXJhcm07XG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtLnNldFBpdm90TWF0cml4KEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjQsIDApKVxuXHRcdHRoaXMucmloZ3Rsb3dlcmFybS5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuOCwgMCkpO1xuXG5cdFx0Y29uc3QgcmloZ3R3YWlzdCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpaGd0d2Fpc3RcIiwge3dpZHRoOjAuNDQsIGhlaWdodDogMC4xLCBkZXB0aDogMC40NH0sIHRoaXMuU2NlbmUpO1xuXHRcdHJpaGd0d2Fpc3QubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmloZ3R3YWlzdG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0cmloZ3R3YWlzdC5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDEsIDEsIDEpO1xuXHRcdHJpaGd0d2Fpc3QucGFyZW50ID0gdGhpcy5yaWhndGxvd2VyYXJtO1xuXHRcdHJpaGd0d2Fpc3QubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjQsIDApKTtcblxuXHRcdGNvbnN0IHJpaGd0aGFuZCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpaGd0aGFuZFwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuMiwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdHJpaGd0aGFuZC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWhndGhhbmRtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpaGd0aGFuZC5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC43OCwgMC4yNywgMC4zOSk7XG5cdFx0cmloZ3RoYW5kLnBhcmVudCA9IHRoaXMucmloZ3Rsb3dlcmFybTtcblx0XHRyaWhndGhhbmQubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjU1LCAwKSk7XG5cblx0XHR0aGlzLmxlZnRsZWcgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0dXBwZXJsZWdcIiwge3dpZHRoOjAuNSwgaGVpZ2h0OiAwLjgsIGRlcHRoOiAwLjV9LCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRsZWcubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdHVwcGVybGVnbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRsZWcubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmxlZnRsZWcucGFyZW50ID0gdGhpcy5wbGF5ZXI7XG4gICAgdGhpcy5sZWZ0bGVnLnNldFBpdm90TWF0cml4KEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjQsIDApKVxuXHRcdHRoaXMubGVmdGxlZy5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoLTAuMjYsIC0yLCAwKSk7XG5cblx0XHRjb25zdCBsZWZ0a25lZWwgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0a25lZWxcIiwge3dpZHRoOjAuNSwgaGVpZ2h0OiAwLjIsIGRlcHRoOiAwLjV9LCB0aGlzLlNjZW5lKTtcblx0XHRsZWZ0a25lZWwubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdGtuZWVsbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRsZWZ0a25lZWwubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHRsZWZ0a25lZWwucGFyZW50ID0gdGhpcy5sZWZ0bGVnO1xuXHRcdGxlZnRrbmVlbC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuNSwgMCkpO1xuXG5cdFx0Y29uc3QgbGVmdGxvd2VybGVnID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdGxvd2VybGVnXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC42LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGxvd2VybGVnLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRsb3dlcmxlZ21cIiwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGxvd2VybGVnLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0bGVmdGxvd2VybGVnLnBhcmVudCA9IHRoaXMubGVmdGxlZztcblx0XHRsZWZ0bG93ZXJsZWcubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjksIDApKTtcblxuXHRcdGNvbnN0IGxlZnRmb290ID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdGZvb3RcIiwge3dpZHRoOjAuNSwgaGVpZ2h0OiAwLjQsIGRlcHRoOiAwLjV9LCB0aGlzLlNjZW5lKTtcblx0XHRsZWZ0Zm9vdC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJsZWZ0Zm9vdG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGZvb3QubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjEsIDAuMSwgMC4xKTtcblx0XHRsZWZ0Zm9vdC5wYXJlbnQgPSB0aGlzLmxlZnRsZWc7XG5cdFx0bGVmdGZvb3QubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0xLjQsIDApKTtcblxuXHRcdHRoaXMucmlnaHRsZWcgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWdodHVwcGVybGVnXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC44LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5yaWdodGxlZy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWdodHVwcGVybGVnbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLnJpZ2h0bGVnLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0dGhpcy5yaWdodGxlZy5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHR0aGlzLnJpZ2h0bGVnLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLjI2LCAtMiwgMCkpO1xuXG5cdFx0Y29uc3QgcmlnaHRrbmVlbCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpZ2h0a25lZWxcIiwge3dpZHRoOjAuNSwgaGVpZ2h0OiAwLjIsIGRlcHRoOiAwLjV9LCB0aGlzLlNjZW5lKTtcblx0XHRyaWdodGtuZWVsLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpZ2h0a25lZWxtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpZ2h0a25lZWwubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHRyaWdodGtuZWVsLnBhcmVudCA9IHRoaXMucmlnaHRsZWc7XG5cdFx0cmlnaHRrbmVlbC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuNSwgMCkpO1xuXG5cdFx0Y29uc3QgcmlnaHRsb3dlcmxlZyA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpZ2h0bG93ZXJsZWdcIiwge3dpZHRoOjAuNSwgaGVpZ2h0OiAwLjYsIGRlcHRoOiAwLjV9LCB0aGlzLlNjZW5lKTtcblx0XHRyaWdodGxvd2VybGVnLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpZ2h0bG93ZXJsZWdtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpZ2h0bG93ZXJsZWcubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHRyaWdodGxvd2VybGVnLnBhcmVudCA9IHRoaXMucmlnaHRsZWc7XG5cdFx0cmlnaHRsb3dlcmxlZy5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuOSwgMCkpO1xuXG5cdFx0Y29uc3QgcmlnaHRmb290ID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwicmlnaHRmb290XCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC40LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0cmlnaHRmb290Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpZ2h0Zm9vdG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0cmlnaHRmb290Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4xLCAwLjEsIDAuMSk7XG5cdFx0cmlnaHRmb290LnBhcmVudCA9IHRoaXMucmlnaHRsZWc7XG5cdFx0cmlnaHRmb290LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMS40LCAwKSk7XG4gIH1cblxuICBsb2NhbEF4ZXMoc2l6ZSwgc2hhZGUpIHtcblx0XHRjb25zdCBwaWxvdF9sb2NhbF9heGlzWCA9IEJBQllMT04uTWVzaC5DcmVhdGVMaW5lcyhcInBpbG90X2xvY2FsX2F4aXNYXCIsIFsgXG5cdFx0XHRcdG5ldyBCQUJZTE9OLlZlY3RvcjMuWmVybygpLCBuZXcgQkFCWUxPTi5WZWN0b3IzKHNpemUsIDAsIDApLCBuZXcgQkFCWUxPTi5WZWN0b3IzKHNpemUgKiAwLjk1LCAwLjA1ICogc2l6ZSwgMCksIFxuXHRcdFx0XHRuZXcgQkFCWUxPTi5WZWN0b3IzKHNpemUsIDAsIDApLCBuZXcgQkFCWUxPTi5WZWN0b3IzKHNpemUgKiAwLjk1LCAtMC4wNSAqIHNpemUsIDApXG5cdFx0XSwgdGhpcy5TY2VuZSk7XG5cdFx0cGlsb3RfbG9jYWxfYXhpc1guY29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMSwgc2hhZGUsIHNoYWRlKTtcblxuXHRcdGNvbnN0IHBpbG90X2xvY2FsX2F4aXNZID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUxpbmVzKFwicGlsb3RfbG9jYWxfYXhpc1lcIiwgW1xuXHRcdFx0XHRuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgbmV3IEJBQllMT04uVmVjdG9yMygwLCBzaXplLCAwKSwgbmV3IEJBQllMT04uVmVjdG9yMygtMC4wNSAqIHNpemUsIHNpemUgKiAwLjk1LCAwKSxcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMygwLCBzaXplLCAwKSwgbmV3IEJBQllMT04uVmVjdG9yMygwLjA1ICogc2l6ZSwgc2l6ZSAqIDAuOTUsIDApXG5cdFx0XSwgdGhpcy5TY2VuZSk7XG5cdFx0cGlsb3RfbG9jYWxfYXhpc1kuY29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoc2hhZGUsIDEsIHNoYWRlKTtcblxuXHRcdGNvbnN0IHBpbG90X2xvY2FsX2F4aXNaID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUxpbmVzKFwicGlsb3RfbG9jYWxfYXhpc1pcIiwgW1xuXHRcdFx0XHRuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgbmV3IEJBQllMT04uVmVjdG9yMygwLCAwLCBzaXplKSwgbmV3IEJBQllMT04uVmVjdG9yMyggMCAsIC0wLjA1ICogc2l6ZSwgc2l6ZSAqIDAuOTUpLFxuXHRcdFx0XHRuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIHNpemUpLCBuZXcgQkFCWUxPTi5WZWN0b3IzKCAwLCAwLjA1ICogc2l6ZSwgc2l6ZSAqIDAuOTUpXG5cdFx0XSwgdGhpcy5TY2VuZSk7XG5cdFx0cGlsb3RfbG9jYWxfYXhpc1ouY29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoc2hhZGUsIHNoYWRlLCAxKTtcblxuXHRcdGNvbnN0IGxvY2FsX29yaWdpbiA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibG9jYWxfb3JpZ2luXCIsIHtzaXplOjF9LCB0aGlzLlNjZW5lKTtcblx0XHRsb2NhbF9vcmlnaW4uaXNWaXNpYmxlID0gZmFsc2U7XG5cblx0XHRwaWxvdF9sb2NhbF9heGlzWC5wYXJlbnQgPSBsb2NhbF9vcmlnaW47XG5cdFx0cGlsb3RfbG9jYWxfYXhpc1kucGFyZW50ID0gbG9jYWxfb3JpZ2luO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNaLnBhcmVudCA9IGxvY2FsX29yaWdpbjsgXG5cblx0XHR0aGlzLnBsYXllci5wb3NpdGlvbi55ID0gMDtcblx0XHRyZXR1cm4gbG9jYWxfb3JpZ2luO1xuXHR9XG5cblx0aG9sZEd1bigpIHtcblx0XHR0aGlzLmxlZnRhcm0ucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMztcblx0XHR0aGlzLmxlZnRhcm0ucm90YXRpb24ueSA9IE1hdGguUEkgLyA1O1xuXHRcdHRoaXMubGVmdGxvd2VyYXJtLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDU7XG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0ucG9zaXRpb24ueSAtPSAwLjI7XG5cdFx0dGhpcy5yaWhndHVwcGVyYXJtLnJvdGF0aW9uLnggPSAgLU1hdGguUEkgLyA0O1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5yb3RhdGlvbi55ID0gIC1NYXRoLlBJIC8gNTtcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ucG9zaXRpb24ueSAtPSAwLjI7XG5cdH1cblxuICBydW4oKSB7XG4gICAgY29uc3QgcnVuID0gbmV3IEJBQllMT04uQW5pbWF0aW9uR3JvdXAoXCJydW5cIik7XG4gICAgY29uc3QgZnJhbWVSYXRlID0gNTtcblxuICAgIGNvbnN0IGxlZnRhbmltZSA9IG5ldyBCQUJZTE9OLkFuaW1hdGlvbihcInhTbGlkZVwiLCBcInJvdGF0aW9uLnhcIiwgZnJhbWVSYXRlLCBCQUJZTE9OLkFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBCQUJZTE9OLkFuaW1hdGlvbi5BTklNQVRJT05MT09QTU9ERV9DWUNMRSk7XG4gICAgY29uc3Qga2V5RnJhbWVzID0gW107XG5cbiAgICBrZXlGcmFtZXMucHVzaCh7XG4gICAgICAgIGZyYW1lOiAwLFxuICAgICAgICB2YWx1ZTogLU1hdGguUEkgLyA0LFxuICAgIH0pO1xuXG4gICAga2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogZnJhbWVSYXRlLFxuICAgICAgICB2YWx1ZTogTWF0aC5QSSAvIDQsXG4gICAgfSk7XG5cbiAgICBrZXlGcmFtZXMucHVzaCh7XG4gICAgICAgIGZyYW1lOiAyICogZnJhbWVSYXRlLFxuICAgICAgICB2YWx1ZTogLU1hdGguUEkgLyA0LFxuICAgIH0pO1xuXG4gICAgbGVmdGFuaW1lLnNldEtleXMoa2V5RnJhbWVzKTtcblxuICAgIGNvbnN0IHJpZ2h0YW5pbWUgPSBuZXcgQkFCWUxPTi5BbmltYXRpb24oXCJ4U2xpZGVcIiwgXCJyb3RhdGlvbi54XCIsIGZyYW1lUmF0ZSwgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OTE9PUE1PREVfQ1lDTEUpO1xuICAgIGNvbnN0IHJpZ2h0a2V5RnJhbWVzID0gW107XG5cbiAgICByaWdodGtleUZyYW1lcy5wdXNoKHtcbiAgICAgICAgZnJhbWU6IDAsXG4gICAgICAgIHZhbHVlOiBNYXRoLlBJIC8gNCxcbiAgICB9KTtcblxuICAgIHJpZ2h0a2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogZnJhbWVSYXRlLFxuICAgICAgICB2YWx1ZTogLU1hdGguUEkgLyA0LFxuICAgIH0pO1xuXG4gICAgcmlnaHRrZXlGcmFtZXMucHVzaCh7XG4gICAgICAgIGZyYW1lOiAyICogZnJhbWVSYXRlLFxuICAgICAgICB2YWx1ZTogTWF0aC5QSSAvIDQsXG4gICAgfSk7XG5cbiAgICByaWdodGFuaW1lLnNldEtleXMocmlnaHRrZXlGcmFtZXMpO1xuXG4gICAgcnVuLmFkZFRhcmdldGVkQW5pbWF0aW9uKGxlZnRhbmltZSwgdGhpcy5sZWZ0bGVnKTtcbiAgICBydW4uYWRkVGFyZ2V0ZWRBbmltYXRpb24ocmlnaHRhbmltZSwgdGhpcy5yaWdodGxlZyk7XG4gICAgcnVuLm5vcm1hbGl6ZSgwLCAyICogZnJhbWVSYXRlKTtcbiAgICBydW4ucGxheSh0cnVlKTtcbiAgfVxuXG5cdGNsb25lKCkge1xuXHRcdHRoaXMucGxheWVyID0gdGhpcy5wbGF5ZXIuY2xvbmUoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSIsImltcG9ydCBXZWFwb24gZnJvbSAnLi93ZWFwb24uanMnXG5pbXBvcnQgUGxheWVyTW9kIGZyb20gJy4vcGxheWVyTW9kLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJlbW90ZVBsYXllciB7XG5cdGNvbnN0cnVjdG9yKFxuXHRcdHNjZW5lLCBwbGF5ZXJcblx0KSB7XG5cdFx0Y29uc29sZS5sb2coJ2FkZCByZW1vdGUnKVxuXHRcdHRoaXMucGxheWVyID0gcGxheWVyO1xuXHRcdGNvbnN0IHAgPSBuZXcgUGxheWVyTW9kKHNjZW5lLlNjZW5lKTtcblx0XHRwLmNyZWF0ZVBsYXllcigpO1xuXHRcdHAuaG9sZEd1bigpO1xuXHRcdHRoaXMuc2NlbmUgPSBzY2VuZTtcblx0XHR0aGlzLm1lc2ggPSBwO1xuXHRcdHRoaXMubWVzaC5wbGF5ZXIuc2V0RW5hYmxlZCh0cnVlKTtcblx0XHR0aGlzLm1lc2gucGxheWVyLm5hbWUgPSBwbGF5ZXIuX2lkXG5cdFx0dGhpcy5tZXNoLnBsYXllci5wb3NpdGlvbi54ID0gcGxheWVyLl94O1xuXHRcdHRoaXMubWVzaC5wbGF5ZXIucG9zaXRpb24ueSA9IHBsYXllci5feTtcblx0XHR0aGlzLm1lc2gucGxheWVyLnBvc2l0aW9uLnogPSBwbGF5ZXIuX3o7XG5cdFx0Ly8gdGhpcy5zY2VuZS5zaGFkb3dHZW5lcmF0b3IuZ2V0U2hhZG93TWFwKCkucmVuZGVyTGlzdC5wdXNoKHRoaXMubWVzaC5wbGF5ZXIpO1xuXHRcdHRoaXMud2VhcG9uID0gbmV3IFdlYXBvbihzY2VuZSwgcGxheWVyLCB0aGlzLm1lc2gucGxheWVyKVxuXHRcdC8vIHRoaXMubWVzaC5wbGF5ZXIuY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcblx0fVxuXG5cdFVwZGF0ZSgpIHtcblxuXHR9XG5cblx0YmluZEV2ZW50KCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkpXG5cdH1cblxuXHRDcmVhdGUoKSB7XG5cblx0fVxuXG5cdG1vdmUocG9zLCByb3QpIHtcblx0XHRjb25zb2xlLmxvZygnbW92ZScpXG5cdFx0Y29uc29sZS5sb2cocG9zKVxuXHRcdHRoaXMubWVzaC5wbGF5ZXIucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHBvcy54LCBwb3MueSwgcG9zLnopO1xuXHRcdHRoaXMubWVzaC5wbGF5ZXIucm90YXRpb24ueSA9IHJvdC55O1xuXHRcdHRoaXMubWVzaC5ydW4oKTtcblx0fVxuXG5cdGdvdEtpbGxlZChraWxsZXIpe1xuXHRcdHRoaXMuc2V0RGVhZCh0cnVlKVxuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnNwZWVkID0gMDtcblx0fVxuXG5cdHJlc2V0Q2FtZXJhQ29vcmRpbmF0ZXMoKSB7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueCA9IHRoaXMuX3g7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMuX3k7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueiA9IHRoaXMuX3o7XG5cdH1cblxuXHR1cGRhdGVQb3NpdGlvbigpIHtcblx0XHRjb25zdCB4T2Zmc2V0ID0gTWF0aC5hc2IodGhpcy5sYXN0KVxuXHR9XG5cblx0c3VibWl0TW92ZW1lbnQoKSB7XG5cdFx0XG5cdH1cblxuXHRjaGVja0NvbnRyb2xzKCkge1xuXG5cdH1cblxuXHRjaGVja0ZyZWVGYWxsKCl7XG5cblx0fVxuXG5cdGNoZWNrSnVtcCgpIHtcblxuXHR9XG5cblx0RGVzdHJveSgpIHtcblx0XHR0aGlzLm1lc2gucGxheWVyLmRpc3Bvc2UoKVxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VhcG9uIHtcbiAgY29uc3RydWN0b3Ioc2NlbmUsIHBsYXllciwgcGFyZW50KSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIGNvbnN0IHdwID0gdGhpcy5zY2VuZS5ndW4uY3JlYXRlSW5zdGFuY2UocGxheWVyLl9pZCk7XG4gICAgY29uc29sZS5sb2cod3ApXG4gICAgd3AuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB3cC5yb3RhdGlvblF1YXRlcm5pb24gPSBudWxsO1xuICAgIHdwLnBhcmVudCA9IHBhcmVudDtcbiAgICAvLyB3cC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLTAuMiwgMCAsMik7IFxuICAgIHdwLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygtMC41LCAtMC44LCAtMS44KSk7XG4gICAgLy8gd3Aucm90YXRpb24ueCA9IC1NYXRoLlBJLzI7XG4gICAgd3Aucm90YXRpb24ueSA9IC1NYXRoLlBJIC8gMjtcbiAgICB0aGlzLm1lc2ggPSB3cDtcbiAgICB0aGlzLl9pbml0aWFsUm90YXRpb24gPSB0aGlzLm1lc2gucm90YXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLmFtbW9TaXplID0gMTQ7XG4gICAgdGhpcy5jdXJyZW50QW1tbyA9IHRoaXMuYW1tb1NpemU7XG4gICAgdGhpcy5maXJlUmF0ZSA9IDI1MC4wO1xuICAgIHRoaXMuX2N1cnJlbnRGaXJlUmF0ZSA9IHRoaXMuZmlyZVJhdGU7XG4gICAgdGhpcy5jYW5GaXJlID0gdHJ1ZTtcbiAgICB0aGlzLnJlbG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2NlbmUuU2NlbmUucmVnaXN0ZXJCZWZvcmVSZW5kZXIoKCkgPT4ge1xuICAgICAgaWYoIXRoaXMuY2FuRmlyZSl7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRGaXJlUmF0ZSAtPSB0aGlzLnNjZW5lLmVuZ2luZS5nZXREZWx0YVRpbWUoKTtcbiAgICAgICAgaWYodGhpcy5fY3VycmVudEZpcmVSYXRlIDw9IDAgJiYgIXRoaXMucmVsb2FkaW5nKXtcbiAgICAgICAgICB0aGlzLmNhbkZpcmUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRGaXJlUmF0ZSA9IHRoaXMuZmlyZVJhdGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgXG4gIHJlbG9hZCgpIHtcbiAgICBpZighdGhpcy5yZWxvYWRpbmcpe1xuICAgICAgdGhpcy5jYW5GaXJlID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLmFuaW1hdGVSZWxvYWQoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRBbW1vID0gdGhpcy5hbW1vU2l6ZTtcbiAgICAgICAgdGhpcy5jYW5GaXJlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0sIDgwMClcbiAgICB9XG4gIH1cblxuICBmaXJlKCkge1xuICAgIGlmKHRoaXMuY2FuRmlyZSl7XG4gICAgICBpZih0aGlzLmN1cnJlbnRBbW1vICE9IDApe1xuICAgICAgICB0aGlzLnNjZW5lLnNvdW5kLmd1bkZpcmUoKTtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBjb25zb2xlLmxvZyh3aWR0aClcbiAgICAgICAgY29uc29sZS5sb2coaGVpZ2h0KVxuICAgICAgICBjb25zdCBwaWNrUmVzdWx0ID0gdGhpcy5zY2VuZS5TY2VuZS5waWNrKHdpZHRoLzIsIGhlaWdodC8yLCBudWxsLCBmYWxzZSwgdGhpcy5zY2VuZS5jYW1lcmEpO1xuICAgICAgICBpZihwaWNrUmVzdWx0LnBpY2tlZE1lc2gpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKHBpY2tSZXN1bHQucGlja2VkTWVzaC5uYW1lKVxuICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNjZW5lLnN0b3JlLnN0YXRlLnJlbW90ZVBsYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHBpY2tSZXN1bHQucGlja2VkTWVzaC5uYW1lID09PSB0aGlzLnNjZW5lLnN0b3JlLnN0YXRlLnJlbW90ZVBsYXllcnNbaV0ucGxheWVyLl9pZCl7XG4gICAgICAgICAgICAgIHRoaXMuc2NlbmUuY29udHJvbGxlci5oaXRQbGF5ZXIodGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzW2ldLnBsYXllcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocGlja1Jlc3VsdC5waWNrZWRNZXNoLm5hbWUgIT0gJ3NreUJveCcpe1xuICAgICAgICAgICAgLy8gdGhpcy5kcmF3SW1wYWN0KHBpY2tSZXN1bHQucGlja2VkUG9pbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjZW5lLmNvbnRyb2xsZXIuc2hvdEZpcmVkKCk7XG4gICAgICAgIC8vIHRoaXMuY3VycmVudEFtbW8gLT0gMTtcbiAgICAgICAgXG4gICAgICB9ZWxzZXtcbiAgICAgICAgLy8g56m65p6qXG4gICAgICB9XG4gICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICAgIHRoaXMuY2FuRmlyZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9pbml0aWFsUm90YXRpb24uY2xvbmUoKTtcbiAgICBjb25zdCBlbmQgPSBzdGFydC5jbG9uZSgpO1xuICAgIGVuZC54ICs9IE1hdGguUEkvMTAwO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBBbmltYXRpb24gb2JqZWN0XG4gICAgY29uc3QgZGlzcGxheSA9IG5ldyBCQUJZTE9OLkFuaW1hdGlvbihcbiAgICAgICAgXCJmaXJlXCIsXG4gICAgICAgIFwicm90YXRpb25cIixcbiAgICAgICAgNjAsXG4gICAgICAgIEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfVkVDVE9SMyxcbiAgICAgICAgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OTE9PUE1PREVfQ09OU1RBTlQpO1xuXG4gICAgLy8gQW5pbWF0aW9ucyBrZXlzXG4gICAgY29uc3Qga2V5cyA9IFt7IFxuICAgICAgICBmcmFtZTogMCxcbiAgICAgICAgdmFsdWU6IHN0YXJ0XG4gICAgfSx7XG4gICAgICAgIGZyYW1lOiAxMCxcbiAgICAgICAgdmFsdWU6IGVuZFxuICAgIH0se1xuICAgICAgICBmcmFtZTogMTAwLFxuICAgICAgICB2YWx1ZTogc3RhcnRcbiAgICB9XTtcblxuICAgIC8vIEFkZCB0aGVzZSBrZXlzIHRvIHRoZSBhbmltYXRpb25cbiAgICBkaXNwbGF5LnNldEtleXMoa2V5cyk7XG5cbiAgICAvLyBMaW5rIHRoZSBhbmltYXRpb24gdG8gdGhlIG1lc2hcbiAgICB0aGlzLm1lc2guYW5pbWF0aW9ucy5wdXNoKGRpc3BsYXkpO1xuXG4gICAgdGhpcy5zY2VuZS5TY2VuZS5iZWdpbkFuaW1hdGlvbih0aGlzLm1lc2gsIDAsIDEwMCwgZmFsc2UsIDEwLCBmdW5jdGlvbigpIHtcblxuICAgIH0pO1xuICB9XG5cbiAgZHJhd0ltcGFjdChwb3NpdGlvbikge1xuICAgIGNvbnN0IGltcGFjdCA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlUGxhbmUoJ2ltcGFjdCcsIHtzaXplOiAxfSwgdGhpcy5zY2VuZS5TY2VuZSk7XG4gICAgaW1wYWN0LnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICBpbXBhY3QubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCdpbXBhY3RNYXQnLCB0aGlzLnNjZW5lLlNjZW5lKTtcbiAgICBpbXBhY3QubWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwiL2ltcGFjdC5wbmdcIiwgdGhpcy5zY2VuZS5TY2VuZSk7XG4gICAgaW1wYWN0Lm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTsgXG4gICAgaW1wYWN0LnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBhbmltYXRlUmVsb2FkKCkge1xuICAgIC8vIOaSreaUvuWKqOeUu1xuICB9XG59IiwiaW1wb3J0IFBsYXllck1vZCBmcm9tICcuLi9tb2RlbHMvcGxheWVyTW9kLmpzJztcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXIvY29udHJvbGxlci5qcydcbmltcG9ydCBTb3VuZCBmcm9tICcuLi9jb250cm9sbGVyL3NvdW5kLmpzJztcbmltcG9ydCBpbml0RGF0YSBmcm9tICcuLi9zdG9yZS9pbml0RGF0YS5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWJ5bG9uU2NlbmUge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRlbmdpbmUsIGNhbnZhcywgc3RvcmVcblx0KSB7XG5cdFx0dGhpcy5jYW52YXMgPSBjYW52YXM7XG5cdFx0Y29uc29sZS5sb2coc3RvcmUpXG5cdFx0dGhpcy5zdG9yZSA9IHN0b3JlO1xuXHRcdHRoaXMuYm94ZXMgPSBbXVxuXHRcdHRoaXMuZW5naW5lID0gZW5naW5lO1xuXHRcdHRoaXMuU2NlbmUgPSAgbmV3IEJBQllMT04uU2NlbmUoZW5naW5lKTtcblx0XHR0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzKTtcblx0XHR0aGlzLnNvdW5kID0gbmV3IFNvdW5kKHRoaXMuU2NlbmUpO1xuXHR9XG5cblx0Q3JlYXRlKCkge1xuXHRcdHRoaXMuaW5pdENhbWVyYSgpO1xuXHRcdHRoaXMubG9hZExpZ2h0KCk7XG5cdFx0dGhpcy5sb2FkUGh5c2ljcygpO1xuXHRcdHRoaXMuaW5pdFNreSgpO1xuXHRcdHRoaXMubG9hZEdyb3VuZCgpO1xuXHRcdC8vIHRoaXMubG9hZEJveGVzKCk7XG5cdFx0dGhpcy5sb2FkR3VuKCkudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLmxvYWRTb2xpZGVyKClcblx0XHR9KVxuXHR9XG5cblx0aW5pdENhbWVyYSgpIHtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBCQUJZTE9OLkZyZWVDYW1lcmEoJ2NhbWVyYTEnLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEuNSwgNyksIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMuY2FtZXJhLnNldFRhcmdldChuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIC0xKSlcblx0XHR0aGlzLmNhbWVyYS5hdHRhY2hDb250cm9sKHRoaXMuY2FudmFzLCBmYWxzZSk7XG5cdFx0dGhpcy5TY2VuZS5hY3RpdmVDYW1lcmFzLnB1c2godGhpcy5jYW1lcmEpXG5cdFx0Ly8gdGhpcy5jYW1lcmEyID0gbmV3IEJBQllMT04uRnJlZUNhbWVyYSgnY2FtZXJhMScsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMTAsIDEsIDApLCB0aGlzLlNjZW5lKTtcblx0XHQvLyB0aGlzLmNhbWVyYTIuc2V0VGFyZ2V0KG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgMCkpXG5cdFx0Ly8gdGhpcy5jYW1lcmEyLmF0dGFjaENvbnRyb2wodGhpcy5jYW52YXMsIGZhbHNlKTtcblx0XHQvLyB0aGlzLmNhbWVyYTIuaW5wdXRzLmFkZE1vdXNlV2hlZWwoKTtcblx0XHQvLyB0aGlzLlNjZW5lLmFjdGl2ZUNhbWVyYXMucHVzaCh0aGlzLmNhbWVyYTIpXG5cdFx0Ly8gdGhpcy5jYW1lcmEudmlld3BvcnQgPSBuZXcgQkFCWUxPTi5WaWV3cG9ydCgwLjUsMCwwLjUsMSlcblx0XHQvLyB0aGlzLmNhbWVyYTIudmlld3BvcnQgPSBuZXcgQkFCWUxPTi5WaWV3cG9ydCgwLDAsMC41LDEpXG5cdH1cblxuXHRpbml0U2t5KCkge1xuXHRcdEJBQllMT04uRW5naW5lLlNoYWRlcnNSZXBvc2l0b3J5ID0gXCIuLi9zaGFkZXJzL1wiO1xuICAgIGNvbnN0IHNreWJveCA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlU3BoZXJlKFwic2t5Qm94XCIsIHsgc2VnbWVudHM6IDEwLCBkaWFtZXRlcjogMjUwMCB9LCB0aGlzLlNjZW5lKTtcbiAgICBjb25zdCBzaGFkZXIgPSBuZXcgQkFCWUxPTi5TaGFkZXJNYXRlcmlhbChcImdyYWRpZW50XCIsIHRoaXMuU2NlbmUsIFwiZ3JhZGllbnRcIiwge30pO1xuICAgIHNoYWRlci5zZXRGbG9hdChcIm9mZnNldFwiLCAwKTtcbiAgICBzaGFkZXIuc2V0RmxvYXQoXCJleHBvbmVudFwiLCAwLjYpO1xuICAgIHNoYWRlci5zZXRDb2xvcjMoXCJ0b3BDb2xvclwiLCBCQUJZTE9OLkNvbG9yMy5Gcm9tSW50cygwLDExOSwyNTUpKTtcbiAgICBzaGFkZXIuc2V0Q29sb3IzKFwiYm90dG9tQ29sb3JcIiwgQkFCWUxPTi5Db2xvcjMuRnJvbUludHMoMjQwLDI0MCwgMjU1KSk7XG4gICAgc2hhZGVyLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xuICAgIHNreWJveC5tYXRlcmlhbCA9IHNoYWRlcjsgXG4gICAgXG4gICAgLy9DcmVhdGUgRm9nICBcbiAgICB0aGlzLlNjZW5lLmZvZ01vZGUgPSBCQUJZTE9OLlNjZW5lLkZPR01PREVfRVhQMjtcbiAgICB0aGlzLlNjZW5lLmZvZ0RlbnNpdHkgPSAwLjAwMztcbiAgICB0aGlzLlNjZW5lLmZvZ0NvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAuOCwwLjgzLDAuOCk7XG5cdH1cblxuXHRsb2FkR3JvdW5kKCkge1xuXHRcdHRoaXMuZ3JvdW5kRGl2cyA9IDY0O1xuXHRcdHRoaXMudGlsZVNpemUgPSAxMDAwO1xuXHRcdHRoaXMuYm90dG9tUG9pbnQgPSAtMTU7XG5cdFx0dGhpcy50b3BQb2ludCA9IDE7XG5cdFx0dGhpcy5ncm91bmQgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUdyb3VuZEZyb21IZWlnaHRNYXAoJ2dyb3VuZCcsICcvbWFwLmpwZycsIHtcblx0XHRcdHdpZHRoOiB0aGlzLnRpbGVTaXplLFxuXHRcdFx0aGVpZ2h0OiB0aGlzLnRpbGVTaXplLFxuXHRcdFx0c3ViZGl2aXNpb25zOiB0aGlzLnN1YmRpdmlzaW9ucyxcblx0XHRcdG1pbkhlaWdodDogXHR0aGlzLmJvdHRvbVBvaW50LFxuXHRcdFx0bWF4SGVpZ2h0OiB0aGlzLnRvcFBvaW50LFxuXHRcdFx0dXBkYXRhYmxlOiB0cnVlXG5cdFx0fSwgdGhpcy5TY2VuZSlcblx0XHRjb25zdCBncm91bmRNYXRlcmlhbDEgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kTWF0XCIsIHRoaXMuU2NlbmUpO1xuXHRcdGdyb3VuZE1hdGVyaWFsMS5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCIvZ3JhczEuanBnXCIsIHRoaXMuU2NlbmUpO1xuXHRcdGdyb3VuZE1hdGVyaWFsMS5kaWZmdXNlVGV4dHVyZS51U2NhbGUgPSAxMC4wO1xuXHRcdGdyb3VuZE1hdGVyaWFsMS5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAxMC4wO1x0XG5cdFx0dGhpcy5ncm91bmQubWF0ZXJpYWwgPSBncm91bmRNYXRlcmlhbDE7XG5cdFx0dGhpcy5ncm91bmQucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuXHRcdHRoaXMuZ3JvdW5kLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XG5cdFx0dGhpcy5zaGFkb3dHZW5lcmF0b3IuZ2V0U2hhZG93TWFwKCkucmVuZGVyTGlzdC5wdXNoKHRoaXMuZ3JvdW5kKTtcblx0XHQvLyB0aGlzLmdyb3VuZC5waHlzaWNzSW1wb3N0b3IgPSBuZXcgQkFCWUxPTi5QaHlzaWNzSW1wb3N0b3IodGhpcy5ncm91bmQsIEJBQllMT04uUGh5c2ljc0ltcG9zdG9yLkJveEltcG9zdG9yLCB7IG1hc3M6IDAsIGZyaWN0aW9uOiAwLjUsIHJlc3RpdHV0aW9uOiAwLjcgfSwgdGhpcy5TY2VuZSk7IFxuXHR9XG5cblx0YXN5bmMgbG9hZEd1bigpIHtcblx0XHRcdGNvbnN0IG1lc2ggPSBhd2FpdCB3aW5kb3cuQkFCWUxPTi5TY2VuZUxvYWRlci5JbXBvcnRNZXNoQXN5bmMoJycsICcuLycsIFwid2VhcG9uXzIub2JqXCIsIHRoaXMuU2NlbmUpO1xuXHRcdFx0Y29uc29sZS5sb2cobWVzaClcblx0XHRcdHRoaXMuZ3VuID0gbWVzaC5tZXNoZXNbMF07XG5cdFx0XHR0aGlzLmd1bi5pc1Zpc2libGUgPSBmYWxzZTtcblx0XHRcdHRoaXMuZ3VuLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIk1hdFwiLCB0aGlzLlNjZW5lKTtcblx0XHRcdHRoaXMuZ3VuLm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcIi93ZWFwb25fMi5wbmdcIiwgdGhpcy5TY2VuZSk7XG5cdFx0XHR0aGlzLmd1bi5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7IFxuXHR9XG5cblx0bG9hZFNvbGlkZXIoKSB7XG5cdFx0Y29uc3QgcCA9IG5ldyBQbGF5ZXJNb2QodGhpcy5TY2VuZSk7XG5cdFx0Ly8gdGhpcy5zaG93QXhpcygxMCk7XG5cdFx0cC5jcmVhdGVQbGF5ZXIoKTtcblx0XHRwLmhvbGRHdW4oKTtcblx0XHRwLnJ1bigpXG5cdFx0dGhpcy5zb2xkaWVyID0gcDtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuY29udHJvbGxlci5yZXF1ZXN0QWxsUGxheWVycygpXG5cdFx0fSwgNTAwMCk7XG5cdH1cblxuXHRsb2FkUGh5c2ljcygpIHtcblx0XHQvLyBjb25zdCBncmF2aXR5VmVjdG9yID0gbmV3IEJBQllMT04uVmVjdG9yMygwLC05LjgxLCAwKTtcblx0XHQvLyBjb25zdCBwaHlzaWNzUGx1Z2luID0gbmV3IEJBQllMT04uQ2Fubm9uSlNQbHVnaW4oKTtcblx0XHQvLyB0aGlzLlNjZW5lLmVuYWJsZVBoeXNpY3MoZ3Jhdml0eVZlY3RvciwgcGh5c2ljc1BsdWdpbik7XG5cdFx0Ly8gdGhpcy5TY2VuZS5lbmFibGVQaHlzaWNzKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwtOS44MSwgMCksIG5ldyBCQUJZTE9OLk9pbW9KU1BsdWdpbigpKVxuXHRcdHRoaXMuU2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuMDQsIDApXG5cdFx0dGhpcy5TY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XG5cdH1cblxuXHRsb2FkQm94ZXMoKSB7XG5cdFx0Y29uc3QgYm94ID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwiY3JhdGVcIiwge3NpemU6IDh9LCB0aGlzLlNjZW5lKTtcbiAgICBcbiAgICBib3gubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiTWF0XCIsIHRoaXMuU2NlbmUpO1xuICAgIGJveC5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCIvY3JhdGUuanBnXCIsIHRoaXMuU2NlbmUpO1xuICAgIGJveC5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7XG4gICAgXG4gICAgYm94LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygxMCwgMCwgMTApOyBcblx0XHRib3gucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xuXHRcdHRoaXMuc2hhZG93R2VuZXJhdG9yLmdldFNoYWRvd01hcCgpLnJlbmRlckxpc3QucHVzaChib3gpO1xuICAgIGJveC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuICAgIHRoaXMuYm94ZXMucHVzaChib3gpO1xuICAgIC8vdGhpcy5ib3gucG9zaXRpb24ueSA9IHRoaXMucmVuZGVyLnRlcnJhaW4uY2FsY0VsZXZhdGlvbig1LCAxMCkgKyA1O1xuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdERhdGEuYm94U2l6ZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNsb25lID0gYm94LmNyZWF0ZUluc3RhbmNlKFwiYm94XCIgKyBpKTtcbiAgICAgICAgY2xvbmUudHlwZSA9ICdib3gnO1xuICAgICAgICBjbG9uZS5wb3NpdGlvbi54ID0gaW5pdERhdGEuYm94UG9zaXRpb25baSoyXTsgXG4gICAgICAgIGNsb25lLnBvc2l0aW9uLnogPSBpbml0RGF0YS5ib3hQb3NpdGlvbltpKjIgKyAxXTtcbiAgICAgICAgY2xvbmUucm90YXRpb24ueSA9IGluaXREYXRhLmJveFJvdGF0aW9uW2ldO1xuICAgICAgICBcbiAgICAgICAgLy9BZGQgTGlnaHRzIGFuZCBQaHlzaWNzXG5cdFx0XHRcdHRoaXMuc2hhZG93R2VuZXJhdG9yLmdldFNoYWRvd01hcCgpLnJlbmRlckxpc3QucHVzaChjbG9uZSk7XG5cdFx0XHRcdGNsb25lLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7IFxuXHRcdFx0XHQvLyBjbG9uZS5waHlzaWNzSW1wb3N0b3IgPSBuZXcgQkFCWUxPTi5QaHlzaWNzSW1wb3N0b3IoY2xvbmUsIEJBQllMT04uUGh5c2ljc0ltcG9zdG9yLkJveEltcG9zdG9yLCB7IG1hc3M6IDAuMSB9LCB0aGlzLlNjZW5lKTtcblx0XHRcdFx0dGhpcy5ib3hlcy5wdXNoKGNsb25lKTtcbiAgICB9XG5cdH1cblxuXHRsb2FkTGlnaHQoKSB7XG5cdFx0dGhpcy5saWdodEhlbSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJsaWdodEhlbVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIDApLCB0aGlzLlNjZW5lKTtcbiAgICB0aGlzLmxpZ2h0SGVtLmludGVuc2l0eSA9IDAuODtcblx0XHR0aGlzLmxpZ2h0RGlyID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0RGlyXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMiwgNCwgMiksIHRoaXMuU2NlbmUpOyAgICBcblx0XHR0aGlzLmxpZ2h0RGlyLmRpZmZ1c2UgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMSwgMSwgMSk7XHRcblx0XHR0aGlzLmxpZ2h0RGlyLnNwZWN1bGFyID0gbmV3IEJBQllMT04uQ29sb3IzKDAsIDAsIDApO1xuXHRcdHRoaXMubGlnaHREaXIucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDI1MCwgNDAwLCAwKTtcbiAgICB0aGlzLmxpZ2h0RGlyLmludGVuc2l0eSA9IDEuODtcblx0XHR0aGlzLnNoYWRvd0dlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcig0MTkyLCB0aGlzLmxpZ2h0RGlyKTtcbiAgICB0aGlzLnNoYWRvd0dlbmVyYXRvci51c2VWYXJpYW5jZVNoYWRvd01hcCA9IGZhbHNlOyBcblx0fVxuXG5cdFVwZGF0ZSgpIHtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHR9XG5cblx0YmluZEV2ZW50KCkge1xuXG5cdH1cblxuXHRsb2FkTG9jYWxQbGF5ZXIoKXtcblxuXHR9XG5cblx0bG9hZE9wb25lbnQoKSB7XG5cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLlNjZW5lLnJlbmRlcigpO1xuXHRcdGlmKHRoaXMubG9hZCl7XG5cdFx0XHR0aGlzLmNvbnRyb2xsZXIuVXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cmVzaXplKCkge1xuXG5cdH1cblxuXHREZXN0cm95KCkge1xuXG5cdH1cbn0iXSwibmFtZXMiOlsiUGxheWVyIiwieCIsInkiLCJ6IiwiX25hbWUiLCJfeCIsIl95IiwiX3oiLCJfcm90WCIsIl9yb3RZIiwiX3JvdFoiLCJfaWQiLCJfY29sb3IiLCJfaGl0UG9pbnRzIiwiX2lzRGVhZCIsIl9oZWlnaHQiLCJfZGVhdGhzIiwiX2tpbGxzIiwiaWQiLCJuYW1lIiwiciIsImciLCJiIiwiZCIsImgiLCJXZWFwb24iLCJMb2NhbFBsYXllciIsInNjZW5lIiwicGxheWVyIiwiY2FtZXJhU3BlZWQiLCJqdW1wSGVpZ2h0IiwibWVzaCIsInNvbGRpZXIiLCJzZXRFbmFibGVkIiwianVtcFVwIiwiaXNKdW1waW5nIiwiY2FtZXJhIiwic3BlZWQiLCJrZXlzVXAiLCJrZXlzRG93biIsImtleXNMZWZ0Iiwia2V5c1JpZ2h0IiwicmVzZXRDYW1lcmFDb29yZGluYXRlcyIsImluaXRQaHlzaWNzIiwibGFzdFBvc2l0aW9uIiwiQkFCWUxPTiIsIlZlY3RvcjMiLCJwb3NpdGlvbiIsImxhc3RSb3RhdGlvbiIsInJvdGF0aW9uIiwiYmluZEV2ZW50Iiwid2VhcG9uIiwidXBkYXRlUG9zaXRpb24iLCJjaGVja0NvbnRyb2xzIiwiUGFubmVsIiwidXBkYXRlSGVhbHRoQmFyIiwiZ2V0SGl0UG9pbnRzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25LZXlVcCIsIm9uS2V5RG93biIsImtleUNvZGUiLCJwb2ludGVySWQiLCJjaGVja0NvbGxpc2lvbnMiLCJ1c2VPY3RyZWVGb3JDb2xsaXNpb25zIiwiYXBwbHlHcmF2aXR5IiwiZWxsaXBzb2lkIiwic3RvcmUiLCJvbktleXVwIiwiY29uc29sZSIsImxvZyIsImtpbGxlciIsInNldERlYWQiLCJ4T2Zmc2V0IiwiTWF0aCIsImFicyIsInlPZmZzZXQiLCJ6T2Zmc2V0IiwieFJvdE9mZnNldCIsInlSb3RPZmZzZXQiLCJ6Um90T2Zmc2V0IiwicG9zT2Zmc2V0Iiwicm90T2Zmc2V0Iiwic3VibWl0TW92ZW1lbnQiLCJydW4iLCJjb250cm9sbGVyIiwic2VuZExvY2FsUGxheWVyTW92ZW1lbnQiLCJpc0Rvd24iLCJzdGF0ZSIsIkpVTVAiLCJqdW1wIiwiRklSRSIsImlzRGVhZCIsImZpcmUiLCJQbGF5ZXJNb2QiLCJTY2VuZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiU2NlbmVMb2FkZXIiLCJJbXBvcnRNZXNoIiwiZ3VuIiwiaXNWaXNpYmxlIiwibWF0ZXJpYWwiLCJTdGFuZGFyZE1hdGVyaWFsIiwiZGlmZnVzZVRleHR1cmUiLCJUZXh0dXJlIiwiaGFzQWxwaGEiLCJUcmFuc2Zvcm1Ob2RlIiwiZmFjZUNvbG9ycyIsImhlYWQiLCJNZXNoQnVpbGRlciIsIkNyZWF0ZUJveCIsIndpZHRoIiwiaGVpZ2h0IiwicGFyZW50IiwiaW5kaWNlcyIsImdldEluZGljZXMiLCJwb3NpdGlvbnMiLCJnZXRWZXJ0aWNlc0RhdGEiLCJWZXJ0ZXhCdWZmZXIiLCJQb3NpdGlvbktpbmQiLCJjb2xvcnMiLCJDb2xvcktpbmQiLCJuYlZlcnRpY2VzIiwibGVuZ3RoIiwiQXJyYXkiLCJmaWxsIiwidmVydGV4IiwiaSIsInNldFZlcnRpY2VzRGF0YSIsImxvY2FsbHlUcmFuc2xhdGUiLCJoYWlyIiwic2V0UGl2b3RNYXRyaXgiLCJNYXRyaXgiLCJUcmFuc2xhdGlvbiIsImRpZmZ1c2VDb2xvciIsIkNvbG9yMyIsImJvZHkiLCJkZXB0aCIsImJ1dCIsImxlZnRhcm0iLCJsZWZ0ZWxib3ciLCJsZWZ0bG93ZXJhcm0iLCJsZWZ0d2Fpc3QiLCJsZWZ0aGFuZCIsInJpaGd0dXBwZXJhcm0iLCJyaWhndGVsYm93IiwicmloZ3Rsb3dlcmFybSIsInJpaGd0d2Fpc3QiLCJyaWhndGhhbmQiLCJsZWZ0bGVnIiwibGVmdGtuZWVsIiwibGVmdGxvd2VybGVnIiwibGVmdGZvb3QiLCJyaWdodGxlZyIsInJpZ2h0a25lZWwiLCJyaWdodGxvd2VybGVnIiwicmlnaHRmb290Iiwic2l6ZSIsInNoYWRlIiwicGlsb3RfbG9jYWxfYXhpc1giLCJNZXNoIiwiQ3JlYXRlTGluZXMiLCJaZXJvIiwiY29sb3IiLCJwaWxvdF9sb2NhbF9heGlzWSIsInBpbG90X2xvY2FsX2F4aXNaIiwibG9jYWxfb3JpZ2luIiwiUEkiLCJBbmltYXRpb25Hcm91cCIsImZyYW1lUmF0ZSIsImxlZnRhbmltZSIsIkFuaW1hdGlvbiIsIkFOSU1BVElPTlRZUEVfRkxPQVQiLCJBTklNQVRJT05MT09QTU9ERV9DWUNMRSIsImtleUZyYW1lcyIsInB1c2giLCJmcmFtZSIsInZhbHVlIiwic2V0S2V5cyIsInJpZ2h0YW5pbWUiLCJyaWdodGtleUZyYW1lcyIsImFkZFRhcmdldGVkQW5pbWF0aW9uIiwibm9ybWFsaXplIiwicGxheSIsImNsb25lIiwicmVtb3RlUGxheWVyIiwicCIsImNyZWF0ZVBsYXllciIsImhvbGRHdW4iLCJwb3MiLCJyb3QiLCJhc2IiLCJsYXN0IiwiZGlzcG9zZSIsIndwIiwiY3JlYXRlSW5zdGFuY2UiLCJyb3RhdGlvblF1YXRlcm5pb24iLCJfaW5pdGlhbFJvdGF0aW9uIiwiYW1tb1NpemUiLCJjdXJyZW50QW1tbyIsImZpcmVSYXRlIiwiX2N1cnJlbnRGaXJlUmF0ZSIsImNhbkZpcmUiLCJyZWxvYWRpbmciLCJyZWdpc3RlckJlZm9yZVJlbmRlciIsImVuZ2luZSIsImdldERlbHRhVGltZSIsImFuaW1hdGVSZWxvYWQiLCJzZXRUaW1lb3V0Iiwic291bmQiLCJndW5GaXJlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwicGlja1Jlc3VsdCIsInBpY2siLCJwaWNrZWRNZXNoIiwicmVtb3RlUGxheWVycyIsImhpdFBsYXllciIsInNob3RGaXJlZCIsImFuaW1hdGUiLCJzdGFydCIsImVuZCIsImRpc3BsYXkiLCJBTklNQVRJT05UWVBFX1ZFQ1RPUjMiLCJBTklNQVRJT05MT09QTU9ERV9DT05TVEFOVCIsImtleXMiLCJhbmltYXRpb25zIiwiYmVnaW5BbmltYXRpb24iLCJpbXBhY3QiLCJDcmVhdGVQbGFuZSIsIkNvbnRyb2xsZXIiLCJTb3VuZCIsImluaXREYXRhIiwiQmFieWxvblNjZW5lIiwiY2FudmFzIiwiYm94ZXMiLCJpbml0Q2FtZXJhIiwibG9hZExpZ2h0IiwibG9hZFBoeXNpY3MiLCJpbml0U2t5IiwibG9hZEdyb3VuZCIsImxvYWRHdW4iLCJ0aGVuIiwibG9hZFNvbGlkZXIiLCJGcmVlQ2FtZXJhIiwic2V0VGFyZ2V0IiwiYXR0YWNoQ29udHJvbCIsImFjdGl2ZUNhbWVyYXMiLCJFbmdpbmUiLCJTaGFkZXJzUmVwb3NpdG9yeSIsInNreWJveCIsIkNyZWF0ZVNwaGVyZSIsInNlZ21lbnRzIiwiZGlhbWV0ZXIiLCJzaGFkZXIiLCJTaGFkZXJNYXRlcmlhbCIsInNldEZsb2F0Iiwic2V0Q29sb3IzIiwiRnJvbUludHMiLCJiYWNrRmFjZUN1bGxpbmciLCJmb2dNb2RlIiwiRk9HTU9ERV9FWFAyIiwiZm9nRGVuc2l0eSIsImZvZ0NvbG9yIiwiZ3JvdW5kRGl2cyIsInRpbGVTaXplIiwiYm90dG9tUG9pbnQiLCJ0b3BQb2ludCIsImdyb3VuZCIsIkNyZWF0ZUdyb3VuZEZyb21IZWlnaHRNYXAiLCJzdWJkaXZpc2lvbnMiLCJtaW5IZWlnaHQiLCJtYXhIZWlnaHQiLCJ1cGRhdGFibGUiLCJncm91bmRNYXRlcmlhbDEiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJyZWNlaXZlU2hhZG93cyIsInNoYWRvd0dlbmVyYXRvciIsImdldFNoYWRvd01hcCIsInJlbmRlckxpc3QiLCJJbXBvcnRNZXNoQXN5bmMiLCJtZXNoZXMiLCJyZXF1ZXN0QWxsUGxheWVycyIsImdyYXZpdHkiLCJjb2xsaXNpb25zRW5hYmxlZCIsImJveCIsImJveFNpemUiLCJ0eXBlIiwiYm94UG9zaXRpb24iLCJib3hSb3RhdGlvbiIsImxpZ2h0SGVtIiwiSGVtaXNwaGVyaWNMaWdodCIsImludGVuc2l0eSIsImxpZ2h0RGlyIiwiRGlyZWN0aW9uYWxMaWdodCIsImRpZmZ1c2UiLCJzcGVjdWxhciIsIlNoYWRvd0dlbmVyYXRvciIsInVzZVZhcmlhbmNlU2hhZG93TWFwIiwicmVuZGVyIiwibG9hZCIsIlVwZGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=