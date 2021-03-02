function darkBtnStyleInit() {
    let isDark = chrome.extension.getBackgroundPage().getDark()
    if (isDark == "true") {
        $("#darkBtn")
            .attr("class", "btn btn-default")
            .text("关闭")
    } else {
        $("#darkBtn")
            .attr("class", "btn btn-primary")
            .text("开启")
    }
}

function settingDark() {
    let isDark = $("#darkBtn").text()
    if (isDark == "开启") {
        chrome.extension.getBackgroundPage().setDark("true")
        $("#darkBtn")
            .attr("class", "btn btn-default")
            .text("关闭")
    } else {
        chrome.extension.getBackgroundPage().setDark("false")
        $("#darkBtn")
            .attr("class", "btn btn-primary")
            .text("开启")
    }
}

(function () {
    darkBtnStyleInit()
    $("#darkBtn").click(settingDark)
})()