import { PickDefaultPropsType } from '@/types/index.ts'

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
