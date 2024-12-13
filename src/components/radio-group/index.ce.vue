<template>
  <div 
    class="fl-radio-group"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import "../radio";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update-model-value', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
}>()

const groupValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update-model-value', val)
    emit('change', val)
  }
})

defineExpose({
  value: groupValue
})
</script>

<style lang="scss">
.fl-radio-group {
  display: inline-block;
}
</style>