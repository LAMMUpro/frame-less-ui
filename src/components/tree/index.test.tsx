import { render } from 'preact';
import { useState } from 'react';
import('@/components/tree');

export function App() {
  const [name, setName] = useState("worl");
  const arr = ['str',4,5];
	return (
		<div>
      {/* 传递Array和object需要先json.stringify!!! */}
      <fl-tree name={name} arr={JSON.stringify(arr)}></fl-tree>
		</div>
	);
}

render(<App />, document.getElementById('app'));
