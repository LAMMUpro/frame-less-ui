<template>
  <div>
    <h1>fl-paging-select for vue3</h1>
    <fl-paging-select
      ref="compRef"
      :api="props.api"
      :requestParams="props.requestParams"
      :optionSetting="props.optionSetting"
      v-bind="otherProps"
    ></fl-paging-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, useAttrs } from 'vue';
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

const otherProps = useAttrs();

const compRef = ref();

onMounted(()=>{
  compRef.value?._onMounted?.();
})

defineExpose({
  
})
</script>

<style lang="scss" scoped>

</style>
