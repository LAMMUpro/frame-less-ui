<template>
  <div>
    <h2>fl-button for vue</h2>
    <fl-button
      ref="buttonRef"
      :type="type"
      v-model="this.type"
    >
      <slot></slot>
    </fl-button>
  </div>
</template>
<script>
import './index';

export default {
  components:{},
  props: {},
  data() {
    return {
      type: 'danger'
    }
  },
  mounted() {
    this.$refs['buttonRef']?._onMounted?.();
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