/*
    后台页面，从浏览器开启到结束都存在
*/

//初始化
(function () {
    if (getDark() == null) setDark("false")
    addListener()
    contextMenu()
    omnibox()
})()

//搜索栏使用b站搜索，输入bs触发
function omnibox() {
    // 当用户接收关键字建议时触发
    chrome.omnibox.onInputEntered.addListener(function (text) {
        console.log('inputEntered: ' + text);
        let href = "https://search.bilibili.com/all?keyword=" + text + "&from_source=nav_suggest_new"
        console.log(text)
        chrome.tabs.getSelected(function (tab) {
            chrome.tabs.update(tab.id, {url: href});
        })
    });
}

//右键菜单搜索
function contextMenu() {
    chrome.contextMenus.create({
        title: '使用bilibili搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
        onclick: function (params) {
            //创建搜索界面
            chrome.tabs.create(
                {
                    url: "https://search.bilibili.com/all?keyword="
                        + encodeURI(params.selectionText)
                        + "&from_source=nav_suggest_new",
                    active: true,
                })
        }
    });
}

//建立页面监听器
function addListener() {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        // console.log(tab)
        // console.log(tab.url)
        if (getDark() == "true" && tab.url.indexOf("bilibili.com") > -1) {
            //执行脚本
            chrome.tabs.executeScript(null, {code: 'bilibiliDarkStart()'});
        }
    })
}

//获取Dark值
function getDark() {
    return localStorage.getItem('isDark')
}

//设置Dark值
function setDark(bool) {
    localStorage.setItem("isDark", bool)
}