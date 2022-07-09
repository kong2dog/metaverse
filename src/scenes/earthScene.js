import * as THREE from 'three';
import _ from 'lodash';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import WebGLScene from './webglScene';

export default class EarthScene extends WebGLScene {
    constructor() {
        super();
    }

    Create() {
        if (this.load) return;
        this.particleManagers = [];
        this.clock = new THREE.Clock();
        this.root = new THREE.Object3D();
        this.Scene.add(this.root);
        this.Scene.add(new THREE.AxesHelper(15500));

        this.Scene.background = new THREE.Color('#5c5f66'); // 背景色

        this.createLightAndShadow(); // 处理光影  单独拿出来

        this.initCamera(); // 初始化相机
        this.testModel();
    }

    createLightAndShadow() {
    /** ************************  灯光调试  *********************************** */
    // 平行光 配置
        const height = 150;
        const qulityH = 512;
        const qulityM = 1024;
        const qulityL = 512;
        const castShadowSet = [false, false, false, false, false];
        const power = 1;
        // 点光 配置
        const pointHeight = 200;
        const pointPower = 0.1;
        // 环境光
        this.amlight = new THREE.AmbientLight('#ffffff', 1);

        this.amlight.up.set(0, 1, 0);
        this.Scene.add(this.amlight);
        this.Scene.background = new THREE.Color(0xbfe3dd);
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.Scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
        this.light1 = new THREE.DirectionalLight(0xFFFFFF, power);
        this.light1.position.set(100, 100, 100);
        this.light1.castShadow = castShadowSet[0];
        this.light1.shadow.mapSize.width = qulityL;
        this.light1.shadow.mapSize.height = qulityL;
        this.light1.shadow.radius = 1;
        this.light1.target.position.set(0, 0, 0);
        this.Scene.add(this.light1);
    }

    initCamera() {
        this.camera.fov = 45;
        this.camera.position.set(50, 50, 50);
        this.camera.up.set(0, 1, 0);
        this.camera.far = 20000;
        this.controls.minDistance = 0;
        this.controls.maxDistance = 100000;
        this.controls.dampingFactor = 0.7;
        this.controls.panSpeed = 2;
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        };
        this.controls.target.set(0, 0, 0);
    }

    testModel() {
        const loader = new FBXLoader();
        loader.load(
            'http://fastcdn.apmyushu.com/yushuweb/daughter/head_kohaku.FBX',
            (obj) => {
                console.log(obj);
                this.root.add(obj);
                this.stopLoading();
                this.load = true;
            }
        );
        loader.load(
            'http://fastcdn.apmyushu.com/yushuweb/daughter/body_schoolgymsuit.FBX',
            (obj) => {
                console.log(obj);
                this.root.add(obj);
                this.stopLoading();
                this.load = true;
            }
        );
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('loader/gltf/');
        const gloader = new GLTFLoader();
        gloader.setDRACOLoader(dracoLoader);
        gloader.load('http://fastcdn.apmyushu.com/yushuweb/LittlestTokyo.glb', (gltf) => {
            const model = gltf.scene;
            model.position.set(1, 1, 0);
            model.scale.set(0.01, 0.01, 0.01);
            this.Scene.add(model);

            this.mixer = new THREE.AnimationMixer(model);
            this.mixer.clipAction(gltf.animations[0]).play();
        }, undefined, (e) => {
            console.error(e);
        });
    }

    Update() {
        super.Update();
        if (this.mixer) {
            const delta = this.clock.getDelta();
            this.mixer.update(delta);
        }
        this.controls.update();
    }

    Destroy() {
        this.Scene.children.map(c => {
            this.destroyChild(c);

            c.clear();
        });
        // 清除场景全部child
        this.Scene.clear();

        // 卸载场景
        this.renderer.renderLists.dispose();
        this.renderer.dispose();
    }
}
