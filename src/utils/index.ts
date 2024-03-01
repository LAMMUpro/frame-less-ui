

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
	return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}