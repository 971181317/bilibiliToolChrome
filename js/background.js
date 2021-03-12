/*
    后台页面，从浏览器开启到结束都存在
*/

//初始化
(function () {
    init()
    setDark()
})()

function init() {
    if (window.localStorage.getItem('isDark') == null) {
        localStorage.setItem("isDark", "false")
    } else if (window.localStorage.getItem('isDark') == true) {
        chrome.tabs.executeScript("*://*.bilibili.com/*", {code: 'bilibiliDarkStart()'});
    }
}

function setDark(isDark) {
    chrome.tabs.getSelected(function (tab) {
        if (tab.url.indexOf("bilibili.com") > -1) {
            if (isDark == "true") {
                localStorage.setItem("isDark", "false")
                //建立监听器
                chrome.tabs.onCreated.addListener(null)
                chrome.tabs.onUpdate.addListener(null)
            } else {
                localStorage.setItem("isDark", "true")
                //建立监听器
                chrome.tabs.onCreated.addListener(function (tab) {
                    chrome.tabs.executeScript({code: 'bilibiliDarkStart()'});
                })
                chrome.tabs.onUpdate.addListener(function (tabId, changeInfo, tab) {
                    tab.executeScript({code: 'bilibiliDarkStart()'});
                })
            }
        }
    })
}

function getDark() {
    return localStorage.getItem('isDark')
}