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
        { id: '1', name: '上海外服（集团）有限公司国际人才分公司超长溢出测试' },
        { id: '2', name: '上海电气集团股份有限公司' },
        { id: '3', name: '上海外服（集团）有限公司' },
        { id: '4', name: '上海华耀公司有限公司' },
        { id: '5', name: '上海北泰实业股份有限公司' },
        { id: '6', name: '上海国际集团有限公司' },
        { id: '7', name: '上海明国实业有限公司' },
        { id: '8', name: '上海曼珩鼎实业有限公司' },
        { id: '9', name: '上海闻岱商业管理有限公司' },
        { id: '10', name: '上海叁零财务管理咨询有限公司' },
      ]
    },
    success: true
  })
}
</script>

<style lang="scss" scoped>

</style>
