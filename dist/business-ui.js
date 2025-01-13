import { defineComponent as m, defineCustomElement as g } from "vue";
const h = /* @__PURE__ */ m({
  __name: "index.ce",
  props: {
    type: { default: "primary" },
    plain: { type: Boolean, default: !1 },
    round: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    icon: { default: "" },
    loading: { type: Boolean, default: !1 },
    text: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(l, { expose: e, emit: o }) {
    const s = l, t = (r) => {
      if (console.log("handleClick", s.loading), s.disabled || s.loading)
        return console.log("禁用或加载，事件不触发");
      o("click", r);
    };
    return e({
      handleClick: t
    }), { __sfc: !0, props: s, emit: o, handleClick: t };
  }
});
function u(l, e, o, s, t, r, _, c) {
  var n = typeof l == "function" ? l.options : l;
  e && (n.render = e, n.staticRenderFns = o, n._compiled = !0), s && (n.functional = !0), r && (n._scopeId = "data-v-" + r);
  var i;
  if (_ ? (i = function(a) {
    a = a || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), t && t.call(this, a), a && a._registeredComponents && a._registeredComponents.add(_);
  }, n._ssrRegister = i) : t && (i = c ? function() {
    t.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : t), i)
    if (n.functional) {
      n._injectStyles = i;
      var p = n.render;
      n.render = function(v, f) {
        return i.call(f), p(v, f);
      };
    } else {
      var d = n.beforeCreate;
      n.beforeCreate = d ? [].concat(d, i) : [i];
    }
  return {
    exports: l,
    options: n
  };
}
var b = function() {
  var e = this, o = e._self._c, s = e._self._setupProxy;
  return o("button", { class: [
    "fl-button",
    e.type ? `fl-button--${e.type}` : "",
    {
      "is-disabled": e.disabled,
      "is-loading": e.loading,
      "is-round": e.round,
      "is-plain": e.plain,
      "is-text": e.text
    }
  ], attrs: { disabled: e.disabled || e.loading }, on: { click: function(t) {
    return t.preventDefault(), t.stopPropagation(), s.handleClick.apply(null, arguments);
  } } }, [e.loading ? o("i", { staticClass: "fl-icon-loading" }) : e._e(), e._t("default")], 2);
}, y = [], C = /* @__PURE__ */ u(
  h,
  b,
  y,
  !1,
  null,
  null,
  null,
  null
);
const $ = C.exports, k = g($);
customElements.get("fl-button") || customElements.define("fl-button", k);
const B = {
  components: {},
  props: {},
  data() {
    return {
      type: "danger"
    };
  },
  mounted() {
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    // ==================================== 二、数据请求类 ================================
    // ==================================== 三、跳转类 ====================================
    // ==================================== 四、小工具类 ==================================
  }
};
var R = function() {
  var e = this, o = e._self._c;
  return o("h1", [e._v("fl-button for vue2")]);
}, E = [], T = /* @__PURE__ */ u(
  B,
  R,
  E,
  !1,
  null,
  "2f09a9b4",
  null,
  null
);
const F = T.exports;
export {
  F as Button,
  F as PagingSelect
};
