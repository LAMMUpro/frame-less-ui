<template>
  <fl-paging-select
    :api="props.api"
    :requestParams="props.requestParams"
    :optionSetting="props.optionSetting"
    @update-id="emit('update:id', ...handleEvent($event))"
    @update-label="emit('update:label', ...handleEvent($event))"
    ref="ceInstance"
  ></fl-paging-select>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, useAttrs, nextTick } from 'vue';
import { EmitTypeV3, ExposeTypeV3, PropsTypeV3, defaultPropsV3 } from './utils.ts';
import { generateVue3ExposeObj, handleEvent } from '@/utils/index.ts';
import './index';

const props = defineProps({
  api: {
    type: Function,
    required: true,
  },
  requestParams: {
    type: Object,
    default: () => ({})
  },
  /** 选项数据配置项 */
  optionSetting: {
    type: Object,
    default: () => ({})
  },
})

const emit = defineEmits<EmitTypeV3>();

/** 自定义组件实例 */
const ceInstance = ref();

onMounted(()=>{
  /** 需要延迟才能访问实例方法 */
  nextTick(() => ceInstance.value?._onMounted?.());
})


defineExpose(generateVue3ExposeObj<ExposeTypeV3>(ceInstance, {
  // 覆盖/拓展组件方法
  
}))
</script>

<style lang="scss" scoped>

</style>
