<template>
  <fl-tree-item
    v-for="node in props.dataList"
    :key="node.id"
    :node="node"
  >
    <div slot="label" v-if="slots.default">
      <slot v-bind="{node}"></slot>
    </div>
    <fl-tree-v3
      :dataList="node.children || []"
    >
      <template #default="{ node }">
        <slot v-bind="{node}"></slot>
      </template>
    </fl-tree-v3>
  </fl-tree-item>
</template>

<script lang="ts">
export default defineComponent({
  name: 'FlTreeV3',
});
</script>

<script lang="ts" setup>
import './index';
import '../tree-item';
import { PropType, defineComponent, useSlots } from 'vue';

interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  [key: string]: any;
}

const props = defineProps({
  dataList: {
    type: Array as PropType<TreeNode[]>,
    required: true
  },
});

const emit = defineEmits<{
  (e: 'node-click', node: TreeNode): void
}>()

const slots = useSlots();

const handleNodeClick = (event) => {
  emit('node-click', event.detail[0]);
};
</script>

<style lang="scss" scoped>

</style>
