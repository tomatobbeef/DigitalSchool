<template>
  <div class="overview">
    <div class="right-wrapper">
      <div class="right-content">
        <div class="museum-overview">
          <div class="title">场馆简介</div>
          <div class="content">
            <div
              style="text-indent: 2em;"
            >数字图书馆拥有多个主题阅览区，涵盖经典文学、现代科技、历史文化等多个领域。每个阅览区都运用先进的数字技术，提供沉浸式的阅读体验，让您仿佛置身于知识的海洋中。通过虚拟现实(VR)和增强现实(AR)技术，您可以与展品进行互动，深入了解其背后的故事和文化意义。</div>
            <!-- 中国地质大学逸夫博物馆是国家二级博物馆，是首家被认定为国家AAAA级旅游景区的高校博物馆，是全国中小学生研学实践教育基地、全国科普教育基地、全国青少年科技教育基地、全国古生物教育基地、全国中小学环境教育社会实践基地、全国国土资源科普基地、2017武汉十大博物馆、武汉市爱国主义教育基地。 -->
            <div class="introduce-gruop">
              <div class="first-line">
                <div style="display: flex;width:fit-content;height:fit-content;">
                  <div class="introduce-bg1">
                    <div class="introduce-icon-area"></div>
                  </div>
                  <div class="introduce-text">
                    <div>用地面积</div>
                    <div>72654㎡</div>
                  </div>
                </div>
                <div style="display: flex;width:fit-content;height:fit-content;">
                  <div class="introduce-bg1">
                    <div class="introduce-icon-capacity"></div>
                  </div>
                  <div class="introduce-text">
                    <div>最大容纳人数</div>
                    <div>2000人</div>
                  </div>
                </div>
              </div>
              <div class="second-line">
                <div style="display: flex;width:fit-content;height:fit-content;">
                  <div class="introduce-bg1">
                    <div class="introduce-icon-exhibit"></div>
                  </div>
                  <div class="introduce-text">
                    <div>展品总数</div>
                    <div>5130件</div>
                  </div>
                </div>
                <div style="display: flex;width:fit-content;height:fit-content;">
                  <div class="introduce-bg1">
                    <div class="introduce-icon-showroom"></div>
                  </div>
                  <div class="introduce-text">
                    <div>展厅数量</div>
                    <div>24间</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="minimap">
          <div class="title">地图导览</div>
          <div class="content">
            <ImageContainer :image-src="activeFlorUrl" class="map"></ImageContainer>
            <div class="floorBtnList">
              <div
                v-for="(map,index) in maps"
                :key="index"
                class="floorbtn"
                :class="{ active: activeFloor === map.name }"
                @click="setActiveFloor(index)"
              >{{ map.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onMounted } from "vue";
import ImageContainer from '../components/ImageContainer.vue';
export default {
  name: "museumOverview",
  setup() {
    const maps = ref([
      {
        name: "F1",
        url: "src/assets/img/overview/map1.png"
      },
      {
        name: "F2",
        url: "src/assets/Two.png"
      },
      {
        name: "F3",
        url: "src/assets/Tre.png"
      },
      {
        name: "F4",
        url: "src/assets/For.png"
      }
    ]);
    const activeFloor = ref("F1");
    const activeFlorUrl = ref("");
    const setActiveFloor = index => {
      activeFloor.value = maps.value[index].name;
      activeFlorUrl.value = maps.value[index].url;
    };
    onMounted(() => {
      activeFlorUrl.value = maps.value[0].url;
    });


    return {
      maps,
      activeFloor,
      setActiveFloor,
      activeFlorUrl
    };
    
  },
  components: {
    ImageContainer
  }
};
</script>

<style scoped>
@import url("src/assets/fonts/index.css");
.overview {
  width: fit-content;
  height: fit-content;
  user-select: none;
}

.right-wrapper {
  position: absolute;
  right: 0;
  width: 25vw;
  height: 100%;
  background: linear-gradient(
    to left,
    rgba(0, 25, 33, 0.9) 0%,
    rgba(0, 27, 45, 0.54) 36.81%,
    rgba(0, 31, 64, 0) 100%
  );
}

.right-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 30px;
  padding-top: 90px;
  /* border: black 1px solid; */
}

.museum-overview {
  width: 360px;
  height: fit-content;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 0 10px 0;
}

.title {
  width: calc(100%-45px);
  height: 60px;
  /* border: black 1px solid; */
  background: url("../assets/img/mainpage/card-title.png") no-repeat
    left/contain;
  text-shadow: 0px 6px 8px rgba(0, 0, 0, 0.4);
  font-size: 26px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 38px;
  color: rgb(176, 231, 255);
  text-align: left;
  vertical-align: top;
  font-family: "YouSheBiaoTiHei";
  padding-left: 45px;
}

.content {
  margin-top: -5px;
  padding: 0 20px 0 20px;
  text-align: left;
  color: white;
  font-size: 16px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.minimap {
  width: 360px;
  height: fit-content;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 0 10px 0;
  margin-top: 15px;
}

.introduce-bg1 {
  background: url("src/assets/img/overview/intro-bg.png") no-repeat
    center/contain;
  /* background-color: blue; */
  width: 65px;
  height: 52px;
  margin-top: 5px;
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center;
}

.introduce-bg2 {
  background: url("src/assets/img/mainpage/bottom-middle-bg.png") no-repeat
    center/contain;
  /* background-color: blue; */
  width: 65px;
  height: 52px;
  margin-top: 5px;
}
.introduce-icon-area {
  background: url("src/assets/img/overview/area.png") no-repeat center/contain;
  width: 24px;
  height: 24px;
}
.introduce-icon-capacity {
  background: url("src/assets/img/overview/capacity.png") no-repeat
    center/contain;
  width: 24px;
  height: 24px;
}
.introduce-icon-exhibit {
  background: url("src/assets/img/overview/exhibit.png") no-repeat
    center/contain;
  width: 26px;
  height: 26px;
}
.introduce-icon-showroom {
  background: url("src/assets/img/overview/showroom.png") no-repeat
    center/contain;
  width: 40px;
  height: 40px;
}

.introduce-gruop {
  margin-top: 2px;
  display: flex;
  gap: 5px;
}

.first-line {
  width: fit-content;
  height: fit-content;
}
.second-line {
  width: fit-content;
  height: fit-content;
}
.introduce-text {
  margin-left: 12px;
  text-indent: 0em;
  text-align: left;
  width: 95px;
  height: 60px;
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 垂直居中 */
  font-weight: 600;
  color: #ccf7ff;
  font-size: 13px;
  gap: 10px;
}
.floorBtnList {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.floorbtn {
  width: 88px;
  height: 30px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
.floorbtn.active {
  background: linear-gradient(
    to top,
    rgba(0, 191, 255, 1) 0%,
    rgba(0, 191, 255, 0) 100%
  );
  color: rgba(255, 255, 255, 1);
  font-weight: 800;
}
.map {
  width: 320px;
  height: 175px;
}
</style>