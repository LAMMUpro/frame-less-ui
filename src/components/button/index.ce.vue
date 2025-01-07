<template>
  <button
    :class="[
      'fl-button',
      type ? `fl-button--${type}` : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-round': round,
        'is-plain': plain,
        'is-text': text
      }
    ]"
    :disabled="disabled || loading"
    @click.prevent.stop="handleClick"
  >
    <i v-if="loading" class="fl-icon-loading"></i>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { PropsType, defaultProps } from './utils.ts';

const props = withDefaults(defineProps<PropsType>(), defaultProps);

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const handleClick = (evt: MouseEvent) => {
  console.log('handleClick', props.loading);
  if (props.disabled || props.loading) return console.log('禁用或加载，事件不触发');
  emit('click', evt);
}

/** 用于平替onMounted */
async function _onMounted() {
  console.log('>>> button _onMounted')
}

defineExpose({
  _onMounted,
  handleClick,
})
</script>

<style lang="scss">
@import url('@/styles/common.scss');
.fl-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  
  &:hover,
  &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  
  &--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    
    &:hover,
    &:focus {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
  }

  &--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    
    &:hover,
    &:focus {
      background: #85ce61;
      border-color: #85ce61;
      color: #fff;
    }
  }

  &--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
    
    &:hover,
    &:focus {
      background: #ebb563;
      border-color: #ebb563;
      color: #fff;
    }
  }

  &--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    
    &:hover,
    &:focus {
      background: #f78989;
      border-color: #f78989;
      color: #fff;
    }
  }

  &--info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
    
    &:hover,
    &:focus {
      background: #a6a9ad;
      border-color: #a6a9ad;
      color: #fff;
    }
  }
  
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &.is-loading {
    position: relative;
    
    &:before {
      content: '';
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.35);
    }
  }
  
  &.is-round {
    border-radius: 20px;
  }
  
  &.is-plain {
    background: #fff;
    
    &.fl-button--primary {
      color: #409eff;
      border-color: #409eff;
      
      &:hover,
      &:focus {
        background: #ecf5ff;
        border-color: #409eff;
      }
    }
    
    &.fl-button--success {
      color: #67c23a;
      border-color: #67c23a;
      
      &:hover,
      &:focus {
        background: #f0f9eb;
        border-color: #67c23a;
      }
    }
    
    &.fl-button--warning {
      color: #e6a23c;
      border-color: #e6a23c;
      
      &:hover,
      &:focus {
        background: #fdf6ec;
        border-color: #e6a23c;
      }
    }
    
    &.fl-button--danger {
      color: #f56c6c;
      border-color: #f56c6c;
      
      &:hover,
      &:focus {
        background: #fef0f0;
        border-color: #f56c6c;
      }
    }
    
    &.fl-button--info {
      color: #909399;
      border-color: #909399;
      
      &:hover,
      &:focus {
        background: #f4f4f5;
        border-color: #909399;
      }
    }
  }
  
  &.is-text {
    border-color: transparent;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
    
    &:hover,
    &:focus {
      background: transparent;
      border-color: transparent;
    }
    
    &.fl-button--primary {
      color: #409eff;
      
      &:hover,
      &:focus {
        color: #66b1ff;
        background-color: #ecf5ff;
      }
    }
    
    &.fl-button--success {
      color: #67c23a;
      
      &:hover,
      &:focus {
        color: #85ce61;
        background-color: #f0f9eb;
      }
    }
    
    &.fl-button--warning {
      color: #e6a23c;
      
      &:hover,
      &:focus {
        color: #ebb563;
        background-color: #fdf6ec;
      }
    }
    
    &.fl-button--danger {
      color: #f56c6c;
      
      &:hover,
      &:focus {
        color: #f78989;
        background-color: #fef0f0;
      }
    }
    
    &.fl-button--info {
      color: #909399;
      
      &:hover,
      &:focus {
        color: #a6a9ad;
        background-color: #f4f4f5;
      }
    }

    &.is-disabled {
      background-color: transparent !important;
    }
  }
  
  [class*="fl-icon-"] + span {
    margin-left: 6px;
  }

  .fl-icon-loading {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotating 1s linear infinite;
    vertical-align: middle;
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