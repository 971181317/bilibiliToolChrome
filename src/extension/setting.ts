import "../../css/myStyle.css"
import "../../css/honeySwitch.css"
import { honeySwitch } from "./honeySwitch";
import { getConfig, setConfig, extensionOperation } from './public';
(function () {
    honeySwitch.init();
    initBtnTxt();
    settingPopupSearch();
    settingContextMenu();
    settingDark();
    settingGetImg();
    settingSignIn();
    settingEasyDark()
    // $("#omniboxSearchBtn").click(settingOmnibox)
})()

/**
 * 切换开关
 * @param ele jquery需要筛选的元素
 * @param on 开启之后的回调函数
 * @param off 关闭之后的回调函数
 */
function switchEvent(ele: string, on: Function, off: Function) {
    $(ele).click(function () {
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
}

function settingSignIn() {
    switchEvent("#signInBtn", async function () {
        let config = await getConfig();
        extensionOperation.signIn(config);
        config.signIn = true;
        setConfig(config);
    }, async function () {
        let config = await getConfig();
        config.signIn = false;
        //删除计时器
        window.clearTimeout(config.timeOut);
        setConfig(config);
    });
}

async function settingGetImg() {
    switchEvent("#getImg", async function () {
        let config = await getConfig();
        config.videoImg = true;
        setConfig(config);
    }, async function () {
        let config = await getConfig();
        config.videoImg = false;
        setConfig(config);
    });
}

function settingDark() {
    switchEvent("#darkBtn", async function () {
        let config = await getConfig();
        config.isDark = true;
        setConfig(config);
    }, async function () {
        let config = await getConfig();
        config.isDark = false;
        setConfig(config);
    });
}

function settingPopupSearch() {
    switchEvent("#popupSearchBtn", async function () {
        let config = await getConfig();
        config.popupSearch = true;
        setConfig(config);
    }, async function () {
        let config = await getConfig();
        config.popupSearch = false;
        setConfig(config);
    });
}

function settingContextMenu() {
    switchEvent("#contextMenuSearchBtn", async function () {
        let config = await getConfig();
        config.contextMenu = true;
        setConfig(config);
    }, async function () {
        let config = await getConfig();
        config.contextMenu = false;
        setConfig(config);
    });
}

function settingEasyDark() {
    switchEvent("#easyDarkBtn", async function () {
        let config = await getConfig();
        config.easyDark = true;
        setConfig(config);
    }, async function () {
        let config = await getConfig();
        config.easyDark = false;
        setConfig(config);
    });
}

async function initBtnTxt() {
    let config = await getConfig();
    config.popupSearch ?
        honeySwitch.showOn($("#popupSearchBtn")) :
        honeySwitch.showOff($("#popupSearchBtn"));
    config.contextMenu ?
        honeySwitch.showOn($("#contextMenuSearchBtn")) :
        honeySwitch.showOff($("#contextMenuSearchBtn"));
    config.isDark ?
        honeySwitch.showOn($("#darkBtn")) :
        honeySwitch.showOff($("#darkBtn"));
    config.videoImg ?
        honeySwitch.showOn($("#getImg")) :
        honeySwitch.showOff($("#getImg"));
    config.omnibox ?
        honeySwitch.showOn($("#omniboxSearchBtn")) :
        honeySwitch.showOff($("#omniboxSearchBtn"));
    config.signIn ?
        honeySwitch.showOn($("#signInBtn")) :
        honeySwitch.showOff($("#signInBtn"));
    config.easyDark ?
        honeySwitch.showOn($("#easyDarkBtn")) :
        honeySwitch.showOff($("#easyDarkBtn"));
}