<template>
  <fl-button ref="ceInstance" v-bind="{ ...defaultPropsV2, ...$attrs }">
    <div v-for="(_, slotName) in $slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <slot :name="slotName"></slot>
    </div>
  </fl-button>
</template>
<script>
import { defaultPropsV2 } from '@/components/button/utils.ts';
import './index';

export default {
  components:{},
  props: {},
  data() {
    return {
      defaultPropsV2,
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