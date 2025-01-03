import { useEffect, useRef } from 'react';
import './index';

export default function FlButton(props: {}) {
  const buttonRef = useRef();
  useEffect(() => {
    buttonRef.current._onMounted?.();
  }, [])

  return <>
    <fl-button
      ref={buttonRef}
      {...props}
      style={{ width: '300px' }}
    >
    </fl-button>
  </>
}