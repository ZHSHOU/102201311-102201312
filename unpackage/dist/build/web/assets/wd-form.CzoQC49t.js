import{_ as e}from"./wd-icon.C3a6lim4.js";import{d as s,h as l,A as a,c as o,I as t,j as r,o as n,a as i,w as u,n as c,b as d,r as p,l as f,e as m,m as g,f as h,t as v,F as y,u as _,i as w,af as b,g as x,J as k}from"./index-CzFVNye6.js";import{r as S}from"./uni-app.es.xDvG45QC.js";import{b as $,m as C,e as I,a as j,c as F,p as P,x as V,o as z,D as B,C as G,d as E,E as M,i as L,F as O,t as q}from"./props.Cxz2570m.js";import{u as W,F as D,f as H}from"./types.DUQKCkIl.js";import{u as U,a as A}from"./useChildren.BEcQKJfk.js";import{u as K}from"./useTranslate.CXMl9qFr.js";import{_ as T}from"./_plugin-vue_export-helper.BCo6x5W8.js";import{e as J}from"./wd-cell.CHbQx4mY.js";const R=T(s({name:"wd-input",options:{virtualHost:!0,addGlobalClass:!0,styleIsolation:"shared"},props:{...$,customInputClass:C(""),customLabelClass:C(""),placeholder:String,placeholderStyle:String,placeholderClass:C(""),cursorSpacing:I(0),cursor:I(-1),selectionStart:I(-1),selectionEnd:I(-1),adjustPosition:j(!0),holdKeyboard:j(!1),confirmType:C("done"),confirmHold:j(!1),focus:j(!1),type:C("text"),maxlength:I(-1),disabled:j(!1),alwaysEmbed:j(!1),alignRight:j(!1),modelValue:F(""),showPassword:j(!1),clearable:j(!1),readonly:j(!1),useSuffixSlot:j(!1),usePrefixSlot:j(!1),prefixIcon:String,suffixIcon:String,showWordLimit:j(!1),label:String,labelWidth:C("33%"),useLabelSlot:j(!1),size:String,error:j(!1),center:j(!1),noBorder:j(!1),required:j(!1),prop:String,rules:P()},emits:["update:modelValue","clear","change","blur","focus","input","keyboardheightchange","confirm","linechange","clicksuffixicon","clickprefixicon","click"],setup(s,{emit:k}){const $=s,{translate:C}=K("input"),I=l(!1),j=l(!1),F=l(!1),P=l(!1),B=l(!1),G=l(""),E=W();a((()=>$.focus),(e=>{B.value=e}),{immediate:!0,deep:!0}),a((()=>$.modelValue),(e=>{const{disabled:s,readonly:l,clearable:a}=$;void 0===e&&(e="",console.warn("[wot-design] warning(wd-input): value can not be undefined.")),G.value=e,I.value=Boolean(a&&!s&&!l&&e)}),{immediate:!0,deep:!0});const{parent:M}=U(D),L=o((()=>M&&$.prop&&M.errorMessages&&M.errorMessages[$.prop]?M.errorMessages[$.prop]:"")),O=o((()=>{let e=!1;if(M&&M.props.rules){const s=M.props.rules;for(const l in s)Object.prototype.hasOwnProperty.call(s,l)&&l===$.prop&&Array.isArray(s[l])&&(e=s[l].some((e=>e.required)))}return $.required||$.rules.some((e=>e.required))||e})),q=o((()=>`wd-input  ${$.label||$.useLabelSlot?"is-cell":""} ${$.center?"is-center":""} ${E.border.value?"is-border":""} ${$.size?"is-"+$.size:""} ${$.error?"is-error":""} ${$.disabled?"is-disabled":""}  ${G.value&&String(G.value).length>0?"is-not-empty":""}  ${$.noBorder?"is-no-border":""} ${$.customClass}`)),H=o((()=>`wd-input__label ${$.customLabelClass} ${O.value?"is-required":""}`)),A=o((()=>`wd-input__placeholder  ${$.placeholderClass}`)),T=o((()=>$.labelWidth?z({"min-width":$.labelWidth,"max-width":$.labelWidth}):"")),J=k;function R(){F.value=!F.value}function N(){G.value="",V().then((()=>V())).then((()=>V())).then((()=>{B.value=!0,J("change",{value:""}),J("update:modelValue",G.value),J("clear")}))}function Q(){B.value=!1,J("change",{value:G.value}),J("update:modelValue",G.value),J("blur",{value:G.value})}function X({detail:e}){P.value?P.value=!1:(B.value=!0,J("focus",e))}function Y(){J("update:modelValue",G.value),J("input",G.value)}function Z(e){J("keyboardheightchange",e.detail)}function ee({detail:e}){J("confirm",e)}function se(){J("clicksuffixicon")}function le(){J("clickprefixicon")}function ae(e){J("click",e)}return t((()=>{!function(){const{disabled:e,readonly:s,clearable:l,maxlength:a,showWordLimit:o}=$;let t="";o&&a&&G.value.toString().length>a&&(t=G.value.toString().substring(0,a));I.value=Boolean(!e&&!s&&l&&G.value),j.value=Boolean(!e&&!s&&a&&o),G.value=t||G.value,J("update:modelValue",G.value)}()})),(s,l)=>{const a=S(r("wd-icon"),e),o=w,t=b,k=x;return n(),i(o,{class:c(q.value),style:d(s.customStyle),onClick:ae},{default:u((()=>[s.label||s.useLabelSlot?(n(),i(o,{key:0,class:c(H.value),style:d(T.value)},{default:u((()=>[s.prefixIcon||s.usePrefixSlot?(n(),i(o,{key:0,class:"wd-input__prefix"},{default:u((()=>[s.prefixIcon&&!s.usePrefixSlot?(n(),i(a,{key:0,"custom-class":"wd-input__icon",name:s.prefixIcon,onClick:le},null,8,["name"])):p(s.$slots,"prefix",{key:1},void 0,!0)])),_:3})):f("",!0),m(o,{class:"wd-input__label-inner"},{default:u((()=>[s.label?(n(),g(y,{key:0},[h(v(s.label),1)],64)):p(s.$slots,"label",{key:1},void 0,!0)])),_:3})])),_:3},8,["class","style"])):f("",!0),m(o,{class:"wd-input__body"},{default:u((()=>[m(o,{class:"wd-input__value"},{default:u((()=>[!s.prefixIcon&&!s.usePrefixSlot||s.label?f("",!0):(n(),i(o,{key:0,class:"wd-input__prefix"},{default:u((()=>[s.prefixIcon?(n(),i(a,{key:0,"custom-class":"wd-input__icon",name:s.prefixIcon,onClick:le},null,8,["name"])):f("",!0),p(s.$slots,"prefix",{},void 0,!0)])),_:3})),m(t,{class:c(["wd-input__inner",s.prefixIcon?"wd-input__inner--prefix":"",j.value?"wd-input__inner--count":"",s.alignRight?"is-align-right":"",s.customInputClass]),type:s.type,password:s.showPassword&&!F.value,modelValue:G.value,"onUpdate:modelValue":l[0]||(l[0]=e=>G.value=e),placeholder:s.placeholder||_(C)("placeholder"),disabled:s.disabled,maxlength:s.maxlength,focus:B.value,"confirm-type":s.confirmType,"confirm-hold":s.confirmHold,cursor:s.cursor,"cursor-spacing":s.cursorSpacing,"placeholder-style":s.placeholderStyle,"selection-start":s.selectionStart,"selection-end":s.selectionEnd,"adjust-position":s.adjustPosition,"hold-keyboard":s.holdKeyboard,"always-embed":s.alwaysEmbed,"placeholder-class":A.value,onInput:Y,onFocus:X,onBlur:Q,onConfirm:ee,onKeyboardheightchange:Z},null,8,["class","type","password","modelValue","placeholder","disabled","maxlength","focus","confirm-type","confirm-hold","cursor","cursor-spacing","placeholder-style","selection-start","selection-end","adjust-position","hold-keyboard","always-embed","placeholder-class"]),s.readonly?(n(),i(o,{key:1,class:"wd-input__readonly-mask"})):f("",!0),I.value||s.showPassword||s.suffixIcon||j.value||s.useSuffixSlot?(n(),i(o,{key:2,class:"wd-input__suffix"},{default:u((()=>[I.value?(n(),i(a,{key:0,"custom-class":"wd-input__clear",name:"error-fill",onClick:N})):f("",!0),s.showPassword?(n(),i(a,{key:1,"custom-class":"wd-input__icon",name:F.value?"view":"eye-close",onClick:R},null,8,["name"])):f("",!0),j.value?(n(),i(o,{key:2,class:"wd-input__count"},{default:u((()=>[m(k,{class:c([G.value&&String(G.value).length>0?"wd-input__count-current":"",String(G.value).length>s.maxlength?"is-error":""])},{default:u((()=>[h(v(String(G.value).length),1)])),_:1},8,["class"]),h(" /"+v(s.maxlength),1)])),_:1})):f("",!0),s.suffixIcon?(n(),i(a,{key:3,"custom-class":"wd-input__icon",name:s.suffixIcon,onClick:se},null,8,["name"])):f("",!0),p(s.$slots,"suffix",{},void 0,!0)])),_:3})):f("",!0)])),_:3}),L.value?(n(),i(o,{key:0,class:"wd-input__error-message"},{default:u((()=>[h(v(L.value),1)])),_:1})):f("",!0)])),_:3})])),_:3},8,["class","style"])}}}),[["__scopeId","data-v-7cdd0642"]]),N=T(s({name:"wd-loading",options:{virtualHost:!0,addGlobalClass:!0,styleIsolation:"shared"},props:{...$,type:C("ring"),color:C("#4D80F0"),size:F("32px")},setup(e){const s=G.id++,r=G.id++,p=G.id++,g={outline:(e="#4D80F0")=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="${s}"><stop stop-color="#FFF" offset="0%" stop-opacity="0"/><stop stop-color="#FFF" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${e}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#${s}) " stroke-width="3.5" stroke-linecap="round"/></g></svg>`,ring:(e="#4D80F0",s="#a6bff7")=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="${r}" gradientUnits="userSpaceOnUse" x1="50" x2="50" y2="180"><stop offset="0" stop-color="${e}"></stop> <stop offset="1" stop-color="${s}"></stop></linearGradient> <path fill="url(#${r})" d="M20 100c0-44.1 35.9-80 80-80V0C44.8 0 0 44.8 0 100s44.8 100 100 100v-20c-44.1 0-80-35.9-80-80z"></path> <linearGradient id="${p}" gradientUnits="userSpaceOnUse" x1="150" y1="20" x2="150" y2="180"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop> <stop offset="1" stop-color="${s}"></stop></linearGradient> <path fill="url(#${p})" d="M100 0v20c44.1 0 80 35.9 80 80s-35.9 80-80 80v20c55.2 0 100-44.8 100-100S155.2 0 100 0z"></path> <circle cx="100" cy="10" r="10" fill="${e}"></circle></svg>`},h=e,v=l(""),y=l(""),_=l("32px");a((()=>h.size),(e=>{_.value=E(e)}),{deep:!0,immediate:!0}),a((()=>h.type),(()=>{k()}),{deep:!0,immediate:!0});const b=o((()=>{const e={width:_.value,height:_.value};return`${z(e)}; ${h.customStyle}`})),x=o((()=>`wd-loading  ${h.customClass}`));function k(){const{type:e,color:s}=h;let l="ring";"circle-outline"===e||"outline"===e?l="outline":"circle-ring"===e&&(l="ring");const a=`"data:image/svg+xml;base64,${J("ring"===l?g[l](s,y.value):g[l](s))}"`;v.value=a}return t((()=>{y.value=B(h.color,"#ffffff",2)[1],k()})),(e,s)=>{const l=w;return n(),i(l,{class:c(x.value),style:d(b.value)},{default:u((()=>[e.type&&"ring"!==e.type&&"circle-ring"!==e.type?f("",!0):(n(),i(l,{key:0,class:"wd-loading__body"},{default:u((()=>[m(l,{class:"wd-loading__svg",style:d(`background-image: url(${v.value});`)},null,8,["style"])])),_:1})),"circle-outline"===e.type||"outline"===e.type?(n(),i(l,{key:1,class:"wd-loading__body"},{default:u((()=>[m(l,{class:"wd-loading__svg",style:d(`background-image: url(${v.value});`)},null,8,["style"])])),_:1})):f("",!0)])),_:1},8,["class","style"])}}}),[["__scopeId","data-v-a058e4fd"]]),Q=T(s({name:"wd-form",options:{addGlobalClass:!0,virtualHost:!0,styleIsolation:"shared"},props:H,setup(e,{expose:s}){const l=e,{children:o,linkChildren:t}=A(D);let r=k({});function f(e){e?r[e]="":Object.keys(r).forEach((e=>{r[e]=""}))}return t({props:l,errorMessages:r}),a((()=>l.model),(()=>{l.resetOnChange&&f()}),{immediate:!0,deep:!0}),s({validate:async function(e){const s=[];let a=!0;const t=[],n=function(){const e=q(l.rules);return o.forEach((s=>{L(s.prop)&&L(s.rules)&&s.rules.length&&(e[s.prop]?e[s.prop]=[...e[s.prop],...s.rules]:e[s.prop]=s.rules)})),e}(),i=e?{[e]:n[e]}:n;for(const o in i){const e=i[o],r=M(l.model,o);if(e&&e.length>0)for(const n of e){if(n.required&&(!L(r)||""===r)){s.push({prop:o,message:n.message}),a=!1;break}if(n.pattern&&!n.pattern.test(l.model[o])){s.push({prop:o,message:n.message}),a=!1;break}const{validator:e,...i}=n;if(e){const r=e(l.model[o],i);O(r)?t.push(r.then((e=>{"string"==typeof e?(s.push({prop:o,message:e}),a=!1):"boolean"!=typeof e||e||(s.push({prop:o,message:n.message}),a=!1)})).catch((e=>{s.push({prop:o,message:e||n.message}),a=!1}))):r||(s.push({prop:o,message:n.message}),a=!1)}}}return await Promise.all(t),s.forEach((e=>{var s;(s=e).message&&(r[s.prop]=s.message)})),a&&(e?f(e):f()),{valid:a,errors:s}},reset:function(){f()}}),(e,s)=>{const l=w;return n(),i(l,{class:c(`wd-form ${e.customClass}`),style:d(e.customStyle)},{default:u((()=>[p(e.$slots,"default",{},void 0,!0)])),_:3},8,["class","style"])}}}),[["__scopeId","data-v-1fb10633"]]);export{N as _,R as a,Q as b};
