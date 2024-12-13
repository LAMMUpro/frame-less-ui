<template>
  <div class="radio-demo">
    <h3>基础用法</h3>
    <fl-radio-group :model-value="radio1" @update-model-value.capture="radio1 = $event.detail[0]">
      <fl-radio label="1" :model-value="radio1">选项1</fl-radio>
      <fl-radio label="2" :model-value="radio1">选项2</fl-radio>
      <fl-radio label="3" :model-value="radio1">选项3</fl-radio>
    </fl-radio-group>

    <h3>禁用状态</h3>
    <fl-radio-group v-model="radio2">
      <fl-radio label="1">选项1</fl-radio>
      <fl-radio label="2" disabled>选项2</fl-radio>
      <fl-radio label="3">选项3</fl-radio>
    </fl-radio-group>

    <h3>带有边框</h3>
    <fl-radio-group v-model="radio3">
      <fl-radio label="1">选项1</fl-radio>
      <fl-radio label="2">选项2</fl-radio>
      <fl-radio label="3">选项3</fl-radio>
    </fl-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
</script>

<style lang="scss" scoped>
.radio-demo {
  padding: 20px;
  
  h3 {
    margin: 20px 0;
    font-size: 16px;
  }
}
</style>