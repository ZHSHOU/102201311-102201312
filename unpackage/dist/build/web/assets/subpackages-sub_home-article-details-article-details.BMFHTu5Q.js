import{c as e,h as a,A as t,a7 as l,j as n,o as i,a as s,w as u,e as o,at as r,l as c,t as d,n as p,ah as _,ai as m,f,u as h,m as v,k,i as y,J as g,F as b,p as x,au as w,$ as C,a0 as j,d as T,Y as S,s as F,W as D,g as O,q as M,Q as I}from"./index-CzFVNye6.js";import{_ as A,a as E}from"./mp-html.ChUT2Sgi.js";import{r as L,o as N,a as R}from"./uni-app.es.xDvG45QC.js";import{_ as z}from"./wd-icon.C3a6lim4.js";import{s as J}from"./store.DJP51awm.js";import{p as P,b as U,t as q}from"./index.CTSRJkC8.js";import{e as $}from"./commonCloud.CCPTv1GG.js";import{_ as B}from"./default-avatar.DPaE08He.js";import{_ as H}from"./uni-icons.DoyIsjdl.js";import{_ as V}from"./uni-easyinput.Cm58X2El.js";import{_ as X}from"./uni-popup.DDTIRvxY.js";import{_ as G}from"./uni-popup-dialog.BttFfv5t.js";import{_ as K}from"./_plugin-vue_export-helper.BCo6x5W8.js";import"./props.Cxz2570m.js";import"./config.defalut.DCXQerkV.js";const Q=K({__name:"common",props:{data:{type:Object,default:()=>{}},pData:{type:Object,default:()=>{}}},emits:["likeClick","replyClick","deleteClick"],setup(g,{emit:b}){const x=g,w=e((()=>{var e,a;return(null==(e=x.data)?void 0:e.reply_name)?" ▸ "+(null==(a=x.data)?void 0:a.reply_name):""})),C=e((()=>0===x.data.like_count?"":x.data.like_count>99?"99+":x.data.like_count));let j=x.data.user_content,T=a(j.length>70),S=a("");t((()=>T.value),(e=>{S.value=e?j.slice(0,71):j}),{immediate:!0}),t((()=>x.data.user_content),((e,a)=>{e!==a&&(S.value=e)}));const F=b;return(e,a)=>{const t=l("uni-tag"),g=y,b=L(n("uni-icons"),H);return i(),s(g,{class:"comment_item"},{default:u((()=>[o(g,{class:"top"},{default:u((()=>[o(g,{class:"top_left"},{default:u((()=>[r("img",{class:"user_avatar",src:x.data.user_avatar},null,8,["src"]),x.data.owner?(i(),s(t,{key:0,class:"tag",type:"primary",inverted:!1,text:"作者",size:"mini",circle:""})):c("",!0),r("span",{class:"user_name"},d(x.data.user_name),1),r("span",{class:"user_name"},d(w.value),1)])),_:1}),o(g,{class:"top_right",onClick:a[0]||(a[0]=e=>{return a=x.data,void F("likeClick",a);var a})},{default:u((()=>[r("span",{class:p([x.data.is_like?"active":"","like_count"])},d(C.value),3),_(o(b,{type:"hand-up-filled",size:"24",color:"#007aff"},null,512),[[m,x.data.is_like]]),_(o(b,{type:"hand-up",size:"24",color:"#999"},null,512),[[m,!x.data.is_like]])])),_:1})])),_:1}),o(g,{class:"content",onClick:a[2]||(a[2]=e=>{var a;(a=x.data).owner||F("replyClick",a)})},{default:u((()=>[f(d(h(S))+" ",1),h(T)?(i(),v("span",{key:0,class:"shrink",onClick:a[1]||(a[1]=k((e=>(x.data.user_content,void(T.value=!1))),["stop"]))},"...展开")):c("",!0)])),_:1}),o(g,{class:"bottom"},{default:u((()=>[r("span",{class:"create_time"},d(x.data.create_time),1),x.data.owner?(i(),v("span",{key:0,class:"delete",onClick:a[3]||(a[3]=e=>{return a=x.data,void F("deleteClick",a);var a})},"删除")):c("",!0)])),_:1})])),_:1})}}},[["__scopeId","data-v-74c64261"]]),W=K({__name:"index",props:{userInfo:{type:Object,default:()=>{}},tableData:{type:Array,default:()=>[]},tableTotal:{type:Number,default:0},deleteMode:{type:String,default:"all"}},emits:["update:tableTotal","likeFun","replyFun","deleteFun"],setup(e,{expose:l,emit:p}){const _=e,m=p;let k=a([]);t((()=>_.tableData),(e=>{if(e.length!==k.value.length){let e=_.tableData;k.value=function(e){let a=JSON.parse(JSON.stringify(e)),t=[],l={};return a.forEach(((e,a)=>{e.owner=e.id===_.userInfo.id,l[e.id]=e})),a.forEach((e=>{let a=l[e.parent_id];a?((a.children||(a.children=[])).push(e),1===a.children.length&&(a.childrenShow=[]).push(e)):t.push(e)})),t}(e)}}),{deep:!0,immediate:!0});let T=e=>{e.is_like=!e.is_like,e.like_count=e.is_like?e.like_count+1:e.like_count-1};function S({item1:e,index1:a,item2:t,index2:l}){let n=t||e;T(n),m("likeFun",{params:n},(e=>{T(n)}))}let F=a(null),D=g({});function O({item1:e,index1:a,item2:t,index2:l}){D=JSON.parse(JSON.stringify({item1:e,index1:a,item2:t,index2:l})),F.value.open()}let M=a(!1);function I(){M.value=!0,F.value.open()}l({newCommentFun:I});let A=a(!1);function E(e){e.show||(N.value="",D={},M.value=!1),A.value=e.show}let N=a(""),R=a("说点什么...");const z=a(null);let J=g({});function P({item1:e,index1:a,item2:t,index2:l}){J=JSON.parse(JSON.stringify({item1:e,index1:a,item2:t,index2:l})),z.value.open()}function U(){J={},z.value.close()}function q({item1:e,index1:a,item2:t,index2:l}=J){let n=k.value[a];if(C({title:"正在删除",mask:!0}),l>=0)m("deleteFun",{params:[n.children[l].id]},(e=>{j(),m("update:tableTotal",_.tableTotal-1),n.children.splice(l,1),n.childrenShow.splice(l,1)}));else if(n.children&&n.children.length)switch(_.deleteMode){case"bind":n.user_content="当前评论内容已被移除";break;case"only":m("deleteFun",{mode:_.deleteMode,params:[n.id]},(e=>{j(),m("update:tableTotal",_.tableTotal-n.children.length+1),k.value.splice(a,1)}));break;default:let e=[n.id];n.children.forEach(((a,t)=>{e.push(a.id)})),m("deleteFun",{params:e,mode:_.deleteMode},(e=>{j(),m("update:tableTotal",_.tableTotal-n.children.length+1),k.value.splice(a,1)}))}else m("deleteFun",{params:[n.id]},(e=>{j(),m("update:tableTotal",_.tableTotal-1),k.value.splice(a,1)}));U()}function $({item1:e,index1:a}){return e.childrenShow&&e.childrenShow.length&&e.children.length-e.childrenShow.length}return(e,a)=>{const t=y,l=L(n("uni-icons"),H),p=L(n("uni-easyinput"),V),g=L(n("uni-popup"),X),T=L(n("uni-popup-dialog"),G);return i(),v(b,null,[o(t,{class:"c_total"},{default:u((()=>[f("评论 "+d(_.tableTotal),1)])),_:1}),h(k)&&h(k).length?(i(!0),v(b,{key:0},x(h(k),((e,a)=>(i(),s(t,{class:"c_comment",key:e.id},{default:u((()=>[o(h(Q),{data:e,onLikeClick:()=>S({item1:e,index1:a}),onReplyClick:()=>O({item1:e,index1:a}),onDeleteClick:()=>P({item1:e,index1:a})},null,8,["data","onLikeClick","onReplyClick","onDeleteClick"]),e.children&&e.children.length?(i(),s(t,{key:0,class:"children_item"},{default:u((()=>[(i(!0),v(b,null,x(e.childrenShow,((t,l)=>(i(),s(h(Q),{key:t.id,data:t,pData:e,onLikeClick:()=>S({item1:e,index1:a,item2:t,index2:l}),onReplyClick:()=>O({item1:e,index1:a,item2:t,index2:l}),onDeleteClick:()=>P({item1:e,index1:a,item2:t,index2:l})},null,8,["data","pData","onLikeClick","onReplyClick","onDeleteClick"])))),128)),$({item1:e,index1:a})?(i(),s(t,{key:0,class:"expand_reply",onClick:()=>function({item1:e,index1:a}){let t=k.value[a].childrenShow.length;k.value[a].childrenShow.push(...k.value[a].children.slice(t,t+6))}({item1:e,index1:a})},{default:u((()=>[r("span",{class:"txt"}," 展开"+d(e.children.length-e.childrenShow.length)+"条回复 ",1),o(l,{type:"down",size:"24",color:"#007aff"})])),_:2},1032,["onClick"])):c("",!0)])),_:2},1024)):c("",!0)])),_:2},1024)))),128)):(i(),s(t,{key:1,class:"empty_box"},{default:u((()=>[o(l,{type:"chatboxes",size:"36",color:"#c0c0c0"}),o(t,null,{default:u((()=>[r("span",{class:"txt"}," 这里是一片荒草地, "),r("span",{class:"txt click",onClick:a[0]||(a[0]=()=>I())},"说点什么...")])),_:1})])),_:1})),o(g,{ref_key:"cPopupRef",ref:F,type:"bottom",onChange:E},{default:u((()=>[o(t,{class:"c_popup_box"},{default:u((()=>[o(t,{class:"reply_text"},{default:u((()=>[Object.keys(h(D)).length?(i(),v(b,{key:0},[r("span",{class:"text_aid"},"回复给"),r("span",{class:"text_main"},d(h(D).item2?h(D).item2.user_name:h(D).item1.user_name),1)],64)):(i(),v("span",{key:1,class:"text_main"},"发表新评论"))])),_:1}),o(t,{class:"content"},{default:u((()=>[o(t,{class:"text_area"},{default:u((()=>[o(p,{class:"text_area",type:"textarea",modelValue:h(N),"onUpdate:modelValue":a[1]||(a[1]=e=>w(N)?N.value=e:N=e),placeholder:h(R),focus:h(A),trim:"",autoHeight:"",maxlength:"300"},null,8,["modelValue","placeholder","focus"])])),_:1}),o(t,{class:"send_btn",onClick:a[2]||(a[2]=()=>function({item1:e,index1:a,item2:t,index2:l}=D){let n=t||e,i={};i=M.value?{id:Math.random(),parent_id:null,reply_id:null,reply_name:null}:{id:Math.random(),parent_id:(null==n?void 0:n.parent_id)??n.id,reply_id:n.id,reply_name:n.user_name},i={...i,user_name:_.userInfo.user_name,user_avatar:_.userInfo.user_avatar,user_content:N.value,is_like:!1,like_count:0,create_time:"刚刚",owner:!0},C({title:"正在发送",mask:!0}),m("replyFun",{params:i},(e=>{if(j(),i={...i,id:e.id},M.value)k.value.push(i);else{let e=k.value[a];(e.children||(e.children=[])).push(i),e.children.length===(e.childrenShow||(e.childrenShow=[])).length+1&&e.childrenShow.push(i)}m("update:tableTotal",_.tableTotal+1),F.value.close()}))}())},{default:u((()=>[f("发送")])),_:1})])),_:1})])),_:1})])),_:1},512),o(g,{ref_key:"delPopupRef",ref:z,type:"dialog"},{default:u((()=>[o(T,{mode:"base",title:"",content:"确定删除这条评论吗?","before-close":!0,onClose:U,onConfirm:q})])),_:1},512)],64)}}},[["__scopeId","data-v-1143fea8"]]),Y=K(T({__name:"article-details",setup(e){const t=S.database(),l=S.importObject("travel-utils",{customUI:!0}),r=a(!0),_=a(""),m=a(),v=a(""),k=a(!1),g=a(0),b=async()=>{if(!U())return;const e=Date.now();if(e-g.value<2e3)return F({title:"操作太频繁，请稍后...",icon:"none"});k.value?m.value.like_count--:m.value.like_count++,k.value=!k.value,g.value=e,$(_.value)},x=()=>{F({title:"参数有误",icon:"none"}),setTimeout((()=>{D({url:"/pages/home/home"})}),1500)};N((()=>{var e;return{title:(null==(e=m.value)?void 0:e.title)||"福大帮，这是福大人自己的项目管理应用！",path:"/subpackages/sub_home/article-details/article-details?id="+_.value}})),R((e=>{if(!(null==e?void 0:e.id))return x();_.value=null==e?void 0:e.id,(async()=>{r.value=!0;const e=t.collection("travel-articles").where(`_id == "${_.value}"`).getTemp(),a=t.collection("uni-id-users").field("_id, username, nickname, avatar_file").getTemp(),l=t.collection("travel-like").where(`article_id == "${_.value}" && user_id == $cloudEnv_uid`).getTemp(),n=[e,a];J.hasLogin&&n.push(l),await t.collection(...n).get({getOne:!0}).then((e=>{if(!e.result.data)return x();m.value=e.result.data,v.value=P(e.result.data.content),J.hasLogin&&(k.value=!!e.result.data._id["travel-like"].length)})).catch((e=>{console.log("查询详情err---",e)})).finally((()=>{r.value=!1}))})(),(async()=>{await l.customOperation("travel-articles","view_count",_.value)})()}));let C=a(null);function j(){C.value.newCommentFun()}function T({params:e},a){console.log("likeFun",e)}function H({params:e},a){console.log("replyFun",e);const t={id:Math.random()};setTimeout((()=>a(t)),500)}const V=a("all");function X({params:e,mode:a},t){console.log("deleteFun",{params:e,mode:a}),setTimeout((()=>t()),500)}let G=a({id:120,user_name:"uesr",user_avatar:"https://s2.loli.net/2024/10/10/aTg1NLHBmwnEAh6.jpg"}),K=a(6),Q=a([{id:120,parent_id:null,reply_id:null,reply_name:null,user_name:"陈言泷",user_avatar:"https://s2.loli.net/2024/10/10/SOqaM41PAxf6uXk.jpg",user_content:"有意向加入的同学可以通过邮箱联系我",is_like:!1,like_count:120,create_time:"2024-10-10 09:16"},{id:130,parent_id:120,reply_id:120,reply_name:"陈言泷",user_name:"张硕",user_avatar:"https://s2.loli.net/2024/10/10/zDrKbt9gENhpQao.jpg",user_content:"弱弱地问一下人满了吗？",is_like:!1,like_count:67,create_time:"2024-10-10 09:20"},{id:140,parent_id:120,reply_id:130,reply_name:"张硕",user_name:"张俊超",user_avatar:"https://s2.loli.net/2024/10/10/mBOyfMloGsEPA9U.jpg",user_content:"+1，我也问问",is_like:!1,like_count:16,create_time:"2024-10-10 10:26"},{id:150,parent_id:120,reply_id:130,reply_name:"张俊超",user_name:"陈言泷",user_avatar:"https://s2.loli.net/2024/10/10/SOqaM41PAxf6uXk.jpg",user_content:"目前人数（3/5），可以邮件我，我们具体聊聊",is_like:!1,like_count:16,create_time:"2024-10-10 10:30"},{id:140,parent_id:120,reply_id:130,reply_name:"张硕",user_name:"陈言泷",user_avatar:"https://s2.loli.net/2024/10/10/SOqaM41PAxf6uXk.jpg",user_content:"目前人数（3/5），可以邮件我，我们具体聊聊",is_like:!1,like_count:16,create_time:"2024-10-10 10:31"},{id:160,parent_id:null,reply_id:null,reply_name:null,user_name:"陈尚冰",user_avatar:"https://s2.loli.net/2024/10/10/SuF3fEy4DThZtAP.jpg",user_content:"我有两个问题：1.楼主目前的水平。2.是否还缺编程手。期待回复",is_like:!0,like_count:8,create_time:"2024-10-10 17:31"}]);return(e,a)=>{const t=L(n("wd-skeleton"),A),l=y,_=O,g=M,x=L(n("mp-html"),E),S=L(n("wd-icon"),z),F=I;return i(),s(l,{class:"content"},{default:u((()=>[r.value?(i(),s(l,{key:0,class:"skeleton"},{default:u((()=>[o(t,{"row-col":[{size:"48px",type:"circle"}]}),o(t,{"custom-style":{width:"100%",marginLeft:"12px"},animation:"gradient",theme:"paragraph"})])),_:1})):(i(),s(l,{key:1},{default:u((()=>[o(l,{class:"title-bar"},{default:u((()=>[o(_,{class:"title"},{default:u((()=>[f(d(m.value.title),1)])),_:1})])),_:1}),o(l,{class:"author-bar"},{default:u((()=>{var e,a;return[o(g,{class:"avatar",src:(null==(a=null==(e=m.value.user_id[0])?void 0:e.avatar_file)?void 0:a.url)??h(B)},null,8,["src"]),o(l,{class:"author-info"},{default:u((()=>[o(_,{class:"username"},{default:u((()=>[f(d(m.value.user_id[0].nickname||m.value.user_id[0].username),1)])),_:1}),o(_,{class:"bio"},{default:u((()=>[f(d(h(q)(m.value.publish_date))+" · 发布于"+d(m.value.province),1)])),_:1})])),_:1})]})),_:1}),o(l,{class:"content-area"},{default:u((()=>[o(x,{content:v.value},null,8,["content"])])),_:1}),o(l,{class:"like-button-bar"},{default:u((()=>[o(F,{class:p(["like-button",k.value?"like-active":""]),onClick:b},{default:u((()=>[o(S,{name:"thumb-up",size:"34rpx"}),m.value.like_count>0?(i(),s(_,{key:0},{default:u((()=>[f(d(m.value.like_count),1)])),_:1})):c("",!0)])),_:1},8,["class"])])),_:1}),o(l,{class:"view-count-bar"},{default:u((()=>[o(_,{class:"view-count"},{default:u((()=>[f(d(m.value.view_count)+"人看过",1)])),_:1})])),_:1}),o(l,{class:"btn",onClick:j},{default:u((()=>[f("发一条新留言")])),_:1}),o(h(W),{ref_key:"ccRef",ref:C,userInfo:h(G),"onUpdate:userInfo":a[0]||(a[0]=e=>w(G)?G.value=e:G=e),tableData:h(Q),"onUpdate:tableData":a[1]||(a[1]=e=>w(Q)?Q.value=e:Q=e),tableTotal:h(K),"onUpdate:tableTotal":a[2]||(a[2]=e=>w(K)?K.value=e:K=e),onLikeFun:T,onReplyFun:H,onDeleteFun:X,deleteMode:V.value},null,8,["userInfo","tableData","tableTotal","deleteMode"])])),_:1}))])),_:1})}}}),[["__scopeId","data-v-d687b175"]]);export{Y as default};
