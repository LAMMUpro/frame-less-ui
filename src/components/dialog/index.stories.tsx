import './index';
import { useState } from 'react';
import type { Meta } from '@storybook/web-components';

// Meta<typeof Counter>
const meta: Meta = {
  component: 'fl-dialog', // webcomponent组件注册后直接用string
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
}
export default meta;

export const 实例1 = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div>
        <fl-button text="显示弹窗" onClick={() => setShow(true)}></fl-button>
        <fl-dialog 
          visible={show}
          closeOnClickModal={true}
          shofllose={true}
          lockScroll={true}
          zIndex={1000}
          title="弹窗标题"
          width="1000px"
        >
          <div >
            <h2>弹窗内容</h2>
          </div>
        </fl-dialog>
      </div>
    )
  }
};
