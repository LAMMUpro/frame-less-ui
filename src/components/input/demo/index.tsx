import { createRoot } from 'react-dom/client'
import { createApp } from 'vue';
import Vue3App from './index.vue';
import '@/styles/demo.scss';
import '@/renderAsideNav.tsx';
import { useRef, useState } from 'react';

import FlInput from '../wrap.react';

/**
 * react实例
 */
function ReactApp() {
	return (
		<div>
      <Demo1/>
		</div>
	);
}
function Demo1() {
  const [modelValue, setModelValue] = useState('mrz');

  const ceInstance = useRef();

  function handleClick() {
    ceInstance.current.focus();
  }

	return (
    <>
      <button onClick={handleClick}>focus</button>
      <span>绑定值：{modelValue}</span>
      <FlInput
        modelValue={modelValue}
        onUpdateModelValue={setModelValue}
        ref={ceInstance}
      ></FlInput>
    </>
	);
}
createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');