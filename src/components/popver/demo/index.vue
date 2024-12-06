<template>
  <div class="main">
    <fl-qr-code :text="content" @updated="updated"></fl-qr-code>
    <button @click="changeContent">改变内容</button>
    <div class="divide"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref('https://micro-admin-template.lammu.cn/micromain/');

function changeContent() {
  content.value = Date.now().toString();
}

function updated() {
  console.log('二维码更新了')
}
</script>

<style lang="scss">

</style>
