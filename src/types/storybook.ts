/** 文档table枚举 */
export const docTypes = ['prop', 'event', 'method', 'slot', 'cssvar', 'part'] as const;

/** 文档table类型 */
export type DocType = typeof docTypes[number];

/** 文档table item格式 */
export interface DocInfo {
  name: string;
  describe?: string;
  detail?: string;
}
