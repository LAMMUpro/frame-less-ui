<template>
  <div class="fl-scroll">
    Scroll组件
  </div>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { EmitType, PropsType, defaultProps } from './utils.ts';
// 如果需要用到el-popover组件，则需要手动引入
// import { ElPopover } from 'element-plus';

// @ts-ignore
const props = withDefaults(defineProps<PropsType>(), defaultProps);

const emit = defineEmits<EmitType>();

const otherProps = useAttrs();

/** 用于平替onMounted */
async function _onMounted() {
  console.log('>>> scroll _onMounted')
}

defineExpose({
  _onMounted,
})
</script>

<style lang="scss">
@import '@/styles/common.scss';

// 如果需要用到el-popover组件，则需要手动引入这两个样式文件
// @import '@/styles/element-plus-base.scss';
// @import 'element-plus/theme-chalk/el-popover.css';

</style>
