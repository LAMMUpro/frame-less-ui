import './index';
import type { Meta, StoryObj } from '@storybook/web-components';

// Meta<typeof Counter>
const meta: Meta = {
  component: 'fl-counter', // webcomponent组件注册后直接用string
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
    primary: true,
    label: 'Button',
    vvv: 12,
  },
};

// 实例2
export const Secondary: StoryObj = {
  render: () => (<fl-counter vvv={222}></fl-counter>),
};
