<template>
  <fl-paging-select
    :id="info.id"
    @update-id="info.id = $event.detail[0]"
    :label="info.name"
    @update-label="info.name = $event.detail[0]"
    :api="loadData"
    immediate
    :optionSetting="{label: 'name', id: 'id'}"
  >

  </fl-paging-select>
</template>

<script setup>
import { reactive, ref } from 'vue';

const info = reactive({
  id: '1',
  name: 'Item 1111',
})

const loadData = () => {
  return Promise.resolve({
    data: {
      pageSize: 10,
      currentPage: 1,
      totalCount: 100,
      list: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' }
      ]
    },
    success: true
  })
}
</script>

<style lang="scss" scoped>

</style>
