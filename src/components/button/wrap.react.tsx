import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { ExposeType, ExposeTypeReact, PropsType, PropsTypeReact } from './utils';
import './index';

export default forwardRef<ExposeTypeReact, PropsTypeReact>(function FlButton(props, ref) {

  // PropsType & ExposeType
  let ceInstance = useRef<HTMLElement>();

  useEffect(() => {
    ceInstance.current?._onMounted?.();
  }, [])

  useImperativeHandle(ref, () => {
    const expose: ExposeTypeReact = {
      
    };
    return expose;
  }, []);

  return <>
    {/* @ts-ignore */}
    <fl-button
      {...props}
      ref={ceInstance}
    >
    {/* @ts-ignore */}
    </fl-button>
  </>
})