import { getDefaultArgs, getArgTypesFromAutoMeta } from '@/utils/storybook';
import { GlobalConfig } from '@/config';
import metaCache from './meta.cache';
import { SB } from '@/types/storybook';
import './index'; // 注册组件

const argTypes = getArgTypesFromAutoMeta(metaCache);

const storyMeta: SB.StoryMeta = {
  componentName: `<${GlobalConfig.componentPrefix}-${metaCache.componentName}>`,
  subtitle: metaCache.subtitle,
  description: metaCache.description,
  argTypes,
  args: getDefaultArgs(argTypes),
}

export default storyMeta;

export const 基本用法 = {
  render: (args: any) => {
    console.log('args', args)
    return ({
      setup() {
        return { args };
      },
      template: '<fl-qr-code v-bind="args" text="sfsfsd" />',
    })
  },
};