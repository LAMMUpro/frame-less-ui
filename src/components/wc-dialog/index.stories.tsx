import { define as defineWcDialog } from './index';
import type { Meta, StoryObj } from '@storybook/web-components';

defineWcDialog();

// Meta<typeof WcCounter>
const meta: Meta = {
  // title: 'Example/Counter', // 不写可推导出来
  component: 'wc-dialog', // webcomponent组件注册后直接用string
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
    type: 'success',
    size: 'medium',
    plain: false,
    round: false,
    loading: false,
    disabled: false,
    nativeType: 'dialog',
    text: '按钮实例1'
  },
};

// 实例2
export const Secondary: StoryObj = {
  render: () => (<wc-dialog text="按钮实例2" plain={false} round={true}></wc-dialog>),
};
