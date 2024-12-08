<template>
  <div class="main">
    <fl-tree
      :data="treeData"
      @node-click="handleNodeClick"
    />

    <span>这是一颗树, 用vue3组件来渲染: </span>

    <fl-tree-v3
      :dataList="treeData"
      @node-click="handleNodeClick"
    >
      <template #default="{ node }">
        <span>
          {{ node?.label }}
          <span style="color: red;">(已离职)</span>
        </span>
      </template>
    </fl-tree-v3>
  </div>
</template>

<script setup lang="ts">
import FlTreeV3 from '../index.vue3.vue';

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
  },
  {
    id: 2,
    label: '父节点1',
    children: [
      {
        id: 3,
        label: '子1',
        children: [
          {
            id: 4,
            label: '孙1'
          },
          {
            id: 5,
            label: '孙2'
          }
        ],
      },
      {
        id: 5,
        label: '子2'
      },
      {
        id: 6,
        label: '子3'
      }
    ],
  }
];

const handleNodeClick = (node) => {
  console.log('点击节点:', node);
};
</script>

<style lang="scss" scoped>

</style>
