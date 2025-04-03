<template>
  <div class="main">
    <el-popover placement="top-start" :width="20" trigger="hover" :content="sitename" class="popver">
      <template #reference>
        <el-button type="primary" circle class="btn">
          <img :src="tagUrl" class="img" />
        </el-button>
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    tagUrl: {
      type: String,
      required: true
    },
    sitename:{
      type: String,
      required: true
    }
  },
  name: "tag",
  setup(props) {}
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
}
.img {
  width: 10px;
  height: 10px;
}
.popver {
  width: 100%;
  height: 100%;
}
.btn{
    width: 100%;
  height: 100%;
}
</style>