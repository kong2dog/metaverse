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
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(144);
/* harmony import */ var _weapon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(251);
/* harmony import */ var _playerMod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);





var LocalPlayer = /*#__PURE__*/function () {
  function LocalPlayer(scene, player) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(this, LocalPlayer);

    this.player = player;
    this.scene = scene;
    this.cameraSpeed = 0.6;
    this.jumpHeight = 2.5;
    var p = new _playerMod_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(scene.Scene, player._id);
    p.createPlayer();
    p.holdGun();
    p.run();
    this.mesh = p;
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
    this.weapon = new _weapon_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z(scene, player, this.mesh.player);
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
      this.player.setEnabled(false);
      this.player.position = new BABYLON.Vector3(0, 0.1, 0);
      var faceColors = [];
      this.head = new BABYLON.MeshBuilder.CreateBox(this.name, {
        width: 1,
        height: 0.8,
        faceColors: faceColors
      }, this.Scene);
      this.head.material = new BABYLON.StandardMaterial("headm", this.Scene);
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
      var hair = new BABYLON.MeshBuilder.CreateBox(this.name, {
        width: 1,
        height: 0.2
      }, this.Scene);
      hair.setPivotMatrix(BABYLON.Matrix.Translation(0, -0.1, 0));
      hair.parent = this.head;
      hair.locallyTranslate(new BABYLON.Vector3(0, 0.5, 0));
      ;
      hair.material = new BABYLON.StandardMaterial(this.name, this.Scene);
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
    var p = new _playerMod_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(scene.Scene, player._id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxDQUFXNFEsTUFBWDs7TUFDQSxJQUFHLEtBQUtDLElBQVIsRUFBYTtRQUNaLEtBQUt0TixVQUFMLENBQWdCdU4sTUFBaEI7TUFDQTtJQUNEOzs7V0FFRCxrQkFBUyxDQUVSOzs7V0FFRCxtQkFBVSxDQUVUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL21vZGVscy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbWV0YXZlcnNlLy4vc3JjL21vZGVscy9sb2NhbFBsYXllci5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvbW9kZWxzL3BsYXllck1vZC5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvbW9kZWxzL3JlbW90ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvbW9kZWxzL3dlYXBvbi5qcyIsIndlYnBhY2s6Ly9tZXRhdmVyc2UvLi9zcmMvc2NlbmVzL2JhYnlsb25TY2VuZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHR4LCB5LCB6XG5cdCkge1xuXHRcdHRoaXMuX25hbWUgPSAnTm8gTmFtZSc7XG5cdFx0dGhpcy5feCA9IHg7XG5cdFx0dGhpcy5feSA9IHk7XG5cdFx0dGhpcy5feiA9IHo7XG5cdFx0dGhpcy5fcm90WCA9IDA7XG5cdFx0dGhpcy5fcm90WSA9IDA7XG5cdFx0dGhpcy5fcm90WiA9IDA7XG5cdFx0dGhpcy5faWQ7XG5cdFx0dGhpcy5fY29sb3I7XG5cdFx0dGhpcy5faGl0UG9pbnRzID0gMTAwO1xuXHRcdHRoaXMuX2lzRGVhZCA9IGZhbHNlO1xuXHRcdHRoaXMuX2hlaWdodCA9IDY7XG5cblx0XHR0aGlzLl9kZWF0aHMgPSAwO1xuXHRcdHRoaXMuX2tpbGxzID0gMDtcblx0fVxuXG5cdHNldElEKGlkKSB7XG5cdFx0dGhpcy5faWQgPSBpZDtcblx0fVxuXG5cdHNldE5hbWUobmFtZSkge1xuXHRcdHRoaXMuX25hbWUgPSBuYW1lO1xuXHR9XG5cblx0c2V0Q29sb3IocixnLGIpIHtcblx0XHR0aGlzLl9jb2xvciA9IHtcblx0XHRcdHIsZyxiXG5cdFx0fVxuXHR9XG5cblx0c2V0WFlaKHgsIHksIHopIHtcblx0XHR0aGlzLl94ID0geDtcblx0XHR0aGlzLl95ID0geTtcblx0XHR0aGlzLl96ID0gejtcblx0fVxuXG5cdGdldFhZWigpIHtcblx0XHRyZXR1cm4ge3ggOiB0aGlzLl94LCB5IDogdGhpcy5feSAsIHogOiB0aGlzLl96fTtcblx0fVxuXG5cdHNldFJvdFhZWih4LCB5LCB6KSB7XG5cdFx0dGhpcy5fcm90WCA9IHg7XG5cdFx0dGhpcy5fcm90WSA9IHk7XG5cdFx0dGhpcy5fcm90WiA9IHo7XG5cdH1cblxuXHRoaXQoKSB7XG5cdFx0dGhpcy5faGl0UG9pbnRzIC09IDE5O1xuXHRcdGlmKHRoaXMuX2hpdFBvaW50cyA8PSAwKXtcblx0XHRcdHRoaXMuX2lzRGVhZCA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9pc0RlYWQ7XG5cdH1cblxuXHRzZXREZWFkKGQpIHtcblx0XHR0aGlzLl9pc0RlYWQgPSBkO1xuXHR9XG5cblx0c2V0SGl0UG9pbnRzKGgpIHtcblx0XHRpZihoID4gMTAwKSBoID0gMTAwO1xuXHRcdGVsc2UgaWYoaCA8IDApIGggPSAwO1xuXHRcdHRoaXMuX2hpdFBvaW50cyA9IGg7XG5cdH1cblxuXHRnZXRIaXRQb2ludHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpdFBvaW50cztcblx0fVxuXG5cdGlzRGVhZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNEZWFkO1xuXHR9XG5cblx0YWRkRGVhdGgoKSB7XG5cdFx0dGhpcy5fZGVhdGhzICs9IDE7XG5cdH1cblxuXHRhZGRLaWxsKCkge1xuXHRcdHRoaXMuX2tpbGxzICs9IDE7XG5cdH1cbn0iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vd2VhcG9uLmpzJztcbmltcG9ydCBQbGF5ZXJNb2QgZnJvbSAnLi9wbGF5ZXJNb2QuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxQbGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRzY2VuZSwgcGxheWVyXG5cdCkge1xuXHRcdHRoaXMucGxheWVyID0gcGxheWVyO1xuXHRcdHRoaXMuc2NlbmUgPSBzY2VuZTtcblx0XHRcblx0XHR0aGlzLmNhbWVyYVNwZWVkID0gMC42O1xuXHRcdHRoaXMuanVtcEhlaWdodCA9IDIuNTtcblx0XHRjb25zdCBwID0gbmV3IFBsYXllck1vZChzY2VuZS5TY2VuZSwgcGxheWVyLl9pZCk7XG5cdFx0cC5jcmVhdGVQbGF5ZXIoKTtcblx0XHRwLmhvbGRHdW4oKTtcblx0XHRwLnJ1bigpO1xuXHRcdHRoaXMubWVzaCA9IHA7XG5cdFx0dGhpcy5tZXNoLm5hbWUgPSBwbGF5ZXIuX2lkXG5cdFx0dGhpcy5tZXNoLnBsYXllci5zZXRFbmFibGVkKHRydWUpO1xuXHRcdHRoaXMuanVtcFVwID0gZmFsc2U7XG5cdFx0dGhpcy5pc0p1bXBpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5zcGVlZCA9IHRoaXMuY2FtZXJhU3BlZWQ7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEua2V5c1VwID0gWzg3XSAvLyBXXG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEua2V5c0Rvd24gPSBbODNdOyAvLyBTIFxuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLmtleXNMZWZ0ID0gWzY1XTsgLy8gQVxuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLmtleXNSaWdodCA9IFs2OF07IC8vIERcblx0XHR0aGlzLnJlc2V0Q2FtZXJhQ29vcmRpbmF0ZXMoKTtcblx0XHR0aGlzLmluaXRQaHlzaWNzKCk7XG5cblx0XHR0aGlzLmxhc3RQb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjModGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueCwgdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSwgdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueilcblx0XHR0aGlzLmxhc3RSb3RhdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjModGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueCwgdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueSwgdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueilcblx0XHRcblx0XHR0aGlzLmJpbmRFdmVudCgpXG5cdFx0dGhpcy53ZWFwb24gPSBuZXcgV2VhcG9uKHNjZW5lLCBwbGF5ZXIsIHRoaXMubWVzaC5wbGF5ZXIpXG5cdH1cblxuXHRVcGRhdGUoKSB7XG5cdFx0dGhpcy51cGRhdGVQb3NpdGlvbigpXG5cdFx0dGhpcy5jaGVja0NvbnRyb2xzKCk7XG5cdH1cblx0c2V0Q29sb3IocixnLGIpIHtcblx0XHR0aGlzLnBsYXllci5fY29sb3IgPSB7XG5cdFx0XHRyLGcsYlxuXHRcdH1cblx0fVxuXG5cdHNldFhZWih4LCB5LCB6KSB7XG5cdFx0dGhpcy5wbGF5ZXIuX3ggPSB4O1xuXHRcdHRoaXMucGxheWVyLl95ID0geTtcblx0XHR0aGlzLnBsYXllci5feiA9IHo7XG5cdH1cblxuXHRzZXRSb3RYWVooeCwgeSwgeikge1xuXHRcdHRoaXMucGxheWVyLl9yb3RYID0geDtcblx0XHR0aGlzLnBsYXllci5fcm90WSA9IHk7XG5cdFx0dGhpcy5wbGF5ZXIuX3JvdFogPSB6O1xuXHR9XG5cblx0aGl0KCkge1xuXHRcdHRoaXMucGxheWVyLl9oaXRQb2ludHMgLT0gMTk7XG5cdFx0aWYodGhpcy5wbGF5ZXIuX2hpdFBvaW50cyA8PSAwKXtcblx0XHRcdHRoaXMucGxheWVyLl9pc0RlYWQgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5wbGF5ZXIuX2lzRGVhZDtcblx0fVxuXG5cdHNldERlYWQoZCkge1xuXHRcdHRoaXMucGxheWVyLl9pc0RlYWQgPSBkO1xuXHR9XG5cblx0c2V0SGl0UG9pbnRzKGgpIHtcblx0XHRpZihoID4gMTAwKSBoID0gMTAwO1xuXHRcdGVsc2UgaWYoaCA8IDApIGggPSAwO1xuXHRcdHRoaXMucGxheWVyLl9oaXRQb2ludHMgPSBoO1xuXHRcdFBhbm5lbC51cGRhdGVIZWFsdGhCYXIodGhpcy5wbGF5ZXIuZ2V0SGl0UG9pbnRzKCkpO1xuXHR9XG5cblx0aXNEZWFkKCkge1xuXHRcdHJldHVybiB0aGlzLnBsYXllci5faXNEZWFkO1xuXHR9XG5cblx0YWRkRGVhdGgoKSB7XG5cdFx0dGhpcy5wbGF5ZXIuX2RlYXRocyArPSAxO1xuXHR9XG5cblx0YWRkS2lsbCgpIHtcblx0XHR0aGlzLnBsYXllci5fa2lsbHMgKz0gMTtcblx0fVxuXG5cdGJpbmRFdmVudCgpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMub25LZXlVcChldmVudClcblx0XHR9LCBmYWxzZSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMub25LZXlEb3duKGV2ZW50KVxuXHRcdH0sIGZhbHNlKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRldmVudC5rZXlDb2RlID0gZXZlbnQucG9pbnRlcklkO1xuXHRcdFx0dGhpcy5vbktleVVwKGV2ZW50KVxuXHRcdH0sIGZhbHNlKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChldmVudCkgPT4ge1xuXHRcdFx0ZXZlbnQua2V5Q29kZSA9IGV2ZW50LnBvaW50ZXJJZDtcblx0XHRcdHRoaXMub25LZXlEb3duKGV2ZW50KTtcblx0XHR9LCBmYWxzZSlcblx0fVxuXG5cdGluaXRQaHlzaWNzKCkge1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEudXNlT2N0cmVlRm9yQ29sbGlzaW9ucyA9IHRydWU7XG5cdFx0dGhpcy5zY2VuZS5jYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5lbGxpcHNvaWQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsMiwxKVxuXHRcdC8vIHRoaXMuc2NlbmUuY2FtZXJhLmVsbGlwc29pZE9mZnNldCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwyLDApXG5cdH1cblxuXHRDcmVhdGUoKSB7XG5cdH1cblxuXHRvbktleVVwKGV2ZW50KSB7XG5cdFx0dGhpcy5zY2VuZS5zdG9yZS5vbktleXVwKGV2ZW50KVxuXHR9XG5cblx0b25LZXlEb3duKGV2ZW50KSB7XG5cdFx0dGhpcy5zY2VuZS5zdG9yZS5vbktleURvd24oZXZlbnQpXG5cdH1cblxuXHRnb3RLaWxsZWQoa2lsbGVyKXtcblx0XHR0aGlzLnNldERlYWQodHJ1ZSlcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5zcGVlZCA9IDA7XG5cdH1cblxuXHRyZXNldENhbWVyYUNvb3JkaW5hdGVzKCkge1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLnBsYXllci5feDtcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5wbGF5ZXIuX3kgKyAxO1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLnBsYXllci5fejtcblx0fVxuXG5cdHVwZGF0ZVBvc2l0aW9uKCkge1xuXHRcdGNvbnN0IHhPZmZzZXQgPSBNYXRoLmFicyh0aGlzLmxhc3RQb3NpdGlvbi54IC0gdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueCk7XG4gICAgY29uc3QgeU9mZnNldCA9IE1hdGguYWJzKHRoaXMubGFzdFBvc2l0aW9uLnkgLSB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55KTtcbiAgICBjb25zdCB6T2Zmc2V0ID0gTWF0aC5hYnModGhpcy5sYXN0UG9zaXRpb24ueiAtIHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnopO1xuICAgIFxuICAgIGNvbnN0IHhSb3RPZmZzZXQgPSBNYXRoLmFicyh0aGlzLmxhc3RSb3RhdGlvbi54IC0gdGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueCk7XG4gICAgY29uc3QgeVJvdE9mZnNldCA9IE1hdGguYWJzKHRoaXMubGFzdFJvdGF0aW9uLnkgLSB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi55KTtcbiAgICBjb25zdCB6Um90T2Zmc2V0ID0gTWF0aC5hYnModGhpcy5sYXN0Um90YXRpb24ueiAtIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLnopO1xuICAgIFxuICAgIGNvbnN0IHBvc09mZnNldCA9IHhPZmZzZXQgKyB5T2Zmc2V0ICsgek9mZnNldDtcbiAgICBjb25zdCByb3RPZmZzZXQgPSB5Um90T2Zmc2V0ICsgeFJvdE9mZnNldCArIHpSb3RPZmZzZXQ7XG5cbiAgICBpZihwb3NPZmZzZXQgPiAwLjEgfHwgcm90T2Zmc2V0ID4gMC4wMSl7IFxuICAgICAgICB0aGlzLnN1Ym1pdE1vdmVtZW50KCk7XG4gICAgfSBcblx0fVxuXG5cdHN1Ym1pdE1vdmVtZW50KCkge1xuXHRcdHRoaXMubWVzaC5ydW4oKTtcblx0XHR0aGlzLm1lc2gucGxheWVyLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyh0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi54IC0gMC4zLCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi55IC0gMC41LCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56KTtcblx0XHR0aGlzLm1lc2gucGxheWVyLnJvdGF0aW9uLnkgPSB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi55O1xuXHRcdHRoaXMubWVzaC5wbGF5ZXIucm90YXRpb24gPSB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbjtcblx0XHR0aGlzLnNjZW5lLmNvbnRyb2xsZXIuc2VuZExvY2FsUGxheWVyTW92ZW1lbnQodGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24sIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uKTtcbiAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjModGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueCAtIDAuMywgdGhpcy5zY2VuZS5jYW1lcmEucG9zaXRpb24ueSAtMC41LCB0aGlzLnNjZW5lLmNhbWVyYS5wb3NpdGlvbi56KTtcbiAgICB0aGlzLmxhc3RSb3RhdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjModGhpcy5zY2VuZS5jYW1lcmEucm90YXRpb24ueCAsIHRoaXMuc2NlbmUuY2FtZXJhLnJvdGF0aW9uLnkgLCB0aGlzLnNjZW5lLmNhbWVyYS5yb3RhdGlvbi56KTtcblx0fVxuXG5cdGNoZWNrQ29udHJvbHMoKSB7XG5cdFx0aWYodGhpcy5zY2VuZS5zdG9yZS5pc0Rvd24odGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5KVU1QKSl7XG5cdFx0XHRpZighdGhpcy5pc0p1bXBpbmcpe1xuXHRcdFx0XHR0aGlzLmp1bXAoKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZih0aGlzLnNjZW5lLnN0b3JlLmlzRG93bih0aGlzLnNjZW5lLnN0b3JlLnN0YXRlLkZJUkUpKXtcblx0XHRcdGlmKCF0aGlzLnBsYXllci5pc0RlYWQoKSlcblx0XHRcdFx0XHR0aGlzLndlYXBvbi5maXJlKCk7XG5cdFx0fVxuXHR9XG5cblx0anVtcCgpIHtcblxuXHR9XG5cblx0Y2hlY2tGcmVlRmFsbCgpe1xuXG5cdH1cblxuXHRjaGVja0p1bXAoKSB7XG5cblx0fVxuXG5cdERlc3Ryb3koKSB7XG5cblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllck1vZCB7XG4gIGNvbnN0cnVjdG9yKHNjZW5lLCBuYW1lKSB7XG4gICAgdGhpcy5TY2VuZSA9IHNjZW5lO1xuXHRcdHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblx0YXN5bmMgbG9hZEd1bigpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHR3aW5kb3cuQkFCWUxPTi5TY2VuZUxvYWRlci5JbXBvcnRNZXNoKCcnLCAnLycsIFwid2VhcG9uXzIub2JqXCIsIHRoaXMuU2NlbmUsIChtZXNoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZ3VuID0gbWVzaFswXTtcblx0XHRcdFx0dGhpcy5ndW4uaXNWaXNpYmxlID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuZ3VuLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIk1hdFwiLCB0aGlzLlNjZW5lKTtcbiAgICAgICAgdGhpcy5ndW4ubWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwiL3dlYXBvbl8yLnBuZ1wiLCB0aGlzLlNjZW5lKTtcbiAgICAgICAgdGhpcy5ndW4ubWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUuaGFzQWxwaGEgPSB0cnVlOyAgXG5cdFx0XHRcdHJlc29sdmUobWVzaClcblx0XHRcdH0pO1xuXHRcdH0pXG5cdH1cbiAgY3JlYXRlUGxheWVyKCkge1xuICAgIHRoaXMucGxheWVyID0gbmV3IEJBQllMT04uVHJhbnNmb3JtTm9kZShcInBpdm90XCIpO1xuXHRcdHRoaXMucGxheWVyLnNldEVuYWJsZWQoZmFsc2UpO1xuXHRcdHRoaXMucGxheWVyLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAwLjEsIDApO1xuXHRcdFxuXHRcdGNvbnN0IGZhY2VDb2xvcnMgPSBbXTtcblx0XHR0aGlzLmhlYWQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3godGhpcy5uYW1lLCB7d2lkdGg6IDEsIGhlaWdodDogMC44LCBmYWNlQ29sb3JzOiBmYWNlQ29sb3JzfSwgdGhpcy5TY2VuZSk7IFxuXHRcdHRoaXMuaGVhZC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJoZWFkbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmhlYWQucGFyZW50ID0gdGhpcy5wbGF5ZXI7XG5cdFx0Y29uc3QgaW5kaWNlcyA9IHRoaXMuaGVhZC5nZXRJbmRpY2VzKCk7XG5cdFx0Y29uc3QgcG9zaXRpb25zID0gdGhpcy5oZWFkLmdldFZlcnRpY2VzRGF0YShCQUJZTE9OLlZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQpO1xuXHRcdGxldCBjb2xvcnMgPSB0aGlzLmhlYWQuZ2V0VmVydGljZXNEYXRhKEJBQllMT04uVmVydGV4QnVmZmVyLkNvbG9yS2luZCk7ICAgICAgICBcblx0XHRjb25zdCBuYlZlcnRpY2VzID0gcG9zaXRpb25zLmxlbmd0aCAvIDM7XG5cdFx0aWYgKCFjb2xvcnMpIHtcblx0XHRcdFx0Y29sb3JzID0gbmV3IEFycmF5KDQgKiBuYlZlcnRpY2VzKTtcblx0XHRcdFx0Y29sb3JzID0gY29sb3JzLmZpbGwoMSk7XG5cdFx0fVxuXHRcdGxldCB2ZXJ0ZXg7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcblx0XHRcdFx0dmVydGV4ID0gaW5kaWNlc1szICogMCArIGldO1xuXHRcdFx0XHRjb2xvcnNbNCAqIHZlcnRleF0gPSAxO1xuXHRcdFx0XHRjb2xvcnNbNCAqIHZlcnRleCArIDFdID0gMTtcblx0XHRcdFx0Y29sb3JzWzQgKiB2ZXJ0ZXggKyAyXSA9IDA7XG5cdFx0XHRcdGNvbG9yc1s0ICogdmVydGV4ICsgM10gPSAxO1xuXHRcdH1cblx0XHR0aGlzLmhlYWQuc2V0VmVydGljZXNEYXRhKEJBQllMT04uVmVydGV4QnVmZmVyLkNvbG9yS2luZCwgY29sb3JzKTtcblx0XHQvLyBoZWFkLnNldFBpdm90TWF0cml4KEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjQsIDApKVxuXHRcdHRoaXMuaGVhZC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMC40LCAwKSk7O1xuXG5cdFx0Y29uc3QgaGFpciA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveCh0aGlzLm5hbWUsIHt3aWR0aDogMSwgaGVpZ2h0OiAwLjJ9LCB0aGlzLlNjZW5lKTtcblx0XHRoYWlyLnNldFBpdm90TWF0cml4KEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjEsIDApKVxuXHRcdGhhaXIucGFyZW50ID0gdGhpcy5oZWFkO1xuXHRcdGhhaXIubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAuNSwgMCkpOztcblx0XHRoYWlyLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbCh0aGlzLm5hbWUsIHRoaXMuU2NlbmUpO1xuXHRcdGhhaXIubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAuNjEsIDAuMjMsIDAuMjkpO1xuXHRcdFxuXG5cdFx0dGhpcy5ib2R5ID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwiYm9keVwiLCB7d2lkdGg6MS4yLCBoZWlnaHQ6IDEuMiwgZGVwdGg6IDAuNX0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMuYm9keS5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHR0aGlzLmJvZHkubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiYm9keW1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5ib2R5Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0dGhpcy5ib2R5LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC42LCAwKSk7XG5cdFx0XG5cblx0XHRjb25zdCBidXQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJidXRcIiwge3dpZHRoOjEuMjUsIGhlaWdodDogMC40LCBkZXB0aDogMC41NX0sIHRoaXMuU2NlbmUpO1xuXHRcdGJ1dC5wYXJlbnQgPSB0aGlzLmJvZHk7XG5cdFx0YnV0Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImJ1dG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0YnV0Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4xLCAwLjEsIDAuMSk7XG5cdFx0YnV0LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC44LCAwKSk7XG5cdFx0XG5cblx0XHR0aGlzLmxlZnRhcm0gPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0dXBwZXJhcm1cIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjgsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRhcm0ubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdHVwcGVyYXJtbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRhcm0ubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmxlZnRhcm0ucGFyZW50ID0gdGhpcy5wbGF5ZXI7XG5cdFx0dGhpcy5sZWZ0YXJtLnNldFBpdm90TWF0cml4KEJBQllMT04uTWF0cml4LlRyYW5zbGF0aW9uKDAsIC0wLjQsIDApKVxuXHRcdHRoaXMubGVmdGFybS5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoLTAuOSwgLTAuNCwgMCkpO1xuXG5cdFx0dGhpcy5sZWZ0ZWxib3cgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0ZWxib3dcIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjIsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmxlZnRlbGJvdy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJsZWZ0ZWxib3dtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMubGVmdGVsYm93Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0dGhpcy5sZWZ0ZWxib3cucGFyZW50ID0gdGhpcy5sZWZ0YXJtO1xuXHRcdHRoaXMubGVmdGVsYm93LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC41LCAwKSk7XG5cblx0XHR0aGlzLmxlZnRsb3dlcmFybSA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRsb3dlcmFybVwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuOCwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMubGVmdGxvd2VyYXJtLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRsb3dlcmFybW1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0ubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLmxlZnRsb3dlcmFybS5wYXJlbnQgPSB0aGlzLmxlZnRhcm07XG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0uc2V0UGl2b3RNYXRyaXgoQkFCWUxPTi5NYXRyaXguVHJhbnNsYXRpb24oMCwgLTAuNCwgMCkpXG5cdFx0dGhpcy5sZWZ0bG93ZXJhcm0ubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjgsIDApKTtcblxuXHRcdGNvbnN0IGxlZnR3YWlzdCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnR3YWlzdFwiLCB7d2lkdGg6MC40NCwgaGVpZ2h0OiAwLjEsIGRlcHRoOiAwLjQ0fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdHdhaXN0Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnR3YWlzdG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdHdhaXN0Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMSwgMSwgMSk7XG5cdFx0bGVmdHdhaXN0LnBhcmVudCA9IHRoaXMubGVmdGxvd2VyYXJtO1xuXHRcdGxlZnR3YWlzdC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuNCwgMCkpO1xuXG5cdFx0Y29uc3QgbGVmdGhhbmQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJsZWZ0aGFuZFwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuMiwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRoYW5kLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRoYW5kbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRsZWZ0aGFuZC5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC43OCwgMC4yNywgMC4zOSk7XG5cdFx0bGVmdGhhbmQucGFyZW50ID0gdGhpcy5sZWZ0bG93ZXJhcm07XG5cdFx0bGVmdGhhbmQubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjU1LCAwKSk7XG5cblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0gPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndHVwcGVyYXJtXCIsIHt3aWR0aDowLjQsIGhlaWdodDogMC44LCBkZXB0aDogMC40fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5yaWhndHVwcGVyYXJtLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpaGd0dXBwZXJhcm1tXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5wYXJlbnQgPSB0aGlzLnBsYXllcjtcblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0uc2V0UGl2b3RNYXRyaXgoQkFCWUxPTi5NYXRyaXguVHJhbnNsYXRpb24oMCwgLTAuNCwgMCkpXG5cdFx0dGhpcy5yaWhndHVwcGVyYXJtLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLjksIC0wLjQsIDApKTtcblxuXHRcdGNvbnN0IHJpaGd0ZWxib3cgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndGVsYm93XCIsIHt3aWR0aDowLjQsIGhlaWdodDogMC4yLCBkZXB0aDogMC40fSwgdGhpcy5TY2VuZSk7XG5cdFx0cmloZ3RlbGJvdy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWhndGVsYm93bVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndGVsYm93Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0cmloZ3RlbGJvdy5wYXJlbnQgPSB0aGlzLnJpaGd0dXBwZXJhcm07XG5cdFx0cmloZ3RlbGJvdy5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTAuNSwgMCkpO1xuXG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwicmloZ3Rsb3dlcmFybVwiLCB7d2lkdGg6MC40LCBoZWlnaHQ6IDAuOCwgZGVwdGg6IDAuNH0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMucmloZ3Rsb3dlcmFybS5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWhndGxvd2VyYXJtbVwiLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygwLjIsIDAuMiwgMC4yKTtcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ucGFyZW50ID0gdGhpcy5yaWhndHVwcGVyYXJtO1xuXHRcdHRoaXMucmloZ3Rsb3dlcmFybS5zZXRQaXZvdE1hdHJpeChCQUJZTE9OLk1hdHJpeC5UcmFuc2xhdGlvbigwLCAtMC40LCAwKSlcblx0XHR0aGlzLnJpaGd0bG93ZXJhcm0ubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjgsIDApKTtcblxuXHRcdGNvbnN0IHJpaGd0d2Fpc3QgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndHdhaXN0XCIsIHt3aWR0aDowLjQ0LCBoZWlnaHQ6IDAuMSwgZGVwdGg6IDAuNDR9LCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndHdhaXN0Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJpaGd0d2Fpc3RtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpaGd0d2Fpc3QubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3ICBCQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcblx0XHRyaWhndHdhaXN0LnBhcmVudCA9IHRoaXMucmloZ3Rsb3dlcmFybTtcblx0XHRyaWhndHdhaXN0LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC40LCAwKSk7XG5cblx0XHRjb25zdCByaWhndGhhbmQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWhndGhhbmRcIiwge3dpZHRoOjAuNCwgaGVpZ2h0OiAwLjIsIGRlcHRoOiAwLjR9LCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndGhhbmQubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmloZ3RoYW5kbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWhndGhhbmQubWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAuNzgsIDAuMjcsIDAuMzkpO1xuXHRcdHJpaGd0aGFuZC5wYXJlbnQgPSB0aGlzLnJpaGd0bG93ZXJhcm07XG5cdFx0cmloZ3RoYW5kLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC41NSwgMCkpO1xuXG5cdFx0dGhpcy5sZWZ0bGVnID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdHVwcGVybGVnXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC44LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0bGVnLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnR1cHBlcmxlZ21cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5sZWZ0bGVnLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0dGhpcy5sZWZ0bGVnLnBhcmVudCA9IHRoaXMucGxheWVyO1xuICAgIHRoaXMubGVmdGxlZy5zZXRQaXZvdE1hdHJpeChCQUJZTE9OLk1hdHJpeC5UcmFuc2xhdGlvbigwLCAtMC40LCAwKSlcblx0XHR0aGlzLmxlZnRsZWcubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKC0wLjI2LCAtMiwgMCkpO1xuXG5cdFx0Y29uc3QgbGVmdGtuZWVsID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwibGVmdGtuZWVsXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC4yLCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGtuZWVsLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxlZnRrbmVlbG1cIiwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGtuZWVsLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0bGVmdGtuZWVsLnBhcmVudCA9IHRoaXMubGVmdGxlZztcblx0XHRsZWZ0a25lZWwubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjUsIDApKTtcblxuXHRcdGNvbnN0IGxlZnRsb3dlcmxlZyA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRsb3dlcmxlZ1wiLCB7d2lkdGg6MC41LCBoZWlnaHQ6IDAuNiwgZGVwdGg6IDAuNX0sIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRsb3dlcmxlZy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJsZWZ0bG93ZXJsZWdtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRsb3dlcmxlZy5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdGxlZnRsb3dlcmxlZy5wYXJlbnQgPSB0aGlzLmxlZnRsZWc7XG5cdFx0bGVmdGxvd2VybGVnLmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC45LCAwKSk7XG5cblx0XHRjb25zdCBsZWZ0Zm9vdCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxlZnRmb290XCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC40LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0bGVmdGZvb3QubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGVmdGZvb3RtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdGxlZnRmb290Lm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4xLCAwLjEsIDAuMSk7XG5cdFx0bGVmdGZvb3QucGFyZW50ID0gdGhpcy5sZWZ0bGVnO1xuXHRcdGxlZnRmb290LmxvY2FsbHlUcmFuc2xhdGUobmV3IEJBQllMT04uVmVjdG9yMygwLCAtMS40LCAwKSk7XG5cblx0XHR0aGlzLnJpZ2h0bGVnID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KFwicmlnaHR1cHBlcmxlZ1wiLCB7d2lkdGg6MC41LCBoZWlnaHQ6IDAuOCwgZGVwdGg6IDAuNX0sIHRoaXMuU2NlbmUpO1xuXHRcdHRoaXMucmlnaHRsZWcubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmlnaHR1cHBlcmxlZ21cIiwgdGhpcy5TY2VuZSk7XG5cdFx0dGhpcy5yaWdodGxlZy5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xuXHRcdHRoaXMucmlnaHRsZWcucGFyZW50ID0gdGhpcy5wbGF5ZXI7XG5cdFx0dGhpcy5yaWdodGxlZy5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMC4yNiwgLTIsIDApKTtcblxuXHRcdGNvbnN0IHJpZ2h0a25lZWwgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWdodGtuZWVsXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC4yLCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0cmlnaHRrbmVlbC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWdodGtuZWVsbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWdodGtuZWVsLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0cmlnaHRrbmVlbC5wYXJlbnQgPSB0aGlzLnJpZ2h0bGVnO1xuXHRcdHJpZ2h0a25lZWwubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjUsIDApKTtcblxuXHRcdGNvbnN0IHJpZ2h0bG93ZXJsZWcgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJyaWdodGxvd2VybGVnXCIsIHt3aWR0aDowLjUsIGhlaWdodDogMC42LCBkZXB0aDogMC41fSwgdGhpcy5TY2VuZSk7XG5cdFx0cmlnaHRsb3dlcmxlZy5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWdodGxvd2VybGVnbVwiLCB0aGlzLlNjZW5lKTtcblx0XHRyaWdodGxvd2VybGVnLm1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyAgQkFCWUxPTi5Db2xvcjMoMC4yLCAwLjIsIDAuMik7XG5cdFx0cmlnaHRsb3dlcmxlZy5wYXJlbnQgPSB0aGlzLnJpZ2h0bGVnO1xuXHRcdHJpZ2h0bG93ZXJsZWcubG9jYWxseVRyYW5zbGF0ZShuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC0wLjksIDApKTtcblxuXHRcdGNvbnN0IHJpZ2h0Zm9vdCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcInJpZ2h0Zm9vdFwiLCB7d2lkdGg6MC41LCBoZWlnaHQ6IDAuNCwgZGVwdGg6IDAuNX0sIHRoaXMuU2NlbmUpO1xuXHRcdHJpZ2h0Zm9vdC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyaWdodGZvb3RtXCIsIHRoaXMuU2NlbmUpO1xuXHRcdHJpZ2h0Zm9vdC5tYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgIEJBQllMT04uQ29sb3IzKDAuMSwgMC4xLCAwLjEpO1xuXHRcdHJpZ2h0Zm9vdC5wYXJlbnQgPSB0aGlzLnJpZ2h0bGVnO1xuXHRcdHJpZ2h0Zm9vdC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTEuNCwgMCkpO1xuICB9XG5cbiAgbG9jYWxBeGVzKHNpemUsIHNoYWRlKSB7XG5cdFx0Y29uc3QgcGlsb3RfbG9jYWxfYXhpc1ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlTGluZXMoXCJwaWxvdF9sb2NhbF9heGlzWFwiLCBbIFxuXHRcdFx0XHRuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgbmV3IEJBQllMT04uVmVjdG9yMyhzaXplLCAwLCAwKSwgbmV3IEJBQllMT04uVmVjdG9yMyhzaXplICogMC45NSwgMC4wNSAqIHNpemUsIDApLCBcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMyhzaXplLCAwLCAwKSwgbmV3IEJBQllMT04uVmVjdG9yMyhzaXplICogMC45NSwgLTAuMDUgKiBzaXplLCAwKVxuXHRcdF0sIHRoaXMuU2NlbmUpO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNYLmNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDEsIHNoYWRlLCBzaGFkZSk7XG5cblx0XHRjb25zdCBwaWxvdF9sb2NhbF9heGlzWSA9IEJBQllMT04uTWVzaC5DcmVhdGVMaW5lcyhcInBpbG90X2xvY2FsX2F4aXNZXCIsIFtcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMy5aZXJvKCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgc2l6ZSwgMCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoLTAuMDUgKiBzaXplLCBzaXplICogMC45NSwgMCksXG5cdFx0XHRcdG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgc2l6ZSwgMCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoMC4wNSAqIHNpemUsIHNpemUgKiAwLjk1LCAwKVxuXHRcdF0sIHRoaXMuU2NlbmUpO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNZLmNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKHNoYWRlLCAxLCBzaGFkZSk7XG5cblx0XHRjb25zdCBwaWxvdF9sb2NhbF9heGlzWiA9IEJBQllMT04uTWVzaC5DcmVhdGVMaW5lcyhcInBpbG90X2xvY2FsX2F4aXNaXCIsIFtcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMy5aZXJvKCksIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgc2l6ZSksIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAgLCAtMC4wNSAqIHNpemUsIHNpemUgKiAwLjk1KSxcblx0XHRcdFx0bmV3IEJBQllMT04uVmVjdG9yMygwLCAwLCBzaXplKSwgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMC4wNSAqIHNpemUsIHNpemUgKiAwLjk1KVxuXHRcdF0sIHRoaXMuU2NlbmUpO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNaLmNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKHNoYWRlLCBzaGFkZSwgMSk7XG5cblx0XHRjb25zdCBsb2NhbF9vcmlnaW4gPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImxvY2FsX29yaWdpblwiLCB7c2l6ZToxfSwgdGhpcy5TY2VuZSk7XG5cdFx0bG9jYWxfb3JpZ2luLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG5cdFx0cGlsb3RfbG9jYWxfYXhpc1gucGFyZW50ID0gbG9jYWxfb3JpZ2luO1xuXHRcdHBpbG90X2xvY2FsX2F4aXNZLnBhcmVudCA9IGxvY2FsX29yaWdpbjtcblx0XHRwaWxvdF9sb2NhbF9heGlzWi5wYXJlbnQgPSBsb2NhbF9vcmlnaW47IFxuXG5cdFx0dGhpcy5wbGF5ZXIucG9zaXRpb24ueSA9IDA7XG5cdFx0cmV0dXJuIGxvY2FsX29yaWdpbjtcblx0fVxuXG5cdGhvbGRHdW4oKSB7XG5cdFx0dGhpcy5sZWZ0YXJtLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDM7XG5cdFx0dGhpcy5sZWZ0YXJtLnJvdGF0aW9uLnkgPSBNYXRoLlBJIC8gNTtcblx0XHR0aGlzLmxlZnRsb3dlcmFybS5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyA1O1xuXHRcdHRoaXMubGVmdGxvd2VyYXJtLnBvc2l0aW9uLnkgLT0gMC4yO1xuXHRcdHRoaXMucmloZ3R1cHBlcmFybS5yb3RhdGlvbi54ID0gIC1NYXRoLlBJIC8gNDtcblx0XHR0aGlzLnJpaGd0dXBwZXJhcm0ucm90YXRpb24ueSA9ICAtTWF0aC5QSSAvIDU7XG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG5cdFx0dGhpcy5yaWhndGxvd2VyYXJtLnBvc2l0aW9uLnkgLT0gMC4yO1xuXHR9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0IHJ1biA9IG5ldyBCQUJZTE9OLkFuaW1hdGlvbkdyb3VwKFwicnVuXCIpO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IDU7XG5cbiAgICBjb25zdCBsZWZ0YW5pbWUgPSBuZXcgQkFCWUxPTi5BbmltYXRpb24oXCJ4U2xpZGVcIiwgXCJyb3RhdGlvbi54XCIsIGZyYW1lUmF0ZSwgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgQkFCWUxPTi5BbmltYXRpb24uQU5JTUFUSU9OTE9PUE1PREVfQ1lDTEUpO1xuICAgIGNvbnN0IGtleUZyYW1lcyA9IFtdO1xuXG4gICAga2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogMCxcbiAgICAgICAgdmFsdWU6IC1NYXRoLlBJIC8gNCxcbiAgICB9KTtcblxuICAgIGtleUZyYW1lcy5wdXNoKHtcbiAgICAgICAgZnJhbWU6IGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IE1hdGguUEkgLyA0LFxuICAgIH0pO1xuXG4gICAga2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogMiAqIGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IC1NYXRoLlBJIC8gNCxcbiAgICB9KTtcblxuICAgIGxlZnRhbmltZS5zZXRLZXlzKGtleUZyYW1lcyk7XG5cbiAgICBjb25zdCByaWdodGFuaW1lID0gbmV3IEJBQllMT04uQW5pbWF0aW9uKFwieFNsaWRlXCIsIFwicm90YXRpb24ueFwiLCBmcmFtZVJhdGUsIEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTkxPT1BNT0RFX0NZQ0xFKTtcbiAgICBjb25zdCByaWdodGtleUZyYW1lcyA9IFtdO1xuXG4gICAgcmlnaHRrZXlGcmFtZXMucHVzaCh7XG4gICAgICAgIGZyYW1lOiAwLFxuICAgICAgICB2YWx1ZTogTWF0aC5QSSAvIDQsXG4gICAgfSk7XG5cbiAgICByaWdodGtleUZyYW1lcy5wdXNoKHtcbiAgICAgICAgZnJhbWU6IGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IC1NYXRoLlBJIC8gNCxcbiAgICB9KTtcblxuICAgIHJpZ2h0a2V5RnJhbWVzLnB1c2goe1xuICAgICAgICBmcmFtZTogMiAqIGZyYW1lUmF0ZSxcbiAgICAgICAgdmFsdWU6IE1hdGguUEkgLyA0LFxuICAgIH0pO1xuXG4gICAgcmlnaHRhbmltZS5zZXRLZXlzKHJpZ2h0a2V5RnJhbWVzKTtcblxuICAgIHJ1bi5hZGRUYXJnZXRlZEFuaW1hdGlvbihsZWZ0YW5pbWUsIHRoaXMubGVmdGxlZyk7XG4gICAgcnVuLmFkZFRhcmdldGVkQW5pbWF0aW9uKHJpZ2h0YW5pbWUsIHRoaXMucmlnaHRsZWcpO1xuICAgIHJ1bi5ub3JtYWxpemUoMCwgMiAqIGZyYW1lUmF0ZSk7XG4gICAgcnVuLnBsYXkodHJ1ZSk7XG4gIH1cblxuXHRjbG9uZSgpIHtcblx0XHR0aGlzLnBsYXllciA9IHRoaXMucGxheWVyLmNsb25lKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vd2VhcG9uLmpzJ1xuaW1wb3J0IFBsYXllck1vZCBmcm9tICcuL3BsYXllck1vZC5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZW1vdGVQbGF5ZXIge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRzY2VuZSwgcGxheWVyXG5cdCkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgcmVtb3RlJylcblx0XHR0aGlzLnBsYXllciA9IHBsYXllcjtcblx0XHRjb25zdCBwID0gbmV3IFBsYXllck1vZChzY2VuZS5TY2VuZSwgcGxheWVyLl9pZCk7XG5cdFx0cC5jcmVhdGVQbGF5ZXIoKTtcblx0XHRwLmhvbGRHdW4oKTtcblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XG5cdFx0dGhpcy5tZXNoID0gcDtcblx0XHR0aGlzLm1lc2gucGxheWVyLnNldEVuYWJsZWQodHJ1ZSk7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5uYW1lID0gcGxheWVyLl9pZFxuXHRcdHRoaXMubWVzaC5wbGF5ZXIucG9zaXRpb24ueCA9IHBsYXllci5feDtcblx0XHR0aGlzLm1lc2gucGxheWVyLnBvc2l0aW9uLnkgPSBwbGF5ZXIuX3k7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5wb3NpdGlvbi56ID0gcGxheWVyLl96O1xuXHRcdC8vIHRoaXMuc2NlbmUuc2hhZG93R2VuZXJhdG9yLmdldFNoYWRvd01hcCgpLnJlbmRlckxpc3QucHVzaCh0aGlzLm1lc2gucGxheWVyKTtcblx0XHR0aGlzLndlYXBvbiA9IG5ldyBXZWFwb24oc2NlbmUsIHBsYXllciwgdGhpcy5tZXNoLnBsYXllcilcblx0XHQvLyB0aGlzLm1lc2gucGxheWVyLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XG5cdH1cblxuXHRVcGRhdGUoKSB7XG5cblx0fVxuXG5cdGJpbmRFdmVudCgpIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpKVxuXHR9XG5cblx0Q3JlYXRlKCkge1xuXG5cdH1cblxuXHRtb3ZlKHBvcywgcm90KSB7XG5cdFx0Y29uc29sZS5sb2coJ21vdmUnKVxuXHRcdGNvbnNvbGUubG9nKHBvcylcblx0XHR0aGlzLm1lc2gucGxheWVyLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyhwb3MueCwgcG9zLnksIHBvcy56KTtcblx0XHR0aGlzLm1lc2gucGxheWVyLnJvdGF0aW9uLnkgPSByb3QueTtcblx0XHR0aGlzLm1lc2gucnVuKCk7XG5cdH1cblxuXHRnb3RLaWxsZWQoa2lsbGVyKXtcblx0XHR0aGlzLnNldERlYWQodHJ1ZSlcblx0XHR0aGlzLnNjZW5lLmNhbWVyYS5zcGVlZCA9IDA7XG5cdH1cblxuXHRyZXNldENhbWVyYUNvb3JkaW5hdGVzKCkge1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnggPSB0aGlzLl94O1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnkgPSB0aGlzLl95O1xuXHRcdHRoaXMuc2NlbmUuY2FtZXJhLnBvc2l0aW9uLnogPSB0aGlzLl96O1xuXHR9XG5cblx0dXBkYXRlUG9zaXRpb24oKSB7XG5cdFx0Y29uc3QgeE9mZnNldCA9IE1hdGguYXNiKHRoaXMubGFzdClcblx0fVxuXG5cdHN1Ym1pdE1vdmVtZW50KCkge1xuXHRcdFxuXHR9XG5cblx0Y2hlY2tDb250cm9scygpIHtcblxuXHR9XG5cblx0Y2hlY2tGcmVlRmFsbCgpe1xuXG5cdH1cblxuXHRjaGVja0p1bXAoKSB7XG5cblx0fVxuXG5cdERlc3Ryb3koKSB7XG5cdFx0dGhpcy5tZXNoLnBsYXllci5kaXNwb3NlKClcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXBvbiB7XG4gIGNvbnN0cnVjdG9yKHNjZW5lLCBwbGF5ZXIsIHBhcmVudCkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICBjb25zdCB3cCA9IHRoaXMuc2NlbmUuZ3VuLmNyZWF0ZUluc3RhbmNlKHBsYXllci5faWQpO1xuICAgIGNvbnNvbGUubG9nKHdwKVxuICAgIHdwLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgd3Aucm90YXRpb25RdWF0ZXJuaW9uID0gbnVsbDtcbiAgICB3cC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgLy8gd3AucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC0wLjIsIDAgLDIpOyBcbiAgICB3cC5sb2NhbGx5VHJhbnNsYXRlKG5ldyBCQUJZTE9OLlZlY3RvcjMoLTAuNSwgLTAuOCwgLTEuOCkpO1xuICAgIC8vIHdwLnJvdGF0aW9uLnggPSAtTWF0aC5QSS8yO1xuICAgIHdwLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDI7XG4gICAgdGhpcy5tZXNoID0gd3A7XG4gICAgdGhpcy5faW5pdGlhbFJvdGF0aW9uID0gdGhpcy5tZXNoLnJvdGF0aW9uLmNsb25lKCk7XG4gICAgdGhpcy5hbW1vU2l6ZSA9IDE0O1xuICAgIHRoaXMuY3VycmVudEFtbW8gPSB0aGlzLmFtbW9TaXplO1xuICAgIHRoaXMuZmlyZVJhdGUgPSAyNTAuMDtcbiAgICB0aGlzLl9jdXJyZW50RmlyZVJhdGUgPSB0aGlzLmZpcmVSYXRlO1xuICAgIHRoaXMuY2FuRmlyZSA9IHRydWU7XG4gICAgdGhpcy5yZWxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNjZW5lLlNjZW5lLnJlZ2lzdGVyQmVmb3JlUmVuZGVyKCgpID0+IHtcbiAgICAgIGlmKCF0aGlzLmNhbkZpcmUpe1xuICAgICAgICB0aGlzLl9jdXJyZW50RmlyZVJhdGUgLT0gdGhpcy5zY2VuZS5lbmdpbmUuZ2V0RGVsdGFUaW1lKCk7XG4gICAgICAgIGlmKHRoaXMuX2N1cnJlbnRGaXJlUmF0ZSA8PSAwICYmICF0aGlzLnJlbG9hZGluZyl7XG4gICAgICAgICAgdGhpcy5jYW5GaXJlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLl9jdXJyZW50RmlyZVJhdGUgPSB0aGlzLmZpcmVSYXRlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIFxuICByZWxvYWQoKSB7XG4gICAgaWYoIXRoaXMucmVsb2FkaW5nKXtcbiAgICAgIHRoaXMuY2FuRmlyZSA9IGZhbHNlO1xuICAgICAgdGhpcy5yZWxvYWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5hbmltYXRlUmVsb2FkKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50QW1tbyA9IHRoaXMuYW1tb1NpemU7XG4gICAgICAgIHRoaXMuY2FuRmlyZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVsb2FkaW5nID0gZmFsc2U7XG4gICAgICB9LCA4MDApXG4gICAgfVxuICB9XG5cbiAgZmlyZSgpIHtcbiAgICBpZih0aGlzLmNhbkZpcmUpe1xuICAgICAgaWYodGhpcy5jdXJyZW50QW1tbyAhPSAwKXtcbiAgICAgICAgdGhpcy5zY2VuZS5zb3VuZC5ndW5GaXJlKCk7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGgpXG4gICAgICAgIGNvbnNvbGUubG9nKGhlaWdodClcbiAgICAgICAgY29uc3QgcGlja1Jlc3VsdCA9IHRoaXMuc2NlbmUuU2NlbmUucGljayh3aWR0aC8yLCBoZWlnaHQvMiwgbnVsbCwgZmFsc2UsIHRoaXMuc2NlbmUuY2FtZXJhKTtcbiAgICAgICAgaWYocGlja1Jlc3VsdC5waWNrZWRNZXNoKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhwaWNrUmVzdWx0LnBpY2tlZE1lc2gubmFtZSlcbiAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihwaWNrUmVzdWx0LnBpY2tlZE1lc2gubmFtZSA9PT0gdGhpcy5zY2VuZS5zdG9yZS5zdGF0ZS5yZW1vdGVQbGF5ZXJzW2ldLnBsYXllci5faWQpe1xuICAgICAgICAgICAgICB0aGlzLnNjZW5lLmNvbnRyb2xsZXIuaGl0UGxheWVyKHRoaXMuc2NlbmUuc3RvcmUuc3RhdGUucmVtb3RlUGxheWVyc1tpXS5wbGF5ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHBpY2tSZXN1bHQucGlja2VkTWVzaC5uYW1lICE9ICdza3lCb3gnKXtcbiAgICAgICAgICAgIC8vIHRoaXMuZHJhd0ltcGFjdChwaWNrUmVzdWx0LnBpY2tlZFBvaW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2VuZS5jb250cm9sbGVyLnNob3RGaXJlZCgpO1xuICAgICAgICAvLyB0aGlzLmN1cnJlbnRBbW1vIC09IDE7XG4gICAgICAgIFxuICAgICAgfWVsc2V7XG4gICAgICAgIC8vIOepuuaeqlxuICAgICAgfVxuICAgICAgdGhpcy5hbmltYXRlKCk7XG4gICAgICB0aGlzLmNhbkZpcmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5faW5pdGlhbFJvdGF0aW9uLmNsb25lKCk7XG4gICAgY29uc3QgZW5kID0gc3RhcnQuY2xvbmUoKTtcbiAgICBlbmQueCArPSBNYXRoLlBJLzEwMDtcblxuICAgIC8vIENyZWF0ZSB0aGUgQW5pbWF0aW9uIG9iamVjdFxuICAgIGNvbnN0IGRpc3BsYXkgPSBuZXcgQkFCWUxPTi5BbmltYXRpb24oXG4gICAgICAgIFwiZmlyZVwiLFxuICAgICAgICBcInJvdGF0aW9uXCIsXG4gICAgICAgIDYwLFxuICAgICAgICBCQUJZTE9OLkFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjMsXG4gICAgICAgIEJBQllMT04uQW5pbWF0aW9uLkFOSU1BVElPTkxPT1BNT0RFX0NPTlNUQU5UKTtcblxuICAgIC8vIEFuaW1hdGlvbnMga2V5c1xuICAgIGNvbnN0IGtleXMgPSBbeyBcbiAgICAgICAgZnJhbWU6IDAsXG4gICAgICAgIHZhbHVlOiBzdGFydFxuICAgIH0se1xuICAgICAgICBmcmFtZTogMTAsXG4gICAgICAgIHZhbHVlOiBlbmRcbiAgICB9LHtcbiAgICAgICAgZnJhbWU6IDEwMCxcbiAgICAgICAgdmFsdWU6IHN0YXJ0XG4gICAgfV07XG5cbiAgICAvLyBBZGQgdGhlc2Uga2V5cyB0byB0aGUgYW5pbWF0aW9uXG4gICAgZGlzcGxheS5zZXRLZXlzKGtleXMpO1xuXG4gICAgLy8gTGluayB0aGUgYW5pbWF0aW9uIHRvIHRoZSBtZXNoXG4gICAgdGhpcy5tZXNoLmFuaW1hdGlvbnMucHVzaChkaXNwbGF5KTtcblxuICAgIHRoaXMuc2NlbmUuU2NlbmUuYmVnaW5BbmltYXRpb24odGhpcy5tZXNoLCAwLCAxMDAsIGZhbHNlLCAxMCwgZnVuY3Rpb24oKSB7XG5cbiAgICB9KTtcbiAgfVxuXG4gIGRyYXdJbXBhY3QocG9zaXRpb24pIHtcbiAgICBjb25zdCBpbXBhY3QgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVBsYW5lKCdpbXBhY3QnLCB7c2l6ZTogMX0sIHRoaXMuc2NlbmUuU2NlbmUpO1xuICAgIGltcGFjdC5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG4gICAgaW1wYWN0Lm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbCgnaW1wYWN0TWF0JywgdGhpcy5zY2VuZS5TY2VuZSk7XG4gICAgaW1wYWN0Lm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcIi9pbXBhY3QucG5nXCIsIHRoaXMuc2NlbmUuU2NlbmUpO1xuICAgIGltcGFjdC5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZS5oYXNBbHBoYSA9IHRydWU7IFxuICAgIGltcGFjdC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgYW5pbWF0ZVJlbG9hZCgpIHtcbiAgICAvLyDmkq3mlL7liqjnlLtcbiAgfVxufSIsImltcG9ydCBQbGF5ZXJNb2QgZnJvbSAnLi4vbW9kZWxzL3BsYXllck1vZC5qcyc7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVyL2NvbnRyb2xsZXIuanMnXG5pbXBvcnQgU291bmQgZnJvbSAnLi4vY29udHJvbGxlci9zb3VuZC5qcyc7XG5pbXBvcnQgaW5pdERhdGEgZnJvbSAnLi4vc3RvcmUvaW5pdERhdGEuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFieWxvblNjZW5lIHtcblx0Y29uc3RydWN0b3IoXG5cdFx0ZW5naW5lLCBjYW52YXMsIHN0b3JlXG5cdCkge1xuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzO1xuXHRcdGNvbnNvbGUubG9nKHN0b3JlKVxuXHRcdHRoaXMuc3RvcmUgPSBzdG9yZTtcblx0XHR0aGlzLmJveGVzID0gW11cblx0XHR0aGlzLmVuZ2luZSA9IGVuZ2luZTtcblx0XHR0aGlzLlNjZW5lID0gIG5ldyBCQUJZTE9OLlNjZW5lKGVuZ2luZSk7XG5cdFx0dGhpcy5jb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodGhpcyk7XG5cdFx0dGhpcy5zb3VuZCA9IG5ldyBTb3VuZCh0aGlzLlNjZW5lKTtcblx0fVxuXG5cdENyZWF0ZSgpIHtcblx0XHR0aGlzLmluaXRDYW1lcmEoKTtcblx0XHR0aGlzLmxvYWRMaWdodCgpO1xuXHRcdHRoaXMubG9hZFBoeXNpY3MoKTtcblx0XHR0aGlzLmluaXRTa3koKTtcblx0XHR0aGlzLmxvYWRHcm91bmQoKTtcblx0XHQvLyB0aGlzLmxvYWRCb3hlcygpO1xuXHRcdHRoaXMubG9hZEd1bigpLnRoZW4oKCkgPT4ge1xuXHRcdFx0dGhpcy5sb2FkU29saWRlcigpXG5cdFx0fSlcblx0fVxuXG5cdGluaXRDYW1lcmEoKSB7XG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgQkFCWUxPTi5GcmVlQ2FtZXJhKCdjYW1lcmExJywgbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLjUsIDcpLCB0aGlzLlNjZW5lKTtcblx0XHR0aGlzLmNhbWVyYS5zZXRUYXJnZXQobmV3IEJBQllMT04uVmVjdG9yMygwLCAwLCAtMSkpXG5cdFx0dGhpcy5jYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmNhbnZhcywgZmFsc2UpO1xuXHRcdHRoaXMuU2NlbmUuYWN0aXZlQ2FtZXJhcy5wdXNoKHRoaXMuY2FtZXJhKVxuXHRcdC8vIHRoaXMuY2FtZXJhMiA9IG5ldyBCQUJZTE9OLkZyZWVDYW1lcmEoJ2NhbWVyYTEnLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDEwLCAxLCAwKSwgdGhpcy5TY2VuZSk7XG5cdFx0Ly8gdGhpcy5jYW1lcmEyLnNldFRhcmdldChuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIDApKVxuXHRcdC8vIHRoaXMuY2FtZXJhMi5hdHRhY2hDb250cm9sKHRoaXMuY2FudmFzLCBmYWxzZSk7XG5cdFx0Ly8gdGhpcy5jYW1lcmEyLmlucHV0cy5hZGRNb3VzZVdoZWVsKCk7XG5cdFx0Ly8gdGhpcy5TY2VuZS5hY3RpdmVDYW1lcmFzLnB1c2godGhpcy5jYW1lcmEyKVxuXHRcdC8vIHRoaXMuY2FtZXJhLnZpZXdwb3J0ID0gbmV3IEJBQllMT04uVmlld3BvcnQoMC41LDAsMC41LDEpXG5cdFx0Ly8gdGhpcy5jYW1lcmEyLnZpZXdwb3J0ID0gbmV3IEJBQllMT04uVmlld3BvcnQoMCwwLDAuNSwxKVxuXHR9XG5cblx0aW5pdFNreSgpIHtcblx0XHRCQUJZTE9OLkVuZ2luZS5TaGFkZXJzUmVwb3NpdG9yeSA9IFwiLi4vc2hhZGVycy9cIjtcbiAgICBjb25zdCBza3lib3ggPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVNwaGVyZShcInNreUJveFwiLCB7IHNlZ21lbnRzOiAxMCwgZGlhbWV0ZXI6IDI1MDAgfSwgdGhpcy5TY2VuZSk7XG4gICAgY29uc3Qgc2hhZGVyID0gbmV3IEJBQllMT04uU2hhZGVyTWF0ZXJpYWwoXCJncmFkaWVudFwiLCB0aGlzLlNjZW5lLCBcImdyYWRpZW50XCIsIHt9KTtcbiAgICBzaGFkZXIuc2V0RmxvYXQoXCJvZmZzZXRcIiwgMCk7XG4gICAgc2hhZGVyLnNldEZsb2F0KFwiZXhwb25lbnRcIiwgMC42KTtcbiAgICBzaGFkZXIuc2V0Q29sb3IzKFwidG9wQ29sb3JcIiwgQkFCWUxPTi5Db2xvcjMuRnJvbUludHMoMCwxMTksMjU1KSk7XG4gICAgc2hhZGVyLnNldENvbG9yMyhcImJvdHRvbUNvbG9yXCIsIEJBQllMT04uQ29sb3IzLkZyb21JbnRzKDI0MCwyNDAsIDI1NSkpO1xuICAgIHNoYWRlci5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcbiAgICBza3lib3gubWF0ZXJpYWwgPSBzaGFkZXI7IFxuICAgIFxuICAgIC8vQ3JlYXRlIEZvZyAgXG4gICAgdGhpcy5TY2VuZS5mb2dNb2RlID0gQkFCWUxPTi5TY2VuZS5GT0dNT0RFX0VYUDI7XG4gICAgdGhpcy5TY2VuZS5mb2dEZW5zaXR5ID0gMC4wMDM7XG4gICAgdGhpcy5TY2VuZS5mb2dDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLjgsMC44MywwLjgpO1xuXHR9XG5cblx0bG9hZEdyb3VuZCgpIHtcblx0XHR0aGlzLmdyb3VuZERpdnMgPSA2NDtcblx0XHR0aGlzLnRpbGVTaXplID0gMTAwMDtcblx0XHR0aGlzLmJvdHRvbVBvaW50ID0gLTE1O1xuXHRcdHRoaXMudG9wUG9pbnQgPSAxO1xuXHRcdHRoaXMuZ3JvdW5kID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVHcm91bmRGcm9tSGVpZ2h0TWFwKCdncm91bmQnLCAnL21hcC5qcGcnLCB7XG5cdFx0XHR3aWR0aDogdGhpcy50aWxlU2l6ZSxcblx0XHRcdGhlaWdodDogdGhpcy50aWxlU2l6ZSxcblx0XHRcdHN1YmRpdmlzaW9uczogdGhpcy5zdWJkaXZpc2lvbnMsXG5cdFx0XHRtaW5IZWlnaHQ6IFx0dGhpcy5ib3R0b21Qb2ludCxcblx0XHRcdG1heEhlaWdodDogdGhpcy50b3BQb2ludCxcblx0XHRcdHVwZGF0YWJsZTogdHJ1ZVxuXHRcdH0sIHRoaXMuU2NlbmUpXG5cdFx0Y29uc3QgZ3JvdW5kTWF0ZXJpYWwxID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImdyb3VuZE1hdFwiLCB0aGlzLlNjZW5lKTtcblx0XHRncm91bmRNYXRlcmlhbDEuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwiL2dyYXMxLmpwZ1wiLCB0aGlzLlNjZW5lKTtcblx0XHRncm91bmRNYXRlcmlhbDEuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMTAuMDtcblx0XHRncm91bmRNYXRlcmlhbDEuZGlmZnVzZVRleHR1cmUudlNjYWxlID0gMTAuMDtcdFxuXHRcdHRoaXMuZ3JvdW5kLm1hdGVyaWFsID0gZ3JvdW5kTWF0ZXJpYWwxO1xuXHRcdHRoaXMuZ3JvdW5kLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcblx0XHR0aGlzLmdyb3VuZC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuXHRcdHRoaXMuc2hhZG93R2VuZXJhdG9yLmdldFNoYWRvd01hcCgpLnJlbmRlckxpc3QucHVzaCh0aGlzLmdyb3VuZCk7XG5cdFx0Ly8gdGhpcy5ncm91bmQucGh5c2ljc0ltcG9zdG9yID0gbmV3IEJBQllMT04uUGh5c2ljc0ltcG9zdG9yKHRoaXMuZ3JvdW5kLCBCQUJZTE9OLlBoeXNpY3NJbXBvc3Rvci5Cb3hJbXBvc3RvciwgeyBtYXNzOiAwLCBmcmljdGlvbjogMC41LCByZXN0aXR1dGlvbjogMC43IH0sIHRoaXMuU2NlbmUpOyBcblx0fVxuXG5cdGFzeW5jIGxvYWRHdW4oKSB7XG5cdFx0XHRjb25zdCBtZXNoID0gYXdhaXQgd2luZG93LkJBQllMT04uU2NlbmVMb2FkZXIuSW1wb3J0TWVzaEFzeW5jKCcnLCAnLi8nLCBcIndlYXBvbl8yLm9ialwiLCB0aGlzLlNjZW5lKTtcblx0XHRcdGNvbnNvbGUubG9nKG1lc2gpXG5cdFx0XHR0aGlzLmd1biA9IG1lc2gubWVzaGVzWzBdO1xuXHRcdFx0dGhpcy5ndW4uaXNWaXNpYmxlID0gZmFsc2U7XG5cdFx0XHR0aGlzLmd1bi5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJNYXRcIiwgdGhpcy5TY2VuZSk7XG5cdFx0XHR0aGlzLmd1bi5tYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCIvd2VhcG9uXzIucG5nXCIsIHRoaXMuU2NlbmUpO1xuXHRcdFx0dGhpcy5ndW4ubWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUuaGFzQWxwaGEgPSB0cnVlOyBcblx0fVxuXG5cdGxvYWRTb2xpZGVyKCkge1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5jb250cm9sbGVyLnJlcXVlc3RBbGxQbGF5ZXJzKClcblx0XHR9LCA1MDAwKTtcblx0fVxuXG5cdGxvYWRQaHlzaWNzKCkge1xuXHRcdC8vIGNvbnN0IGdyYXZpdHlWZWN0b3IgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsLTkuODEsIDApO1xuXHRcdC8vIGNvbnN0IHBoeXNpY3NQbHVnaW4gPSBuZXcgQkFCWUxPTi5DYW5ub25KU1BsdWdpbigpO1xuXHRcdC8vIHRoaXMuU2NlbmUuZW5hYmxlUGh5c2ljcyhncmF2aXR5VmVjdG9yLCBwaHlzaWNzUGx1Z2luKTtcblx0XHQvLyB0aGlzLlNjZW5lLmVuYWJsZVBoeXNpY3MobmV3IEJBQllMT04uVmVjdG9yMygwLC05LjgxLCAwKSwgbmV3IEJBQllMT04uT2ltb0pTUGx1Z2luKCkpXG5cdFx0dGhpcy5TY2VuZS5ncmF2aXR5ID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAtMC4wNCwgMClcblx0XHR0aGlzLlNjZW5lLmNvbGxpc2lvbnNFbmFibGVkID0gdHJ1ZTtcblx0fVxuXG5cdGxvYWRCb3hlcygpIHtcblx0XHRjb25zdCBib3ggPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJjcmF0ZVwiLCB7c2l6ZTogOH0sIHRoaXMuU2NlbmUpO1xuICAgIFxuICAgIGJveC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJNYXRcIiwgdGhpcy5TY2VuZSk7XG4gICAgYm94Lm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcIi9jcmF0ZS5qcGdcIiwgdGhpcy5TY2VuZSk7XG4gICAgYm94Lm1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTtcbiAgICBcbiAgICBib3gucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDEwLCAwLCAxMCk7IFxuXHRcdGJveC5yZWNlaXZlU2hhZG93cyA9IHRydWU7XG5cdFx0dGhpcy5zaGFkb3dHZW5lcmF0b3IuZ2V0U2hhZG93TWFwKCkucmVuZGVyTGlzdC5wdXNoKGJveCk7XG4gICAgYm94LmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XG4gICAgdGhpcy5ib3hlcy5wdXNoKGJveCk7XG4gICAgLy90aGlzLmJveC5wb3NpdGlvbi55ID0gdGhpcy5yZW5kZXIudGVycmFpbi5jYWxjRWxldmF0aW9uKDUsIDEwKSArIDU7XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0RGF0YS5ib3hTaXplOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2xvbmUgPSBib3guY3JlYXRlSW5zdGFuY2UoXCJib3hcIiArIGkpO1xuICAgICAgICBjbG9uZS50eXBlID0gJ2JveCc7XG4gICAgICAgIGNsb25lLnBvc2l0aW9uLnggPSBpbml0RGF0YS5ib3hQb3NpdGlvbltpKjJdOyBcbiAgICAgICAgY2xvbmUucG9zaXRpb24ueiA9IGluaXREYXRhLmJveFBvc2l0aW9uW2kqMiArIDFdO1xuICAgICAgICBjbG9uZS5yb3RhdGlvbi55ID0gaW5pdERhdGEuYm94Um90YXRpb25baV07XG4gICAgICAgIFxuICAgICAgICAvL0FkZCBMaWdodHMgYW5kIFBoeXNpY3Ncblx0XHRcdFx0dGhpcy5zaGFkb3dHZW5lcmF0b3IuZ2V0U2hhZG93TWFwKCkucmVuZGVyTGlzdC5wdXNoKGNsb25lKTtcblx0XHRcdFx0Y2xvbmUuY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTsgXG5cdFx0XHRcdC8vIGNsb25lLnBoeXNpY3NJbXBvc3RvciA9IG5ldyBCQUJZTE9OLlBoeXNpY3NJbXBvc3RvcihjbG9uZSwgQkFCWUxPTi5QaHlzaWNzSW1wb3N0b3IuQm94SW1wb3N0b3IsIHsgbWFzczogMC4xIH0sIHRoaXMuU2NlbmUpO1xuXHRcdFx0XHR0aGlzLmJveGVzLnB1c2goY2xvbmUpO1xuICAgIH1cblx0fVxuXG5cdGxvYWRMaWdodCgpIHtcblx0XHR0aGlzLmxpZ2h0SGVtID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0SGVtXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwgMCksIHRoaXMuU2NlbmUpO1xuICAgIHRoaXMubGlnaHRIZW0uaW50ZW5zaXR5ID0gMC44O1xuXHRcdHRoaXMubGlnaHREaXIgPSBuZXcgQkFCWUxPTi5EaXJlY3Rpb25hbExpZ2h0KFwibGlnaHREaXJcIiwgbmV3IEJBQllMT04uVmVjdG9yMygyLCA0LCAyKSwgdGhpcy5TY2VuZSk7ICAgIFxuXHRcdHRoaXMubGlnaHREaXIuZGlmZnVzZSA9IG5ldyBCQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcdFxuXHRcdHRoaXMubGlnaHREaXIuc3BlY3VsYXIgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XG5cdFx0dGhpcy5saWdodERpci5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMjUwLCA0MDAsIDApO1xuICAgIHRoaXMubGlnaHREaXIuaW50ZW5zaXR5ID0gMS44O1xuXHRcdHRoaXMuc2hhZG93R2VuZXJhdG9yID0gbmV3IEJBQllMT04uU2hhZG93R2VuZXJhdG9yKDQxOTIsIHRoaXMubGlnaHREaXIpO1xuICAgIHRoaXMuc2hhZG93R2VuZXJhdG9yLnVzZVZhcmlhbmNlU2hhZG93TWFwID0gZmFsc2U7IFxuXHR9XG5cblx0VXBkYXRlKCkge1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdH1cblxuXHRiaW5kRXZlbnQoKSB7XG5cblx0fVxuXG5cdGxvYWRMb2NhbFBsYXllcigpe1xuXG5cdH1cblxuXHRsb2FkT3BvbmVudCgpIHtcblxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuU2NlbmUucmVuZGVyKCk7XG5cdFx0aWYodGhpcy5sb2FkKXtcblx0XHRcdHRoaXMuY29udHJvbGxlci5VcGRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRyZXNpemUoKSB7XG5cblx0fVxuXG5cdERlc3Ryb3koKSB7XG5cblx0fVxufSJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJ4IiwieSIsInoiLCJfbmFtZSIsIl94IiwiX3kiLCJfeiIsIl9yb3RYIiwiX3JvdFkiLCJfcm90WiIsIl9pZCIsIl9jb2xvciIsIl9oaXRQb2ludHMiLCJfaXNEZWFkIiwiX2hlaWdodCIsIl9kZWF0aHMiLCJfa2lsbHMiLCJpZCIsIm5hbWUiLCJyIiwiZyIsImIiLCJkIiwiaCIsIldlYXBvbiIsIlBsYXllck1vZCIsIkxvY2FsUGxheWVyIiwic2NlbmUiLCJwbGF5ZXIiLCJjYW1lcmFTcGVlZCIsImp1bXBIZWlnaHQiLCJwIiwiU2NlbmUiLCJjcmVhdGVQbGF5ZXIiLCJob2xkR3VuIiwicnVuIiwibWVzaCIsInNldEVuYWJsZWQiLCJqdW1wVXAiLCJpc0p1bXBpbmciLCJjYW1lcmEiLCJzcGVlZCIsImtleXNVcCIsImtleXNEb3duIiwia2V5c0xlZnQiLCJrZXlzUmlnaHQiLCJyZXNldENhbWVyYUNvb3JkaW5hdGVzIiwiaW5pdFBoeXNpY3MiLCJsYXN0UG9zaXRpb24iLCJCQUJZTE9OIiwiVmVjdG9yMyIsInBvc2l0aW9uIiwibGFzdFJvdGF0aW9uIiwicm90YXRpb24iLCJiaW5kRXZlbnQiLCJ3ZWFwb24iLCJ1cGRhdGVQb3NpdGlvbiIsImNoZWNrQ29udHJvbHMiLCJQYW5uZWwiLCJ1cGRhdGVIZWFsdGhCYXIiLCJnZXRIaXRQb2ludHMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvbktleVVwIiwib25LZXlEb3duIiwia2V5Q29kZSIsInBvaW50ZXJJZCIsImNoZWNrQ29sbGlzaW9ucyIsInVzZU9jdHJlZUZvckNvbGxpc2lvbnMiLCJhcHBseUdyYXZpdHkiLCJlbGxpcHNvaWQiLCJzdG9yZSIsIm9uS2V5dXAiLCJraWxsZXIiLCJzZXREZWFkIiwieE9mZnNldCIsIk1hdGgiLCJhYnMiLCJ5T2Zmc2V0Iiwiek9mZnNldCIsInhSb3RPZmZzZXQiLCJ5Um90T2Zmc2V0IiwielJvdE9mZnNldCIsInBvc09mZnNldCIsInJvdE9mZnNldCIsInN1Ym1pdE1vdmVtZW50IiwiY29udHJvbGxlciIsInNlbmRMb2NhbFBsYXllck1vdmVtZW50IiwiaXNEb3duIiwic3RhdGUiLCJKVU1QIiwianVtcCIsIkZJUkUiLCJpc0RlYWQiLCJmaXJlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJTY2VuZUxvYWRlciIsIkltcG9ydE1lc2giLCJndW4iLCJpc1Zpc2libGUiLCJtYXRlcmlhbCIsIlN0YW5kYXJkTWF0ZXJpYWwiLCJkaWZmdXNlVGV4dHVyZSIsIlRleHR1cmUiLCJoYXNBbHBoYSIsIlRyYW5zZm9ybU5vZGUiLCJmYWNlQ29sb3JzIiwiaGVhZCIsIk1lc2hCdWlsZGVyIiwiQ3JlYXRlQm94Iiwid2lkdGgiLCJoZWlnaHQiLCJwYXJlbnQiLCJpbmRpY2VzIiwiZ2V0SW5kaWNlcyIsInBvc2l0aW9ucyIsImdldFZlcnRpY2VzRGF0YSIsIlZlcnRleEJ1ZmZlciIsIlBvc2l0aW9uS2luZCIsImNvbG9ycyIsIkNvbG9yS2luZCIsIm5iVmVydGljZXMiLCJsZW5ndGgiLCJBcnJheSIsImZpbGwiLCJ2ZXJ0ZXgiLCJpIiwic2V0VmVydGljZXNEYXRhIiwibG9jYWxseVRyYW5zbGF0ZSIsImhhaXIiLCJzZXRQaXZvdE1hdHJpeCIsIk1hdHJpeCIsIlRyYW5zbGF0aW9uIiwiZGlmZnVzZUNvbG9yIiwiQ29sb3IzIiwiYm9keSIsImRlcHRoIiwiYnV0IiwibGVmdGFybSIsImxlZnRlbGJvdyIsImxlZnRsb3dlcmFybSIsImxlZnR3YWlzdCIsImxlZnRoYW5kIiwicmloZ3R1cHBlcmFybSIsInJpaGd0ZWxib3ciLCJyaWhndGxvd2VyYXJtIiwicmloZ3R3YWlzdCIsInJpaGd0aGFuZCIsImxlZnRsZWciLCJsZWZ0a25lZWwiLCJsZWZ0bG93ZXJsZWciLCJsZWZ0Zm9vdCIsInJpZ2h0bGVnIiwicmlnaHRrbmVlbCIsInJpZ2h0bG93ZXJsZWciLCJyaWdodGZvb3QiLCJzaXplIiwic2hhZGUiLCJwaWxvdF9sb2NhbF9heGlzWCIsIk1lc2giLCJDcmVhdGVMaW5lcyIsIlplcm8iLCJjb2xvciIsInBpbG90X2xvY2FsX2F4aXNZIiwicGlsb3RfbG9jYWxfYXhpc1oiLCJsb2NhbF9vcmlnaW4iLCJQSSIsIkFuaW1hdGlvbkdyb3VwIiwiZnJhbWVSYXRlIiwibGVmdGFuaW1lIiwiQW5pbWF0aW9uIiwiQU5JTUFUSU9OVFlQRV9GTE9BVCIsIkFOSU1BVElPTkxPT1BNT0RFX0NZQ0xFIiwia2V5RnJhbWVzIiwicHVzaCIsImZyYW1lIiwidmFsdWUiLCJzZXRLZXlzIiwicmlnaHRhbmltZSIsInJpZ2h0a2V5RnJhbWVzIiwiYWRkVGFyZ2V0ZWRBbmltYXRpb24iLCJub3JtYWxpemUiLCJwbGF5IiwiY2xvbmUiLCJyZW1vdGVQbGF5ZXIiLCJjb25zb2xlIiwibG9nIiwicG9zIiwicm90IiwiYXNiIiwibGFzdCIsImRpc3Bvc2UiLCJ3cCIsImNyZWF0ZUluc3RhbmNlIiwicm90YXRpb25RdWF0ZXJuaW9uIiwiX2luaXRpYWxSb3RhdGlvbiIsImFtbW9TaXplIiwiY3VycmVudEFtbW8iLCJmaXJlUmF0ZSIsIl9jdXJyZW50RmlyZVJhdGUiLCJjYW5GaXJlIiwicmVsb2FkaW5nIiwicmVnaXN0ZXJCZWZvcmVSZW5kZXIiLCJlbmdpbmUiLCJnZXREZWx0YVRpbWUiLCJhbmltYXRlUmVsb2FkIiwic2V0VGltZW91dCIsInNvdW5kIiwiZ3VuRmlyZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInBpY2tSZXN1bHQiLCJwaWNrIiwicGlja2VkTWVzaCIsInJlbW90ZVBsYXllcnMiLCJoaXRQbGF5ZXIiLCJzaG90RmlyZWQiLCJhbmltYXRlIiwic3RhcnQiLCJlbmQiLCJkaXNwbGF5IiwiQU5JTUFUSU9OVFlQRV9WRUNUT1IzIiwiQU5JTUFUSU9OTE9PUE1PREVfQ09OU1RBTlQiLCJrZXlzIiwiYW5pbWF0aW9ucyIsImJlZ2luQW5pbWF0aW9uIiwiaW1wYWN0IiwiQ3JlYXRlUGxhbmUiLCJDb250cm9sbGVyIiwiU291bmQiLCJpbml0RGF0YSIsIkJhYnlsb25TY2VuZSIsImNhbnZhcyIsImJveGVzIiwiaW5pdENhbWVyYSIsImxvYWRMaWdodCIsImxvYWRQaHlzaWNzIiwiaW5pdFNreSIsImxvYWRHcm91bmQiLCJsb2FkR3VuIiwidGhlbiIsImxvYWRTb2xpZGVyIiwiRnJlZUNhbWVyYSIsInNldFRhcmdldCIsImF0dGFjaENvbnRyb2wiLCJhY3RpdmVDYW1lcmFzIiwiRW5naW5lIiwiU2hhZGVyc1JlcG9zaXRvcnkiLCJza3lib3giLCJDcmVhdGVTcGhlcmUiLCJzZWdtZW50cyIsImRpYW1ldGVyIiwic2hhZGVyIiwiU2hhZGVyTWF0ZXJpYWwiLCJzZXRGbG9hdCIsInNldENvbG9yMyIsIkZyb21JbnRzIiwiYmFja0ZhY2VDdWxsaW5nIiwiZm9nTW9kZSIsIkZPR01PREVfRVhQMiIsImZvZ0RlbnNpdHkiLCJmb2dDb2xvciIsImdyb3VuZERpdnMiLCJ0aWxlU2l6ZSIsImJvdHRvbVBvaW50IiwidG9wUG9pbnQiLCJncm91bmQiLCJDcmVhdGVHcm91bmRGcm9tSGVpZ2h0TWFwIiwic3ViZGl2aXNpb25zIiwibWluSGVpZ2h0IiwibWF4SGVpZ2h0IiwidXBkYXRhYmxlIiwiZ3JvdW5kTWF0ZXJpYWwxIiwidVNjYWxlIiwidlNjYWxlIiwicmVjZWl2ZVNoYWRvd3MiLCJzaGFkb3dHZW5lcmF0b3IiLCJnZXRTaGFkb3dNYXAiLCJyZW5kZXJMaXN0IiwiSW1wb3J0TWVzaEFzeW5jIiwibWVzaGVzIiwicmVxdWVzdEFsbFBsYXllcnMiLCJncmF2aXR5IiwiY29sbGlzaW9uc0VuYWJsZWQiLCJib3giLCJib3hTaXplIiwidHlwZSIsImJveFBvc2l0aW9uIiwiYm94Um90YXRpb24iLCJsaWdodEhlbSIsIkhlbWlzcGhlcmljTGlnaHQiLCJpbnRlbnNpdHkiLCJsaWdodERpciIsIkRpcmVjdGlvbmFsTGlnaHQiLCJkaWZmdXNlIiwic3BlY3VsYXIiLCJTaGFkb3dHZW5lcmF0b3IiLCJ1c2VWYXJpYW5jZVNoYWRvd01hcCIsInJlbmRlciIsImxvYWQiLCJVcGRhdGUiXSwic291cmNlUm9vdCI6IiJ9