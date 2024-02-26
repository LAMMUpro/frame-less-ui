import { render } from 'preact';
import { useState } from 'preact/hooks';
import { define } from '@/components/wc-button';
define();

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <wc-button text={value}></wc-button>
		</div>
	);
}

render(<App />, document.getElementById('app'));
