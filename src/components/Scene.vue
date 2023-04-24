<script setup>
import { ref, onMounted } from 'vue'

defineProps({})
import Scene from '../scene/scene.js';
import {
  Engine3D,
  ForwardRenderJob
} from '@orillusion/core';
const canvas = ref(null);
onMounted(async () => {
  // the DOM element will be assigned to the ref after initial render
  console.log(canvas.value)
  await Engine3D.init({
    canvasConfig:{
        canvas: document.getElementById("webGpuCanvas"),
        alpha: false,
        zIndex: 1
    }
  });
  const scene3D = new Scene();
  scene3D.Create();
  let renderJob = new ForwardRenderJob(scene3D.Scene);
  // 开始渲染
  Engine3D.startRender(renderJob);
})



</script>

<template>
  <div class="box">
    <div class="canvas-wrap">
      <canvas ref="canvas" id="webGpuCanvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
body {
    font-family: Monospace;
    background-color: #fff;
    color: #000;
    margin: 0px;
}
.box{
    position: relative;
    width: 100%;
    height: 100%;
    width: 100vw;
    height: 100vh;
}
.canvas-wrap{
    width: 100%;
    height: 100%;
}
.canvas-wrap canvas{
    width: 100%;
    height: 100%;
}
</style>
