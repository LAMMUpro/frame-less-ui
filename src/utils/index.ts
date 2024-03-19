

/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延时（ms）
 * @returns 防抖后的函数
 */
export function debounce(fn: Function, delay: number = 500) {
  let timer: number | undefined;
  return function(this:any, ...args: Array<any>) {
    const context = this;
    window.clearTimeout(timer);
    timer = window.setTimeout(function() {
      fn.apply(context, args);
      timer = undefined;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 执行函数
 * @param delay 延时（ms）
 */
export function throttle(fn: Function, delay: number = 500) {
  let currentTime = Date.now();
  return function (this:any, ...args: Array<any>) {
    const context = this;
    const nowTime = Date.now();
    if (nowTime - currentTime > delay) {
      fn.apply(context, args);
      currentTime = Date.now();
    }
  }
}

/**
 * 类名转换，每个参数是单独一个类名或者 { 类名: 是否生效 }
 * @Example ct('button', { 'active' : 真值 | 假值 })
 */
export function ct(...args: Array<string | {
  [key: string]: any
}>) {
  const classList: string[] = [];
  args.forEach(item => {
    if (typeof item === 'string') {
      classList.push(item);
    } else if (typeof item === 'object') {
      const classKeys = Object.keys(item);
      classKeys.forEach(className => {
        if (item[className]) classList.push(className);
      })
    }
  })
  return classList.join(' ');
}

/**
 * 短横线命名法转驼峰命名法
 * @Example toCamelCase('start-time') => 'startTime'
 */
export function toCamelCase(str: string) {
  if (!str) return str;
	return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * 短横线命名法转帕斯卡命名法
 * @Example toCamelCase('start-time') => 'StartTime'
 */
export function toPascalCase(str: string) {
  if (!str) return str;
	return str[0].toUpperCase() + toCamelCase(str).slice(1);
}


/**
 * 点击复制
 * @param text 复制的内容
 * @param success 成功回调
 * @param fail 出错回调
 */
export function copyText(text: string, success?: () => void, fail?: (res: string) => void) {
  text = text.replace(/(^\s*)|(\s*$)/g, '');
  if (!text) {
    fail && fail('复制的内容不能为空！');
    return;
  }
  const id = 'the-clipboard';
  let clipboard = (document.getElementById(id) as HTMLTextAreaElement);
  if (!clipboard) {
    clipboard = document.createElement('textarea');
    clipboard.id = id;
    clipboard.readOnly = true;
    clipboard.style.cssText = 'font-size: 15px; position: fixed; top: -1000%; left: -1000%;';
    document.body.appendChild(clipboard);
  }
  clipboard.value = text;
  clipboard.select();
  clipboard.setSelectionRange(0, clipboard.value.length);
  const state = document.execCommand('copy');
  if (state) {
    success && success();
  } else {
    fail && fail('复制失败');
  }
}