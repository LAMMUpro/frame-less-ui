import { createRoot } from 'react-dom/client'
import { createApp } from 'vue';
import Vue3App from './index.vue';
import '@/styles/demo.scss';
import '@/renderAsideNav.tsx';

import FlQrCode from '../wrap.react';
import { useRef, useState } from 'react';

/**
 * react实例
 */
function ReactApp() {
  const [content, setContent] = useState('https://micro-admin-template.lammu.cn/micromain/');

  const qrCodeRef = useRef();

  function updated() {
    console.log('二维码更新了')
  }

  function changeContentByValue() {
    setContent(Date.now().toString());
  }
  
  function changeContentByMethod() {
    qrCodeRef.current?.draw(Date.now().toString());
  }

	return (
		<div>
      <FlQrCode text="React" width={200}></FlQrCode>
      <FlQrCode text="React" width={150}></FlQrCode>
      <FlQrCode text="React" width={100}></FlQrCode>
      <FlQrCode text="React" width={50}></FlQrCode>
      <div className="divide"></div>
      <FlQrCode 
        ref={qrCodeRef}
        text={content}
        width={200}
        onUpdate={updated}
        onUpdateText={v=> setContent(v)}
      ></FlQrCode>
      <div>二维码内容：{content}</div>
      <button onClick={changeContentByValue}>通过属性改变内容</button>
      <button onClick={changeContentByMethod}>通过方法改变内容</button>
		</div>
	);
}
createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');