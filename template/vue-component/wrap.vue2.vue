<template>
  <fl-temp-comp
    v-bind="$props"
    @update-model-value="$emit('update:modelValue', $event.detail[0])"
    ref="ceInstance"
  >
    <slot></slot>
  </fl-temp-comp>
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
    this.$refs['ceInstance']?._onMounted?.();
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>

</style>