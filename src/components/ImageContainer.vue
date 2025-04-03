<template>
  <div class="container" @wheel="handleWheel" @mousedown="startPan" @mouseup="endPan" @mousemove="handlePan" @mouseleave="endPan">
    <div class="content" :style="contentStyle">
      <el-image
        :src="imageSrc"
        fit="contain"
        @load="handleLoad"
        draggable="false"
      />
      <div class="button-container">
        <Tag v-for="(tag,index) in tags" :key="index" :tagUrl="tag.url" class="tag" :style="tag.dynamicStyle" :sitename="tag.sitename"></Tag>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Tag from './tag.vue'
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const scale = ref(1); // 缩放比例
    const isPanning = ref(false); // 是否正在平移
    const lastMousePosition = ref({ x: 0, y: 0 }); // 上一次鼠标位置
    const offset = ref({ x: 0, y: 0 }); // 偏移量

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.deltaY < 0) {
        scale.value = Math.min(scale.value + 0.1, 3); // 最大缩放比例为3
      } else {
        scale.value = Math.max(scale.value - 0.1, 1); // 最小缩放比例为1
      }
    };

    const startPan = (event) => {
      isPanning.value = true;
      lastMousePosition.value = { x: event.clientX, y: event.clientY };
    };

    const endPan = () => {
      isPanning.value = false;
    };

    const handlePan = (event) => {
      if (!isPanning.value) return;
      const dx = event.clientX - lastMousePosition.value.x;
      const dy = event.clientY - lastMousePosition.value.y;
      offset.value.x += dx;
      offset.value.y += dy;
      lastMousePosition.value = { x: event.clientX, y: event.clientY };
    };

    const contentStyle = computed(() => ({
      transform: `scale(${scale.value}) translate(${offset.value.x}px, ${offset.value.y}px)`,
      transition: 'transform 0.2s',
      position: 'relative', // 确保内容相对于自身定位
    }));

    const handleLoad = () => {
      console.log('Image loaded');
    };

    const tags = ref([
      {
        url:'src/assets/img/overview/showroom_tag.png',
        dynamicStyle:{
          left:'130px',
          top:'30px'
        },
        model:'src/assets/model/train.splat',
        sitename:'远古生命足迹展馆'
      }
    ]);

    return {
      scale,
      handleWheel,
      startPan,
      endPan,
      handlePan,
      contentStyle,
      handleLoad,
      tags
    };
    
  },
  components:{
      Tag
    }
};
</script>

<style scoped>
.container {
  position: relative; /* 使容器可以绝对定位 */
  overflow: hidden; /* 防止内容超出容器 */
  width: 100%; /* 根据需要设置宽度 */
  height: 100%; /* 根据需要设置高度 */
  cursor: grab; /* 鼠标样式 */
}

.container:active {
  cursor: grabbing; /* 鼠标按下时的样式 */
}

.content {
  position: absolute; /* 使内容可以根据变换进行定位 */
  top: 0;
  left: 0;
}

.button-container {
  position: absolute;
  top: 0;
  left: 0;
}
.tag{
  position:absolute;
  width: 20px;
  height: 20px;
}
</style>
