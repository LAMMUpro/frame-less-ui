import { forwardRef, useEffect, useImperativeHandle, useRef, type FC } from 'react';
import { ExposeType, ExposeTypeReact, PropsType, PropsTypeReact } from './utils';
import './index';

export default forwardRef<ExposeTypeReact, PropsTypeReact>(function FlInput(props, ref) {

  const ceInstance = useRef<PropsType & ExposeType & HTMLElement>();

  useEffect(() => {
    ceInstance.current!.modelValue = props.modelValue;
  }, [props.modelValue])

  useEffect(() => {
    const fn = (event: Event) => {
      props.onUpdateModelValue(...(event as CustomEvent<[any]>).detail);
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
    {/* @ts-ignore */}
    <fl-input
      {...props}
      ref={ceInstance}
    >
      {props.Prefix && <div slot="prefix">{props.Prefix}</div>}
      {props.Suffix && <div slot="suffix">{props.Suffix}</div>}
    {/* @ts-ignore */}
    </fl-input>
  </>
}) as any as FC<PropsTypeReact>
