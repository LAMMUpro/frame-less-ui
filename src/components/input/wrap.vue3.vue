<template>
  <fl-input
    v-bind="{...props}"
    @update-model-value="emit('update:modelValue', $event.detail[0])"
    ref="ceInstance"
  >
    <div v-for="(_, slotName) in slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <slot :name="slotName"></slot>
    </div>
  </fl-input>
</template>

<script lang="ts" setup>
import { ref, onMounted, useSlots, nextTick } from 'vue';
import { PropsTypeV3, defaultPropsV3} from './utils.ts';
import { generateVue3ExposeObj } from '@/utils/index.ts';
import './index';

const props = withDefaults(defineProps<PropsTypeV3>(), defaultPropsV3);

const slots = useSlots();

const emit = defineEmits<{
  // 覆盖/拓展组件事件
  (e: 'update:modelValue', value: string | number): void
}>();

/** 自定义组件实例 */
const ceInstance = ref();

onMounted(()=>{
  /** 需要延迟才能访问实例方法 */
  nextTick(() => ceInstance.value?._onMounted?.());
})

defineExpose(generateVue3ExposeObj(ceInstance, {
  // 覆盖/拓展组件方法
}))
</script>

<style lang="scss" scoped>

</style>
