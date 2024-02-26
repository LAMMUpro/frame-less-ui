import { render } from 'preact';
import { useState } from 'preact/hooks';
import { define } from '@/components/wc-badge';
define();

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <wc-badge 
        value={value} 
        max={100}
        dot={false}
        type="danger"
      >
        <button onClick={ () => setValue(value + 1)}>徽标</button>
      </wc-badge>
		</div>
	);
}

render(<App />, document.getElementById('app'));
