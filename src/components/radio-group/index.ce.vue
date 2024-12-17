<template>
  <div 
    class="fl-radio-group"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';
import "../radio";
import { RadioSpace } from '@/types';

const props = defineProps({
  /** 绑定值（非双向绑定，改变值需要通过@update-model-value） */
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  /** 是否禁用, TODO */
  disabled: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits<{
  /** 双向绑定改变值 */
  (e: 'update-model-value', value: string | number | boolean): void
  /** 绑定值变化事件 */
  (e: 'change', value: string | number | boolean): void
}>()

/** 绑定值 */
const radioGroupValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update-model-value', value);
    emit('change', value);
  }
})

/**
 * 传递给radio组件，包括值和emit，供radio组件调用改变值
 */
const radioGroup: RadioSpace.Provide = {
  modelValue: radioGroupValue,
  emit(emitName, ...args) {
    // @ts-ignore
    emit(emitName, ...args);
  }
}
/** 提供给radio组件使用 */
provide('radio-group-value', radioGroup);

</script>

<style lang="scss">
.fl-radio-group {
  display: inline-block;
}
</style>