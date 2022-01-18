import * as THREE from 'three';
import Stats from 'stats.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import Store from '../store/Store';

export default class Application {
    constructor({
        dom, scene
    }) {
        this.dom = dom;
        this.store = new Store();
        this.scene = scene;
        this.scene.dom = this.dom;
        this.loaded = false;
        this.destroyed = false;
        this.storeDeltaTime = 1000;
        this.animationFrame = null;
        this.lastStoreTime = 0;
        if (this.dom) {
            this.dom.style.position = 'relative';
        }
    }

    update() {
        if (this.stats) {
            this.stats.begin();
        }
        this.scene.Update();
        if (this.stats) {
            this.stats.end();
        }
        if (Date.now() - this.lastStoreTime > this.storeDeltaTime) {
            this.lastStoreTime = Date.now();
            this.store.setState('updatedAt', this.lastStoreTime);
            this.store.persist();
        }
        // this.animationFrame = requestAnimationFrame((timeRange) => {
        //     this.update();
        // });
        // if (this.destroyed) {
        //     window.cancelAnimationFrame(this.animationFrame);
        // }
    }

    start() {
        this.store.load();
        this.canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        this.canvas.style.display = 'block';
        // console.log(this.dom.clientWidth);
        const width = this.dom.clientWidth || window.innerWidth;
        const height = this.dom.clientHeight || window.innerHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, logarithmicDepthBuffer: true });

        this.renderer.localClippingEnabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);

        this.dom.appendChild(this.canvas);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.gammaOutput = true;
        // this.renderer.gammaFactor = 2.2;
        // this.renderer.gammaInput = true;
        // this.renderer.gammaInput = true;
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(width, height);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.setAttribute('class', 'apm3d-labelcontainer');
        this.labelRenderer.domElement.style.top = 0;
        this.dom.appendChild(this.labelRenderer.domElement);

        this.stats = new Stats();
        this.dom.appendChild(this.stats.domElement);
        this.scene.store = this.store;
        this.scene.Init(this.renderer, this.labelRenderer);
        this.loaded = true;
        // this.update();

        this.renderer.setAnimationLoop(() => { this.update(); });
    }

    resize(width, height) {
        if (!this.loaded) {
            return;
        }
        const nwidth = width || this.dom.offsetWidth;
        const nheight = height || this.dom.clientHeight;
        this.canvas.width = nwidth;
        this.canvas.height = nheight;
        this.renderer.setSize(nwidth, nheight);
        this.labelRenderer.setSize(nwidth, nheight);
        this.scene.resize();
    }

    // 移除dom
    destroy() {
        this.destroyed = true;
        this.scene.Destroy();

        this.renderer.renderLists.dispose();
        this.renderer.dispose();
        if (this.renderer.domElement && this.renderer.domElement.parentElement) {
            this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
        }
        if (this.labelRenderer.domElement && this.labelRenderer.domElement.parentElement) {
            this.labelRenderer.domElement.parentElement.removeChild(this.labelRenderer.domElement);
        }
        this.renderer = null;
        this.labelRenderer = null;
    }
}
