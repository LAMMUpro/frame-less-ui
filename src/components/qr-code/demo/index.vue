<template>
  <div class="main">
    <div>二维码内容：{{content}}</div>
    <fl-qr-code
      ref="qrCodeRef"
      :text="content"
      :width="300"
      @update-text="content = $event.detail[0]"
      @updated="updated"
    ></fl-qr-code>
    <button @click="changeContentByValue">通过属性改变内容</button>
    <button @click="changeContentByMethod">通过方法改变内容</button>
    <div class="divide"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
