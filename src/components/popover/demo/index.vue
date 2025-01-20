<template>
  <div>
    <div>
      <fl-popover-v3 trigger="hover" placement="right">
        <template #reference>
          <span>悬停到此处显示</span>
        </template>
        <div>
          提示内容
        </div>
      </fl-popover-v3>
    </div>
    <div class="divide"></div>
    <div>
      <fl-popover-v3 trigger="click" placement="right">
        <template #reference>
          <button>点击显示/隐藏</button>
        </template>
        <div>
          提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容
        </div>
      </fl-popover-v3>
    </div>
  </div>
</template>

<script setup lang="ts">
import FlPopoverV3 from '../wrap.vue3.vue';

</script>

<style lang="scss">

</style>
