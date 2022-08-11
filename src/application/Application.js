import Stats from 'stats.js';
import Store from '../store/Store.js';
import * as BABYLON from '@babylonjs/core';
import BabylonScene from '../scenes/babylonScene.js';
export default class Application {
    constructor({
        dom
    }) {
        this.dom = dom;
        this.store = new Store();
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
    }

    start() {
        this.store.load();
        this.canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        this.canvas.style.display = 'block';
        // console.log(this.dom.clientWidth);
        const width = this.dom.clientWidth || window.innerWidth;
        const height = this.dom.clientHeight || window.innerHeight;
        console.log(width)
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.dom.appendChild(this.canvas);
        this.engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true}, true);
        const width2 = this.engine.getRenderWidth();
        console.log(width2)
        this.stats = new Stats();
        // this.dom.appendChild(this.stats.domElement);
        this.scene = new BabylonScene(this.engine, this.canvas, this.store);
        this.scene.Create();
        this.loaded = true;
        // this.update();

        this.engine.runRenderLoop(() => { this.update(); });
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    resize() {
        if (!this.loaded) {
            return;
        }
        this.engine.resize();
    }

    // 移除dom
    destroy() {
        this.destroyed = true;
        this.scene.Destroy();
    }
}
