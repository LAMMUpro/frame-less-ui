import React, { useEffect, useState } from 'react';
import { addons } from '@storybook/manager-api';
import { Addon_TypesEnum } from '@storybook/types';
import { AddonPanel } from '@storybook/components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { copyText } from '../src/utils';

const ADDON_ID = 'storybook/code';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  /** 修复全局样式表 */
  const styleFix = document.createElement('style');
  styleFix.innerHTML = `
    #tabbutton-storybook-actions-panel {
      display: none;
    }
    
    div.css-sqdry3[style=''] div.css-4ii5m {
      visibility: hidden;
    }
    div.css-sqdry3[style=''] div.css-14tjqbs {
      z-index: 10;
      background-color: rgba(255,255,255,.4);
      box-shadow: none;
    }
    div.css-sqdry3[style=''] div.css-10ro1m {
      top: 0;
      height: 100%;
    }
    div.css-sqdry3[style=''] div.css-jvk3z0 {
      margin-right: 14px;
    }
    button.css-1q3s0lr {
      letter-spacing: 1px;
      font-size: 13px;
    }
  `;
  document.head.appendChild(styleFix);

  addons.add(PANEL_ID, {
    type: Addon_TypesEnum.PANEL,
    title: 'Code',
    render: ({ active }) => {
      const code = active ? api.getCurrentStoryData()?.parameters?.docs?.source?.originalSource : '';
      
      const [isCopy, setIsCopy] = useState(false);

      function handleCopyCode() {
        copyText(code, () => {
          setIsCopy(true);
          setTimeout(() => {
            setIsCopy(false);
          }, 2000)
        });
      }

      return (
        <AddonPanel active={active!}>
          <SyntaxHighlighter language="jsx" style={{
            ...dracula,
            'pre[class*="language-"]': {
              ...dracula['pre[class*="language-"]'],
              margin: 0,
              height: '100%',
              borderRadius: 0,
            },
          }}
          >
            {code}
          </SyntaxHighlighter>
          <div 
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              color: isCopy ? '#128512' : '#2e3438',
              fontWeight: isCopy ? 800 : 400,
              padding: '4px 10px',
              borderLeft: '1px solid rgb(201 208 212)',
              borderBottom: '1px solid rgb(201 208 212)',
              borderRadius: '0px 0 0 4px',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
            onClick={handleCopyCode}
          >
            { isCopy ? 'Copy Success!': 'Copy'}
          </div>
        </AddonPanel>
      )
    },
  });
});