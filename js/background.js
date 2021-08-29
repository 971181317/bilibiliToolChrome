/*
    后台页面，从浏览器开启到结束都存在
*/

//初始化
(function() {
    //初始化background持久化变量
    chrome.runtime.onInstalled.addListener(initStorage);
    //建立页面监听
    addPageListener();
    //bs搜索
    omnibox();
    //是否开启右键搜索功能
    chrome.storage.sync.get(['contextMenu'], function(result) {
        if (result.contextMenu == true) contextMenu();
    });
    //每日签到
    signIn();
})()

function initStorage() {
    console.log('init');
    chrome.storage.sync.get(['isDark', 'contextMenu', 'popupSearch', 'videoImg', 'omnibox', 'signIn', 'signInDay', 'timeOutId', 'easyDark'], function(result) {
        if (result.isDark == undefined) {
            chrome.storage.sync.set({ isDark: false }, () => {});
        }
        if (result.contextMenu == undefined) {
            chrome.storage.sync.set({ contextMenu: true }, () => {});
        }
        if (result.popupSearch == undefined) {
            chrome.storage.sync.set({ popupSearch: true }, () => {});
        }
        if (result.videoImg == undefined) {
            chrome.storage.sync.set({ videoImg: true }, () => {});
        }
        if (result.omnibox == undefined) {
            chrome.storage.sync.set({ omnibox: true }, () => {});
        }
        if (result.signIn == undefined) {
            chrome.storage.sync.set({ signIn: true }, () => {});
        }
        if (result.signInDay == undefined) {
            chrome.storage.sync.set({ signInDay: '' }, () => {});
        }
        if (result.timeOutId == undefined) {
            chrome.storage.sync.set({ timeOutId: 0 }, () => {});
        }
        if (result.easyDark == undefined) {
            chrome.storage.sync.set({ easyDark: false }, () => {});
        }
    });
}

//b站页面开启监听
function addPageListener() {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        //整体b站页面功能
        if (tab.url.indexOf("bilibili.com") > -1) {
            //b站跨域接口请求，在每次进入页面时触发
            chrome.storage.sync.get(['signIn'], function(result) {
                //只判断开关功能
                if (result.signIn == true) {
                    //注入脚本没有获取cookie的权限
                    chrome.cookies.getAll({
                        'url': 'https://www.bilibili.com',
                    }, function(cookie) {
                        let SESSDATA = "",
                            bili_jct = "";
                        cookie.forEach(e => {
                            if (e.name == "SESSDATA") SESSDATA = e.value;
                            if (e.name == "bili_jct") bili_jct = e.value;
                        });
                        console.log("test");
                        chrome.tabs.executeScript(null, {
                            code: 'userBilibiliInterface("' + SESSDATA + '","' + bili_jct + '");'
                        });
                    })
                }
            });
            //夜间模式
            chrome.storage.sync.get(['isDark', 'easyDark'], function(result) {
                if (result.isDark == true) {
                    if (result.easyDark == true) {
                        chrome.tabs.executeScript(null, {
                            code: 'bilibiliDarkStart(true)'
                        });
                    } else {
                        chrome.tabs.executeScript(null, {
                            code: 'bilibiliDarkStart(false)'
                        });
                    }
                }
            });
        }
        //视频页面监听
        if (tab.url.indexOf("bilibili.com/video") > -1) {
            //在对应页面添加window的事件时记得半段之前是否有事件存在
            //获取视频封面
            chrome.storage.sync.get(['videoImg'], function(result) {
                if (result.videoImg == true) {
                    //执行脚本
                    chrome.tabs.executeScript(null, {
                        code: 'bilibiliGetImg()'
                    });
                }
            });
        }
    });
}

//每日签到，又跨域问题的接口放在页面内注入执行
function signIn() {
    chrome.storage.sync.get(['signIn', 'signInDay'], function(result) {
        //判断今天是否签到
        if (result.signInDay === new Date().toDateString()) return;
        if (result.signIn == true) {
            //获取cookie
            chrome.cookies.get({
                'url': 'https://www.bilibili.com',
                'name': 'SESSDATA'
            }, function(cookie) {
                //桌面提示内容
                let notificationText = {
                    type: 'basic',
                    iconUrl: 'img/favicon128-128.png',
                    title: 'bilibili小插件 by淺い空',
                    message: '已完成B站每日签到！！'
                }
                if (cookie == null) {
                    notificationText.message = '没有登录b站，登陆后才可以使用每日签到哦！！'
                } else {
                    //每日登录
                    //登录主页
                    $.get('https://www.bilibili.com');
                    //直播签到
                    $.get('https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign');
                    //设置已签到的标志
                    chrome.storage.sync.set({ signInDay: new Date().toDateString() }, function() {});
                }
                //桌面通知
                chrome.notifications.create(null, notificationText);
                //设置下一天定时器，在浏览器长期待机时12点再次签到
                let now = new Date().getTime();
                //+8区
                let dayTime = now - (now + 8 * 3600000) % 86400000 + 86400000;
                let id = setTimeout(signIn, dayTime - now);
                chrome.storage.sync.set({ timeOutId: id }, function() {});
            });
        }
    });
}

//搜索栏使用b站搜索，输入bs触发
function omnibox() {
    // 当用户接收关键字建议时触发
    chrome.omnibox.onInputEntered.addListener(function(text) {
        let href = "https://search.bilibili.com/all?keyword=" + text + "&from_source=nav_suggest_new";
        chrome.tabs.getSelected(function(tab) {
            chrome.tabs.update(tab.id, {
                url: href
            });
        })
    });
}

//右键菜单搜索
function contextMenu() {
    chrome.contextMenus.create({
        title: '使用bilibili搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
        onclick: function(params) {
            //创建搜索界面
            chrome.tabs.create({
                url: "https://search.bilibili.com/all?keyword=" +
                    encodeURI(params.selectionText) +
                    "&from_source=nav_suggest_new",
                active: true,
            })
        }
    });
}