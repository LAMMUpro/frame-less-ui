<template>
  <div class="input-demo">
    <!-- 基础输入框 -->
    <div class="demo-item">
      <h3>基础输入框</h3>
      <fl-input v-model="value" placeholder="请输入内容" @change="handleChange" />
    </div>

    <!-- 禁用状态 -->
    <div class="demo-item">
      <h3>禁用状态</h3>
      <fl-input disabled placeholder="禁用状态" />
    </div>

    <!-- 可清空输入框 -->
    <div class="demo-item">
      <h3>可清空输入框</h3>
      <fl-input clearable v-model="clearableValue" placeholder="可清空">
        <span slot="prefix">
          <fl-icon name="xiala-"></fl-icon>
        </span>
        <span slot="suffix">
          <fl-icon name="zuo-"></fl-icon>
        </span>
      </fl-input>
    </div>

    <!-- 密码输入框 -->
    <div class="demo-item">
      <h3>密码输入框</h3>
      <fl-input type="password" v-model="password" placeholder="请输入密码" />
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-item">
      <h3>不同尺寸</h3>
      <div class="size-wrapper">
        <fl-input size="large" placeholder="大型输入框" />
        <fl-input placeholder="默认尺寸" />
        <fl-input size="small" placeholder="小型输入框" />
      </div>
    </div>

    <!-- 前缀后缀 -->
    <div class="demo-item">
      <h3>前缀后缀</h3>
      <fl-input clearable>
        <span slot="prefix">
          <fl-icon name="xiala-"></fl-icon>
        </span>
        <span slot="suffix">
          <fl-icon name="zuo-"></fl-icon>
        </span>
      </fl-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import "../../icon";

const value = ref('')
const clearableValue = ref('')
const password = ref('')

const handleChange = (val: string) => {
  console.log('输入值变更:', val)
}
</script>

<style lang="scss" scoped>
.input-demo {
  padding: 20px;

  .demo-item {
    margin-bottom: 24px;

    h3 {
      margin-bottom: 16px;
      font-size: 16px;
      color: #333;
    }
  }

  .size-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;
  }
}
</style>
