import { render } from 'preact';
import { useState } from 'react';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';

function PreactApp() {
  const [name, setName] = useState("word preact");
  const arr = ['str', 4, 5, () => console.log(666)];
	return (
		<div>
      {/* 传递Array和object需要先json.stringify!!! */}
      <fl-tree name={name} arr={arr}></fl-tree>
		</div>
	);
}

render(<PreactApp />, document.getElementById('preact'));


const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');