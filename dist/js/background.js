(()=>{"use strict";var e={165:(e,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.setConfig=i.getConfig=void 0,i.getConfig=async function(){let e=await chrome.storage.sync.get(["chromeConfig"]);return JSON.parse(e.chromeConfig)},i.setConfig=function(e){chrome.storage.sync.set({chromeConfig:JSON.stringify(e)})}}},i={};function t(n){var o=i[n];if(void 0!==o)return o.exports;var c=i[n]={exports:{}};return e[n](c,c.exports,t),c.exports}(()=>{const e=t(165);async function i(){let t=await(0,e.getConfig)();if(t.signInDay!=(new Date).toDateString()&&t.signIn){let n={type:"basic",iconUrl:"img/favicon128-128.png",title:"bilibili小插件 by淺い空",message:"已完成B站每日签到！！"};null==await chrome.cookies.get({url:"https://www.bilibili.com",name:"SESSDATA"})?n.message="没有登录b站，登陆后才可以使用每日签到哦！！":($.get("https://www.bilibili.com"),$.get("https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign"),t.signInDay=(new Date).toDateString()),chrome.notifications.create(null,n);let o=(new Date).getTime(),c=setTimeout(i,o-(o+288e5)%864e5+864e5-o);t.signInDay=c,(0,e.setConfig)(t)}}!async function(){await async function(){console.log("init"),null==(await chrome.storage.sync.get(["chromeConfig"])).chromeConfig&&(0,e.setConfig)({isDark:!1,contextMenu:!0,popupSearch:!0,videoImg:!0,signIn:!0,signInDay:"",timeOutId:0,easyDark:!1})}(),chrome.tabs.onUpdated.addListener((async(i,t,n)=>{let o=await(0,e.getConfig)();if(n.url.indexOf("bilibili.com")>-1){if(o.signIn){let e=await chrome.cookies.get({url:"https://www.bilibili.com",name:"SESSDATA"}),i=await chrome.cookies.get({url:"https://www.bilibili.com",name:"bili_jct"});chrome.tabs.executeScript(null,{code:'userBilibiliInterface("'+e+'","'+i+'");'})}o.isDark&&o.easyDark?chrome.tabs.executeScript(null,{code:"bilibiliDarkStart(true)"}):o.isDark&&chrome.tabs.executeScript(null,{code:"bilibiliDarkStart(false)"})}n.url.indexOf("bilibili.com/video")>-1&&o.videoImg})),chrome.omnibox.onInputEntered.addListener((async function(e){let i=await chrome.tabs.getSelected();chrome.tabs.update(i.id,{url:"https://search.bilibili.com/all?keyword="+e+"&from_source=nav_suggest_new"})})),(await(0,e.getConfig)()).contextMenu&&chrome.contextMenus.create({title:"使用bilibili搜索：%s",contexts:["selection"],onclick:function(e){chrome.tabs.create({url:"https://search.bilibili.com/all?keyword="+encodeURI(e.selectionText)+"&from_source=nav_suggest_new",active:!0})}}),i()}()})()})();