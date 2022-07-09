// 所有场景的基类


export default class WebGLScene {
    constructor() {
        this.models = [];
        this.store = null;
        this.currentZoom = 1;
        this.Scene = new THREE.Scene();
    }

    /**
     *
     * @param {*} renderer // 3d渲染
     * @param {*} labelRenderer // 标签渲染
     */
    Init(renderer) {
        this.renderer = renderer;
        this.Scene.background = new THREE.Color('#ffffff');
        this.startLoading();
        const size = new THREE.Vector2();
        renderer.getSize(size);
        this.canvasWidth = size.width;
        this.canvasHeight = size.height;
        this.camera = new THREE.PerspectiveCamera(45, this.canvasWidth / this.canvasHeight, 0.01, 20000);
        // 控制器
        this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
        // 相机控制
        this.cameraManager = new CameraManager();
        this.cameraManager.camera = this.camera;
        this.cameraManager.controls = this.controls;
        this.Create();
    }
    
    Create() {
    }

    Update() {
        if (this.composer) {
            this.composer.render(this.Scene, this.camera);
        } else if (this.renderer) {
            this.renderer.render(this.Scene, this.camera);
        }

        if (this.labelRenderer) {
            this.labelRenderer.render(this.Scene, this.camera);
        }
    }

    destroyChild(obj) {
        if (typeof obj.dispose === 'function') {
            obj.dispose();
        }
        if (obj.geometry) {
            obj.geometry.dispose();
        }
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.map(m => {
                    m.dispose();
                });
            } else {
                obj.material.dispose();
            }
        }
        if (obj.children && obj.children.length) {
            obj.children.map(c => {
                this.destroyChild(c);
            });
        }
    }

    Destroy() {}

    resize() {
        const size = new THREE.Vector2();
        this.renderer.getSize(size);
        this.canvasWidth = size.width;
        this.canvasHeight = size.height;
        this.camera.aspect = this.canvasWidth / this.canvasHeight;

        this.camera.updateProjectionMatrix();
    }

    zoomCamera(flag) {
        if (flag === 'add') {
            this.currentZoom *= 0.95;
        } else if (flag === 'reduce') {
            this.currentZoom /= 0.95;
        }
        this.cameraManager.zoom(this.currentZoom);
    }
}
