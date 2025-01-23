import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ExposeType, ExposeTypeReact, PropsType, PropsTypeReact } from './utils';
import './index';

export default forwardRef<ExposeTypeReact, PropsTypeReact>(function FlQrCode(props, ref) {

  const ceInstance = useRef<PropsType & ExposeType>();

  useEffect(() => {
    const fn = (event: Event) => {
      props.onUpdateText?.(...(event as CustomEvent<[any]>).detail);
    }
    ceInstance.current?.addEventListener('update-text', fn);
    return () => {
      ceInstance.current?.removeEventListener('update-text', fn);
    }
  }, [props.onUpdateText])

  useEffect(() => {
    ceInstance.current._onMounted?.();
  }, [])

  useImperativeHandle(ref, () => {
    const expose: ExposeTypeReact = {
      draw(...args) {
        ceInstance.current?.draw?.(...args);
      },
    };
    return expose;
  }, []);

  return <>
    {/* @ts-ignore */}
    <fl-qr-code
      {...props}
      ref={ceInstance}
    >
    {/* @ts-ignore */}
    </fl-qr-code>
  </>
})