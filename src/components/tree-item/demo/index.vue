<template>
  <div class="main">
    <span>这是一颗树, 用web component组件来渲染: </span>
    <fl-tree-item :node="node">
      <fl-tree-item
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      >
        <div slot="label">
          {{ child.label }}
          <span style="color: red;">(已离职)</span>
        </div>
        <fl-tree-item
          v-for="grandChild in child.children"
          :key="grandChild.id"
          :node="grandChild"
        >
          <div slot="label">
            {{ grandChild.label }}
            <span style="color: red;">(已离职)</span>
          </div>
        </fl-tree-item>
      </fl-tree-item>
    </fl-tree-item>
  </div>
</template>

<script setup lang="ts">
const node = {
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
</script>

<style lang="scss" scoped>

</style>
