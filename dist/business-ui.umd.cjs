(function(l,u){typeof exports=="object"&&typeof module<"u"?u(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],u):(l=typeof globalThis<"u"?globalThis:l||self,u(l.BusinessUi={},l.vue2fless))})(this,function(l,u){"use strict";const m=u.defineComponent({__name:"index.ce",props:{type:{default:"primary"},plain:{type:Boolean,default:!1},round:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},icon:{default:""},loading:{type:Boolean,default:!1},text:{type:Boolean,default:!1}},emits:["click"],setup(i,{expose:e,emit:o}){const a=i,t=d=>{if(console.log("handleClick",a.loading),a.disabled||a.loading)return console.log("禁用或加载，事件不触发");o("click",d)};return e({handleClick:t}),{__sfc:!0,props:a,emit:o,handleClick:t}}}),P="";function f(i,e,o,a,t,d,c,T){var n=typeof i=="function"?i.options:i;e&&(n.render=e,n.staticRenderFns=o,n._compiled=!0),a&&(n.functional=!0),d&&(n._scopeId="data-v-"+d);var r;if(c?(r=function(s){s=s||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!s&&typeof __VUE_SSR_CONTEXT__<"u"&&(s=__VUE_SSR_CONTEXT__),t&&t.call(this,s),s&&s._registeredComponents&&s._registeredComponents.add(c)},n._ssrRegister=r):t&&(r=T?function(){t.call(this,(n.functional?this.parent:this).$root.$options.shadowRoot)}:t),r)if(n.functional){n._injectStyles=r;var S=n.render;n.render=function(E,v){return r.call(v),S(E,v)}}else{var p=n.beforeCreate;n.beforeCreate=p?[].concat(p,r):[r]}return{exports:i,options:n}}var h=function(){var e=this,o=e._self._c,a=e._self._setupProxy;return o("button",{class:["fl-button",e.type?`fl-button--${e.type}`:"",{"is-disabled":e.disabled,"is-loading":e.loading,"is-round":e.round,"is-plain":e.plain,"is-text":e.text}],attrs:{disabled:e.disabled||e.loading},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),a.handleClick.apply(null,arguments)}}},[e.loading?o("i",{staticClass:"fl-icon-loading"}):e._e(),e._t("default")],2)},g=[],y=f(m,h,g,!1,null,null,null,null);const b=y.exports,C=u.defineCustomElement(b);customElements.get("fl-button")||customElements.define("fl-button",C);const w="",$={components:{},props:{},data(){return{type:"danger"}},mounted(){},methods:{}};var B=function(){var e=this,o=e._self._c;return o("h1",[e._v("fl-button for vue2")])},k=[],R=f($,B,k,!1,null,"2f09a9b4",null,null);const _=R.exports;l.Button=_,l.PagingSelect=_,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
