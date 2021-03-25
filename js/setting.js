(function() {
    initBtnTxt();
    $("#popupSearchBtn").click(settingPopupSearch);
    $("#contextMenuSearchBtn").click(settingContextMenu);
})()

function settingPopupSearch() {
    if ($("#popupSearchBtn").text() == "开启") {
        chrome.storage.sync.set({ popupSearch: true }, function() {});
        $("#popupSearchBtn").text("关闭");
    } else {
        chrome.storage.sync.set({ popupSearch: false }, function() {});
        $("#popupSearchBtn").text("开启");
    }
}

function settingContextMenu() {
    if ($("#contextMenuSearchBtn").text() == "开启") {
        chrome.storage.sync.set({ contextMenu: true }, function() {});
        $("#contextMenuSearchBtn").text("关闭");
    } else {
        chrome.storage.sync.set({ contextMenu: false }, function() {});
        $("#contextMenuSearchBtn").text("开启");
    }
}

function initBtnTxt() {
    chrome.storage.sync.get(['popupSearch', 'contextMenu'], function(result) {
        if (result.popupSearch == true)
            $("#popupSearchBtn").html("关闭");
        else
            $("#popupSearchBtn").html("开启");
        if (result.contextMenu == true)
            $("#contextMenuSearchBtn").html("关闭");
        else
            $("#contextMenuSearchBtn").html("开启");
    });
}