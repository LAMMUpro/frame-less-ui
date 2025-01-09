<template>
  <fl-input
    v-bind="props"
    @update-model-value="emit('update:modelValue', ...handleEvent($event))"
    @change="emit('change', ...handleEvent($event))"
    @input="emit('input', ...handleEvent($event))"
    @focus="emit('focus', ...handleEvent($event))"
    @blur="emit('blur', ...handleEvent($event))"
    @clear="emit('clear', ...handleEvent($event))"
    ref="ceInstance"
  >
    <div v-for="(_, slotName) in slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <slot :name="slotName"></slot>
    </div>
  </fl-input>
</template>

<script lang="ts" setup>
import { ref, onMounted, useSlots, nextTick } from 'vue';
import { EmitTypeV3, ExposeTypeV3, PropsTypeV3, defaultPropsV3 } from './utils.ts';
import { generateVue3ExposeObj, handleEvent } from '@/utils/index.ts';
import './index';

const props = withDefaults(defineProps<PropsTypeV3>(), defaultPropsV3);

const slots = useSlots();

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
