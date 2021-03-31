function darkBtnStyleInit() {
    chrome.storage.sync.get(['isDark'], function(result) {
        if (result.isDark == true) {
            $("#darkBtn").text("关闭夜间模式");
        } else {
            $("#darkBtn").text("开启夜间模式");
        }
    });
}

function settingDark() {
    if ($("#darkBtn").text() == "开启夜间模式") {
        chrome.storage.sync.set({ isDark: true }, function() {});
        $("#darkBtn").text("关闭夜间模式");
    } else {
        chrome.storage.sync.set({ isDark: false }, function() {});
        $("#darkBtn").text("开启夜间模式");
    }
}

function searchWithBilibili() {
    chrome.tabs.getSelected(function(tab) {
        let index = tab.index + 1;
        createProperties = {
            url: "https://search.bilibili.com/all?keyword=" + $("input").val() + "&from_source=nav_suggest_new",
            active: true,
            index: index
        };
        //创建新的标签页
        chrome.tabs.create(createProperties);
    })
}

function goToIndexPage() {
    //获取当前选中标签页的位置
    chrome.tabs.getSelected(function(tab) {
        let index = tab.index + 1;
        createProperties = {
            url: "https://www.bilibili.com",
            active: true,
            index: index
        };
        //创建新的标签页
        chrome.tabs.create(createProperties);
    })
}

function goToSettingPage() {
    //获取当前选中标签页的位置
    chrome.tabs.getSelected(function(tab) {
        let index = tab.index + 1;
        createProperties = {
            url: "../setting.html",
            active: true,
            index: index
        };
        //创建新的标签页
        chrome.tabs.create(createProperties);
    })
}

function popupSearchInit() {
    chrome.storage.sync.get(['popupSearch'], function(result) {
        if (result.popupSearch == false) {
            $("input").attr("hidden", "hidden");
            $("#searchBtn").css("display", "none");
        }
    });
}

(function() {
    darkBtnStyleInit();
    popupSearchInit();
    $("#darkBtn").click(settingDark);
    //为主站按钮添加事件
    $("#indexPage").click(goToIndexPage);
    $("#searchBtn").click(searchWithBilibili);
    $("#setting").click(goToSettingPage);
})()