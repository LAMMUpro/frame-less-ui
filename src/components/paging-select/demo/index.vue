<template>
  <div>
    <div>{{ info }}</div>
    <fl-paging-select-v3
      immediate
      style="width: 300px;"
      v-model:value="info.id"
      v-model:label="info.name"
      :api="api"
      :optionSetting="{label: 'name', id: 'id'}"
    ></fl-paging-select-v3>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import FlPagingSelectV3 from '../wrap.vue3.vue';

const info = reactive({
  id: '4',
  name: '上海华耀公司有限公司',
})

function api() {
  function generateId() {
    return 1 + Date.now().toString().slice(5) + Math.random().toString(36).substring(2);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          pageSize: 10,
          currentPage: 1,
          totalCount: 100,
          list: [
            { id: generateId(), name: '上海外服（集团）有限公司国际人才分公司超长溢出测试' },
            { id: generateId(), name: '上海电气集团股份有限公司' },
            { id: generateId(), name: '上海外服（集团）有限公司' },
            { id: generateId(), name: '上海华耀公司有限公司' },
            { id: generateId(), name: '上海北泰实业股份有限公司' },
            { id: generateId(), name: '上海国际集团有限公司' },
            { id: generateId(), name: '上海明国实业有限公司' },
            { id: generateId(), name: '上海曼珩鼎实业有限公司' },
            { id: generateId(), name: '上海闻岱商业管理有限公司' },
            { id: generateId(), name: '上海叁零财务管理咨询有限公司' },
          ]
        },
        success: true
      })
    }, 2000)
  })
}
</script>

<style lang="scss" scoped>

</style>
