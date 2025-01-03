<template>
  <div>
    <h1>fl-paging-select for vue3</h1>
    <fl-paging-select
      ref="compRef"
      :api="this.api"
      :requestParams="this.requestParams"
      :optionSetting="this.optionSetting"
      v-bind="this.$attrs"
    ></fl-paging-select>
  </div>
</template>
<script>
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
    type: 'danger'
  }
},
mounted() {
  
},
methods: {
  // ==================================== 一、逻辑类 ====================================

  // ==================================== 二、数据请求类 ================================

  // ==================================== 三、跳转类 ====================================

  // ==================================== 四、小工具类 ==================================
},
}
</script>
<style lang="scss" scoped>

</style>