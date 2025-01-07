<template>
  <fl-button
    v-bind="props"
    ref="ceInstance"
  >
    <div v-for="(_, slotName) in slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <slot :name="slotName"></slot>
    </div>
  </fl-button>
</template>

<script lang="ts" setup>
import { ref, onMounted, useAttrs, useSlots } from 'vue';
import { PropsTypeV3, defaultPropsV3} from './utils.ts';
import './index';

const props = withDefaults(defineProps<PropsTypeV3>(), defaultPropsV3);

const slots = useSlots();

const otherProps = useAttrs();

const emit = defineEmits<{
  // 覆盖/拓展组件事件
}>();

/** 自定义组件实例 */
const ceInstance = ref();

onMounted(()=>{
  ceInstance.value?._onMounted?.();
})

defineExpose(
  new Proxy(
    {},
    {
      get(_, key) {
        return ceInstance.value?.[key];
      },
      has(_, key) {
        return key in (ceInstance.value || {});
      },
    }
  ),
)
</script>

<style lang="scss" scoped>

</style>
