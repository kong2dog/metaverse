import {
  Scene3D,
  Object3D,
  Camera3D,
  LitMaterial,
  BoxGeometry,
  MeshRenderer,
  Color,
  DirectLight,
  HoverCameraController
} from '@orillusion/core';
export default class WebGLScene {
  constructor() {
      this.models = [];
      this.store = null;
      this.currentZoom = 1;
      this.Scene = new Scene3D();
  }
  
  Create() {
    let cameraObj = new Object3D();
    let camera = cameraObj.addComponent(Camera3D);
    // 根据窗口大小设置摄像机视角
    camera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0);
    // 设置相机控制器
    let controller = camera.object3D.addComponent(HoverCameraController);
    controller.setCamera(0, 0, 15);
    // 添加相机节点
    this.Scene.addChild(cameraObj);
    let light = new Object3D();
    // 添加直接光组件
    let component = light.addComponent(DirectLight);
    // 调整光照参数
    light.rotationX = 45;
    light.rotationY = 30;
    component.lightColor = new Color(1.0, 0.6, 0.6, 1);
    component.intensity = 2;
    // 添加光照对象
    this.Scene.addChild(light);
    // 新建对象
    const obj= new Object3D();
    // 为对象添 MeshRenderer
    let mr = obj.addComponent(MeshRenderer);
    // 设置几何体
    mr.geometry = new BoxGeometry(5, 5, 5);
    // 设置材质
    mr.material = new LitMaterial();
    this.Scene.addChild(obj);
  }

  Destroy() {}

  resize() {
  }
}