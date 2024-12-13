<template>
  <fl-paging-select
    :selected="selected"
    :multiple="true"
    :load-data="loadData"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref([])

const loadData = async (page, search) => {
  // 实现数据加载逻辑
  const response = await Promise.resolve({
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ],
    hasMore: true
  })
  return {
    items: response.data,
    hasMore: response.hasMore
  }
}

loadData();

const handleConfirm = (items) => {
  console.log('已选择:', items)
}
</script>

<style lang="scss" scoped>

</style>
