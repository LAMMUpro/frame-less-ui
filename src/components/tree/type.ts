/**
 * 树节点定义
 */
export interface TreeItem {
  label: string
  value: string
  isLeaf?: boolean
  children?: Array<TreeItem>
  _is_check_?: boolean
}