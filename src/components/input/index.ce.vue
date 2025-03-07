<template>
  <div 
    class="fl-input" 
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
      'has-prefix': slots.prefix,
      'has-suffix': slots.suffix,
      [`fl-input--${size}`]: size
    }"
  >
    <!-- 前缀图标 -->
    <span class="fl-input__prefix">
      <slot name="prefix" @slotchange="slotchange($event, 'prefix')"></slot>
    </span>

    <!-- 输入框 -->
    <input
      ref="input"
      :type="type"
      class="fl-input__inner"
      :value="props.modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    >

    <!-- 后缀图标 -->
    <span class="fl-input__suffix">
      <slot name="suffix" @slotchange="slotchange($event, 'suffix')"></slot>
    </span>

    <!-- 清除按钮 -->
    <span
      v-if="clearable && props.modelValue"
      class="fl-input__clear"
      @click="handleClear"
    >
      ×
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, shallowReactive } from 'vue'
import { EmitType, ExposeType, PropsType, defaultProps } from './utils.ts';

const props = withDefaults(defineProps<PropsType>(), defaultProps);

const emit = defineEmits<EmitType>()

const slots = shallowReactive<{[key: string]: any}>({});

/** 处理插槽 */
function slotchange(event: CustomEvent, slotName: string) {
  const children = (event.target as any)?.assignedNodes().filter(
    (node: HTMLElement) =>
      node.nodeType === Node.ELEMENT_NODE ||
      (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
  )
  if (children.length) {
    slots[slotName] = {};
  } else {
    delete slots[slotName];
  }
}

const input = ref<HTMLInputElement>()

/** 是否正在输入(处于中间态，未确认，不需要触发input事件) */
let isComposing = false;

const handleCompositionStart = (event: CompositionEvent) => {
  isComposing = true
}

const handleCompositionEnd = (event: CompositionEvent) => {
  if (isComposing) {
    isComposing = false
    handleInput(event)
  }
}

// 处理输入
const handleInput = (event: Event) => {
  if (isComposing) return
  const value = (event.target as HTMLInputElement).value
  emit('update-model-value', value)
  emit('input', value)
}

// 处理变更
const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

// 处理聚焦
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 处理按键
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    emit('change', (event.target as HTMLInputElement).value)
  }
}

// 处理清除
const handleClear = () => {
  emit('update-model-value', '')
  emit('clear')
  input.value?.focus()
}

/** 用于平替onMounted */
async function _onMounted() {
  console.log('>>> input _onMounted')
}

// 暴露方法
defineExpose<ExposeType>({
  _onMounted,
  focus() {
    input.value?.focus();
  },
  // blur: () => input.value?.blur(),
  // select: () => input.value?.select(),
})
</script>


<style lang="scss">
@import '@/styles/common.scss';
.fl-input {
  position: relative;
  display: inline-flex;
  width: 100%;
  align-items: center;
  font-size: 14px;
  
  &__inner {
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s;
    outline: none;
    
    &:focus {
      border-color: #409eff;
    }
    
    &::placeholder {
      color: #c0c4cc;
    }
  }
  
  // 禁用状态
  &.is-disabled {
    .fl-input__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  
  // 只读状态
  &.is-readonly {
    .fl-input__inner {
      cursor: default;
    }
  }
  
  // 尺寸变体
  &--large {
    .fl-input__inner {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
    }
  }
  
  &--small {
    .fl-input__inner {
      height: 24px;
      line-height: 24px;
      font-size: 12px;
    }
  }
  
  // 前缀
  &.has-prefix {
    .fl-input__inner {
      padding-left: 32px;
    }
  }
  
  &__prefix {
    position: absolute;
    left: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #c0c4cc;
    pointer-events: none;
    
    > * {
      pointer-events: auto;
    }
  }
  
  // 后缀
  &.has-suffix {
    .fl-input__inner {
      padding-right: 32px;
    }
  }
  
  &__suffix {
    position: absolute;
    right: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #c0c4cc;
    pointer-events: none;
    
    > * {
      pointer-events: auto;
    }
  }
  
  // 清除按钮
  &__clear {
    position: absolute;
    right: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #c0c4cc;
    cursor: pointer;
    z-index: 1;
    
    &:hover {
      color: #909399;
    }
  }
}
</style>