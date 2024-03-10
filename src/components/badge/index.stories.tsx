import { useState } from 'preact/hooks';
import './index';
import type { Meta } from '@storybook/web-components';

// Meta<typeof Counter>
const meta: Meta = {
  component: 'fl-badge', // webcomponent组件注册后直接用string
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
}
export default meta;

export const 实例1 = {
  args: {
    value: 20,
    max: 99,
    dot: false,
    type: "success",
    children: "变更历史"
  },
};

export const 实例2 = {
  render: () => {
    const [value, setValue] = useState(20);
    return (
      <fl-badge 
        value={value} 
        max={100}
        dot={false}
        type="danger"
      >
        <button onClick={ () => setValue(value + 1)}>徽标</button>
      </fl-badge>
    )
  },
};
