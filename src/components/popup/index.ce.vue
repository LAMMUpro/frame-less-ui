<template>
  <div 
    v-show="modelValue" 
    class="fl-popup"
    :class="{
      'is-visible': modelValue,
      'is-round': round
    }"
  >
    <div class="fl-popup__mask" @click="handleMaskClick"></div>
    <div class="fl-popup__container">
      <div class="fl-popup__header">
        <slot name="header">{{ title }}</slot>
        <fl-icon name="guanbi-" :size="20"></fl-icon>
      </div>
      <div class="fl-popup__content">
        <slot></slot>
      </div>
      <div class="fl-popup__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '../icon';

interface PopupProps {
  /** 
   * 是否显示弹出框
   * @description 控制弹出框的显示和隐藏
   * @default false
   */
  modelValue: boolean

  /** 
   * 弹出框标题
   * @description 设置弹出框的标题文本
   * @default ''
   */
  title?: string

  /** 
   * 是否圆角
   * @description 设置弹出框是否显示圆角
   * @default false
   */
  round?: boolean

  /** 
   * 点击遮罩层是否关闭
   * @description 控制点击遮罩层时是否关闭弹出框
   * @default true
   */
  closeOnClickMask?: boolean
}

const props = withDefaults(defineProps<PopupProps>(), {
  modelValue: false,
  title: '',
  round: false,
  closeOnClickMask: true
})

const emit = defineEmits<{
  (e: 'update-model-value', value: boolean): void
}>()

const handleMaskClick = () => {
  if (props.closeOnClickMask) {
    emit('update-model-value', false)
  }
}

defineExpose({
  handleMaskClick
})
</script>

<style lang="scss">
.fl-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  
  &__mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2001;
  }
  
  &__container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    background-color: #fff;
    transition: transform 0.3s ease-out;
    z-index: 2002;
  }
  
  &__header {
    padding: 16px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
  }
  
  &__content {
    padding: 16px;
    max-height: 70vh;
    overflow-y: auto;
  }
  
  &__footer {
    padding: 16px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  
  &.is-visible {
    .fl-popup__container {
      transform: translateY(0);
    }
  }
  
  &.is-round {
    .fl-popup__container {
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
  }
}
</style>
