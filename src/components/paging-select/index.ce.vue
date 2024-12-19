<template>
  <fl-popover trigger="click" placement="bottom" :disabled="isMobile()">
    <fl-input-placeholder
      :class="otherProps.class"
      :style="otherProps.style"
      v-if="props.showPopup === null"
      :id="props.id"
      :labelForUser="(labelForUser as string)"
      :disabled="props.disabled"
      :clearable="props.clearable"
      :isShowQuesIcon="!!props.id && !props.label"
      :placeholderForNotSelect="props.placeholderForNotSelect"
      @click="!props.disabled && (isShowPopup=!isShowPopup)"
      @clear="clearAllSelect"
    ></fl-input-placeholder>
    <div slot="popover-content" style="height: 260px; overflow-y: scroll;">
      <div
        v-for="item in dataList"
        :key="item[keySetting['id']]"
        :class="['pc-item', { active: currentSelectIds.includes(item[keySetting['id']]) }]"
        @click="pcItemSelect(item)"
      >
        {{ item[keySetting['label']] }}
      </div>
      <fl-load-more class="py-1!" :autoLoad="!props.immediate" :loading="loading" :noMoreData="isNoMoreData" @getData="onLoadMore" normalContent="点击加载更多"/>
    </div>
  </fl-popover>
  <fl-popup
    v-if="isMobile()"
    round
    position="bottom"
    class="h-85%"
    :model-value="isShowPopup"
    @update-model-value="isShowPopup = $event.detail[0]"
    closeable
    @close="close()"
    @cancel="close()"
  >
    <!-- 标题 -->
    <div class="popup-header" slot="header">
      <span class="popup-title">{{ props.title }}</span>
    </div>
    <div class="popup-container">
      <!-- 搜索框 -->
      <div class="search-wrapper">
        <div class="search-input" v-if="props.isShowSearchBar">
          <input type="text" style="width: 100%; line-height: 1.5rem; padding-left: 8px;" placeholder="请输入关键词进行搜索">
        </div>
      </div>
      <!-- 当前选中 -->
      <div v-if="props.multiple" class="selected-items">
        <span>当前选中：{{ currentSelectIds.length }}项目, 查看详情</span>
        <div>
          <fl-tag type="primary" class="tag-item" v-for="(id, index) in currentSelectIds" :key="index">{{ id }}</fl-tag>
        </div>
      </div>
      <div v-else class="single-select">
        <span class="select-label">
          <span>当前选中：</span>
          <fl-tag v-if="currentSelectIds[0]" plain type="primary" size="medium" closeable @close="deleteSelectItem(0)">{{ currentSelectLables[0] || currentSelectIds[0] }}</fl-tag>
          <span v-else>无</span>
        </span>
      </div>
      <div class="content-wrapper">
        <div
          :finished="isNoMoreData"
          finished-text="没有更多了"
        >
          <!-- 多选情况 -->
          <!-- <fl-checkbox-group v-model="currentSelectIds" shape="square" v-if="props.multiple">
            <fl-checkbox
              class="py-2"
              :name="item[keySetting['id']]"
              :title-class="[{'bg-blue': item[keySetting['id']] === props.id }]"
              v-for="(item, index) in dataList"
              :key="item[keySetting['id']]"
              @click="onSelectItem(item)"
            >
              <slot v-if="slots.default" v-bind="{ item, index }"></slot>
              <span v-else>{{ item[keySetting['label']] }}</span>
            </fl-checkbox>
          </fl-checkbox-group> -->
          <!-- 单选情况 -->
          <fl-radio-group
            :modelValue="currentSelectIds[0]"
            @update-model-value="currentSelectIds = [$event.detail[0]]"
            icon-size="1rem"
          >
            <fl-radio
              class="py-2"
              :value="item[keySetting['id']]"
              :title-class="[{'bg-blue': item[keySetting['id']] === props.id }]"
              v-for="(item, index) in dataList"
              :key="item[keySetting['id']]"
              @click="onSelectItem(item)"
            >
              <span>{{ item[keySetting['label']] }}</span>
            </fl-radio>
          </fl-radio-group>
        </div>
        <!-- 有数据时才显示，没数据时会自动调一次请求接口 -->
        <div class="fcc" >
          <fl-load-more class="py-1!" :autoLoad="!props.immediate" :loading="loading" :noMoreData="isNoMoreData" @getData="onLoadMore" normalContent="点击加载更多"/>
        </div>
      </div>
    </div>
    <div class="button-group" slot="footer">
      <fl-button class="btn add-button" style="width: 100%;" type="default" size="small" @click="todo" v-if="isShowInsertRecordBtn">新增数据</fl-button>
      <fl-button class="btn confirm-button" style="width: 100%;" type="primary" size="small" @click="onComfirm()">确定</fl-button>
    </div>
  </fl-popup>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, useSlots, type PropType } from 'vue';
import '../input-placeholder';
import '../popup';
import '../button';
import '../tag';
import '../radio';
import '../radio-group';
import '../popover';
import '../load-more';
import { useAttrs } from 'vue';
import { isMobile } from '@/utils';

function usePageInfo() {
  return {
    pageSize: 10,
    currentPage: 1,
    total: 0,
  }
}

/** pc端选项选中 */
function pcItemSelect(item: any) {
  if (props.multiple) {
    
  } else {
    currentSelectIds.value = item[keySetting.value['id']]
  }
  onSelectItem(item);
  onComfirm();
}

const props = defineProps({
  /** 通过此变量来控制弹窗显示 */
  showPopup: {
    type: Boolean,
    default: null,
  },
  /** 双向绑定的值 */
  id: {
    type: [String, Number, Array],
    default: ''
  },
  /** 值对应的名称 */
  label: {
    type: [String, Number, Array],
    default: ''
  },
  /** 请求数据函数 */
  api: {
    type: Function as PropType<(...args: any) => Promise<ApiResult<ApiResultList>>>,
    required: true
  },
  /** 是否立即执行请求 */
  immediate: {
    type: Boolean,
    default: false,
  },
  /** 请求参数 */
  requestParams: {
    type: Object,
    default: () => ({})
  },
  /** 处理 options 函数，函数逻辑不可更改原来 options 长度 */
  patchOptions: {
    type: Function as PropType<(options: BaseObj<any>[]) => BaseObj<any>[]>,
    default: (options: BaseObj<any>[]) => options
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 外部是否可以清除选中值 */
  clearable: {
    type: Boolean,
    default: true
  },
  /** 关键词搜索对应的字段，默认为keyword */
  remoteKey: {
    type: String,
    default: 'keyword'
  },
  
  disabled: {
    type: Boolean,
    default: false
  },
  /** 选项数据配置项 */
  optionSetting: {
    type: Object as PropType<Partial<ArrayItemSetting>>,
    default: () => ({})
  },

  /**
   * 一些显示/隐藏配置
   */
  /** 是否显示搜索框 */
  isShowSearchBar: {
    type: Boolean,
    default: true,
  },
  /** 是否显示新增数据按钮 */
  isShowInsertRecordBtn: {
    type: Boolean,
    default: false,
  },

  /**
   * 一些文案配置
   */
  /** 选择器占位字符串 */
  placeholderForNotSelect: {
    type: String,
    default: '点击选择'
  },
  /** 搜索框占位字符串 */
  placeholderForSearchBar: {
    type: String,
    default: '请输入关键词进行搜索'
  },
  /** 弹窗标题 */
  title: {
    type: String,
    default: '选择器',
  },
});

const emit = defineEmits<{
  (e: 'update-show-popup', value: boolean): void
  (e: 'update-id', value: any): void
  (e: 'update-label', value: any): void
  (e: 'change', value: any | Array<any> | undefined, selectedItem?: any | Array<any> | undefined): void
}>();

const otherProps = useAttrs();

/** 选项配置 */
const keySetting = computed(() => {
  return {
    label: 'label',
    id: 'id',
    ...props.optionSetting,
  }
})

function todo() {
  alert('待开发');
}

/** 是否显示弹窗 */
const isShowPopup = ref(false);

/** 关闭弹窗 */
function close() {
  isShowPopup.value = false;
}

/** 搜索关键词 */
const keyword = ref('');

/** 由外部变量控制是否显示内部弹窗 */
watch(() => props.showPopup, () => {
  if (props.showPopup) {
    isShowPopup.value = props.showPopup;
  }
})

/** 
 * 关键词改变时，重置分页/重新搜索
 */
watch(() => keyword.value, () => {
  dataList.value = [];
  pageInfo = usePageInfo();
  getData();
})

/** 
 * 弹窗显示/隐藏
 */
watch(() => isShowPopup.value, () => {
  if (isShowPopup.value) {
    currentSelectIds.value = props.multiple ? props.id as Array<string> : [props.id] as Array<string>;
    currentSelectLables.value = props.multiple ? props.label as Array<string> : [props.label] as Array<string>;
    currentSelectItems.value = [];
    
    /** 打开弹窗，没数据时请求一遍数据 */
    if (!dataList.value.length) {
      getData();
    }
  } else {
    emit('update-show-popup', false);
  }
})

/** 当前选中ids */
const currentSelectIds = ref<Array<string>>([]);

/** 当前选中labels */
const currentSelectLables = ref<Array<string>>([]);

/** 当前选中项（深拷贝后） */
const currentSelectItems = ref<Array<any>>([]);

/** 当前选中值对应的名称(弹窗外给用户看的) */
const labelForUser = ref(props.label);

/** 当前数据列表 */
const dataList = ref<Array<any>>([]);

/** 数据加载中 */
const loading = ref(false);

/** 没有更多数据了 */
const isNoMoreData = ref(false);

/** 请求参数-页码信息 */
let pageInfo = usePageInfo();

/** 选中某一项 */
function onSelectItem(_item: any) {
  const item = JSON.parse(JSON.stringify(_item));
  const id = item[keySetting.value['id']];
  const label = item[keySetting.value['label']];
  if (props.multiple) {

  } else {
    currentSelectItems.value = [item];
    currentSelectLables.value = [label];
  }
}

/** 确定选中 */
function onComfirm() {
  emit('update-id', props.multiple ? currentSelectIds.value : currentSelectIds.value[0]);
  emit('change', props.multiple ? currentSelectIds.value : currentSelectIds.value[0], props.multiple ? currentSelectItems.value : currentSelectItems.value[0]);
  labelForUser.value = props.multiple ? currentSelectItems.value.map(item => item[keySetting.value['label']]).join(',') : currentSelectLables.value[0];
  emit('update-label', props.multiple ? currentSelectLables.value : currentSelectLables.value[0]);
  close();
}

/** 从外部清除所有选中 */
function clearAllSelect() {
  labelForUser.value = '';
  emit('update-id', '');
  emit('update-label', '');
  emit('change', props.multiple ? [] : undefined, props.multiple ? [] : undefined);
}

/** 删除选中 */
function deleteSelectItem(index: number) {
  currentSelectIds.value = [];
  currentSelectLables.value = [];
  currentSelectItems.value = [];
}

/** 加载更多数据 */
function onLoadMore() {
  pageInfo.currentPage += 1;
  getData();
}

/** 获取数据 */
const getData = async () => {
  if (!props.api) return console.warn('PagingSelect组件请传入api');
  // 加载状态结束
  loading.value = true;
  const res = await props.api({ ...pageInfo, [props.remoteKey]: keyword.value });
  loading.value = false;
  if (res.success) {
    const result = res.data.list;
    dataList.value.push(...result);
    isNoMoreData.value = dataList.value.length >= res.data.totalCount!;

    /** 单选 未传label */
    if (!props.multiple && currentSelectIds.value[0] && !currentSelectLables.value[0]) {
      const item = result.find(item => item[keySetting.value['id']] == props.id);
      if (item) {
        currentSelectLables.value[0] = item[keySetting.value['label']];
        currentSelectItems.value[0] = JSON.parse(JSON.stringify(item));
      }
    }
  }
};

onMounted(()=>{
  /** 如果immediate为true，则马上发送请求 */
  if (props.immediate) getData();
})

defineExpose({
  
})
</script>

<style lang="scss">
.popup-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-title {
  font-size: 1.125rem;
  font-weight: 800;
}

.popup-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-wrapper {
  padding: 0 1rem;
}

.search-input {
  width: 100%;
  z-index: 2;
}

.selected-items {
  padding: 0 1rem;
}

.single-select {
  padding: 0 1rem;
  padding-top: 0.25rem;
  text-align: left;
}

.select-label {
  color: #999;
}

.tag-item {
  margin-right: 0.25rem;
}

.content-wrapper {
  flex: 1;
  overflow: scroll;
  padding: 0 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  gap: 0.25rem;
  .add-button {
    flex-grow: 1;
  }

  .confirm-button {
    flex-grow: 2;
  }
}

.pc-item {
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  padding: 6px 12px;
  &:hover {
    background-color: #f5f7fa;
  }
  &.active {
    color: #1890FF;
  }
}
</style>
