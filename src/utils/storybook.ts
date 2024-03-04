import { Meta } from '@storybook/web-components';

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