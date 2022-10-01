export default class Weapon {
  constructor(scene, player, mesh) {
    this.scene = scene;
    this.player = player;
    this.mesh = mesh;
    //const wp = this.scene.gun.createInstance(player._id);
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
    this.scene.Scene.registerBeforeRender(() => {
      if(!this.canFire){
        this._currentFireRate -= this.scene.engine.getDeltaTime();
        if(this._currentFireRate <= 0 && !this.reloading){
          this.canFire = true;
          this._currentFireRate = this.fireRate
        }
      }
    })
  }
  
  reload() {
    if(!this.reloading){
      this.canFire = false;
      this.reloading = true;
      this.animateReload();
      setTimeout(() => {
        this.currentAmmo = this.ammoSize;
        this.canFire = true;
        this.reloading = false;
      }, 800)
    }
  }

  fire() {
    if(this.canFire){
      if(this.currentAmmo != 0){
        this.scene.sound.gunFire();
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(width)
        console.log(height)
        const pickResult = this.scene.Scene.pick(width/2, height/2, null, false, this.scene.camera);
        if(pickResult.pickedMesh){
          console.log(pickResult.pickedMesh.name)
          for(let i = 0; i < this.scene.store.state.remotePlayers.length; i++) {
            console.log(this.scene.store.state.remotePlayers[i].player)
            if(pickResult.pickedMesh.name === this.scene.store.state.remotePlayers[i].player._id){
              this.scene.controller.hitPlayer(this.scene.store.state.remotePlayers[i].player)
            }
          }
          if(pickResult.pickedMesh.name != 'skyBox'){
            // this.drawImpact(pickResult.pickedPoint);
          }
        }
        this.scene.controller.shotFired();
        // this.currentAmmo -= 1;
        
      }else{
        // 空枪
      }
      this.animate();
      this.canFire = false;
    }
  }

  animate() {
    const start = this._initialRotation.clone();
    const end = start.clone();
    end.x += Math.PI/100;

    // Create the Animation object
    const display = new BABYLON.Animation(
        "fire",
        "rotation",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Animations keys
    const keys = [{ 
        frame: 0,
        value: start
    },{
        frame: 10,
        value: end
    },{
        frame: 100,
        value: start
    }];

    // Add these keys to the animation
    display.setKeys(keys);

    // Link the animation to the mesh
    this.mesh.animations.push(display);

    this.scene.Scene.beginAnimation(this.mesh, 0, 100, false, 10, function() {

    });
  }

  drawImpact(position) {
    const impact = BABYLON.MeshBuilder.CreatePlane('impact', {size: 1}, this.scene.Scene);
    impact.rotation.x = Math.PI / 2;
    impact.material = new BABYLON.StandardMaterial('impactMat', this.scene.Scene);
    impact.material.diffuseTexture = new BABYLON.Texture("/impact.png", this.scene.Scene);
    impact.material.diffuseTexture.hasAlpha = true; 
    impact.position = position;
  }

  animateReload() {
    // 播放动画
  }
}