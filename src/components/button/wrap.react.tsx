import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { ExposeType, ExposeTypeReact, PropsType, PropsTypeReact } from './utils';
import { useReactId } from '@/utils';
import './index';


export default forwardRef<ExposeTypeReact, PropsTypeReact>(function FlButton(props, ref) {

  /** 组件id, 使用id查询示例, 代替useTemplateRef */
  const compUID = '__flcomp_r_' + useReactId();

  // PropsType & ExposeType
  let ceInstance: HTMLElement | null = null;

  // useEffect(() => {
  //   ceInstance.current.api = props.api;
  // }, [props.api])

  // useEffect(() => {
  //   ceInstance = document.getElementById(compUID);
  //   ceInstance?._onMounted?.();

  //   console.log('ceInstance', ceInstance)
  // }, [])

  const [num, setNum] = useState(0);

  useImperativeHandle(ref, () => {
    const expose: ExposeTypeReact = {
      
    };
    return expose;
  }, []);

  return <>
    {/* @ts-ignore */}
    <div onClick={() => setNum(num+1)}>{num}</div>
    <fl-button
      {...props}
      id={compUID}
      // ref={ceInstance}
    >
    {/* @ts-ignore */}
    </fl-button>
  </>
})