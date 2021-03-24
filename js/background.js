/*
    后台页面，从浏览器开启到结束都存在
*/

//初始化
(function() {
    //初始化background持久化变量
    initLocalStorage()
        //夜间模式建立页面监听，只跟localStorage有关系，可以不重启浏览器开关
    addDarkListener()
    if (getBSSearch() == "true") contextMenu()
    if (getRightClickSearch() == "true") omnibox()
})()

function initLocalStorage() {
    //夜间模式默认关闭
    if (getDark() == null) setDark("false")
        //搜索栏bs搜索默认开启
    if (getBSSearch == null) setDark("true")
        //右键搜索默认开启
    if (getRightClickSearch() == null) setDark("true")
}

//搜索栏使用b站搜索，输入bs触发
function omnibox() {
    // 当用户接收关键字建议时触发
    chrome.omnibox.onInputEntered.addListener(function(text) {
        console.log('inputEntered: ' + text);
        let href = "https://search.bilibili.com/all?keyword=" + text + "&from_source=nav_suggest_new"
        console.log(text)
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
        if (getDark() == "true" && tab.url.indexOf("bilibili.com") > -1) {
            //执行脚本
            chrome.tabs.executeScript(null, {
                code: 'bilibiliDarkStart()'
            });
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

//获取右键搜索
function getRightClickSearch() {
    return localStorage.getItem('rightClickSearch')
}

//设置右键搜索
function setRightClickSearch(bool) {
    localStorage.setItem("rightClickSearch", bool)
}

//获取搜索栏bs搜索
function getBSSearch() {
    return localStorage.getItem('isBSSearch')
}

//设置搜索栏bs搜索
function setBSSearch(bool) {
    localStorage.setItem("isBSSearch", bool)
}