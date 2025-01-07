<template>
  <fl-input
    v-bind="{...props}"
    @update-model-value="emit('update:modelValue', $event.detail[0])"
    ref="ceInstance"
  ></fl-input>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import './index';
import { PropsTypeV3, defaultPropsV3} from './utils.ts';
import { generateVue3ExposeObj } from '@/utils/index.ts';

const props = withDefaults(defineProps<PropsTypeV3>(), defaultPropsV3);

const emit = defineEmits<{
  // 覆盖/拓展组件事件
  (e: 'update:modelValue', value: string | number): void
}>();

/** 自定义组件实例 */
const ceInstance = ref();

onMounted(()=>{
  ceInstance.value?._onMounted?.();
})

defineExpose(generateVue3ExposeObj(ceInstance, {
  // 覆盖/拓展组件方法
}))
</script>

<style lang="scss" scoped>

</style>
