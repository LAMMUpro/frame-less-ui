import { createRoot } from 'react-dom/client'
import { useState, useRef, useEffect, createElement, Component,createRef } from 'react';
import { createApp } from 'vue';
import Vue3App from './index.vue';
import '@/styles/demo.scss';
import '@/renderAsideNav.tsx';
import FlPS from '../index.react'

function api() {
  function generateId() {
    return 1 + Date.now().toString().slice(5) + Math.random().toString(36).substring(2);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          pageSize: 10,
          currentPage: 1,
          totalCount: 100,
          list: [
            {
              id: generateId(),
              name: '上海外服（集团）有限公司国际人才分公司超长溢出测试',
            },
            { id: generateId(), name: '上海电气集团股份有限公司' },
            { id: generateId(), name: '上海外服（集团）有限公司' },
            { id: generateId(), name: '上海华耀公司有限公司' },
            { id: generateId(), name: '上海北泰实业股份有限公司' },
            { id: generateId(), name: '上海国际集团有限公司' },
            { id: generateId(), name: '上海明国实业有限公司' },
            { id: generateId(), name: '上海曼珩鼎实业有限公司' },
            { id: generateId(), name: '上海闻岱商业管理有限公司' },
            { id: generateId(), name: '上海叁零财务管理咨询有限公司' },
          ],
        },
        success: true,
      });
    }, 2000);
  });
}

/**
 * react实例
 */
function ReactApp() {
  const [info, setInfo] = useState({
    id: 4,
    name: '上海华耀公司有限公司',
  })

  const selectRef = useRef();

  function test() {
    console.log('selectRef', selectRef)
  }

  useEffect(() => {
    // selectRef.current.api = api;
    // selectRef.current.optionSetting = { label: 'name', id: 'id' };
    window.ddd = selectRef.current;
    console.log('selectRef', selectRef.current)
  }, [])

  const El = createElement('fl-paging-select', {
    id: info.id,
    label: info.name,
    immediate: true,
    optionSetting: { label: 'name', id: 'id' },
    api,
  })

  console.log('El', El)

	return (
		<div>
      {/* <div>
        666
        <MyWrap a={1232}></MyWrap>
      </div> */}
      <FlPS
        id={info.id}
        label={info.name}

        optionSetting={{ label: 'name', id: 'id' }}
        api={api}
      ></FlPS>
      {/* {
        El
      } */}
      {/* <fl-paging-select
        ref={selectRef}
        id={info.id}
        label={info.name}
        immediate
        optionSetting={{ label: 'name', id: 'id' }}
        style={{ width: '300px' }}
      >
      </fl-paging-select> */}
      <button onClick={test}>点击</button>
		</div>
	);
}

class MyWrap extends Component {
  constructor() {
    super();
    this.state = {
      info: {
        id: '4',
        name: '上海华耀公司有限公司',
      },
      api,
    }
    this.aaa = createRef();
    this.bbb = createRef();
  }
  componentWillMount() {
    console.log('this', this.bbb)
  }
  componentDidMount() {
    this.bbb.current.api = this.state.api;
    this.bbb.current.optionSetting = { label: 'name', id: 'id' };

    setTimeout(() => {
      this.setState({
        api: () => {}
      })
      setTimeout(() => {
        this.bbb.current.api = this.state.api;
      }, 500)

    }, 1000)
  }
  render() {
    return <div ref={this.aaa}>
      <fl-paging-select
        ref={this.bbb}
        id={this.state.info.id}
        label={this.state.info.name}
        immediate
        option-setting={"{ label: 'name', id: 'id' }"}
        style={{ width: '300px' }}
      >
      </fl-paging-select>
    </div>
  }
}

createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');