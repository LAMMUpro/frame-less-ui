import { SB } from '@/types/storybook';
import { Meta } from '@storybook/web-components';
import { JSDoc } from 'typescript';

/** 文档table枚举 */
export const docTypes = ['prop', 'event', 'method', 'slot', 'cssvar', 'part'] as const;

/**
 * 文档配置
 */
export const tableInfoList = [
  {
    name: 'props',
    nameCh: '属性',
    columns: [
      {
        name: '属性名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
      {
        name: '类型',
        key: 'type',
      },
      {
        name: '默认值',
        key: 'default',
      },
    ],
  },
  {
    name: 'events',
    nameCh: '事件',
    columns: [
      {
        name: '事件名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
      {
        name: '参数详情',
        key: 'detail',
      },
    ],
  },
  {
    name: 'methods',
    nameCh: '方法',
    columns: [
      {
        name: '方法名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
      {
        name: '参数详情',
        key: 'detail',
      },
    ],
  },
  {
    name: 'slots',
    nameCh: '插槽',
    columns: [
      {
        name: '插槽名',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
    ],
  },
  {
    name: 'cssvars',
    nameCh: 'css变量',
    columns: [
      {
        name: '变量名',
        key: 'name',
      },
      {
        name: '值类型',
        key: 'type',
      },
      {
        name: '默认值',
        key: 'default',
      },
    ],
  },
  {
    name: 'parts',
    nameCh: 'part',
    columns: [
      {
        name: 'part值',
        key: 'name',
      },
      {
        name: '描述',
        key: 'describe',
      },
    ],
  }
]

/**
 * 从autoMeta中提取argTypes
 */
export function getArgTypesFromAutoMeta(metaCache: SB.AutoMeta) {
  return metaCache.tableInfo.props.reduce((result, item) => {
    result[item.name] = {
      description: item.describe,
      control: item.control || 'text',
      options: JSON.parse(item.options || '[]'),
      type: {
        required: item.required == undefined ? false : true,
      },
      defaultValue: {
        summary: item.control === 'number' ? +item.default: item.default,
      }
    }
    return result;
  }, {});
}

/**
 * 从argTypes中提取默认值作为args
 */
export function getDefaultArgs(argTypes: Meta['argTypes']) {
  const defaultArgs = {};
  Object.keys(argTypes).forEach(key => {
    const defaultValue = argTypes[key].defaultValue?.summary;
    if (defaultValue) defaultArgs[key] = defaultValue;
  })
  return defaultArgs;
}

/** 从jsDocItem中提取参数 */
export function getInfoFromJSDoc(jsDoc: JSDoc) {
  const info = jsDoc.tags?.reduce((result, item) => {
    if (item.tagName.escapedText)
      result[item.tagName.escapedText] = item.comment;
    return result;
  }, {} as Required<SB.DocInfo>) || {} as Required<SB.DocInfo>;
  if (!info.describe)
    info.describe = (jsDoc.comment || '') as string;
  return info;
}