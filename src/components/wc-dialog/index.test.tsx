import { render } from 'preact';
import { useState } from 'preact/hooks';
import '@/components/wc-button';

export function App() {
  const [show, setShow] = useState(false);
	return (
		<div>
      <wc-button text="显示弹窗" onClick={() => setShow(true)}></wc-button>
      <wc-dialog 
        visible={show}
        closeOnClickModal={true}
        showClose={true}
        lockScroll={true}
        zIndex={1000}
        title="弹窗标题"
        width="1000px"
      >
        <div >
          <h2>弹窗内容</h2>
        </div>
      </wc-dialog>
		</div>
	);
}

render(<App />, document.getElementById('app'));
