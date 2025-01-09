import { PickDefaultPropsType } from '@/types/index.ts'
import { FC } from 'react'

///////////////////////////////// 属性定义 ///////////////////////////////
/** 属性定义 */
export interface PropsType {
  /** 通过此变量来控制弹窗显示 */
  showPopup?: boolean | null
  /** 绑定值，可双向绑定 */
  id: string | number | Array<any>
  /** 值对应的名称 */
  label?: string | number | Array<any>
  /** 请求数据函数 */
  // type: Function as PropType<(...args: any) => Promise<ApiResult<ApiResultList>>>,
  api: (...args: any) => Promise<any>
  /** 是否立即执行请求 */
  immediate?: boolean
  /** 请求参数 */
  requestParams?: {[key: string]: any}
  /** 处理 options 函数，函数逻辑不可更改原来 options 长度 */
  patchOptions?: (options: {[key: string]: any}[]) => {[key: string]: any}[]
  /** 是否多选 */
  multiple?: boolean
  /** 外部是否可以清除选中值 */
  clearable?: boolean
  /** 关键词搜索对应的字段，默认为keyword */
  remoteKey?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 选项数据配置项 */
  optionSetting?: {[key: string]: any}
  /** 是否显示搜索框 */
  isShowSearchBar?: boolean
  /** 是否显示新增数据按钮 */
  isShowInsertRecordBtn?: boolean
  /** 选择器占位字符串 */
  placeholderForNotSelect?: string
  /** 搜索框占位字符串 */
  placeholderForSearchBar?: string
  /** 弹窗标题 */
  title?: string
}

/** 属性定义Vue3 */
export interface PropsTypeV3 extends PropsType {

}

/** 属性定义React(包括事件/插槽) */
export interface PropsTypeReact extends PropsType {
  /** id改变事件 */
  onUpdateId?: (value: any) => void
  /** label改变事件 */
  onUpdateLabel?: (value: any) => void
}

///////////////////////////////// 属性默认值 ///////////////////////////////
/** 默认属性 */
export const defaultProps: PickDefaultPropsType<PropsType> = {
  showPopup: null,
  label: '',
  immediate: false,
  requestParams: {},
  patchOptions: (options) => options,
  multiple: false,
  clearable: true,
  remoteKey: 'keyword',
  disabled: false,
  optionSetting: {},
  isShowSearchBar: true,
  isShowInsertRecordBtn: false,
  placeholderForNotSelect: '点击选择',
  placeholderForSearchBar: '请输入关键词进行搜索',
  title: '选择器'
}

/** 默认属性Vue3 */
export const defaultPropsV3: PickDefaultPropsType<PropsTypeV3> = {
  ...defaultProps,
}


///////////////////////////////// 事件 ///////////////////////////////
/** 事件类型定义 */
export interface EmitType {
  (e: 'update-show-popup', value: boolean): void
  (e: 'update-id', value: any): void
  (e: 'update-label', value: any): void
  (e: 'change', value: any | Array<any> | undefined, selectedItem?: any | Array<any> | undefined): void
}

/** 事件类型定义vue3 */
export interface EmitTypeV3 extends EmitType {
  // 覆盖/拓展组件事件
  (e: 'update:modelValue', value: string | number, b: number): void
}

///////////////////////////////// 方法 ///////////////////////////////
/** 方法类型定义 */
export interface ExposeType {
  _onMounted: () => Promise<void>
}

/** 方法类型定义vue3 */
export interface ExposeTypeV3 extends Omit<ExposeType, '_onMounted'> {
  // 覆盖/拓展组件方法
}

/** 方法类型定义react */
export interface ExposeTypeReact extends Omit<ExposeType, '_onMounted'> {
  // 覆盖/拓展组件方法
}
