<template>
  <fl-button
    v-bind="props"
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
  
}>();

const compRef = ref();

onMounted(()=>{
  compRef.value?._onMounted?.();
})

defineExpose(
  new Proxy(
    {},
    {
      get(_, key) {
        return compRef.value?.[key];
      },
      has(_, key) {
        return key in (compRef.value || {});
      },
    }
  ),
)
</script>

<style lang="scss" scoped>

</style>
