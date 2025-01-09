import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { ExposeTypeReact, PropsTypeReact } from './utils';
import './index';

export default forwardRef(function FlInput(props: PropsTypeReact, ref: any) {
  const ceInstance = useRef();

  useEffect(() => {
    ceInstance.current.modelValue = props.modelValue;
  }, [props.modelValue])

  useEffect(() => {
    ceInstance.current.addEventListener('update-model-value', (event: CustomEvent) => {
      props.onUpdateModelValue(...event.detail);
    })
  }, [props.onUpdateModelValue])

  useEffect(() => {
    ceInstance.current._onMounted?.();
  }, [])

  useImperativeHandle(ref, (): ExposeTypeReact => {
    return {
      focus() {
        ceInstance.current?.focus?.();
      },
    };
  }, []);
  
  return <>
    <fl-input
      {...props}
      ref={ceInstance}
    >
    </fl-input>
  </>
})