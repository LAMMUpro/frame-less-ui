import './index';
import type { Meta } from '@storybook/web-components';

// Meta<typeof Counter>
const meta: Meta = {
  component: 'fl-counter', // webcomponent组件注册后直接用string
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
}
export default meta;

export const 实例1 = {
  args: {
    primary: true,
    label: 'Button',
    vvv: 12,
  },
};

export const 实例2 = {
  render: () => (<fl-counter vvv={222}></fl-counter>),
};
