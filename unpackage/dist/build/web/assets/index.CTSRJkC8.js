import{_ as e,aj as t,Z as r,aL as a,aM as n,aN as o,Y as s,z as c,N as i,az as l}from"./index-CzFVNye6.js";import{c as u}from"./config.defalut.DCXQerkV.js";const g={set(t,r){try{e(t,r)}catch(a){console.log(a)}},get(e){try{return t(e)}catch(r){console.log(r)}},remove(e){try{r(e)}catch(t){console.log(t)}},clear(){try{a()}catch(e){console.log(e)}},checkCache(e){try{return n().keys.includes(e)}catch(t){console.log(t)}}},x=()=>{return e={url:`${u.AMAP_BASE_URL}/v3/ip?key=`+u.AMAP_KEY},new Promise(((t,r)=>{const a={"Content-Type":"application/json",...e.header};o({url:e.url,method:e.method||"GET",data:e.data||{},header:a,success(e){t(e.data)},fail:e=>{r(e)}})}));var e},h=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})),d=(e,t=3)=>{let r=[];return e.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g,((e,t)=>{r.push(t)})),r=r.splice(0,t),r},p=e=>e.replace(/(<img\b[^>]*?\bsrc=["'].*?["'][^>]*?\bwidth=["']100%["'][^>]*?>)/gi,(function(e){return e.replace('width="100%"','style="width: 100%; height: auto;"')})),f=()=>new Promise(((e,t)=>{const r=g.get("cacheProvince");if(r&&Date.now()-r.time<36e5)return e(r.province);x().then((t=>{let r="";r=(null==t?void 0:t.province)&&!Array.isArray(t.province)?t.province:"开普勒星球",e(r),g.set("cacheProvince",{province:r,time:Date.now()})})).catch((e=>{t(e)}))})),m=e=>{if(!e)return"";const t=Date.now()-e,r=Math.floor(t/1e3),a=Math.floor(r/60),n=Math.floor(a/60),o=Math.floor(n/24),s=Math.floor(o/365);return s>0?`${s}年前`:o>0?`${o}天前`:n>0?`${n}小时前`:a>0?`${a}分钟前`:`${r}秒前`},S=e=>{const t=new Date(e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")} ${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}:${String(t.getSeconds()).padStart(2,"0")}`},y=()=>{let e=t("uni-id-pages-userInfo")||{},r=s.getCurrentUserInfo().tokenExpired-Date.now();return r<=0&&(e={}),{userInfo:e,hasLogin:0!=Object.keys(e).length&&r>0}},M=()=>!!y().hasLogin||(c({content:"您尚未登录，请先登录以享受更多功能。",success(e){e.confirm&&i({url:`/${l.uniIdRouter.loginPage}`})}}),!1),$=(e="SYSTEM_ADMIN")=>{if(!e)return!1;const{role:t}=s.getCurrentUserInfo();return t.includes(e)};export{h as a,M as b,y as c,f as d,d as e,m as g,$ as h,p,g as s,S as t};
