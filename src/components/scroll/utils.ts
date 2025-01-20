import { PickDefaultPropsType } from '@/types/index.ts'

///////////////////////////////// 属性定义 ///////////////////////////////
/** 属性定义 */
export interface PropsType {
  // /** 绑定值，可双向绑定 */
  // value: string | number | Array<any>
}

/** 属性定义Vue3 */
export interface PropsTypeV3 extends PropsType {

}

/** 属性定义React(包括事件/插槽) */
export interface PropsTypeReact extends PropsType {
  // /** id改变事件 */
  // onUpdateId?: (value: any) => void
}

///////////////////////////////// 属性默认值 ///////////////////////////////
/** 默认属性 */
export const defaultProps: PickDefaultPropsType<PropsType> = {

}

/** 默认属性Vue3 */
export const defaultPropsV3: PickDefaultPropsType<PropsTypeV3> = {
  ...defaultProps,
}


///////////////////////////////// 事件 ///////////////////////////////
/** 事件类型定义 */
export interface EmitType {
  (e: 'update-id', value: any): void
}

/** 事件类型定义vue3 */
export interface EmitTypeV3 extends EmitType {
  // 覆盖/拓展组件事件
  (e: 'update:id', value: any): void
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
