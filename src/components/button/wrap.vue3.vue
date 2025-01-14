<template>
  <fl-button
    v-bind="props"
    :id="compUID"
  >
    <div v-for="(slot, slotName) in slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <component :is="slot"></component>
    </div>
  </fl-button>
</template>

<script lang="ts" setup>
import { ref, onMounted, useSlots, nextTick, useId, Ref } from 'vue';
import { PropsTypeV3, defaultPropsV3} from './utils.ts';
import { generateVue3ExposeObj } from '@/utils/index.ts';
import './index';

/** 组件id, 使用id查询示例, 代替useTemplateRef */
const compUID = '__flcomp' + useId();

const props = withDefaults(defineProps<PropsTypeV3>(), defaultPropsV3);

const slots = useSlots();

const emit = defineEmits<{
  // 覆盖/拓展组件事件
}>();

/** fl组件实例 */
const ceInstance: Ref<HTMLElement | null> = ref(null);

onMounted(()=>{
  ceInstance.value = document.getElementById(compUID);
  ceInstance?._onMounted?.();
})

defineExpose(generateVue3ExposeObj(ceInstance, {
  // 覆盖/拓展组件方法
}))
</script>

<style lang="scss" scoped>

</style>
