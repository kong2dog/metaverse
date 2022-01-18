import * as THREE from 'three';
import _ from 'lodash';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import WebGLScene from './webglScene';

export default class EarthScene extends WebGLScene {
    constructor() {
        super();
    }

    Create() {
        if (this.load) return;
        this.particleManagers = [];
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
        const power = 0.4;
        // 点光 配置
        const pointHeight = 200;
        const pointPower = 0.1;
        // 环境光
        this.amlight = new THREE.AmbientLight('#b5b5b5', 1);

        this.amlight.up.set(0, 1, 0);
        this.Scene.add(this.amlight);
        this.light1 = new THREE.DirectionalLight(0xFFFFFF, power);
        this.light1.position.set(100, -350, 100);
        this.light1.castShadow = castShadowSet[0];
        this.light1.shadow.mapSize.width = qulityL;
        this.light1.shadow.mapSize.height = qulityL;
        this.light1.shadow.radius = 1;
        this.light1.target.position.set(0, 0, 0);
        this.Scene.add(this.light1);
    }

    initCamera() {
        this.camera.fov = 45;
        this.camera.position.set(0.3, 0.3, 0.3);
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
            'https://aim-resouce-1307155645.cos.ap-chengdu.myqcloud.com/yushuweb/%E5%9C%B0%E7%90%83.FBX',
            (obj) => {
                console.log(obj);
                this.root.add(obj);
                this.stopLoading();
                this.load = true;
            }
        );
    }

    Update() {
        super.Update();
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
