<template>
  <div class="background">
    <DetailPage />
    <div class="header">
      <span class="title">数字博物馆系统</span>
    </div>
  </div>
</template>

<script setup>
import DetailPage from "./DetailPage.vue";


</script>

<style scoped>
.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to bottom left,
    #ecf5ff 0%,
    #a0cfff 50%,
    #79bbff 100%
  );
}
.header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
}
.icon {
  position: absolute;
  left: 3vw;
  top: 4vh;
}
.title {
  color: white;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 40px;
  display: flex;
  justify-content: center;
  top: 3.6vh;
}
</style>