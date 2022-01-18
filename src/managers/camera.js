import * as THREE from 'three';
import Tween from '@tweenjs/tween.js';
import Manager from './manager';

export default class CameraManager extends Manager {
    Update() {
        Tween.update();
    }

    Destroy() {

    }

    Create() {
        this.camera = null;
        this.controls = null;
        this.isMoving = false;
        this.spherical = null;
    }

    setCamera(box3, vector = new THREE.Vector3(0, 1, 0), isMoving, scale = 1.2) {
        if (this.isMoving) {
            return;
        }

        const height = Math.abs(box3.max.y - box3.min.y) / 2;
        const width = Math.abs(box3.max.x - box3.min.x) / 2;
        let radius, distance;
        if ((width / height) > this.camera.aspect) {
            radius = width / this.camera.aspect;
        } else {
            radius = height;
        }
        if (!vector.equals(new THREE.Vector3(0, 1, 0))) {
            radius = new THREE.Vector3().subVectors(box3.max, box3.min).length() / 2;
        }

        const target = new THREE.Vector3().addVectors(box3.min, box3.max).multiplyScalar(0.5);

        if (this.camera.isPerspectiveCamera) {
            distance = Math.abs(radius / Math.sin((this.camera.getEffectiveFOV() * Math.PI) / 360));
        } else {
            distance = radius;
        }

        const newPosition = new THREE.Vector3().copy(target).add(vector.multiplyScalar(distance * scale));
        if (isMoving) {
            this.move(newPosition, target);
        } else {
            this.controls.target.copy(target);
            // this.camera.lookAt(target);
            this.camera.position.set(newPosition.x, newPosition.y, newPosition.z);
        }
    }

    setCameraV2(box3, vector = new THREE.Vector3(0, 1, 0), isMoving, scale = 1.2, up) {
        if (this.isMoving) {
            return;
        }

        const height = Math.abs(box3.max.y - box3.min.y) / 2;
        const width = Math.abs(box3.max.x - box3.min.x) / 2;
        let radius, distance;
        if ((width / height) > this.camera.aspect) {
            radius = width / this.camera.aspect;
        } else {
            radius = height;
        }
        if (up) {
            radius = new THREE.Vector3().subVectors(box3.max, box3.min).length() / 2;
        }

        const target = new THREE.Vector3().addVectors(box3.min, box3.max).multiplyScalar(0.5);

        if (this.camera.isPerspectiveCamera) {
            distance = Math.abs(radius / Math.sin((this.camera.getEffectiveFOV() * Math.PI) / 360));
        } else {
            distance = radius;
        }

        const newPosition = new THREE.Vector3().copy(target).add(vector.multiplyScalar(distance * scale));
        if (isMoving) {
            this.move(newPosition, target);
        } else {
            this.controls.target.copy(target);
            // this.camera.lookAt(target);
            this.camera.position.set(newPosition.x, newPosition.y, newPosition.z);
        }
    }

    zoom(zoomLevel) {
        const offset = new THREE.Vector3();
        offset.copy(this.camera.position).sub(this.controls.target);
        offset.multiplyScalar(zoomLevel);
        // this.spherical = new THREE.Spherical();
        // this.spherical.setFromVector3(offset);
        // this.spherical.radius *= zoomLevel;
        // offset.setFromSpherical(this.spherical);
        if (this.camera.isPerspectiveCamera) {
            // this.camera.position.copy(this.controls.target).add(offset);
            this.move(new THREE.Vector3().copy(this.controls.target).add(offset), this.controls.target);
            this.controls.update();
        } else {
            this.camera.zoom = this.camera.zoom / (+zoomLevel);
            this.camera.updateProjectionMatrix();
        }
    }

    panCamera(target) {
        const vector = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);
        const newPosition = new THREE.Vector3().addVectors(target, vector);
        if (this.isMoving) {
            return;
        }
        this.isMoving = true;
        const allEndList = [],
            isEnd = (end) => {
                allEndList.push(end);
                if (allEndList.length === 2) { // 表示所有动画结束
                    this.isMoving = false;
                }
            };
        // 计算相机的位置

        const time1 = 1000;
        const prePosition = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        const tween1 = new Tween.Tween(prePosition).to({
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z
        }, time1).easing(Tween.Easing.Cubic.InOut).onUpdate(() => {
            this.camera.position.x = prePosition.x;
            this.camera.position.y = prePosition.y;
            this.camera.position.z = prePosition.z;
            this.controls.update();
        })
            .onComplete(() => {
                isEnd(1);
            });

        const time2 = 1000,
            preTarget = {
                x: this.controls.target.x,
                y: this.controls.target.y,
                z: this.controls.target.z
            };
        const tween2 = new Tween.Tween(preTarget).to({
            x: target.x,
            y: target.y,
            z: target.z
        }, time2).easing(Tween.Easing.Cubic.InOut).onUpdate(() => {
            this.controls.target.x = preTarget.x;
            this.controls.target.y = preTarget.y;
            this.controls.target.z = preTarget.z;
            this.controls.update();
        })
            .onComplete(() => {
                isEnd(2);
            });
        tween1.start();
        tween2.start();
    }

    moveCamera(min, max, target, vector = new THREE.Vector3(1, 1, 1), scale = 1.5) {
        if (this.isMoving) {
            return;
        }
        this.isMoving = true;
        const allEndList = [],
            isEnd = (end) => {
                allEndList.push(end);
                if (allEndList.length === 2) { // 表示所有动画结束
                    this.isMoving = false;
                }
            };
        // 计算相机的位置
        const newPosition = this.getOutlinePoint(min, max, target, vector, scale);
        const time1 = 1000;
        const prePosition = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        const tween1 = new Tween.Tween(prePosition).to({
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z
        }, time1).easing(Tween.Easing.Cubic.InOut).onUpdate(() => {
            this.camera.position.x = prePosition.x;
            this.camera.position.y = prePosition.y;
            this.camera.position.z = prePosition.z;
            this.controls.update();
        })
            .onComplete(() => {
                isEnd(1);
            });

        const time2 = 1000,
            preTarget = {
                x: this.controls.target.x,
                y: this.controls.target.y,
                z: this.controls.target.z
            };
        const tween2 = new Tween.Tween(preTarget).to({
            x: target.x,
            y: target.y,
            z: target.z
        }, time2).easing(Tween.Easing.Cubic.InOut).onUpdate(() => {
            this.controls.target.x = preTarget.x;
            this.controls.target.y = preTarget.y;
            this.controls.target.z = preTarget.z;
            this.controls.update();
        })
            .onComplete(() => {
                isEnd(2);
            });
        tween1.start();
        tween2.start();
    }

    /**
        *相机移动
        * @param {*} position 相机所在位置
        * @param {*} target 目标模型的位置
        * @param {*} easing 动画类型，参考node_modules/@tweenjs/tween.js/dist/tween.cjs.js里面类型，如Tween.Easing.Quadratic.Out
        * @returns
    */
    move(position, target, easing) {
        const tweenEasing = easing || Tween.Easing.Cubic.InOut;
        if (this.isMoving) {
            return;
        }
        this.isMoving = true;
        const allEndList = [],
            isEnd = (end) => {
                allEndList.push(end);
                if (allEndList.length === 2) { // 表示所有动画结束
                    this.isMoving = false;
                }
            };

        const time1 = 1000,
            prePosition = {
                x: this.camera.position.x,
                y: this.camera.position.y,
                z: this.camera.position.z
            };
        const tween1 = new Tween.Tween(prePosition).to({
            x: position.x,
            y: position.y,
            z: position.z
        }, time1).easing(tweenEasing).onUpdate(() => {
            this.camera.position.x = prePosition.x;
            this.camera.position.y = prePosition.y;
            this.camera.position.z = prePosition.z;
            this.controls.update();
        })
            .onComplete(() => {
                isEnd(1);
            });
        const time2 = 1000,
            preTarget = {
                x: this.controls.target.x,
                y: this.controls.target.y,
                z: this.controls.target.z
            };

        const tween2 = new Tween.Tween(preTarget).to({
            x: target.x,
            y: target.y,
            z: target.z
        }, time2).easing(tweenEasing).onUpdate(() => {
            this.controls.target.x = preTarget.x;
            this.controls.target.y = preTarget.y;
            this.controls.target.z = preTarget.z;
            this.controls.update();
        })
            .onComplete(() => {
                isEnd(2);
            });

        tween1.start();
        tween2.start();
    }

    // 自动旋转开启
    autoRotateOpen() {
        this.controls.autoRotate = true;
    }

    // 自动旋转关闭
    autoRotateClose() {
        this.controls.autoRotate = false;
    }

    getOutlinePoint(min, max, target, vec, scale) {
        const length = new THREE.Vector3().subVectors(max, min).length();

        const vector = new THREE.Vector3().copy(vec).normalize();
        vector.multiplyScalar(length * scale);
        return new THREE.Vector3().copy(target).add(vector);
    }
}
