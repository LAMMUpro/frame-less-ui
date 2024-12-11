<template>
  <div>
    <div>
      <fl-popver trigger="hover" placement="right">
        <span>悬停到此处显示</span>
        <div slot="popover-content">
          提示内容
        </div>
      </fl-popver>
    </div>
    <div class="divide"></div>
    <div>
      <fl-popver trigger="click" placement="right">
        <button>点击显示/隐藏</button>
        <div slot="popover-content">
          提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容
        </div>
      </fl-popver>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">

</style>
