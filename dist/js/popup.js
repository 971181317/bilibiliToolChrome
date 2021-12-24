(()=>{"use strict";var e={399:(e,t,i)=>{i.r(t)},266:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.http=void 0,t.http={httpGet:async e=>fetch(e,{method:"get",headers:{"content-type":"application/json"},credentials:"include"}),httpPost:async(e,t)=>fetch(e,{method:"post",body:t,credentials:"include",headers:{"content-type":"application/json"}})}},27:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.extensionOperation=t.getCurrentTab=t.setConfig=t.getConfig=void 0;const n=i(266),a=i(597);async function r(){let e=await chrome.storage.sync.get(["chromeConfig"]);return JSON.parse(e.chromeConfig)}function o(e){chrome.storage.sync.set({chromeConfig:JSON.stringify(e)})}t.getConfig=r,t.setConfig=o,t.getCurrentTab=async function(){let[e]=await chrome.tabs.query({active:!0,currentWindow:!0});return e},t.extensionOperation={userBilibiliInterfaceOnPage:async(e,t)=>{if(t.url.indexOf("bilibili.com")>-1&&e.signIn){let e=await chrome.cookies.get({url:"https://www.bilibili.com",name:"SESSDATA"}),i=await chrome.cookies.get({url:"https://www.bilibili.com",name:"bili_jct"});chrome.scripting.executeScript({target:{tabId:t.id},func:a.script.doUserBilibiliInterface,args:[e.value,i.value]})}},dark:(e,t)=>{t.url.indexOf("bilibili.com")>-1&&e.isDark&&chrome.scripting.insertCSS({files:["dist/css/bilibili_dark_inject.css"],target:{tabId:t.id}})},video:(e,t)=>{t.url.indexOf("bilibili.com/video")>-1&&e.videoImg&&chrome.scripting.executeScript({target:{tabId:t.id},func:a.script.doBilibiliGetImg})},signIn:async()=>{let e=await r();if(e.signInDay=(new Date).toDateString(),setTimeout(t.extensionOperation.signIn,1e3),console.log(e),e.signInDay!==(new Date).toDateString()&&e.signIn){let i={type:"basic",iconUrl:"../../img/favicon128-128.png",title:"bilibili小插件 by淺い空",message:"已完成B站每日签到！！"};if(null==await chrome.cookies.get({url:"https://www.bilibili.com",name:"SESSDATA"}))i.message="没有登录b站，登陆后才可以使用每日签到哦！！";else{let a=await n.http.httpGet("https://www.bilibili.com"),r=await n.http.httpGet("https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign");if(a.status>399||r.status>399)i.message="网络错误，每日签到失败了啊！！";else{e.signInDay=(new Date).toDateString();let i=(new Date).getTime(),n=i-(i+288e5)%864e5+864e5,a=setTimeout(t.extensionOperation.signIn,n-i);e.signInDay=a,o(e)}}chrome.notifications.create(null,i)}}}},597:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.script=void 0,t.script={doUserBilibiliInterface:(e,t)=>window.userBilibiliInterface(e,t),doBilibiliGetImg:()=>window.bilibiliGetImg()}}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,i),r.exports}i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{i(399);const e=i(27);async function t(){let t=await(0,e.getConfig)();"开启夜间模式"==$("#darkBtn").text()?(t.isDark=!0,$("#darkBtn").text("关闭夜间模式")):(t.isDark=!1,$("#darkBtn").text("开启夜间模式")),(0,e.setConfig)(t)}async function n(){chrome.tabs.create({url:"https://search.bilibili.com/all?keyword="+$("input").val()+"&from_source=nav_suggest_new",active:!0,index:(await(0,e.getCurrentTab)()).index+1})}async function a(){chrome.tabs.create({url:"https://www.bilibili.com",active:!0,index:(await(0,e.getCurrentTab)()).index+1})}async function r(){chrome.tabs.create({url:"dist/page/setting.html",active:!0,index:(await(0,e.getCurrentTab)()).index+1})}!async function(){let i=await(0,e.getConfig)();i.isDark?$("#darkBtn").text("关闭夜间模式"):$("#darkBtn").text("开启夜间模式"),i.popupSearch||($("input").attr("hidden","hidden"),$("#searchBtn").css("display","none")),$("#darkBtn").click(t),$("#indexPage").click(a),$("#searchBtn").click(n),$("#setting").click(r)}()})()})();