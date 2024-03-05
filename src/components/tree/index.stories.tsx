import { Meta, StoryObj } from '@storybook/web-components';
import './index';
import { getDefaultArgs } from '@/utils/storybook';
import { GlobalConfig } from '@/config';
import { Tree } from './index';

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
  // tags: ['autodocs'], // 自动生成组件DOCS文档
  /** props定义 */
  argTypes,
  /** 默认值设置 */
  args: getDefaultArgs(argTypes),
  
}
export default meta;

/**
 * 案例1
 */
export const case_1 = {
  name: "默认",
  tags: [], // 标签，用于搜索
  args: {
    // name: "word!",
  },
  parameters: {
    docs: {
      source: {
        code: `<fl-tree>// TODO源码映射</fl-tree>`,
      },
    },
  },
};

/**
 * 案例2
 */
export const case_2:StoryObj = {
  name: "成功",
  tags: [], // 标签，用于搜索
  render: () => (<div><fl-tree name="www"></fl-tree></div>),
};
