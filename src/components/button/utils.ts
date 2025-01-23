import { PickDefaultPropsType } from '@/types/index.ts'

///////////////////////////////// 属性定义 ///////////////////////////////
/** 属性定义 */
export interface PropsType {
  /** 
   * 按钮类型
   * @description 设置按钮的样式类型，不同类型呈现不同的背景色和悬停效果
   * @values 
   * - primary: 主要按钮，蓝色
   * - success: 成功按钮，绿色
   * - warning: 警告按钮，橙色
   * - danger: 危险按钮，红色
   * - info: 信息按钮，灰色
   * @default 'primary'
   * @example
   * <fl-button type="primary">主要按钮</fl-button>
   * <fl-button type="success">成功按钮</fl-button>
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'

  /** 
   * 是否为朴素按钮
   * @description 朴素按钮将继承按钮类型的颜色但具有白色背景
   * - 默认情况下背景色为白色
   * - 文字和边框颜色与按钮类型相对应
   * - 鼠标悬停时背景色会有轻微变化
   * @default false
   * @example
   * <fl-button plain type="primary">朴素按钮</fl-button>
   */
  plain?: boolean

  /** 
   * 是否为圆角按钮
   * @description 将按钮边角变为圆形
   * - 设置后按钮的border-radius为20px
   * - 适用于需要更柔和外观的场景
   * @default false
   * @example
   * <fl-button round>圆角按钮</fl-button>
   */
  round?: boolean

  /** 
   * 是否禁用按钮
   * @description 设置按钮为禁用状态
   * - 禁用状态下按钮不可点击
   * - 样式变为灰色且添加禁用样式
   * - 鼠标悬停时显示禁用光标
   * @default false
   * @example
   * <fl-button disabled>禁用按钮</fl-button>
   */
  disabled?: boolean

  /** 
   * 按钮图标类名
   * @description 在按钮内显示图标
   * - 需要传入完整的图标类名
   * - 图标会显示在文字的左侧
   * - 当设置loading时，icon将不会显示
   * @default ''
   * @example
   * <fl-button icon="fl-icon-search">搜索</fl-button>
   */
  icon?: string

  /** 
   * 是否显示加载状态
   * @description 设置按钮为加载状态
   * - 加载状态下显示加载图标
   * - 按钮不可点击
   * - 会覆盖icon的显示
   * - 添加loading遮罩层
   * @default false
   * @example
   * <fl-button loading>加载中</fl-button>
   */
  loading?: boolean

  /** 
   * 是否为文字按钮
   * @description 将按钮设置为文字按钮样式
   * - 没有边框和背景色
   * - 鼠标悬停时显示背景色
   * - 可以和type属性一起使用呈现不同的文字颜色
   * @default false
   * @example
   * <fl-button text>文字按钮</fl-button>
   * <fl-button text type="primary">主要文字按钮</fl-button>
   */
  text?: boolean
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
  type: 'primary',
  plain: false,
  round: false,
  disabled: false,
  icon: '',
  loading: false,
  text: false
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
