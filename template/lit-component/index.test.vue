<template>
  <div class="main">
    <fl-temp-name :value="value" @success="(e) => console.log('>>>', e)">
      <button slot @click="changeValue">文本改变</button>
    </fl-temp-name>
    <div class="divide"></div>
    <fl-temp-name-sd :value="value" @success="(e) => console.log('>>>', e)">
    </fl-temp-name-sd>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('vue');

function changeValue() {
  value.value = 'vue-' + new Date().getTime();
}

</script>

<style lang="scss">

</style>
