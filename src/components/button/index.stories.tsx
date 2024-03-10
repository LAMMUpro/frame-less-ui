import './index';
import type { Meta } from '@storybook/web-components';

// Meta<typeof Counter>
const meta: Meta = {
  component: 'fl-button', // webcomponent组件注册后直接用string
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
}
export default meta;

export const 实例1 = {
  args: {
    type: 'success',
    size: 'medium',
    plain: false,
    round: false,
    loading: false,
    disabled: false,
    nativeType: 'button',
    text: '按钮实例1'
  },
};

export const 实例2 = {
  render: () => (<fl-button text="按钮实例2" plain={false} round={true}></fl-button>),
};
