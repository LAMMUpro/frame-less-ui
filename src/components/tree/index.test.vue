<template>
  <div class="main">
    <fl-tree name="word vue3" :arr="arr">
      <button slot>默认插槽</button>
      <div slot="hhh">
        <div>{{ number }}</div>
        <button @click="add">增加</button>
      </div>
    </fl-tree>
    <div class="divide"></div>
    <fl-tree-sd name="word vue3" :arr="arr">
      <button slot>插槽示例</button>
    </fl-tree-sd>
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
const number = ref(5);
function add () {
  number.value = number.value + 1;
}
</script>

<style lang="scss">
.main {
  font-size: 26px;
}
</style>
