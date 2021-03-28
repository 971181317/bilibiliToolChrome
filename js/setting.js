(function() {
    initBtnTxt();
    $("#popupSearchBtn").click(settingPopupSearch);
    $("#contextMenuSearchBtn").click(settingContextMenu);
    $("#darkBtn").click(settingDark);
    $("#getImg").click(settingGetImg);
    $("#omniboxSearchBtn").click(settingOmnibox)
})()

//设置顶部bs搜索
function settingOmnibox() {
    if ($("#omniboxSearchBtn").text() == "开启") {
        chrome.storage.sync.set({
            omnibox: true
        }, function() {});
        //操作mainfest文件
        let fso = new ActiveXObject("Scripting.FileSystemObject");
        let ts = fso.OpenTextFile("mainfest.json", ForReading);
        let text = ts.ReadAll();
        text = JSON.parse(text);
        console.log(text)
        $("#omnibox").text("关闭");
    } else {
        chrome.storage.sync.set({
            omnibox: false
        }, function() {});
        $("#omnibox").text("开启");
    }
}

function settingGetImg() {
    if ($("#getImg").text() == "开启") {
        chrome.storage.sync.set({
            videoImg: true
        }, function() {});
        $("#getImg").text("关闭");
    } else {
        chrome.storage.sync.set({
            videoImg: false
        }, function() {});
        $("#getImg").text("开启");
    }
}

function settingDark() {
    if ($("#darkBtn").text() == "开启") {
        chrome.storage.sync.set({
            isDark: true
        }, function() {});
        $("#darkBtn").text("关闭");
    } else {
        chrome.storage.sync.set({
            isDark: false
        }, function() {});
        $("#darkBtn").text("开启");
    }
}

function settingPopupSearch() {
    if ($("#popupSearchBtn").text() == "开启") {
        chrome.storage.sync.set({
            popupSearch: true
        }, function() {});
        $("#popupSearchBtn").text("关闭");
    } else {
        chrome.storage.sync.set({
            popupSearch: false
        }, function() {});
        $("#popupSearchBtn").text("开启");
    }
}

function settingContextMenu() {
    if ($("#contextMenuSearchBtn").text() == "开启") {
        chrome.storage.sync.set({
            contextMenu: true
        }, function() {});
        $("#contextMenuSearchBtn").text("关闭");
    } else {
        chrome.storage.sync.set({
            contextMenu: false
        }, function() {});
        $("#contextMenuSearchBtn").text("开启");
    }
}

function initBtnTxt() {
    chrome.storage.sync.get(['popupSearch', 'contextMenu', 'isDark', 'videoImg'], function(result) {
        if (result.popupSearch == true) {
            $("#popupSearchBtn").text("关闭");
        } else {
            $("#popupSearchBtn").text("开启");
        }
        if (result.contextMenu == true) {
            $("#contextMenuSearchBtn").text("关闭");
        } else {
            $("#contextMenuSearchBtn").text("开启");
        }
        if (result.isDark == true) {
            $("#darkBtn").text("关闭");
        } else {
            $("#darkBtn").text("开启");
        }
        if (result.videoImg == true) {
            $("#getImg").text("关闭");
        } else {
            $("#getImg").text("开启");
        }
        if (result.omnibox == true) {
            $("#omniboxSearchBtn").text("关闭");
        } else {
            $("#omniboxSearchBtn").text("开启");
        }
    });
}