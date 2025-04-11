<template>
  <div class="MainBox">
    
    
    <detailPage v-show="isIndoor" style="position:absolute"></detailPage>
    <router-view v-show="isIndoor"></router-view>
    <div class="app">
      <iframe v-show="!isIndoor" style="position:absolute" src="http://localhost:5173/mainpage.html" width="100%" height="100%" frameborder="0"
        allowfullscreen></iframe>
    </div>
    <div class="HeaderWrapper">
      <div class="HeaderBox">
        <div class="Headertitlebox">
          <p class="Headertitle">校园全景孪生GIS管理系统</p>
        </div>
        <!-- <div class="moduleList">
          <div v-for="module in modules" :key="module.key" class="modulechoice"
            :class="{ active: activeModule === module.key }" @click="setActive(module.key)">{{ module.name }}</div>
        </div> -->
        <div class="time-info">
          <div class="currentTime">{{ currentDate }}</div>
          <div class="currentTime">{{ currentTime }}</div>
        </div>
      </div>
    </div>
    <el-button v-show="isIndoor" class="transparent-button" style="position:absolute;bottom:20px;left:20px" @click="toOutdoor">返回</el-button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import detailPage from "../components/DetailPage.vue";
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";
export default {
  name: "MainPage",
  setup() {
    const currentTime = ref("");
    const currentDate = ref("");
    const isIndoor = ref(false)
    // 更新当前时间的函数
    const updateTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleTimeString(); // 格式化时间
    };
    const updateDate = () => {
      const now = new Date();
      currentDate.value = now.toLocaleDateString(); // 格式化日期
      console.log(currentDate.value);
    };
    // 在组件挂载时启动定时器
    onMounted(() => {
      updateTime(); // 初始化时间
      const intervalId = setInterval(updateTime, 1000); // 每秒更新
      updateDate();
      toOverview();
      window.toIndoor = () => {
        console.log('toIndoor function called');
        isIndoor.value = true
      };
    });
    // 清理定时器
    onUnmounted(() => {
      clearInterval(intervalId);
      window.toIndoor = null;
    });

    

    //路由
    const router = useRouter();
    function toOverview() {
      router.push({ name: "museumOverview" });
    }
    function toPath(path) {
      router.push({ name: path });
    }
    //模块按钮
    const modules = ref([
      {
        key: "museumOverview",
        name: "展馆概览"
      },
      {
        key: "IntelligentManagement",
        name: "智慧管理"
      }
    ]);
    const activeModule = ref("museumOverview");
    // 设置激活的索引
    const setActive = module => {
      activeModule.value = module; // 更新 activeIndex
      toPath(module);
    };



    const toIndoor = () => {
      isIndoor.value = true

    };
    const toOutdoor = () => {
      isIndoor.value = false
    };
    return {
      currentTime,
      currentDate,
      modules,
      activeModule,
      setActive,
      isIndoor,
      toIndoor,
      toOutdoor
    };
  },
  components: { detailPage }
};
</script>

<style scoped>
@import url("src/assets/fonts/index.css");

.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}


.HeaderBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  background: url(../assets/img/mainpage/bg3.png) no-repeat top/cover;
}

.Headertitlebox {
  font-family: "YouSheBiaoTiHei";
  width: fit-content;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  /* 垂直排列子元素 */
  justify-content: center;
  /* 垂直居中 */
  left: 20px;
}

.Headertitle {
  color: white;
  font-size: 35px;
  font-weight: 500;
  user-select: none;
  background: linear-gradient(to bottom, white, rgb(201, 220, 244), rgb(2, 55, 111));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.MainBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.HeaderWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;

  background: linear-gradient(to top,
      rgba(0, 26, 31, 0) 0%,
      rgba(0, 25, 32, 0.59) 23.05%,
      rgba(0, 25, 33, 0.9) 100%);
}

.time-info {
  position: absolute;
  display: flex;
  width: fit-content;
  height: 100%;
  text-align: center;
  right: 40px;
  top: 19px;
}

.currentTime {
  font-size: 18px;
  color: white;
  padding-left: 10px;
  user-select: none;
}

.moduleList {
  position: absolute;
  left: 550px;
  height: 65px;
  display: flex;
  bottom: 88px;
  /* align-items: center; */
}

.modulechoice {
  margin-left: -20px;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.6);
  padding-top: 100px;
  padding-bottom: 100px;
  padding-left: 40px;
  padding-right: 40px;
  cursor: pointer;
  height: 100%;
  user-select: none;
}

.modulechoice.active {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  background-image: url(../assets/img/mainpage/nav-bg.png);
  background-size: contain;
  /* 关键修改 */
  background-repeat: no-repeat;
  background-position: center;
  /* 背景图片居中 */
}

/* 自定义透明按钮样式 */
.transparent-button {
  background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
  border: 1px solid rgba(0, 0, 0, 0.2); /* 半透明边框 */
  color: #000; /* 文字颜色 */
}

/* 鼠标悬停时的样式 */
.transparent-button:hover {
  background-color: rgba(255, 255, 255, 0.8); /* 更深的透明背景 */
  border: 1px solid rgba(0, 0, 0, 0.3); /* 更深的透明边框 */
}

/* 按钮激活时的样式 */
.transparent-button:active {
  background-color: rgba(255, 255, 255, 1); /* 完全不透明背景 */
  border: 1px solid rgba(0, 0, 0, 0.4); /* 更深的透明边框 */
}
</style>
