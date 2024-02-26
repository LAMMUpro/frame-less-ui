import { render } from 'preact';
import { useState } from 'preact/hooks';

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <wc-counter vvv={value}></wc-counter>
		</div>
	);
}

render(<App />, document.getElementById('app'));
