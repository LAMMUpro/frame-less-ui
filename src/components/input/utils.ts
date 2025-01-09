import { PickDefaultPropsType } from '@/types/index.ts'
import { FC } from 'react'

///////////////////////////////// 属性定义 ///////////////////////////////
/** 属性定义 */
export interface PropsType {
  /** 绑定值，可双向绑定 */
  modelValue: string | number
  /** 类型 */
  type?: string
  /** 提示文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否可清除 */
  clearable?: boolean
  /** 最大长度 */
  maxlength?: number | undefined
  /** 尺寸 */
  size?: 'large' | 'default' | 'small'
}

/** 属性定义Vue3 */
export interface PropsTypeV3 extends PropsType {

}

/** 属性定义React(包括事件/插槽) */
export interface PropsTypeReact extends PropsType {
  /** modelValue改变事件 */
  onUpdateModelValue?: (value: any) => void
  /** 前缀插槽, 传入组件 */
  Prefix: any
  /** 尾缀插槽, 传入组件 */
  Suffix: any
}

///////////////////////////////// 属性默认值 ///////////////////////////////
/** 默认属性 */
export const defaultProps: PickDefaultPropsType<PropsType> = {
  type: 'text',
  placeholder: '请输入',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'default',
  maxlength: undefined,
}

/** 默认属性Vue3 */
export const defaultPropsV3: PickDefaultPropsType<PropsTypeV3> = {
  ...defaultProps,
  placeholder: '请输入-v3',
}


///////////////////////////////// 事件 ///////////////////////////////
/** 事件类型定义 */
export interface EmitType {
  (e: 'update-model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
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
  focus: () => void
}

/** 方法类型定义vue3 */
export interface ExposeTypeV3 extends Omit<ExposeType, '_onMounted'> {
  // 覆盖/拓展组件方法
}

/** 方法类型定义react */
export interface ExposeTypeReact extends Omit<ExposeType, '_onMounted'> {
  // 覆盖/拓展组件方法
}
