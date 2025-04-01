<script setup lang="ts">
import { ref } from 'vue';

// 定义一个响应式变量
const message = ref<string>('Hello, Vue 3 + TypeScript!');

// 定义一个方法
function greet() {
  alert(message.value);
}
</script>

<template>
  <div class="app">
    <iframe src="http://localhost:5173/mainpage.html"
      width="100%"
      height="100%"
      frameborder="0"
      allowfullscreen></iframe>
  </div>
</template>

<style scoped>
.app{
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
</style>