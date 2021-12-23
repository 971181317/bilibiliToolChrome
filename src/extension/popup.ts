import "../../css/myStyle.css"
import { getConfig, setConfig } from './public';

function darkBtnStyleInit(isDark: boolean) {
    if (isDark) {
        $("#darkBtn").text("关闭夜间模式");
    } else {
        $("#darkBtn").text("开启夜间模式");
    }
}

async function settingDark() {
    let config = await getConfig();
    if ($("#darkBtn").text() == "开启夜间模式") {
        config.isDark = true;
        $("#darkBtn").text("关闭夜间模式");
    } else {
        config.isDark = false;
        $("#darkBtn").text("开启夜间模式");
    }
    setConfig(config);
}

async function searchWithBilibili() {
    chrome.tabs.create({
        url: "https://search.bilibili.com/all?keyword=" + $("input").val() + "&from_source=nav_suggest_new",
        active: true,
        index: (await getCurrentTab()).index + 1
    });
}

async function goToIndexPage() {
    //获取当前选中标签页的位置
    chrome.tabs.create({
        url: "https://www.bilibili.com",
        active: true,
        index: (await getCurrentTab()).index + 1
    });
}

async function goToSettingPage() {
    //获取当前选中标签页的位置
    chrome.tabs.create({
        url: "dist/page/setting.html",
        active: true,
        index: (await getCurrentTab()).index + 1
    });
}

function popupSearchInit(popupSearch: boolean) {
    if (!popupSearch) {
        $("input").attr("hidden", "hidden");
        $("#searchBtn").css("display", "none");
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

(async function () {
    let config = await getConfig();
    darkBtnStyleInit(config.isDark);
    popupSearchInit(config.popupSearch);
    $("#darkBtn").click(settingDark);
    $("#indexPage").click(goToIndexPage);
    $("#searchBtn").click(searchWithBilibili);
    $("#setting").click(goToSettingPage);
})();