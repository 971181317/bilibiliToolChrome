(function() {
    initBtnTxt();
    settingPopupSearch();
    settingContextMenu();
    settingDark();
    settingGetImg();
    settingSignIn();
    // $("#omniboxSearchBtn").click(settingOmnibox)
})()

function switchEvent(ele, on, off) {
    $(ele).click(function() {
        if ($(this).hasClass("switch-disabled")) {
            return;
        }
        if ($(this).hasClass('switch-on')) {
            $(this).removeClass("switch-on").addClass("switch-off");
            $(".switch-off").css({
                'border-color': '#dfdfdf',
                'box-shadow': 'rgb(223, 223, 223) 0px 0px 0px 0px inset',
                'background-color': 'rgb(255, 255, 255)'
            });
            if (typeof off == 'function') {
                off();
            }
        } else {
            $(this).removeClass("switch-off").addClass("switch-on");
            if (honeySwitch.themeColor) {
                var c = honeySwitch.themeColor;
                $(this).css({
                    'border-color': c,
                    'box-shadow': c + ' 0px 0px 0px 16px inset',
                    'background-color': c
                });
            }
            if (typeof on == 'function') {
                on();
            }
        }
    });
};

//设置顶部bs搜索
// function settingOmnibox() {
// if ($("#omniboxSearchBtn").text() == "开启") {
//     chrome.storage.sync.set({
//         omnibox: true
//     }, function() {});
//     //操作mainfest文件
//     let fso = new ActiveXObject("Scripting.FileSystemObject");
//     let ts = fso.OpenTextFile("mainfest.json", ForReading);
//     let text = ts.ReadAll();
//     text = JSON.parse(text);
//     console.log(text)
//     $("#omnibox").text("关闭");
// } else {
//     chrome.storage.sync.set({
//         omnibox: false
//     }, function() {});
//     $("#omnibox").text("开启");
// }
// }

function settingSignIn() {
    switchEvent("#signInBtn",function(){
        chrome.storage.sync.set({ signIn: true }, function() {});
        //执行
        signIn();
    },function(){
        chrome.storage.sync.set({ signIn: false }, function() {});
        //删除计时器
        chrome.storage.sync.get(['timeOut'], function(result) { window.clearTimeout(result.timeOut); });
        $("#signInBtn").text("开启");
    });
}

function settingGetImg() {
    switchEvent("#getImg",function(){
        chrome.storage.sync.set({ videoImg: true }, function() {});
    },function(){
        chrome.storage.sync.set({ videoImg: false }, function() {});
    });
}

function settingDark() {
    switchEvent("#darkBtn",function(){
        chrome.storage.sync.set({ isDark: true }, function() {});
    },function(){
        chrome.storage.sync.set({ isDark: false }, function() {});
    });
}

function settingPopupSearch() {
    switchEvent("#popupSearchBtn",function(){
        chrome.storage.sync.set({ popupSearch: true }, function() {});
        console.log("kai")
    },function(){
        chrome.storage.sync.set({ popupSearch: false }, function() {});
        console.log("guan")
    });
}

function settingContextMenu() {
    switchEvent("#contextMenuSearchBtn",function(){
        chrome.storage.sync.set({ contextMenu: true }, function() {});
    },function(){
        chrome.storage.sync.set({ contextMenu: false }, function() {});
    });
}

function initBtnTxt() {
    chrome.storage.sync.get(['popupSearch', 'contextMenu', 'isDark', 'videoImg', 'signIn'], function(result) {
        result.popupSearch == true
            ? honeySwitch.showOn($("#popupSearchBtn"))
            : honeySwitch.showOff($("#popupSearchBtn"));
        result.contextMenu == true
            ? honeySwitch.showOn($("#contextMenuSearchBtn"))
            : honeySwitch.showOff($("#contextMenuSearchBtn"));
        result.isDark == true
            ? honeySwitch.showOn($("#darkBtn"))
            : honeySwitch.showOff($("#darkBtn"));
        result.videoImg == true
            ? honeySwitch.showOn($("#getImg"))
            : honeySwitch.showOff($("#getImg"));
        result.omnibox == true
            ? honeySwitch.showOn($("#omniboxSearchBtn"))
            : honeySwitch.showOff($("#omniboxSearchBtn"));
        result.signIn == true
            ? honeySwitch.showOn($("#signInBtn"))
            : honeySwitch.showOff($("#signInBtn"));
    });
}