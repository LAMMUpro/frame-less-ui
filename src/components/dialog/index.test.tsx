import { render } from 'preact';
import { useState } from 'preact/hooks';
import '@/components/dialog';

export function App() {
  const [show, setShow] = useState(false);
	return (
		<div>
      <fl-button text="显示弹窗" onClick={() => setShow(true)}></fl-button>
      <fl-dialog 
        visible={show}
        closeOnClickModal={true}
        shofllose={true}
        lockScroll={true}
        zIndex={1000}
        title="弹窗标题"
        width="1000px"
      >
        <div >
          <h2>弹窗内容</h2>
        </div>
      </fl-dialog>
		</div>
	);
}

render(<App />, document.getElementById('app'));
