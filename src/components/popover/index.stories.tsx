import { getDefaultArgs, getArgTypesFromAutoMeta } from '@/utils/storybook';
import { GlobalConfig } from '@/config';
import metaCache from './meta.cache';
import { SB } from '@/types/storybook';
import './index'; // 注册组件
import { useState } from 'react';
import FlPopover from './react.cache';

const argTypes = getArgTypesFromAutoMeta(metaCache);
const storyMeta: SB.StoryMeta = {
  component: `<${GlobalConfig.componentPrefix}-${metaCache.componentName}>`,
  subtitle: metaCache.subtitle,
  description: metaCache.description,
  argTypes,
  args: getDefaultArgs(argTypes),
}
export default storyMeta;



export const 基本用法 = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    function change() {
      setValue(new Date().getTime() + '');
    }
    return (
      <div>
        <div>
          <FlPopover {...args} value={value} />
        </div>
        <button onClick={change}>变换</button>
      </div>
    )
  },
};

