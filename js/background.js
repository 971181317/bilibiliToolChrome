/*
    后台页面，从浏览器开启到结束都存在
*/

//初始化
(function () {
    init()
})()

function init() {
    if (window.localStorage.getItem('isDark') == null) {
        localStorage.setItem("isDark", "false")
    } else if (window.localStorage.getItem('isDark') == true) {
        chrome.tabs.executeScript("*://*.bilibili.com/*", {code: 'bilibiliDarkStart()'});
    }
}

function setDark(isDark) {
    if (isDark == "false") {
        localStorage.setItem("isDark", "false")
    } else {
        localStorage.setItem("isDark", "true")
        chrome.tabs.executeScript({code: 'bilibiliDarkStart()'});
    }
}
function getDark() {
    return localStorage.getItem('isDark')
}