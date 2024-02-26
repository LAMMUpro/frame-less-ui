import { define as defineWcCounter, WcCounter } from './index';
import type { Meta, StoryObj } from '@storybook/web-components';

defineWcCounter();

// Meta<typeof WcCounter>
const meta: Meta = {
  // title: 'Example/Counter', // 不写可推导出来
  component: 'wc-counter', // webcomponent组件注册后直接用string
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
    primary: true,
    label: 'Button',
    vvv: 12,
  },
};

// 实例2
export const Secondary: StoryObj = {
  render: () => (<wc-counter vvv={222}></wc-counter>),
};
