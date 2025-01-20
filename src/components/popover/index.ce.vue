<template>
  <el-popover
    width="300px"
    :teleported="false"
    :show-arrow="true"
  >
    <template #reference>
      <!-- 必须包一层，否则弹出层位置错乱 -->
      <div style="display: inline-block;">
        <slot name="reference"></slot>
      </div>
    </template>
    <slot></slot>
  </el-popover>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { EmitType, PropsType, defaultProps } from './utils.ts';
import { ElPopover } from 'element-plus';

// @ts-ignore
const props = withDefaults(defineProps<PropsType>(), defaultProps);

const emit = defineEmits<EmitType>();

const otherProps = useAttrs();

/** 用于平替onMounted */
async function _onMounted() {
  console.log('>>> popover _onMounted')
}

defineExpose({
  _onMounted,
})
</script>

<style lang="scss">
@import '@/styles/common.scss';

@import '@/styles/element-plus-base.scss';
@import 'element-plus/theme-chalk/el-popover.css';

</style>
