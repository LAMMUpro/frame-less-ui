import { render } from 'preact';
import { useState } from 'preact/hooks';
import { GlobalConfig } from '@/config';
GlobalConfig.useShadow = false;
GlobalConfig.componentPrefix = 'iu';
import('@/components/wc-button');

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <iu-button text={value}></iu-button>
		</div>
	);
}

render(<App />, document.getElementById('app'));
