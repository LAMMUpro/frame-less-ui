<template>
  <!-- 主容器：可切换禁用状态的输入占位符组件 -->
  <div class="fl-input-placeholder" :class="{ 'is-disabled': props.disabled }">
    <!-- 显示值：优先显示用户标签，其次是ID，最后是占位符文本 -->
    <span class="value-text">{{ props.labelForUser || props.id || (props.disabled ? '&nbsp;' : props.placeholderForNotSelect) }}</span>
    
    <!-- 问号图标提示：当只有ID没有名称时显示的帮助信息 -->
    <fl-popover v-if="props.isShowQuesIcon" :show="showPopover" @update-show="showPopover = $event.detail[0]" theme="dark">
      <div class="popover-content" slot="popover-content">
        <div>由于未保存数据的名称</div>
        <div>所以只能回显数据的编号</div>
      </div>
      <span class="question-icon">
        <fl-icon name="wenhao_huabanfuben" @click.stop="showPopover = true"/>
      </span>
    </fl-popover>
    
    <!-- 清除按钮：在启用清除功能、非禁用状态且有值时显示 -->
    <fl-icon 
      v-if="props.clearable && !props.disabled && props.id"
      name="guanbi-"
      class="clear-icon"
      @click.stop="emit('clear')"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import '../popover';
import '../icon';

const props = defineProps({
  /** 是否禁用组件 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否可清除选中值 */
  clearable: {
    type: Boolean,
    default: true
  },
  /** 是否显示问号图标提示 */
  isShowQuesIcon: {
    type: Boolean,
    default: false
  },
  /** 选中项的ID值 */
  id: {
    type: [String, Number, Array],
    default: ''
  },
  /** 显示给用户看的文本标签 */
  labelForUser: {
    type: String,
    default: ''
  },
  /** 未选择时的占位符文本 */
  placeholderForNotSelect: {
    type: String,
    default: '点击选择'
  },
});

const emit = defineEmits<{
  (e: 'clear'): void
}>();

const showPopover = ref(false);
</script>

<style lang="scss" scoped>
.fl-input-placeholder {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #dcdee0;
  
  &.is-disabled {
    color: #c5c5c5;
    cursor: not-allowed;
  }
  
  .value-text {
    color: #8d8d8d;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 4px;
  }
  
  .question-icon {
    margin-right: 4px;
    cursor: pointer;
  }
  
  .clear-icon {
    cursor: pointer;
  }

  .popover-content {
    padding: 8px 20px;
  }
}
</style>
