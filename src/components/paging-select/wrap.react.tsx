import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ExposeType, ExposeTypeReact, PropsType, PropsTypeReact } from './utils';
import './index';

export default forwardRef<ExposeTypeReact, PropsTypeReact>(function FlPagingSelect(props, ref) {

  const ceInstance = useRef<PropsType & ExposeType>();

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