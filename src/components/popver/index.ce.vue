<template>
  <div class="popover-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="popover-trigger" ref="triggerRef" @click="handleClick">
      <slot></slot>
    </div>

    <div 
      v-show="visible" 
      class="popover-content"
      :class="[placement, adjustedClass]"
      ref="contentRef"
    >
      <slot name="popover-content">
        {{ content }}
      </slot>
      <div class="popover-arrow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

// Props definition
const props = defineProps({
  trigger: {
    type: String,
    default: 'hover',
    validator: (value: string) => ['hover', 'click'].includes(value)
  },
  content: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top',
    validator: (value: string) => ['top', 'bottom', 'left', 'right'].includes(value)
  }
})

// Refs
const visible = ref(false)
const adjustedClass = ref('')
const contentRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)

// Methods
const checkPosition = () => {
  if (!visible.value || !contentRef.value) return
  
  const content = contentRef.value
  const rect = content.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth
  const padding = 10
  
  adjustedClass.value = ''
  
  if (props.placement === 'top' && rect.top < padding) {
    adjustedClass.value = 'adjust-bottom'
  } else if (props.placement === 'bottom' && rect.bottom > (windowHeight - padding)) {
    adjustedClass.value = 'adjust-top'
  } else if (props.placement === 'left' && rect.left < padding) {
    adjustedClass.value = 'adjust-right'
  } else if (props.placement === 'right' && rect.right > (windowWidth - padding)) {
    adjustedClass.value = 'adjust-left'
  }

  nextTick(() => {
    const newRect = content.getBoundingClientRect()
    if (newRect.top < padding) {
      content.style.top = `${padding}px`
    }
    if (newRect.bottom > (windowHeight - padding)) {
      content.style.top = `${windowHeight - newRect.height - padding}px`
    }
    if (newRect.left < padding) {
      content.style.left = `${padding}px`
    }
    if (newRect.right > (windowWidth - padding)) {
      content.style.left = `${windowWidth - newRect.width - padding}px`
    }
  })
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    visible.value = true
    nextTick(checkPosition)
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    visible.value = false
  }
}

const handleClick = () => {
  if (props.trigger === 'click') {
    visible.value = !visible.value
    if (visible.value) {
      nextTick(checkPosition)
    }
  }
}
</script>

<style lang="scss" scoped>
.popover {
  &-container {
    position: relative;
    display: inline-block;
  }

  &-content {
    position: absolute;
    background: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 150px;
  }

  &-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
  }
}

/* 位置样式 */
.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;

  .popover-arrow {
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: white;
  }
}

.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;

  .popover-arrow {
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: white;
  }
}

.left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 10px;

  .popover-arrow {
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: white;
  }
}

.right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;

  .popover-arrow {
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: white;
  }
}

/* 位置调整样式 */
.adjust {
  &-top {
    top: auto !important;
    bottom: 100% !important;
    margin-top: 0 !important;
    margin-bottom: 10px !important;
  }

  &-bottom {
    bottom: auto !important;
    top: 100% !important;
    margin-bottom: 0 !important;
    margin-top: 10px !important;
  }

  &-left {
    left: auto !important;
    right: 100% !important;
    margin-left: 0 !important;
    margin-right: 10px !important;
  }

  &-right {
    right: auto !important;
    left: 100% !important;
    margin-right: 0 !important;
    margin-left: 10px !important;
  }
}

/* 箭头位置调整 */
.adjust-top .popover-arrow {
  top: auto;
  bottom: -12px;
  border-bottom-color: transparent;
  border-top-color: white;
}

.adjust-bottom .popover-arrow {
  bottom: auto;
  top: -12px;
  border-top-color: transparent;
  border-bottom-color: white;
}

.adjust-left .popover-arrow {
  left: auto;
  right: -12px;
  border-right-color: transparent;
  border-left-color: white;
}

.adjust-right .popover-arrow {
  right: auto;
  left: -12px;
  border-left-color: transparent;
  border-right-color: white;
}
</style>