<template>
  <div class="load-more" ref="obserView">
    <span v-if="props.loading">{{ props.loadingContent }} <van-loading /></span>
    <span v-else-if="props.noMoreData">{{ props.noMoreContent }}</span>
    <span v-else @click="getData" class="pointer">{{ props.normalContent }}</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from '@/utils';

const props = defineProps({
  /** 是否正在加载数据 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否还有更多数据 */
  noMoreData: {
    type: Boolean,
    default: false
  },
  /** 组件挂载时，马上自动加载数据 */
  autoLoad: {
    type: Boolean,
    default: false,
  },
  /** 数据加载完了显示文本 */
  noMoreContent: {
    type: String,
    default: '没有更多了'
  },
  /** 数据正在加载显示文本 */
  loadingContent: {
    type: String,
    default: '正在加载...'
  },
  /** 还有数据可加载显示文本 */
  normalContent: {
    type: String,
    default: '加载更多'
  },
})

const emits = defineEmits<{
  (event: 'getData'): void
}>()

const observer = ref<IntersectionObserver>()
const obserView = ref()

function registerEvent() {
  observer.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { /** 元素进入视口 */
        if (!props.loading && !props.noMoreData) autoGetData();
      }
    })
  });
  observer.value?.observe(obserView.value);
}

const autoGetData = throttle(getData);

function getData() {
  emits('getData')
}

onMounted(() => {
  if (props.autoLoad) {
    getData();
  }
  registerEvent()
})

onUnmounted(() => {
  observer.value?.disconnect()
})

</script>

<style lang="scss" scoped>
.load-more {
  text-align: center;
  font-size: 14px;
  color: #4E5969;
  padding: 10px 0;
}
.pointer {
  cursor: pointer;
}
</style>