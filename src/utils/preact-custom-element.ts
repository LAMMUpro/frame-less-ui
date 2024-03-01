import { h, cloneElement, render, hydrate } from "preact";
import { toCamelCase } from "./index";

/**
 * 注册自定义组件，基于customElements.define封装
 * 1. 属性名兼容短横线和驼峰命名
 */
export default function register(
  /** preact类组件 */
  Component: any,
  /** 自定义组件名称 */
  tagName: string,
  /** 需要监控值变化的属性列表 */
  propNames: Array<string>,
  /** 其它选项 */
  options?: {
    /** 是否使用shadow dom */
    shadow?: boolean;
    /** shadow dom 模式 */
    mode?: "open" | "closed";
  }
): void {
  /**
   * 用PreactElement取代HTMLElement
   */
  function PreactElement() {
    /** 创建一个（基于PreactElement原型链的）HTMLElement实例 */
    const inst = Reflect.construct(HTMLElement, [], PreactElement);
    /** // TODO 后续如何拿到这个类  */
    inst._vdomComponent = Component;
    /** 根节点（shadow模式为shadow root）挂载到_root变量 */
    inst._root =
      options && options.shadow
        ? inst.attachShadow({ mode: options.mode || "open" })
        : inst;
    return inst;
  }
  /**
   * 处理原型链
   */
  PreactElement.prototype = Object.create(HTMLElement.prototype);
  PreactElement.prototype.constructor = PreactElement;
  PreactElement.prototype.connectedCallback = connectedCallback;
  PreactElement.prototype.attributeChangedCallback = attributeChangedCallback;
  PreactElement.prototype.disconnectedCallback = disconnectedCallback;

  /**
   * 处理监听属性
   */
  propNames =
    propNames ||
    Component.observedAttributes ||
    Object.keys(Component.propTypes || {});
  PreactElement.observedAttributes = propNames;

  /**
   * 保持dom的属性和preact的props同步
   */
  propNames.forEach((name) => {
    Object.defineProperty(PreactElement.prototype, name, {
      get() {
        return this._vdom?.props?.[name];
      },
      set(v) {
        if (this._vdom) { /** 已经生成了虚拟dom */
          this.attributeChangedCallback(name, this.getAttribute(name), v);
        } else { /** 还没有生成虚拟dom（正常不会走这里） */
          if (!this._props) this._props = {};
          this._props[name] = v;
          this.connectedCallback(); /** 在这里面会生成虚拟dom */
        }

        /**
         * 如果值是基本数据类型，则用setAttribute赋值
         * // TODO undefined | symbol
         * // TODO 对象类型属性设置在哪里？
         */
        const type = typeof v;
        if (
          v == null ||
          type === "string" ||
          type === "boolean" ||
          type === "number"
        ) {
          this.setAttribute(name, v);
        }
      },
    });
  });

  /** 注册元素 */
  customElements.define(
    tagName || Component.tagName || Component.displayName || Component.name,
    PreactElement as any
  );
}

function ContextProvider(props) {
  this.getChildContext = () => props.context;
  // eslint-disable-next-line no-unused-vars
  const { context, children, ...rest } = props;
  return cloneElement(children, rest);
}

/**
 * 当自定义元素第一次被连接到文档 DOM 时被调用，相当于mounted
 * 1. 生成虚拟dom
 */
function connectedCallback() {
  console.log('当自定义元素第一次被连接到文档 DOM 时被调用，相当于mounted')
  // Obtain a reference to the previous context by pinging the nearest
  // higher up node that was rendered with Preact. If one Preact component
  // higher up receives our ping, it will set the `detail` property of
  // our custom event. This works because events are dispatched
  // synchronously.
  const event = new CustomEvent("_preact", {
    detail: {},
    bubbles: true,
    cancelable: true,
  });
  this.dispatchEvent(event);
  /** // TODO 上下文？ */
  const context = event.detail.context;

  this._vdom = h(
    ContextProvider,
    { ...this._props, context },
    toVdom(this, this._vdomComponent)
  );
  /** hydrate 用于兼容预渲染和服务端渲染 */
  (this.hasAttribute("hydrate") ? hydrate : render)(this._vdom, this._root);
}

/**
 * 当自定义元素的属性被增加、移除或更改时被调用
 * 1. 重新渲染视图
 */
function attributeChangedCallback(
  /** 属性名 */
  name: string,
  /** 旧值 */
  oldValue: any,
  /** 新值 */
  newValue: any
) {
  if (!this._vdom) return;
  // Attributes use `null` as an empty value whereas `undefined` is more
  // common in pure JS components, especially with default parameters.
  // When calling `node.removeAttribute()` we'll receive `null` as the new
  // value. See issue #50.
  newValue = newValue == null ? undefined : newValue;
  /** undefined => null的清空不做视图更新 */
  if (oldValue === newValue) return;
  const props = {};
  props[name] = newValue;
  props[toCamelCase(name)] = newValue; // 兼容短横线和驼峰命名
  /** 用新属性值重新生成虚拟dom */
  this._vdom = cloneElement(this._vdom, props);
  /** 重新渲染虚拟dom */
  render(this._vdom, this._root);
}

/**
 * 当自定义元素与文档 DOM 断开连接时被调用，相当于destroyed
 * 1. 虚拟dom置为null
 * 2. 重新渲染空视图
 */
function disconnectedCallback() {
  render((this._vdom = null), this._root);
}

/**
 * Pass an event listener to each `<slot>` that "forwards" the current
 * context value to the rendered child. The child will trigger a custom
 * event, where will add the context value to. Because events work
 * synchronously, the child can immediately pull of the value right
 * after having fired the event.
 */
function Slot(props, context) {
  const ref = (r) => {
    if (!r) {
      this.ref.removeEventListener("_preact", this._listener);
    } else {
      this.ref = r;
      if (!this._listener) {
        this._listener = (event) => {
          event.stopPropagation();
          event.detail.context = context;
        };
        r.addEventListener("_preact", this._listener);
      }
    }
  };
  return h("slot", { ...props, ref });
}

function toVdom(element, nodeName) {
  if (element.nodeType === 3) return element.data;
  if (element.nodeType !== 1) return null;
  let children = [],
    props = {},
    i = 0,
    a = element.attributes,
    cn = element.childNodes;
  for (i = a.length; i--; ) {
    if (a[i].name !== "slot") {
      props[a[i].name] = a[i].value;
      props[toCamelCase(a[i].name)] = a[i].value;
    }
  }

  for (i = cn.length; i--; ) {
    const vnode = toVdom(cn[i], null);
    // Move slots correctly
    const name = cn[i].slot;
    if (name) {
      props[name] = h(Slot, { name }, vnode);
    } else {
      children[i] = vnode;
    }
  }

  // Only wrap the topmost node with a slot
  const wrappedChildren = nodeName ? h(Slot, null, children) : children;
  return h(nodeName || element.nodeName.toLowerCase(), props, wrappedChildren);
}
