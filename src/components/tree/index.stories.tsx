import './index';

// Meta<typeof Counter>
const meta = {
  // title: 'Example/Counter', // 不写可推导出来
  component: 'fl-tree', // webcomponent组件注册后直接用string
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
    name: "word!",
  },
};

// 实例2
export const Secondary = {
  render: () => (<div><fl-tree name="www"></fl-tree></div>),
};
