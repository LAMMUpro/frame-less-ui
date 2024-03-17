<template>
  <div class="main">
    <fl-tooltip :value="value" @success="(e) => console.log('>>>', e)">
      <button slot @click="changeValue">文本改变</button>
    </fl-tooltip>
    <div class="divide"></div>
    <fl-tooltip-sd :value="value" @success="(e) => console.log('>>>', e)">
    </fl-tooltip-sd>
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
