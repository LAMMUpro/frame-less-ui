<template>
  <div class="popup-demo">
    <fl-button @click="visible = true">打开底部弹出框</fl-button>
    
    <fl-popup 
      :modelValue="visible"
      @update-model-value="visible = $event.detail[0]"
      title="标题"
      round
    >
      <div class="popup-content">
        这是弹出框的内容
      </div>
      <div slot="footer">
        <fl-button type="primary" @click="visible = false">确定</fl-button>
        <fl-button plain @click="visible = false">取消</fl-button>
      </div>
    </fl-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '../../button'

const visible = ref(false)
</script>

<style lang="scss" scoped>
.popup-demo {
  padding: 20px;
}

.popup-content {
  min-height: 100px;
}
</style>
