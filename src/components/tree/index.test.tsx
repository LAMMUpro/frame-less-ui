import { render } from 'preact';
import('@/components/tree');

export function App() {
	return (
		<div>
      <fl-tree name="worlddd"></fl-tree>
		</div>
	);
}

render(<App />, document.getElementById('app'));
