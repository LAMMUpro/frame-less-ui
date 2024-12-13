<template>
  <div class="icon-demo">
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="icon-row">
        <fl-icon name="xianshi_jinggaotianchong" />
        <fl-icon name="xianshi_bi" />
        <fl-icon name="wenhao_huabanfuben" />
        <fl-icon name="laji_huabanfuben" />
      </div>
    </div>

    <div class="demo-section">
      <h3>方向图标</h3>
      <div class="icon-row">
        <fl-icon name="xiala-" />
        <fl-icon name="you-" />
        <fl-icon name="shang-" />
        <fl-icon name="zuo-" />
      </div>
    </div>

    <div class="demo-section">
      <h3>自定义颜色和大小</h3>
      <div class="icon-row">
        <fl-icon name="tianjia-" color="#409EFF" :size="20" />
        <fl-icon name="guanbi-" color="#67C23A" :size="30" />
        <fl-icon name="wenhao_huabanfuben" color="#E6A23C" :size="40" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.icon-demo {
  padding: 20px;

  .demo-section {
    margin-bottom: 24px;

    h3 {
      margin-bottom: 16px;
      font-size: 16px;
      color: #333;
    }
  }

  .icon-row {
    display: flex;
    gap: 20px;
    align-items: center;
  }
}
</style>
