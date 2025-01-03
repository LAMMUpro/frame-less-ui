<template>
  <div>
    <h1>fl-button for vue3</h1>
    <fl-button
      v-bind="otherProps"
    ></fl-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, useAttrs } from 'vue';
import './index';

const props = defineProps({

})

const otherProps = useAttrs();

const compRef = ref();

onMounted(()=>{
  compRef.value?._onMounted?.();
})

defineExpose({
  
})
</script>

<style lang="scss" scoped>

</style>
