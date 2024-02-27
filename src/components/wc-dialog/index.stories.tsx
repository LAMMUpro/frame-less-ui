import { useState } from 'react';
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
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div>
        <wc-button text="显示弹窗" onClick={() => setShow(true)}></wc-button>
        <wc-dialog 
          visible={show}
          closeOnClickModal={true}
          showClose={true}
          lockScroll={true}
          zIndex={1000}
          title="弹窗标题"
          width="1000px"
        >
          <div >
            <h2>弹窗内容</h2>
          </div>
        </wc-dialog>
      </div>
    )
  }
};

// 实例2
// export const Secondary: StoryObj = {
//   render: () => {
//     const [show, setShow] = useState(false);
//     return (
//       <div>
//         <wc-button text="显示弹窗" onClick={() => setShow(true)}></wc-button>
//         <wc-dialog 
//           visible={show}
//           closeOnClickModal={true}
//           showClose={true}
//           lockScroll={true}
//           zIndex={1000}
//           title="弹窗标题"
//           width="1000px"
//         >
//           <div >
//             <h2>弹窗内容</h2>
//           </div>
//         </wc-dialog>
//       </div>
//     )
//   }
// };
