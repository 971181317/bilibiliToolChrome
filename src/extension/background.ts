/*
    后台页面，从浏览器开启到结束都存在
*/
import { getConfig, setConfig, getCurrentTab, extensionOperation } from './public';
//初始化
(async function () {
    // service work并不会一直工作在后台，所以将部分内容放入初始化中

    //初始化background持久化变量
    chrome.runtime.onInstalled.addListener(async () => initStorage());
    //建立页面监听
    addPageListener();
    //bs搜索
    omnibox();
    let config = await getConfig();
    contextMenus(config);
})();

async function initStorage(): Promise<void> {
    console.log('init');
    let result = await chrome.storage.sync.get(['chromeConfig']);
    let config = {
        isDark: false, // 夜间模式
        contextMenu: true,// 右键搜索
        popupSearch: true,// popup搜索
        videoImg: true,// 获取图片
        signIn: true, // 每日签到
        signInDay: "", // 签到时间
        timeOutId: -1,//计时器
        easyDark: false // 简单模式
    }
    if (result.chromeConfig == undefined) {
        // 将时间重置为过去的时间，这样保证下一次肯定会签到
        let date = new Date();
        date.setFullYear(2012);
        setConfig(config);
    }

    //是否开启右键搜索功能
    chrome.contextMenus.create({
        id: 'bilibili-search-sola',
        title: '使用bilibili搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    });

    //每日签到
    extensionOperation.signIn(config);
}

//b站页面开启监听
function addPageListener(): void {
    // 创建的时候
    // chrome.tabs.onCreated.addListener((tab) => { pageOption(tab); });
    //  更新的时候
    chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
        if (changeInfo.status == 'complete') pageOption(tab);
    });
}

// 页面操作
async function pageOption(tab: chrome.tabs.Tab): Promise<void> {
    let config = await getConfig();
    extensionOperation.dark(config, tab);
    extensionOperation.userBilibiliInterfaceOnPage(config, tab);
    extensionOperation.video(config, tab);
}

//搜索栏使用b站搜索，输入bs触发
function omnibox(): void {
    // 当用户接收关键字建议时触发
    chrome.omnibox.onInputEntered.addListener(async function (text) {
        let tab = await getCurrentTab();
        chrome.tabs.update(tab.id, {
            url: "https://search.bilibili.com/all?keyword=" + text + "&from_source=nav_suggest_new"
        });
    });
}

//右键菜单搜索
function contextMenus(config: any): void {
    if (config.contextMenu) {
        chrome.contextMenus.onClicked.addListener(function (info, tab) {
            if (info.menuItemId == 'bilibili-search-sola') {
                //创建搜索界面
                chrome.tabs.create({
                    url: "https://search.bilibili.com/all?keyword=" +
                        encodeURI(info.selectionText) +
                        "&from_source=nav_suggest_new",
                    active: true,
                    index: tab.index + 1
                })
            }
        });
    }
}