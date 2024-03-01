import { GlobalConfig } from '@/config';
import { render } from 'preact';
import { useState } from 'preact/hooks';
GlobalConfig.useShadow = true;
import('@/components/counter');

export function App() {
  const [value, setValue] = useState(null);
	return (
		<div>
      <div>{value}</div>
      <button onClick={() => setValue(undefined)}>改变value</button>
      <button onClick={() => setValue(null)}>改变value</button>

      <fl-counter vvv={value}>
        <span className="aaa">666</span>
      </fl-counter>
		</div>
	);
}

render(<App />, document.getElementById('app'));
