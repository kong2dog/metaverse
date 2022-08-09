import * as BABYLON from '@babylonjs/core';

export default class Sound {
  constructor(scene) {
    this.gunShot = new BABYLON.Sound('gunshot', '/weapon_2.mp3', scene, null, { volume: 0.1 })
    this.gunShot3D = new BABYLON.Sound('gunshot3d', '/weapon_2.mp3', scene, null, {
      volume: 0.1 ,spatialSound: true, maxDistance : 300
    })
  }

  gunFire() {
    this.gunShot.play()
  }

  gunFire3D(vec3) {
    this.gunShot3D.setPosition(vec3);
    this.gunShot3D.play();
  }
}