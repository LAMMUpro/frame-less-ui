<template>
  <label 
    class="fl-radio" 
    :class="{ 
      'is-checked': radioGroup.modelValue.value === props.value,
      'is-disabled': disabled 
    }"
  >
    <span class="fl-radio__input">
      <input
        type="radio"
        :value="props.value"
        :disabled="disabled"
        :checked="radioGroup.modelValue.value === props.value"
        @input="handleInput"
      >
      <span class="fl-radio__inner"></span>
    </span>
    <span class="fl-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { RadioSpace } from '@/types';
import { inject, ref } from 'vue';

const props = defineProps({
  /** 选项值 */
  value: {
    type: [String, Number, Boolean],
    default: ''
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
})

/** 获取radioGroup Provide的数据 */
const radioGroup = inject<RadioSpace.Provide>('radio-group-value', { modelValue: ref(''), emit: () => {} });

/** 
 * 处理radio选中事件
 * 不要从event.target中获取value，因为event.target.value是string类型，而props.value可能是number类型
 */
const handleInput = (event: Event) => {
  radioGroup.modelValue.value = props.value;
}
</script>

<style lang="scss">
@use '@/styles/common.scss';
.fl-radio {
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__input {
    position: relative;
    display: inline-block;
    
    input {
      position: absolute;
      opacity: 0;
      margin: 0;
    }

    .fl-radio__inner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 1px solid #dcdfe6;
      border-radius: 50%;
      position: relative;
      
      &::after {
        content: "";
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: none;
      }
    }
  }

  &.is-checked {
    .fl-radio__inner {
      border-color: #409eff;
      background: #409eff;
      
      &::after {
        display: block;
      }
    }
  }

  &__label {
    padding: 4px 0;
    padding-left: 8px;
    font-size: 14px;
    color: #333;
  }
}
</style>
