function darkBtnStyleInit() {
    let isDark = chrome.extension.getBackgroundPage().getDark()
    if (isDark == "true") {
        $("#darkBtn").text("夜间模式：关闭")
    } else {
        $("#darkBtn").text("夜间模式：开启")
    }
}

function settingDark() {
    if ($("#darkBtn").text() == "夜间模式：开启") {
        chrome.extension.getBackgroundPage().setDark("true")
        $("#darkBtn").text("夜间模式：关闭")
    } else {
        chrome.extension.getBackgroundPage().setDark("false")
        $("#darkBtn").text("夜间模式：开启")
    }
}

function searchWithBilibili() {
    chrome.tabs.getSelected(function(tab) {
        let index = tab.index + 1
        createProperties = {
                url: "https://search.bilibili.com/all?keyword=" + $("input").val() + "&from_source=nav_suggest_new",
                active: true,
                index: index
            }
            //创建新的标签页
        chrome.tabs.create(createProperties)
    })
}

function goToIndexPage() {
    //获取当前选中标签页的位置
    chrome.tabs.getSelected(function(tab) {
        let index = tab.index + 1
        createProperties = {
                url: "https://www.bilibili.com",
                active: true,
                index: index
            }
            //创建新的标签页
        chrome.tabs.create(createProperties)
    })
}

function goToSettingPage() {
    //获取当前选中标签页的位置
    chrome.tabs.getSelected(function(tab) {
        let index = tab.index + 1
        createProperties = {
                url: "../setting.html",
                active: true,
                index: index
            }
            //创建新的标签页
        chrome.tabs.create(createProperties)
    })
}

(function() {
    darkBtnStyleInit()
    $("#darkBtn").click(settingDark)
        //为主站按钮添加事件
    $("#indexPage").click(goToIndexPage)
    $("#searchBtn").click(searchWithBilibili)
    $("#setting").click(goToSettingPage)
})()