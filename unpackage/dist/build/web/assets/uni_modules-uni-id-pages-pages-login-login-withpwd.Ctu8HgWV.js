import{Y as e,N as s,s as a,j as t,a as i,w as o,i as n,o as r,e as u,f as l,l as p,t as c,q as d,g as m,Q as f}from"./index-CzFVNye6.js";import{_ as h}from"./uni-easyinput.Cm58X2El.js";import{r as g}from"./uni-app.es.xDvG45QC.js";import{_}from"./uni-forms-item.CqrFv7Uq.js";import{_ as w}from"./uni-forms.CApq1CAD.js";import{_ as j}from"./uni-captcha.CVkOMSXp.js";import{_ as C}from"./uni-id-pages-agreements.DXz4MDqm.js";import{_ as b}from"./uni-id-pages-fab-login.BsuHsOnG.js";import{m as k}from"./login-page.mixin.-sdeJEag.js";import{_ as y}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./uni-icons.DoyIsjdl.js";import"./uni-popup-dialog.BttFfv5t.js";import"./uni-popup.DDTIRvxY.js";import"./store.DJP51awm.js";const x=e.importObject("uni-id-co",{errorOptions:{type:"toast"}});const V=y({mixins:[k],data:()=>({password:"",username:"",captcha:"",needCaptcha:!1,focusUsername:!1,focusPassword:!1,logo:"/static/logo.png"}),onShow(){document.onkeydown=e=>{var s=e||window.event;s&&13==s.keyCode&&this.pwdLogin()}},methods:{toRetrievePwd(){let e="/uni_modules/uni-id-pages/pages/retrieve/retrieve";/^1\d{10}$/.test(this.username)&&(e+=`?phoneNumber=${this.username}`),s({url:e})},pwdLogin(){if(!this.password.length)return this.focusPassword=!0,a({title:"请输入密码",icon:"none",duration:3e3});if(!this.username.length)return this.focusUsername=!0,a({title:"请输入手机号/用户名/邮箱",icon:"none",duration:3e3});if(this.needCaptcha&&4!=this.captcha.length)return this.$refs.captcha.getImageCaptcha(),a({title:"请输入验证码",icon:"none",duration:3e3});if(this.needAgreements&&!this.agree)return this.$refs.agreements.popup(this.pwdLogin);let e={password:this.password,captcha:this.captcha};/^1\d{10}$/.test(this.username)?e.mobile=this.username:/@/.test(this.username)?e.email=this.username:e.username=this.username,x.login(e).then((e=>{this.loginSuccess(e)})).catch((e=>{"uni-id-captcha-required"==e.errCode?this.needCaptcha=!0:this.needCaptcha&&this.$refs.captcha.getImageCaptcha()}))},toRegister(){s({url:this.config.isAdmin?"/uni_modules/uni-id-pages/pages/register/register-admin":"/uni_modules/uni-id-pages/pages/register/register",fail(e){console.error(e)}})}}},[["render",function(e,s,a,k,y,x){const V=d,v=n,U=m,$=g(t("uni-easyinput"),h),P=g(t("uni-forms-item"),_),B=g(t("uni-forms"),w),L=g(t("uni-captcha"),j),R=g(t("uni-id-pages-agreements"),C),A=f,I=g(t("uni-id-pages-fab-login"),b);return r(),i(v,{class:"uni-content"},{default:o((()=>[u(v,{class:"login-logo"},{default:o((()=>[u(V,{src:y.logo},null,8,["src"])])),_:1}),u(U,{class:"title title-box"},{default:o((()=>[l("账号密码登录")])),_:1}),u(B,null,{default:o((()=>[u(P,{name:"username"},{default:o((()=>[u($,{focus:y.focusUsername,onBlur:s[0]||(s[0]=e=>y.focusUsername=!1),class:"input-box",inputBorder:!1,modelValue:y.username,"onUpdate:modelValue":s[1]||(s[1]=e=>y.username=e),placeholder:"请输入学号"},null,8,["focus","modelValue"])])),_:1}),u(P,{name:"password"},{default:o((()=>[u($,{focus:y.focusPassword,onBlur:s[2]||(s[2]=e=>y.focusPassword=!1),class:"input-box",clearable:"",type:"password",inputBorder:!1,modelValue:y.password,"onUpdate:modelValue":s[3]||(s[3]=e=>y.password=e),placeholder:"请输入密码"},null,8,["focus","modelValue"])])),_:1})])),_:1}),y.needCaptcha?(r(),i(L,{key:0,focus:"",ref:"captcha",scene:"login-by-pwd",modelValue:y.captcha,"onUpdate:modelValue":s[4]||(s[4]=e=>y.captcha=e)},null,8,["modelValue"])):p("",!0),u(R,{scope:"login",ref:"agreements"},null,512),u(A,{class:"uni-btn",type:"primary",onClick:x.pwdLogin},{default:o((()=>[l("登录")])),_:1},8,["onClick"]),u(v,{class:"link-box"},{default:o((()=>[e.config.isAdmin?p("",!0):(r(),i(v,{key:0},{default:o((()=>[u(U,{class:"forget"},{default:o((()=>[l("忘记了？")])),_:1}),u(U,{class:"link",onClick:x.toRetrievePwd},{default:o((()=>[l("找回密码")])),_:1},8,["onClick"])])),_:1})),u(U,{class:"link",onClick:x.toRegister},{default:o((()=>[l(c(e.config.isAdmin?"注册管理员账号":"注册账号"),1)])),_:1},8,["onClick"])])),_:1}),u(I,{ref:"uniFabLogin"},null,512)])),_:1})}],["__scopeId","data-v-e0cf4447"]]);export{V as default};
