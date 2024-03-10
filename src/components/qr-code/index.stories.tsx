import { Meta } from '@storybook/web-components';
import './index';
import { getDefaultArgs } from '@/utils/storybook';
import { GlobalConfig } from '@/config';
import { QrCode } from './index';
import { useState } from 'react';

const argTypes:Meta<QrCode>['argTypes'] = {
  name: { 
    control: 'inline-radio', 
    options: ['email', 'phone', 'mail'],
    description: '这是一个描述',
    defaultValue: {
      summary: 'phone',
    }
  },
  arr: {
    control: 'number',
    description: '这是一个描述',
    defaultValue: {
      summary: 666,
    }
  },
}

const meta: Meta<QrCode> = {
  component: `${GlobalConfig.componentPrefix}-tree`,
  subtitle: '嵌套树',
  description: '这是一个实验性功能',
  /** props定义 */
  argTypes,
  /** 默认值设置 */
  args: getDefaultArgs(argTypes),
  
}
export default meta;


export const 基本用法 = {
  render: (args) => {
    const [text, setText] = useState('');
    function change() {
      setText(new Date().getTime() + '');
    }
    return (
      <div>
        <button onClick={change}>变换</button>
        <fl-qr-code value={text}></fl-qr-code>
        <fl-qr-code value={text}></fl-qr-code>
      </div>
    )
  },
};

export const 自定义渲染子项目 = {
  render: (args) => (
    <div>
      <fl-qr-code value={args.name}></fl-qr-code>
    </div>
  )
};
