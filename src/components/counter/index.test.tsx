import { render } from 'preact';
import { useState } from 'preact/hooks';
import('@/components/counter');

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <div>{value}</div>
      <fl-counter vvv={value}></fl-counter>
		</div>
	);
}

render(<App />, document.getElementById('app'));
