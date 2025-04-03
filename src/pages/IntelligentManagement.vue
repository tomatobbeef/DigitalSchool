<template>
  <div class="management">
    <div class="right-wrapper">
      <div class="right-content">
        <div class="manage-btns">
          <div class="title">矢量管理</div>
          <div class="content">
            <div class="btnlist">
              <div v-for="(btn,index) in btnlist" :key="index" class="btnMain">
                <div class="btn" @click="btn.clickhandler">
                  <el-icon :size="30" style="vertical-align: middle" class="icon">
                    <component :is="btn.iconname" />
                  </el-icon>
                </div>
                <div class="text">{{ btn.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <div v-if="showAddVector" class="popup-overlay">
      <div class="popup-content">
        <!-- 自定义内容 -->
        <h2>矢量添加</h2>
        <el-button @click="showAddVector = false" style="position:absolute;bottom:140px">关闭</el-button>
        <MapEditor class="maplayer"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import OpenLayersShapes from "../components/OpenLayersShapes.vue";
import MapEditor from "../components/MapEditor.vue";
export default {
  setup() {
    let showAddVector = ref(false)
    const addSite = () => {
      this.showAddVector.value = true;
    };
    const btnlist = ref([
      {
        name: '矢量添加',
        iconname: 'DocumentAdd',
        clickhandler:()=>{
          showAddVector.value = true;
        }
      },
      {
        name: '矢量删除',
        iconname: 'DocumentDelete',
        clickhandler:()=>{
          console.log(2)
        }
      },
      {
        name: '矢量编辑',
        iconname: 'Edit',
        clickhandler:()=>{
          console.log(2)
        }
      },
      {
        name: '矢量查询',
        iconname: 'Search',
        clickhandler:()=>{
          console.log(2)
        }
      }
    ])
    const btn_measure_list = ref([
      {
        name: '距离测量',
        iconname: 'DocumentAdd',
        clickhandler:()=>{
          showAddVector.value = true;
        }
      },
      {
        name: '矢量删除',
        iconname: 'DocumentDelete',
        clickhandler:()=>{
          console.log(2)
        }
      },
      {
        name: '矢量编辑',
        iconname: 'Edit',
        clickhandler:()=>{
          console.log(2)
        }
      },
      {
        name: '矢量查询',
        iconname: 'Search',
        clickhandler:()=>{
          console.log(2)
        }
      }
    ])
    const closeModel = () => {
      this.showModal.value = false; // 关闭模态框
    };


    return {
      addSite,
      showAddVector,
      closeModel,
      btnlist
    };
  },
  components: {
    OpenLayersShapes,
    MapEditor
  }
};
</script>

<style scoped>
.management {
  width: fit-content;
  height: fit-content;
  user-select: none;
}

.right-wrapper {
  position: absolute;
  right: 0;
  width: 25vw;
  height: 100%;
  background: linear-gradient(to left,
      rgba(0, 25, 33, 0.9) 0%,
      rgba(0, 27, 45, 0.54) 36.81%,
      rgba(0, 31, 64, 0) 100%);
}

.right-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 30px;
  padding-top: 90px;
  /* border: black 1px solid; */
}

.manage-btns {
  width: 240px;
  height: fit-content;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 0 10px 0;
}

.title {
  width: calc(100%-45px);
  height: 60px;
  /* border: black 1px solid; */
  background: url("../assets/img/mainpage/card-title.png") no-repeat left/contain;
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

.btnlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.btnMain {
    width: fit-content;
    height: fit-content;
    justify-content: center;
    padding: 10px 10px 10px 10px;
    text-align: center;
}

.btn {
    width: 60px;
    height: 60px;
    background: url("src/assets/img/overview/bottom-middle-bg.png") no-repeat center/contain;
    /* background-color: blue; */
    /* margin-top: 5px; */
}

.text {
    color: white;
    font-weight: 500;

}

.icon:hover {
    color: rgb(132, 185, 241);
    cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 半透明白色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  width: 900px;
  height: 550px;
  background: white;
  padding: 0 10px 20px 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.maplayer{
  margin-top: 80px;
  z-index: -1;
}
</style>