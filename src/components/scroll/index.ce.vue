<template>
  <el-scrollbar>
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { EmitType, PropsType, defaultProps } from './utils.ts';
import { ElScrollbar } from 'element-plus';

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

@import '@/styles/element-plus-base.scss';
@import 'element-plus/theme-chalk/el-scrollbar.css';

</style>
