<template>
  <div class="main">
    <fl-tree name="word vue3" :arr="arr"></fl-tree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const arr = ref([
  1,{
    f: () => {console.log(666)}
  },
  '2323', 
  [5],
  {}
]);
</script>

<style lang="scss">
.main {
  font-size: 26px;
}
</style>
