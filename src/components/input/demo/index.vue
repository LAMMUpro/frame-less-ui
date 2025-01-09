<template>
  <div class="">
    <!-- 基础输入框 -->
    <div class="demo-item">
      <h3>基础输入框</h3>
      <fl-input-v3 v-model="formInfo.value2"/>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-item">
      <h3>禁用状态</h3>
      <fl-input-v3 v-model="formInfo.value3" disabled placeholder="禁用状态" />
    </div>

    <!-- 可清空输入框 -->
    <div class="demo-item">
      <h3>可清空输入框</h3>
      <fl-input-v3 v-model="formInfo.value4" clearable />
    </div>

    <!-- 密码输入框 -->
    <div class="demo-item">
      <h3>密码输入框</h3>
      <fl-input-v3 v-model="formInfo.value5" type="password" placeholder="请输入密码" />
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-item">
      <h3>不同尺寸</h3>
      <div class="size-wrapper">
        <fl-input-v3 v-model="formInfo.value6" size="large" placeholder="大型输入框" />
        <fl-input-v3 v-model="formInfo.value7" placeholder="默认尺寸" />
        <fl-input-v3 v-model="formInfo.value8" size="small" placeholder="小型输入框" />
      </div>
    </div>

    <!-- 前缀后缀 -->
    <div class="demo-item">
      <h3>前缀后缀</h3>
      <fl-input-v3 v-model="formInfo.value9" clearable>
        <template #prefix>
          <fl-icon name="xiala-"></fl-icon>
        </template>
        <template #suffix>
          <fl-icon name="zuo-"></fl-icon>
        </template>
      </fl-input-v3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import "../../icon";
import FlInputV3 from '../wrap.vue3.vue';

const formInfo = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '点击右侧可清空输入框',
  value5: '',
  value6: '',
  value7: '',
  value8: '',
  value9: '',
})
</script>

<style lang="scss" scoped>
.demo-item {
  margin-bottom: 0px;
}

.size-wrapper {
  display: flex;
  gap: 6px;
}
</style>
