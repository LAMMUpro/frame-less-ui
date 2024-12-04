<template>
  <div class="fl-qr-code">
    <canvas ref="canvas" aria-label="qrcode"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";

const props = defineProps({
  text: {
    type: String,
    required: true
  },
})

const emit = defineEmits<{
  (e: 'error', data: any): void
  (e: 'updated'): void
}>();

watch(() => props.text, () => {
  if (props.text) {
    nextTick(() => {
      draw();
    })
  }
}, { immediate: true })

const canvas = ref();

function draw() {
  /**
   * 绘制二维码
   */
  QRCode.toCanvas(canvas.value, props.text, {
    margin: 0,
    width: 200,
    color: {
      dark: '#000000ff',
      light: '#ffffffff',
    },
    errorCorrectionLevel: 'M',
  }, (err) => {
    if (err) {
      this.emit('error', { error: err });
    } else {
      emit('updated');
    }
  });
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

.#{$prefix}-qr-code {
  background-color: gray;
}
</style>
