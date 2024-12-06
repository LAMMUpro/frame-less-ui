<template>
  <div class="fl-tree-item">
    <div 
      class="fl-tree-item__content"
      @click="handleClick"
    >
      <span 
        v-if="hasChildren"
        class="fl-tree-item__arrow"
        :class="{ 'is-expanded': isExpanded }"
        @click.stop="toggleExpand"
      >
        ▶
      </span>
      <span class="fl-tree-item__label">{{ node.label }}</span>
    </div>
    
    <div 
      v-if="hasChildren"
      class="fl-tree-item__children"
      v-show="isExpanded"
    >
      <fl-tree-item
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @node-click="handleChildClick"
      ></fl-tree-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  [key: string]: any;
}

const props = defineProps({
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'node-click', node: TreeNode): void
}>();

const isExpanded = ref(false);
const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0;
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const handleClick = () => {
  emit('node-click', props.node);
};

const handleChildClick = (node: TreeNode) => {
  emit('node-click', node);
};

defineExpose({
  // 如果需要对外暴露方法可以在这里添加
});
</script>

<style lang="scss">
.fl-tree-item {
  &__content {
    display: flex;
    align-items: center;
    padding: 6px 0;
    cursor: pointer;
    
    &:hover {
      background-color: #f5f7fa;
    }
  }

  &__arrow {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    cursor: pointer;
    transition: transform 0.3s;
    
    &.is-expanded {
      transform: rotate(90deg);
    }
  }

  &__children {
    padding-left: 20px;
  }
}
</style>