<template>
  <div class="" style="">
    <div>
      <fl-button type="primary">主要按钮</fl-button>
      <fl-button type="success">成功按钮</fl-button>
      <fl-button type="warning">警告按钮</fl-button>
      <fl-button type="danger">危险按钮</fl-button>
      <fl-button type="info">信息按钮</fl-button>
    </div>

    <div>
      <fl-button disabled>禁用按钮</fl-button>
    </div>

    <div>
      <fl-button round>圆角按钮</fl-button>
    </div>

    <div>
      <fl-button text>文字按钮</fl-button>
    </div>

    <div>
      <fl-button plain>朴素按钮</fl-button>
    </div>

    <div>
      <fl-button :loading="loading" @click="test">
        加载按钮
      </fl-button>
    </div>

    <div>
      <fl-button>
        <fl-icon name="xianshi_jinggaotianchong" />
        按钮图标
      </fl-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);

function test() {
  console.log('触发用户绑定事件');
  loading.value = !loading.value;

  Promise.resolve().then(() => {
    setTimeout(() => {
      loading.value = !loading.value;
    }, 2500);
  });
}
</script>

<style lang="scss" scoped>

</style>
