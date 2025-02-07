import { PickDefaultPropsType } from '@/types/index.ts';
import { handleVue2DefaultProps } from '@/utils/index.ts';
import { QRCodeErrorCorrectionLevel } from "qrcode";

///////////////////////////////// 属性定义 ///////////////////////////////
/** 属性定义 */
export interface PropsType {
  /** 二维码内容 */
  text: string
  /** 二维码宽度 */
  width: number
  /** 二维码暗部颜色 */
  darkColor?: string
  /** 二维码亮部颜色 */
  lightColor?: string
  /** 二维码纠错级别 */
  errorLevel?: QRCodeErrorCorrectionLevel
  /** 二维码边距 */
  margin?: number
}

/** 属性定义Vue3 */
export interface PropsTypeV3 extends PropsType {

}

/** 属性定义Vue2 */
export interface PropsTypeV2 extends PropsType {

}

/** 属性定义React(包括事件/插槽) */
export interface PropsTypeReact extends PropsType {
  /** 改变事件 */
  onUpdate?: () => void
  /** text双向绑定事件 */
  onUpdateText?: (text: string) => void
}

///////////////////////////////// 属性默认值 ///////////////////////////////
/** 默认属性 */
export const defaultProps: PickDefaultPropsType<PropsType> = {
  darkColor: '#000000ff',
  lightColor: '#ffffffff',
  errorLevel: 'M',
  margin: 0,
}

/** 默认属性Vue3 */
export const defaultPropsV3: PickDefaultPropsType<PropsTypeV3> = {
  ...defaultProps,
}

/** 默认属性Vue2 */
export const defaultPropsV2: PickDefaultPropsType<PropsTypeV2> = handleVue2DefaultProps({
  ...defaultProps,
})

///////////////////////////////// 事件 ///////////////////////////////
/** 事件类型定义 */
export interface EmitType {
  (e: 'error', data: any): void
  (e: 'updated'): void
  (e: 'update-text', text: string): void
}

/** 事件类型定义vue3 */
export interface EmitTypeV3 extends EmitType {
  // 覆盖/拓展组件事件
  (e: 'update:text', value: string): void
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
