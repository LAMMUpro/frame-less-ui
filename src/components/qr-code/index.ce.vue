<template>
  <div class="fl-qr-code">
    <canvas ref="canvas" aria-label="qrcode"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, useAttrs, watch, nextTick } from 'vue';
import QRCode from "qrcode";
import { EmitType, PropsType, defaultProps } from './utils.ts';

// @ts-ignore
const props = withDefaults(defineProps<PropsType>(), defaultProps);

const emit = defineEmits<EmitType>();

const otherProps = useAttrs();

watch(() => props.text, () => {
  if (props.text) {
    nextTick(() => {
      draw();
    })
  }
}, { immediate: true })

const canvas = ref();

function draw(str?: string) {
  if (str) {
    emit('update-text', str)
  }
  /**
   * 绘制二维码
   */
  QRCode.toCanvas(canvas.value, str || props.text, {
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

/** 用于平替onMounted */
async function _onMounted() {
  console.log('>>> qr-code _onMounted')
}

defineExpose({
  _onMounted,
  draw,
})
</script>

<style lang="scss">
@import '@/styles/common.scss';
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
