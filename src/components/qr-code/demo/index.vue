<template>
  <div class="main">
    <fl-qr-code-v3 text="Vue3用法" :width="200"></fl-qr-code-v3>
    <fl-qr-code-v3 text="Vue3用法" :width="150"></fl-qr-code-v3>
    <fl-qr-code-v3 text="Vue3用法" :width="100"></fl-qr-code-v3>
    <fl-qr-code-v3 text="Vue3用法" :width="50"></fl-qr-code-v3>
    <div class="divide"></div>
    <fl-qr-code-v3
      ref="qrCodeRef"
      v-model:text="content"
      :width="200"
      @updated="updated"
    ></fl-qr-code-v3>
    <div>二维码内容：{{content}}</div>
    <button @click="changeContentByValue">通过属性改变内容</button>
    <button @click="changeContentByMethod">通过方法改变内容</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FlQrCodeV3 from '../wrap.vue3.vue';

const content = ref('https://micro-admin-template.lammu.cn/micromain/');

const qrCodeRef = ref();

function changeContentByValue() {
  content.value = Date.now().toString();
}

function changeContentByMethod() {
  qrCodeRef.value.draw(Date.now().toString())
}

function updated() {
  console.log('二维码更新了')
}
</script>

<style lang="scss">

</style>
