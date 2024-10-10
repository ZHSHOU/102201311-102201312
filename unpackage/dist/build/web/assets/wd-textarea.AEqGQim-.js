import{_ as e}from"./wd-icon.C3a6lim4.js";import{d as a,h as l,A as s,c as o,I as r,j as t,o as i,a as n,w as u,n as d,b as c,r as p,l as m,e as f,f as h,t as v,u as b,i as g,g as x,aw as _}from"./index-CzFVNye6.js";import{r as y}from"./uni-app.es.xDvG45QC.js";import{b as w,c as $,m as k,a as S,e as C,p as j,x as V,o as P}from"./props.Cxz2570m.js";import{u as B,F as I}from"./types.DUQKCkIl.js";import{u as L}from"./useChildren.BEcQKJfk.js";import{u as T}from"./useTranslate.CXMl9qFr.js";import{_ as W}from"./_plugin-vue_export-helper.BCo6x5W8.js";const H=W(a({name:"wd-textarea",options:{virtualHost:!0,addGlobalClass:!0,styleIsolation:"shared"},props:{...w,modelValue:$(""),placeholder:String,placeholderStyle:String,placeholderClass:k(""),disabled:S(!1),maxlength:C(-1),autoFocus:S(!1),focus:S(!1),autoHeight:S(!1),fixed:S(!1),cursorSpacing:C(0),cursor:C(-1),confirmType:k(null),confirmHold:S(!1),showConfirmBar:S(!0),selectionStart:C(-1),selectionEnd:C(-1),adjustPosition:S(!0),disableDefaultPadding:S(!1),holdKeyboard:S(!1),showPassword:S(!1),clearable:S(!1),readonly:S(!1),prefixIcon:String,usePrefixSlot:S(!1),showWordLimit:S(!1),label:String,labelWidth:k("33%"),useLabelSlot:S(!1),size:String,error:S(!1),center:S(!1),noBorder:S(!1),required:S(!1),prop:k(""),rules:j(),customTextareaContainerClass:k(""),customTextareaClass:k(""),customLabelClass:k("")},emits:["update:modelValue","clear","change","blur","focus","input","keyboardheightchange","confirm","linechange","clickprefixicon","click"],setup(a,{emit:w}){const{translate:$}=T("textarea"),k=a,S=l(!1),C=l(!1),j=l(!1),W=l(!1),H=l(""),q=B();s((()=>k.focus),(e=>{W.value=e}),{immediate:!0,deep:!0}),s((()=>k.modelValue),(e=>{const{disabled:a,readonly:l,clearable:s}=k;null==e&&(e="",console.warn("[wot-design] warning(wd-textarea): value can not be null or undefined.")),H.value=e,S.value=Boolean(s&&!a&&!l&&e)}),{immediate:!0,deep:!0});const{parent:A}=L(I),F=o((()=>A&&k.prop&&A.errorMessages&&A.errorMessages[k.prop]?A.errorMessages[k.prop]:"")),z=o((()=>{let e=!1;if(A&&A.props.rules){const a=A.props.rules;for(const l in a)Object.prototype.hasOwnProperty.call(a,l)&&l===k.prop&&Array.isArray(a[l])&&(e=a[l].some((e=>e.required)))}return k.required||k.rules.some((e=>e.required))||e})),D=o((()=>String(k.modelValue||"").length)),K=o((()=>`wd-textarea   ${k.label||k.useLabelSlot?"is-cell":""} ${k.center?"is-center":""} ${q.border.value?"is-border":""} ${k.size?"is-"+k.size:""} ${k.error?"is-error":""} ${k.disabled?"is-disabled":""} ${k.autoHeight?"is-auto-height":""} ${D.value>0?"is-not-empty":""}  ${k.noBorder?"is-no-border":""} ${k.customClass}`)),M=o((()=>`wd-textarea__label ${k.customLabelClass} ${z.value?"is-required":""}`)),E=o((()=>`wd-textarea__placeholder  ${k.placeholderClass}`)),O=o((()=>`${D.value>0?"wd-textarea__count-current":""} ${D.value>k.maxlength?"is-error":""}`)),G=o((()=>k.labelWidth?P({"min-width":k.labelWidth,"max-width":k.labelWidth}):"")),J=w;function U(e){const{maxlength:a,showWordLimit:l}=k;return l&&-1!==a&&e.length>a?e.toString().substring(0,a):e}function N(){H.value="",V().then((()=>V())).then((()=>V())).then((()=>{J("change",{value:""}),J("update:modelValue",H.value),J("clear"),V().then((()=>{W.value=!0}))}))}function Q({detail:e}){W.value=!1,J("change",{value:H.value}),J("update:modelValue",H.value),J("blur",{value:H.value,cursor:e.cursor?e.cursor:null})}function R({detail:e}){j.value?j.value=!1:(W.value=!0,J("focus",e))}function X(){H.value=U(H.value),J("update:modelValue",H.value),J("input",H.value)}function Y({detail:e}){J("keyboardheightchange",e)}function Z({detail:e}){J("confirm",e)}function ee({detail:e}){J("linechange",e)}function ae(){J("clickprefixicon")}return r((()=>{!function(){const{disabled:e,readonly:a,clearable:l,maxlength:s,showWordLimit:o}=k;S.value=Boolean(!e&&!a&&l&&H.value),C.value=Boolean(!e&&!a&&s&&o),H.value=U(H.value),J("update:modelValue",H.value)}()})),(a,l)=>{const s=y(t("wd-icon"),e),o=g,r=x,w=_;return i(),n(o,{class:d(K.value),style:c(a.customStyle)},{default:u((()=>[a.label||a.useLabelSlot?(i(),n(o,{key:0,class:d(M.value),style:c(G.value)},{default:u((()=>[a.prefixIcon||a.usePrefixSlot?(i(),n(o,{key:0,class:"wd-textarea__prefix"},{default:u((()=>[a.prefixIcon&&!a.usePrefixSlot?(i(),n(s,{key:0,"custom-class":"wd-textarea__icon",name:a.prefixIcon,onClick:ae},null,8,["name"])):p(a.$slots,"prefix",{key:1},void 0,!0)])),_:3})):m("",!0),f(o,{class:"wd-textarea__label-inner"},{default:u((()=>[a.label?(i(),n(r,{key:0},{default:u((()=>[h(v(a.label),1)])),_:1})):p(a.$slots,"label",{key:1},void 0,!0)])),_:3})])),_:3},8,["class","style"])):m("",!0),f(o,{class:d(`wd-textarea__value ${S.value?"is-suffix":""} ${a.customTextareaContainerClass} ${C.value?"is-show-limit":""}`)},{default:u((()=>[f(w,{class:d(`wd-textarea__inner ${a.customTextareaClass}`),modelValue:H.value,"onUpdate:modelValue":l[0]||(l[0]=e=>H.value=e),"show-count":!1,placeholder:a.placeholder||b($)("placeholder"),disabled:a.disabled,maxlength:a.maxlength,focus:W.value,"auto-focus":a.autoFocus,"placeholder-style":a.placeholderStyle,"placeholder-class":E.value,"auto-height":a.autoHeight,"cursor-spacing":a.cursorSpacing,fixed:a.fixed,cursor:a.cursor,"show-confirm-bar":a.showConfirmBar,"selection-start":a.selectionStart,"selection-end":a.selectionEnd,"adjust-position":a.adjustPosition,"hold-keyboard":a.holdKeyboard,"confirm-type":a.confirmType,"confirm-hold":a.confirmHold,"disable-default-padding":a.disableDefaultPadding,onInput:X,onFocus:R,onBlur:Q,onConfirm:Z,onLinechange:ee,onKeyboardheightchange:Y},null,8,["class","modelValue","placeholder","disabled","maxlength","focus","auto-focus","placeholder-style","placeholder-class","auto-height","cursor-spacing","fixed","cursor","show-confirm-bar","selection-start","selection-end","adjust-position","hold-keyboard","confirm-type","confirm-hold","disable-default-padding"]),F.value?(i(),n(o,{key:0,class:"wd-textarea__error-message"},{default:u((()=>[h(v(F.value),1)])),_:1})):m("",!0),a.readonly?(i(),n(o,{key:1,class:"wd-textarea__readonly-mask"})):m("",!0),f(o,{class:"wd-textarea__suffix"},{default:u((()=>[S.value?(i(),n(s,{key:0,"custom-class":"wd-textarea__clear",name:"error-fill",onClick:N})):m("",!0),C.value?(i(),n(o,{key:1,class:"wd-textarea__count"},{default:u((()=>[f(r,{class:d(O.value)},{default:u((()=>[h(v(D.value),1)])),_:1},8,["class"]),h(" /"+v(a.maxlength),1)])),_:1})):m("",!0)])),_:1})])),_:1},8,["class"])])),_:3},8,["class","style"])}}}),[["__scopeId","data-v-8153f5f8"]]);export{H as _};
