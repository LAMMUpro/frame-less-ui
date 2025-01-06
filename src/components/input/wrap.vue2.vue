<template>
  <fl-input
    v-bind="$props"
    @update-model-value="$emit('update:modelValue', $event.detail[0])"
    ref="inputRef"
  >
    <slot></slot>
  </fl-input>
</template>
<script>
import './index';

export default {
  components:{},
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
  },
  data() {
    return {
      type: 'danger'
    }
  },
  mounted() {
    this.$refs['inputRef']?._onMounted?.();
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>

</style>