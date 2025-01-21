<template>
  <fl-qr-code
    v-bind="$props"
    @update-text="$emit('update:text', $event.detail[0])"
    ref="ceInstance"
  >
    <slot></slot>
  </fl-qr-code>
</template>
<script>
import './index';

export default {
  components:{},
  props: {
    text: {
      type: String,
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