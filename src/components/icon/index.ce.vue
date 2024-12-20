<template>
  <span
    :class="[
      'icon fl-iconfont',
      `fl-icon-${props.name}`,
      {
        'is-loading': props.loading
      }
    ]"
    :style="{
      fontSize: props.size ? `${props.size}px` : '',
      color: props.color
    }"
    @click="handleClick"
  ></span>
</template>

<script lang="ts" setup>

interface IconProps {
  /** 
   * 图标名称
   * @description iconfont图标的类名
   * @default ''
   * @example 'fl-icon-search'
   */
  name: string

  /** 
   * 图标颜色
   * @description 设置图标的颜色
   * @default ''
   */
  color?: string

  /** 
   * 图标大小
   * @description 图标大小，单位px
   * @default ''
   */
  size?: number | string

  /** 
   * 是否旋转
   * @description 设置图标是否旋转
   * @default false
   */
  loading?: boolean
}

const props = withDefaults(defineProps<IconProps>(), {
  name: '',
  color: '',
  size: '',
  loading: false
})

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}

defineExpose({
  handleClick
})
</script>

<style lang="scss">
@import url('@/styles/common.scss');

.fl-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  &.is-loading {
    animation: rotating 1s linear infinite;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
