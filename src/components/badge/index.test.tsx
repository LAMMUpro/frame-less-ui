import { render } from 'preact';
import { useState } from 'preact/hooks';
import '@/renderAsideNav.tsx';
import('@/components/badge');

export function App() {
  const [value, setValue] = useState(20);
	return (
		<div>
      <fl-badge 
        value={value} 
        max={100}
        dot={false}
        type="danger"
      >
        <button onClick={ () => setValue(value + 1)}>徽标</button>
      </fl-badge>
		</div>
	);
}

render(<App />, document.getElementById('app'));
