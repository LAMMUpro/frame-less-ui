

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

const hasOwn = {}.hasOwnProperty;

function classNames(...args: any[]) {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
      const arg: any[] = arguments[i];
      if (!arg) continue;

      const argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
          classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
          // @ts-ignore
          const inner: any = classNames.apply(null, arg);
          if (inner) {
              classes.push(inner);
          }
      } else if (argType === 'object') {
          for (const key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
              }
          }
      }
  }

  return classes.join(' ');
}

export function extractClass(a: any, b: any, c: any) {
  const [ props, ...args ] = Array.prototype.slice.call(arguments, 0);
  if (props.class) {
      args.unshift(props.class);
      delete props.class;
  } else if (props.className) {
      args.unshift(props.className);
      delete props.className;
  }
  if (args.length > 0) {
      return { class: classNames.apply(null, args) };
  }
  return { class: '' };
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
