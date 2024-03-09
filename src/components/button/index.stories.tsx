import './index';
import type { Meta, StoryObj } from '@storybook/web-components';

// Meta<typeof Counter>
const meta: Meta = {
  component: 'fl-button', // webcomponent组件注册后直接用string
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

// 实例2
export const Secondary: StoryObj = {
  render: () => (<fl-button text="按钮实例2" plain={false} round={true}></fl-button>),
};
