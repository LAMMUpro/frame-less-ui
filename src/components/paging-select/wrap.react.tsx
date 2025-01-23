import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ExposeType, ExposeTypeReact, PropsType, PropsTypeReact } from './utils';
import './index';

export default forwardRef<ExposeTypeReact, PropsTypeReact>(function FlPagingSelect(props, ref) {

  const ceInstance = useRef<PropsType & ExposeType>();

  useEffect(() => {
    const fn = (event: Event) => {
      props.onChange?.(...(event as CustomEvent<[any]>).detail);
    }
    ceInstance.current?.addEventListener('change', fn);
    return () => {
      ceInstance.current?.removeEventListener('change', fn);
    }
  }, [props.onChange])

  useEffect(() => {
    const fn = (event: Event) => {
      props.onUpdateValue?.(...(event as CustomEvent<[any]>).detail);
    }
    ceInstance.current?.addEventListener('update-value', fn);
    return () => {
      ceInstance.current?.removeEventListener('update-value', fn);
    }
  }, [props.onUpdateValue])

  useEffect(() => {
    const fn = (event: Event) => {
      props.onUpdateLabel?.(...(event as CustomEvent<[any]>).detail);
    }
    ceInstance.current?.addEventListener('update-label', fn);
    return () => {
      ceInstance.current?.removeEventListener('update-label', fn);
    }
  }, [props.onUpdateLabel])

  useEffect(() => {
    ceInstance.current.api = props.api;
  }, [props.api])
  useEffect(() => {
    ceInstance.current.optionSetting = props.optionSetting;
  }, [props.optionSetting])
  useEffect(() => {
    ceInstance.current.value = props.value;
  }, [props.value])
  useEffect(() => {
    ceInstance.current.immediate = props.immediate;
  }, [props.immediate])
  useEffect(() => {
    ceInstance.current._onMounted?.();
  }, [])

  useImperativeHandle(ref, () => {
    const expose: ExposeTypeReact = {
      
    };
    return expose;
  }, []);

  return <>
    {/* @ts-ignore */}
    <fl-paging-select
      {...props}
      ref={ceInstance}
    >
    {/* @ts-ignore */}
    </fl-paging-select>
  </>
})