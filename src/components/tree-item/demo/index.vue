<template>
  <div class="main">
    <span>这是一颗树, 用web component组件来渲染: </span>
    <fl-tree-item
      v-for="node in treeData"
      :key="node.id"
      :node="node"
    >
      
    </fl-tree-item>
  </div>
</template>

<script setup lang="ts">
import { treeData } from './data';

</script>

<style lang="scss" scoped>

</style>
