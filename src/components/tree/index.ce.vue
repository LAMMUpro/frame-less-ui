<template>
  <div class="fl-tree">
    <fl-tree-item
      v-for="item in props.data"
      :key="item.id"
      :node="item"
      @node-click="handleNodeClick"
    ></fl-tree-item>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import '../tree-item';

interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  [key: string]: any;
}

const props = defineProps({
  data: {
    type: Array as PropType<TreeNode[]>,
    default: () => []
  }
});

const emit = defineEmits<{
  (e: 'node-click', node: TreeNode): void
}>();

const handleNodeClick = (node: TreeNode) => {
  emit('node-click', node);
};

defineExpose({
  // 如果需要对外暴露方法可以在这里添加
});
</script>

<style lang="scss">
.fl-tree {
  padding: 8px;
}
</style>
