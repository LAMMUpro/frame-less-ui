<template>
  <div class="fl-paging-select">
    <fl-input-placeholder />
    <div class="search-input">
      <input type="text" placeholder="请输入关键词进行搜索" v-model="searchText">
    </div>
    
    <div class="selected-items" v-if="selectedItems.length">
      <div class="selected-tag" v-for="item in selectedItems" :key="item.id">
        {{ item.name }}
        <span class="remove-btn" @click="removeSelected(item)">×</span>
      </div>
    </div>

    <div class="items-list">
      <div 
        v-for="item in displayItems" 
        :key="item.id" 
        class="list-item"
        :class="{ selected: isSelected(item) }"
        @click="toggleSelect(item)"
      >
        <input type="checkbox" :checked="isSelected(item)">
        <span>{{ item.name }}</span>
      </div>
    </div>

    <div class="footer">
      <a class="load-more" v-if="hasMore" @click="loadMore">点击加载更多</a>
      <div class="buttons">
        <button class="cancel" @click="reset">取消选择</button>
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import '../input-placeholder'

interface Item {
  id: string | number
  name: string
  [key: string]: any
}

const props = defineProps({
  multiple: { type: Boolean, default: true },
  pageSize: { type: Number, default: 10 },
  loadData: {
    type: Function,
    required: true,
  }
})

const emit = defineEmits<{
  (e: 'update:selected', value: Item[]): void
  (e: 'confirm', value: Item[]): void
}>()

const searchText = ref('')
const selectedItems = ref<Item[]>([])
const currentPage = ref(1)
const hasMore = ref(true)
const items = ref<Item[]>([])
const loading = ref(false)

watch(searchText, () => {
  currentPage.value = 1
  items.value = []
  loadItems()
})

const displayItems = computed(() => {
  return items.value
})

const isSelected = (item: Item) => {
  return selectedItems.value.some(selected => selected.id === item.id)
}

const toggleSelect = (item: Item) => {
  if (!props.multiple) {
    selectedItems.value = [item]
    return
  }
  
  const index = selectedItems.value.findIndex(selected => selected.id === item.id)
  if (index === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(index, 1)
  }
  emit('update:selected', selectedItems.value)
}

const removeSelected = (item: Item) => {
  const index = selectedItems.value.findIndex(selected => selected.id === item.id)
  if (index !== -1) {
    selectedItems.value.splice(index, 1)
    emit('update:selected', selectedItems.value)
  }
}

const loadMore = () => {
  currentPage.value++
  loadItems()
}

const loadItems = async () => {
  if (loading.value) return
  
  try {
    loading.value = true
    const result = await props.loadData(currentPage.value, searchText.value)
    
    if (currentPage.value === 1) {
      items.value = result.items
    } else {
      items.value = [...items.value, ...result.items]
    }
    
    hasMore.value = result.hasMore
  } catch (error) {
    console.error('Failed to load items:', error)
  } finally {
    loading.value = false
  }
}

const confirm = () => {
  emit('confirm', selectedItems.value)
}

const reset = () => {
  selectedItems.value = []
  searchText.value = ''
  currentPage.value = 1
  items.value = []
  loadItems()
  emit('update:selected', [])
}

loadItems()

defineExpose({
  reset,
  getSelected: () => selectedItems.value
})
</script>

<style lang="scss">
.fl-paging-select {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  .search-input {
    padding: 12px;
    border-bottom: 1px solid #eee;
    
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      &::placeholder {
        color: #999;
      }
    }
  }

  .selected-items {
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .selected-tag {
      background: #f0f0f0;
      padding: 4px 8px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      
      .remove-btn {
        margin-left: 4px;
        cursor: pointer;
      }
    }
  }

  .items-list {
    max-height: 300px;
    overflow-y: auto;
    padding: 8px;

    .list-item {
      display: flex;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      
      &:hover {
        background-color: #f5f5f5;
      }
      
      &.selected {
        background-color: #e6f7ff;
      }
      
      input[type="checkbox"] {
        margin-right: 8px;
      }
    }
  }

  .footer {
    padding: 12px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .load-more {
      color: #1890ff;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }

    .buttons {
      display: flex;
      gap: 8px;

      button {
        padding: 6px 16px;
        border-radius: 4px;
        cursor: pointer;
        
        &.cancel {
          border: 1px solid #d9d9d9;
          background: white;
          &:hover {
            border-color: #40a9ff;
            color: #40a9ff;
          }
        }
        
        &.confirm {
          background: #1890ff;
          color: white;
          border: none;
          &:hover {
            background: #40a9ff;
          }
        }
      }
    }
  }
}
</style>
