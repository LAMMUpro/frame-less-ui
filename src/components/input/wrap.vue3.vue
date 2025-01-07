<template>
  <fl-input
    v-bind="{...props}"
    @update-model-value="emit('update:modelValue', $event.detail[0])"
    ref="compRef"
  ></fl-input>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import './index';
import { PropsTypeV3, defaultPropsV3} from './utils.ts';

const props = withDefaults(defineProps<PropsTypeV3>(), defaultPropsV3);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
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
