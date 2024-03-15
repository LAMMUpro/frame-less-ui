import { docTypes } from '@/utils/storybook';
import { JSDoc } from 'typescript';

/**
 * storybook命名空间
 */
export namespace SB {
  /** ast member jsdoc */
  export interface MemberJsDoc {
    jsDoc?: Array<JSDoc|undefined>
  }

  /** 文档table类型 */
  export type DocType = typeof docTypes[number];

  /** 控制器 */
  export type Control = 
    'array' | // 数字，可以配置separator
    'boolean' | 
    'number' | 'range' | // 数字，可以配置min, max, step
    'object' | 
    'inline-radio' | 'inline-check' | 'select' | 'multi-select' | // 枚举，需要配置options
    'text' | 'color' | 'date'

  /** 
   * 文档table item格式 
   */
  export interface DocInfo {
    /** 名称 */
    name: string
    /** 描述 */
    describe?: string
    /** 详情 */
    detail?: string
    /** 控制器 */
    control?: Control
    /** 是否必传 */
    required?: ""
    /** 选项 */
    options?: string
    /** 默认值 */
    default?: string
  }

  /** 
   * 自动生成的组件meta
   */
  export interface AutoMeta {
    /** 组件名称(不带前缀) */
    componentName: string
    /** 副标题 */
    subtitle?: string
    /** 组件描述 */
    description?: string
    /** 组件文档 */
    tableInfo: {
      props?: Array<DocInfo>
      events?: Array<DocInfo>
      methods?: Array<DocInfo>
      slots?: Array<DocInfo>
      cssvars?: Array<DocInfo>
      parts?: Array<DocInfo>
    },
  }

  /**
   * storybook的meta
   */
  export interface StoryMeta {
    /** 组件名（带前缀） */
    component: string
    /** 副标题 */
    subtitle: AutoMeta['subtitle']
    /** 组件描述 */
    description: AutoMeta['description']
    /** props定义 */
    argTypes: {
      [key: string]: {
        /** 控制器 */
        control: Control
        /** 数字控制器需要配置 */
        min?: number
        /** 数字控制器需要配置 */
        max?: number
        /** 数字控制器需要配置 */
        step?: number
        /** 枚举类型需要配置 */
        options?: Array<any>
        type: {
          required: boolean
        }
        /** 默认值 */
        defaultValue?: {
          summary: any
        }
      }
    }
    /** 默认值设置 */
    args: {
      [key: string]: any
    }
  }
}