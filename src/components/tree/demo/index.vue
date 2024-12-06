<template>
  <div class="main">
    <fl-tree
      :data="treeData"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script setup lang="ts">
const treeData = [
  {
    id: 1,
    label: '节点1',
    children: [
      {
        id: 2,
        label: '节点1-1'
      },
      {
        id: 3,
        label: '节点1-2'
      }
    ]
  },
  {
    id: 4,
    label: '节点2'
  }
];

const handleNodeClick = (node) => {
  console.log('点击节点:', node);
};
</script>

<style lang="scss" scoped>

</style>
