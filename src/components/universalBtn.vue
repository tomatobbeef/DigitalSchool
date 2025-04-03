<template>
    <div class="btnMain">
        <!-- <el-button type="primary" :icon="Edit" class="btn" @click="clickevent"/> -->
        <div class="btn" @click="clickevent">
            <el-icon :size="30" style="vertical-align: middle" class="icon">
                <component :is="iconName" />
            </el-icon>
        </div>
        <div class="text">{{ btntext }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 导入所有图标

// 注册所有图标组件
const props = defineProps({
    iconName: {
        type: String,
        required: true,
    },
    clickevent: {
        type: Function,
        required: true
    },
    btntext: {
        type: String,
        required: true
    },
});

// 动态注册图标组件
Object.keys(ElementPlusIconsVue).forEach((key) => {
    const component = ElementPlusIconsVue[key];
    if (component) {
        defineComponent(key, component);
    }
});
</script>

<style scoped>
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
</style>