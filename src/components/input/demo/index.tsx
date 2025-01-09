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
      <Demo2/>
      <Demo3/>
      <Demo4/>
      <Demo5/>
      <Demo6/>
		</div>
	);
}
function Demo1() {
  const [value, setValue] = useState('');
	return (
    <div>
      <h3>基础输入框:{value}</h3>
      <FlInput modelValue={value} onUpdateModelValue={setValue}/>
    </div>
	);
}
function Demo2() {
  const [value, setValue] = useState('');
	return (
    <div>
      <h3>禁用状态:</h3>
      <FlInput modelValue={value} onUpdateModelValue={setValue} disabled placeholder="禁用状态"/>
    </div>
	);
}
function Demo3() {
  const [value, setValue] = useState('点击右侧可清空输入框');
	return (
    <div>
      <h3>可清空输入框:</h3>
      <FlInput modelValue={value} onUpdateModelValue={setValue} clearable/>
    </div>
	);
}
function Demo4() {
  const [value, setValue] = useState('');
	return (
    <div>
      <h3>密码输入框:{value}</h3>
      <FlInput modelValue={value} onUpdateModelValue={setValue} type="password" placeholder="请输入密码"/>
    </div>
	);
}
function Demo5() {
  const [value, setValue] = useState('');
	return (
    <div>
      <h3>不同尺寸:{value}</h3>
      <div style={{display: 'flex'}}>
        <FlInput modelValue={value} onUpdateModelValue={setValue} size="large" placeholder="大型输入框"/>
        <FlInput modelValue={value} onUpdateModelValue={setValue} size="default" placeholder="默认尺寸"/>
        <FlInput modelValue={value} onUpdateModelValue={setValue} size="small" placeholder="小型输入框"/>
      </div>
    </div>
	);
}
function Demo6() {
  const [value, setValue] = useState('');
	return (
    <div>
      <h3>前缀后缀:{value}</h3>
      <FlInput modelValue={value} onUpdateModelValue={setValue} clearable
        Prefix={<fl-icon name="xiala-"></fl-icon>}
        Suffix={<fl-icon name="zuo-"></fl-icon>}
      ></FlInput>
    </div>
	);
}
createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');