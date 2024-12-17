<template>
  <div>
    <h3>基础用法</h3>
    <fl-radio-group :modelValue="radio1" @update-model-value="radio1 = $event.detail[0]">
      <fl-radio value="1">选项1</fl-radio>
      <fl-radio value="2">选项2</fl-radio>
      <fl-radio value="3">选项3</fl-radio>
    </fl-radio-group>

    <h3>禁用状态</h3>
    <fl-radio-group :modelValue="radio2" @update-model-value="radio2 = $event.detail[0]">
      <fl-radio value="1">选项1</fl-radio>
      <fl-radio value="2" disabled>选项2</fl-radio>
      <fl-radio value="3">选项3</fl-radio>
    </fl-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
</script>

<style lang="scss" scoped>

</style>