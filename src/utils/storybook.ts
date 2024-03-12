import { AutoMeta } from '@/types/storybook';
import { Meta } from '@storybook/web-components';

/**
 * 从autoMeta中提取argTypes
 */
export function getArgTypesFromAutoMeta(metaCache: AutoMeta) {
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