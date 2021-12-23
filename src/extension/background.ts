/*
    后台页面，从浏览器开启到结束都存在
*/
import { getConfig, setConfig, SignIn } from './public';
//初始化
(async function () {
    //初始化background持久化变量
    await initStorage();
    //建立页面监听
    addPageListener();
    //bs搜索
    omnibox();
    //是否开启右键搜索功能
    let config = await getConfig();
    if (config.contextMenu) contextMenu();
    //每日签到
    SignIn();
})();

async function initStorage() {
    console.log('init');
    let result = await chrome.storage.sync.get(['chromeConfig']);
    if (result.chromeConfig == undefined) {
        setConfig({
            isDark: false, // 夜间模式
            contextMenu: true,// 右键搜索
            popupSearch: true,// popup搜索
            videoImg: true,// 获取图片
            signIn: true, // 每日签到
            signInDay: '', // 签到时间
            timeOutId: 0,//计时器
            easyDark: false // 简单模式
        });
    }
}

//b站页面开启监听
function addPageListener(): void {
    chrome.tabs.onUpdated.addListener(async (_tabId, _changeInfo, tab) => {
        //b站跨域接口请求，在每次进入页面时触发
        let config = await getConfig();
        //监听所有b站页面
        if (tab.url.indexOf("bilibili.com") > -1) {
            if (config.signIn) {
                let SESSDATA = await chrome.cookies.get({
                    'url': 'https://www.bilibili.com',
                    'name': 'SESSDATA'
                });
                let bili_jct = await chrome.cookies.get({
                    'url': 'https://www.bilibili.com',
                    'name': 'bili_jct'
                });
                chrome.tabs.executeScript(null, {
                    code: 'userBilibiliInterface("' + SESSDATA + '","' + bili_jct + '");'
                });
            }
            //夜间模式
            if (config.isDark && config.easyDark) {
                chrome.tabs.executeScript(null, { code: 'bilibiliDarkStart(true)' });
            } else if (config.isDark) {
                chrome.scripting.executeScript(null, { code: 'bilibiliDarkStart(false)' });
            }
        }
        //视频页面监听
        if (tab.url.indexOf("bilibili.com/video") > -1 && config.videoImg) {
            chrome.scripting.executeScript(null, { code: 'bilibiliGetImg()' });
        }
    });
}

//搜索栏使用b站搜索，输入bs触发
function omnibox(): void {
    // 当用户接收关键字建议时触发
    chrome.omnibox.onInputEntered.addListener(async function (text) {
        let tab = await chrome.tabs.getSelected();
        chrome.tabs.update(tab.id, {
            url: "https://search.bilibili.com/all?keyword=" + text + "&from_source=nav_suggest_new"
        });
    });
}

//右键菜单搜索
function contextMenu(): void {
    chrome.contextMenus.create({
        title: '使用bilibili搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
        onclick: function (params) {
            //创建搜索界面
            chrome.tabs.create({
                url: "https://search.bilibili.com/all?keyword=" +
                    encodeURI(params.selectionText) +
                    "&from_source=nav_suggest_new",
                active: true,
            })
        }
    });
}