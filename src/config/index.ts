/** 全局配置 */
export const GlobalConfig = {
  /** 是否使用shadow dom */
  useShadow: false,
  /** 组件前缀 <[前缀]-[组件名]> */
  componentPrefix: 'fl',
}

/** 全局变量, 没有响应式 */
export const GlobalVar: {
  /** 全局popover弹出容器 */
  FlPopoverContainerDom?: HTMLElement
} = {
  FlPopoverContainerDom: undefined,
}

