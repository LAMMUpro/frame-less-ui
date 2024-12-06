<template>
  <div class="fl-qr-code">
    <canvas ref="canvas" aria-label="qrcode"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";

const props = defineProps({
  /**
   * 二维码内容
   */
  text: {
    type: String,
    required: true
  },
  /**
   * 二维码宽度
   */
  width: {
    type: Number,
    default: 200
  },
  /**
   * 二维码暗色
   */
  darkColor: {
    type: String,
    default: '#000000ff'
  },
  /**
   * 二维码亮色
   */
  lightColor: {
    type: String,
    default: '#ffffffff'
  },
  /**
   * 二维码纠错级别
   */
  errorLevel: {
    type: String as () => QRCodeErrorCorrectionLevel,
    default: 'M',
    validator: (value: string) => ['L', 'M', 'Q', 'H'].includes(value)
  },
  /**
   * 二维码边距
   */
  margin: {
    type: Number,
    default: 0
  }
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
    margin: props.margin,
    width: props.width,
    color: {
      dark: props.darkColor,
      light: props.lightColor,
    },
    errorCorrectionLevel: props.errorLevel,
  }, (err) => {
    if (err) {
      emit('error', { error: err });
    } else {
      emit('updated');
    }
  });
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

.#{$prefix}-qr-code {
  display: inline-block;
  canvas {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
