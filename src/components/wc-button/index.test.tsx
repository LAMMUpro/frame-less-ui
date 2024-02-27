import { render } from 'preact';
import { useState } from 'preact/hooks';
import '@/components/wc-button';

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <wc-button text={value}></wc-button>
		</div>
	);
}

render(<App />, document.getElementById('app'));
