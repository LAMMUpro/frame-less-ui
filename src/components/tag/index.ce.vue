<template>
  <span
    :class="[
      'fl-tag',
      props.type ? `fl-tag--${props.type}` : '',
      props.size ? `fl-tag--${props.size}` : '',
      {
        'is-hit': props.hit,
        'is-round': props.round,
        'is-closable': props.closable
      }
    ]"
    :style="{ backgroundColor: props.color }"
  >
    <slot></slot>
    <i 
      v-if="props.closable"
      class="fl-icon-close"
      @click.stop="handleClose"
    ></i>
  </span>
</template>

<script lang="ts" setup>
interface TagProps {
  /** 
   * 标签类型
   * @description 设置标签的样式类型
   * @default ''
   */
  type?: 'success' | 'info' | 'warning' | 'danger'

  /** 
   * 是否可关闭
   * @description 显示关闭图标，点击可触发close事件
   * @default false
   */
  closable?: boolean

  /** 
   * 标签尺寸
   * @description 设置标签大小
   * @default 'default'
   */
  size?: 'large' | 'default' | 'small'

  /** 
   * 是否有边框描边
   * @description 显示边框效果
   * @default false
   */
  hit?: boolean

  /** 
   * 标签色值
   * @description 自定义标签背景色
   */
  color?: string

  /** 
   * 圆角标签
   * @description 是否为圆角标签
   * @default false
   */
  round?: boolean
}

const props = withDefaults(defineProps<TagProps>(), {
  type: 'info',
  closable: false,
  size: 'default',
  hit: false,
  color: '',
  round: false
})

const emit = defineEmits<{
  (e: 'close', evt: MouseEvent): void
}>()

const handleClose = (evt: MouseEvent) => {
  emit('close', evt)
}

defineExpose({
  handleClose
})
</script>

<style lang="scss">
@import '@/styles/common.scss';
.fl-tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  border: 1px solid #e9e9eb;
  background-color: #f4f4f5;
  color: #909399;
  box-sizing: border-box;
  white-space: nowrap;

  // 尺寸
  &--large {
    padding: 0 11px;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
  }

  &--small {
    padding: 0 8px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }

  // 类型
  &--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }

  &--warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
  }

  &--danger {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
  }

  &--info {
    background-color: #f4f4f5;
    border-color: #e9e9eb;
    color: #909399;
  }

  &.is-hit {
    border-color: currentColor;
  }

  &.is-round {
    border-radius: 12px;
  }

  &.is-closable {
    padding-right: 5px;
  }

  .fl-icon-close {
    margin-left: 6px;
    transform: scale(0.8);
    cursor: pointer;
    
    &:hover {
      color: #fff;
    }
  }
}
</style>
