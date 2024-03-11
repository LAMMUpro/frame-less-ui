import { Meta } from '@storybook/web-components';
import './index';
import { getDefaultArgs } from '@/utils/storybook';
import { GlobalConfig } from '@/config';
import { QrCode } from './index';
import { useState } from 'react';
import metaCache from './meta.cache';

const argTypes:Meta<QrCode>['argTypes'] = metaCache.tableInfo.props.reduce((result, item) => {
  result[item.name] = {
    // description: item.describe,
    control: item.control || 'text',
    options: JSON.parse(item.options || '[]'),
    type: {
      required: item.required == undefined ? false : true,
    },
    defaultValue: {
      summary: item.control === 'number' ? +item.default: item.default,
    }
  }
  return result;
}, {});

const meta: Meta<QrCode> = {
  component: `${GlobalConfig.componentPrefix}-qr-code`,
  subtitle: '二维码图片生成',
  description: '这是一个实验性功能',
  /** props定义 */
  argTypes,
  /** 默认值设置 */
  args: getDefaultArgs(argTypes),
}

export default meta;

export const 基本用法 = {
  render: (args) => {
    const [text, setText] = useState(args.value);
    function change() {
      setText(new Date().getTime() + '');
    }
    return (
      <div>
        <button onClick={change}>变换2</button>
        <fl-qr-code 
          value={text}
          size={args.size}
          label={args.label}
          color={args.color}
          backgroundColor={args.backgroundColor}
          errorCorrectionLevel={args.errorCorrectionLevel}
        ></fl-qr-code>
      </div>
    )
  },
};

