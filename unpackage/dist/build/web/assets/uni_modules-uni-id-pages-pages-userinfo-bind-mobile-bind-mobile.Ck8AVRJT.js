import{s as o,Y as e,X as a,j as t,a as s,w as i,i as n,o as r,e as m,f as l,q as u,g as p,Q as c}from"./index-CzFVNye6.js";import{_ as d}from"./uni-match-media.BG9nXMng.js";import{r as f}from"./uni-app.es.xDvG45QC.js";import{_ as h}from"./uni-easyinput.Cm58X2El.js";import{_ as b}from"./uni-id-pages-sms-form.DlEFxRoy.js";import{_ as g}from"./uni-popup-captcha.BXLED8Pp.js";import{m as D}from"./store.DJP51awm.js";import{_}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./uni-icons.DoyIsjdl.js";import"./uni-captcha.CVkOMSXp.js";import"./uni-popup.DDTIRvxY.js";const j=_({data:()=>({formData:{mobile:"",code:"",captcha:""},focusMobile:!0,logo:"/static/logo.png"}),computed:{tipText(){return`验证码已通过短信发送至 ${this.formData.mobile}。密码为6 - 20位`}},onLoad(o){},onReady(){},methods:{submit(){if(!/^1\d{10}$/.test(this.formData.mobile))return this.focusMobile=!0,o({title:"手机号码格式不正确",icon:"none",duration:3e3});if(!/^\d{6}$/.test(this.formData.code))return this.$refs.smsForm.focusSmsCodeInput=!0,o({title:"验证码格式不正确",icon:"none",duration:3e3});e.importObject("uni-id-co").bindMobileBySms(this.formData).then((e=>{o({title:e.errMsg,icon:"none",duration:3e3}),this.getOpenerEventChannel(),D.setUserInfo(this.formData),a()})).catch((o=>{console.log(o),"uni-id-captcha-required"==o.errCode&&this.$refs.popup.open()})).finally((o=>{this.formData.captcha=""}))}}},[["render",function(o,e,a,D,_,j){const y=u,V=n,x=p,C=f(t("uni-match-media"),d),M=f(t("uni-easyinput"),h),U=f(t("uni-id-pages-sms-form"),b),$=c,B=f(t("uni-popup-captcha"),g);return r(),s(V,{class:"uni-content"},{default:i((()=>[m(C,{"min-width":690},{default:i((()=>[m(V,{class:"login-logo"},{default:i((()=>[m(y,{src:_.logo},null,8,["src"])])),_:1}),m(x,{class:"title title-box"},{default:i((()=>[l("绑定手机号")])),_:1})])),_:1}),m(M,{clearable:"",focus:_.focusMobile,onBlur:e[0]||(e[0]=o=>_.focusMobile=!1),type:"number",class:"input-box",inputBorder:!1,modelValue:_.formData.mobile,"onUpdate:modelValue":e[1]||(e[1]=o=>_.formData.mobile=o),maxlength:"11",placeholder:"请输入手机号"},null,8,["focus","modelValue"]),m(U,{ref:"smsForm",type:"bind-mobile-by-sms",modelValue:_.formData.code,"onUpdate:modelValue":e[2]||(e[2]=o=>_.formData.code=o),phone:_.formData.mobile},null,8,["modelValue","phone"]),m($,{class:"uni-btn send-btn-box",type:"primary",onClick:j.submit},{default:i((()=>[l("提交")])),_:1},8,["onClick"]),m(B,{onConfirm:j.submit,modelValue:_.formData.captcha,"onUpdate:modelValue":e[3]||(e[3]=o=>_.formData.captcha=o),scene:"bind-mobile-by-sms",ref:"popup"},null,8,["onConfirm","modelValue"])])),_:1})}],["__scopeId","data-v-8ad2d767"]]);export{j as default};
