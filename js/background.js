/*
    后台页面，从浏览器开启到结束都存在
*/

//初始化
(function() {
    //初始化background持久化变量
    initStorage();
    //夜间模式建立页面监听
    addDarkListener();
    //bs搜索
    omnibox();
    //获取b站视频封面图片
    addBilibiliVideoImg();
    //是否开启右键搜索功能
    chrome.storage.sync.get(['contextMenu'], function(result) {
        console.log(result.contextMenu)
        if (result.contextMenu == true) contextMenu();
    });
})()

function initStorage() {
    chrome.storage.sync.get(['isDark', 'contextMenu', 'popupSearch', 'videoImg'], function(result) {
        if (result.isDark == undefined) {
            chrome.storage.sync.set({ isDark: false }, function() {});
        }
        if (result.contextMenu == undefined) {
            chrome.storage.sync.set({ contextMenu: true }, function() {});
        }
        if (result.popupSearch == undefined) {
            chrome.storage.sync.set({ popupSearch: true }, function() {});
        }
        if (result.videoImg == undefined) {
            chrome.storage.sync.set({ videoImg: true }, function() {});
        }
    });
}

//在b站页面添加获取封面功能
function addBilibiliVideoImg() {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        chrome.storage.sync.get(['videoImg'], function(result) {
            if (result.videoImg == true && tab.url.indexOf("bilibili.com/video") > -1) {
                //执行脚本
                chrome.tabs.executeScript(null, {
                    code: 'bilibiliGetImg()'
                });
            }
        });
    })
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

//建立暗黑模式监听器
function addDarkListener() {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        chrome.storage.sync.get(['isDark'], function(result) {
            if (result.isDark == true && tab.url.indexOf("bilibili.com") > -1) {
                //执行脚本
                chrome.tabs.executeScript(null, {
                    code: 'bilibiliDarkStart()'
                });
            }
        });
    })
}