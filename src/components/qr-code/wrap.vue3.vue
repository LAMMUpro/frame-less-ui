<template>
  <fl-qr-code
    v-bind="props"
    @update-text="emit('update:text', ...handleEvent($event))"
    :id="compUID"
  >
    <div v-for="(slot, slotName) in slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <component :is="slot"></component>
    </div>
  </fl-qr-code>
</template>

<script lang="ts" setup>
import { ref, onMounted, useSlots, useId, Ref } from 'vue';
import { EmitTypeV3, ExposeTypeV3, PropsTypeV3, defaultPropsV3 } from './utils.ts';
import { generateVue3ExposeObj, handleEvent } from '@/utils/index.ts';
import './index';

/** 组件id, 使用id查询示例, 代替useTemplateRef */
const compUID = '__flcomp_v3_' + useId();

const props = withDefaults(defineProps<PropsTypeV3>(), defaultPropsV3);

const slots = useSlots();

const emit = defineEmits<EmitTypeV3>();

/** fl组件实例 */
const ceInstance: Ref<HTMLElement | null> = ref(null);

onMounted(()=>{
  ceInstance.value = document.getElementById(compUID);
  ceInstance?._onMounted?.();
})

defineExpose(generateVue3ExposeObj<ExposeTypeV3>(ceInstance, {
  // 覆盖/拓展组件方法
  
}))
</script>

<style lang="scss" scoped>

</style>
