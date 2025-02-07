<template>
  <fl-paging-select
    ref="ceInstance"
    v-bind="{ ...defaultPropsV2, ...$attrs }"
  >
    <div v-for="(_, slotName) in $slots" :key="slotName" :slot="slotName === 'default' ? '' : slotName">
      <slot :name="slotName"></slot>
    </div>
  </fl-paging-select>
</template>
<script>
import { defaultPropsV2 } from '@/components/paging-select/utils.ts';
import './index';

export default {
  components:{},
  props: {
    api: {
      type: Function,
      required: true,
    },
    requestParams: {
      type: Object,
      default: () => ({})
    },
    /** 选项数据配置项 */
    optionSetting: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      defaultPropsV2,
    }
  },
  watch: {
    api() {
      this.$refs['ceInstance'].api = this.api;
    },
    requestParams() {
      this.$refs['ceInstance'].requestParams = this.requestParams;
    },
    optionSetting() {
      this.$refs['ceInstance'].optionSetting = this.optionSetting;
    },
  },
  mounted() {
    //@ts-ignore
    this.$refs['ceInstance'].api = this.api;
    //@ts-ignore
    this.$refs['ceInstance'].requestParams = this.requestParams;
    //@ts-ignore
    this.$refs['ceInstance'].optionSetting = this.optionSetting;

    this.$refs['ceInstance']?._onMounted?.();
  },
  methods: {
    // 调用内部组件的方法
    callOriginalMethod(methodName, ...args) {
      this.$refs['ceInstance']?.[methodName]?.(...args);
    },
  },
}
</script>
<style lang="scss" scoped>

</style>