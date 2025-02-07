<template>
  <fl-qr-code
    ref="ceInstance"
    v-bind="{ ...defaultPropsV2, ...$attrs }"
    @update-text="$emit('update:text', ...handleEvent($event))"
  >
    <div v-for="(_, slotName) in $slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <slot :name="slotName"></slot>
    </div>
  </fl-qr-code>
</template>
<script>
import { defaultPropsV2 } from '@/components/qr-code/utils.ts';
import { handleEvent } from '@/utils/index.ts';
import './index';

export default {
  components:{},
  props: {
    
  },
  data() {
    return {
      defaultPropsV2,
    }
  },
  watch: {
    
  },
  mounted() {

    this.$refs['ceInstance']?._onMounted?.();
  },
  methods: {
    handleEvent,
    // 调用内部组件的方法
    callOriginalMethod(methodName, ...args) {
      this.$refs['ceInstance']?.[methodName]?.(...args);
    },
  },
}
</script>
<style lang="scss" scoped>

</style>