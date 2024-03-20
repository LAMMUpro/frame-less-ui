import { render } from 'preact';
import { useState } from 'preact/hooks';
import { GlobalConfig } from '@/config';
import '@/renderAsideNav.tsx';
GlobalConfig.useShadow = false;
GlobalConfig.componentPrefix = 'iu';
import('@/components/button');

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <iu-button text={value}></iu-button>
		</div>
	);
}

render(<App />, document.getElementById('app'));
