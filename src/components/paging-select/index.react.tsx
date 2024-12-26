import { useEffect, useRef } from 'react';
import './index';

export default function FlPagingSelect(props: {
  id: string
  label: string
  api: Function
  immediate?: boolean
  optionSetting: {
    label: string
    id: string
  }
}) {
  const pagingSelectRef = useRef();
  useEffect(() => {
    pagingSelectRef.current.api = props.api;
  }, [props.api])
  useEffect(() => {
    pagingSelectRef.current.optionSetting = props.optionSetting;
  }, [props.optionSetting])
  useEffect(() => {
    pagingSelectRef.current.id = props.id;
  }, [props.id])
  useEffect(() => {
    pagingSelectRef.current.immediate = props.immediate;
  }, [props.immediate])
  useEffect(() => {
    console.log('instance', pagingSelectRef.current.init?.())
  }, [])

  return <>
    <fl-paging-select
      ref={pagingSelectRef}
      label={props.label}
      style={{ width: '300px' }}
    >
    </fl-paging-select>
  </>
}