import { useState } from 'preact/hooks';
import './index';
import type { Meta, StoryObj } from '@storybook/web-components';

// Meta<typeof Counter>
const meta: Meta = {
  // title: 'Example/Counter', // 不写可推导出来
  component: 'wc-badge', // webcomponent组件注册后直接用string
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
}
export default meta;

// 实例1
export const Primary = {
  args: {
    value: 20,
    max: 99,
    dot: false,
    type: "success",
    children: "变更历史"
  },
};

// 实例2
export const Secondary: StoryObj = {
  render: () => {
    const [value, setValue] = useState(20);
    return (
      <wc-badge 
        value={value} 
        max={100}
        dot={false}
        type="danger"
      >
        <button onClick={ () => setValue(value + 1)}>徽标</button>
      </wc-badge>
    )
  },
};
