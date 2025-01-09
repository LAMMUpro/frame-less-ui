import { forwardRef, useEffect, useImperativeHandle, useRef, type FC } from 'react';
import { ExposeTypeReact, PropsTypeReact } from './utils';
import './index';

export default forwardRef(function FlInput(props: PropsTypeReact, ref: any) {
  const ceInstance = useRef();

  useEffect(() => {
    ceInstance.current!.modelValue = props.modelValue;
  }, [props.modelValue])

  useEffect(() => {
    const fn = (event: CustomEvent) => {
      props.onUpdateModelValue(...event.detail);
    }
    ceInstance.current?.addEventListener('update-model-value', fn);
    return () => {
      ceInstance.current?.removeEventListener('update-model-value', fn);
    }
  }, [props.onUpdateModelValue])

  useEffect(() => {
    ceInstance.current?._onMounted?.();
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
      {props.Prefix && <div slot="prefix">{props.Prefix}</div>}
      {props.Suffix && <div slot="suffix">{props.Suffix}</div>}
    </fl-input>
  </>
}) as any as FC<PropsTypeReact>
