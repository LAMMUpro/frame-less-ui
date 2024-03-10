import { Meta } from '@storybook/web-components';
import './index';
import { getDefaultArgs } from '@/utils/storybook';
import { GlobalConfig } from '@/config';
import { Tree } from './index';
import { useState } from 'react';

const argTypes:Meta<Tree>['argTypes'] = {
  name: { 
    control: 'inline-radio', 
    options: ['email', 'phone', 'mail'],
    description: '这是一个描述',
    defaultValue: {
      summary: 'phone',
    }
  },
  arr: {
    control: 'number',
    description: '这是一个描述',
    defaultValue: {
      summary: 666,
    }
  },
}

const meta: Meta<Tree> = {
  component: `${GlobalConfig.componentPrefix}-tree`,
  subtitle: '嵌套树',
  description: '这是一个实验性功能',
  /** props定义 */
  argTypes,
  /** 默认值设置 */
  args: getDefaultArgs(argTypes),
  
}
export default meta;


export const 基本用法 = {
  render: (args) => {
    const [name] = useState('lammu');
    return (
      <div>
        <fl-tree name={args.name}></fl-tree>
      </div>
    )
  },
};

export const 自定义渲染子项目 = {
  render: (args) => (
    <div>
      <fl-tree name={args.name}></fl-tree>
    </div>
  )
};
