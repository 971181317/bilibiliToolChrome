/*
    后台页面，从浏览器开启到结束都存在
*/
import { getConfig, setConfig, getCurrentTab, extensionOperation, defaultConfig } from './public';
//初始化
(async function () {
    // chrome 推行事件机制，service work在一段时间后会停止
    //初始化background持久化变量
    chrome.runtime.onInstalled.addListener(async () => initStorage());
    //每日签到
    await extensionOperation.signIn();
    //建立页面监听
    addPageListener();
    //bs搜索
    omnibox();
    contextMenus();
})();

async function initStorage(): Promise<void> {
    console.log('init');
    let result = await chrome.storage.sync.get(['chromeConfig']);
    if (result.chromeConfig === undefined) {
        let c = defaultConfig;
        // 将时间重置为过去的时间，这样保证下一次肯定会签到
        let date = new Date();
        date.setFullYear(2012);
        c.signInDay = date.toDateString();
        setConfig(c);
    }

    //是否开启右键搜索功能
    chrome.contextMenus.create({
        id: 'bilibili-search-sola',
        title: '使用bilibili搜索：%s', // %s表示选中的文字
        contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    });
}

//b站页面开启监听
function addPageListener(): void {
    // 创建的时候
    // chrome.tabs.onCreated.addListener((tab) => { pageOption(tab); });
    //  更新的时候
    chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
        if (changeInfo.status == 'complete') await pageOption(tab);
    });
}

// 页面操作
async function pageOption(tab: chrome.tabs.Tab): Promise<void> {
    let config = await getConfig();
    await extensionOperation.dark(config, tab);
    await extensionOperation.userBilibiliInterfaceOnPage(config, tab);
    await extensionOperation.video(config, tab);
}

//搜索栏使用b站搜索，输入bs触发
function omnibox(): void {
    // 当用户接收关键字建议时触发
    chrome.omnibox.onInputEntered.addListener(async function (text) {
        let tab = await getCurrentTab();
        await chrome.tabs.update(tab.id, {
            url: "https://search.bilibili.com/all?keyword=" + text + "&from_source=nav_suggest_new"
        });
    });
}

//右键菜单搜索
async function contextMenus(): Promise<void> {
    let config = await getConfig();
    if (config.contextMenu) {
        chrome.contextMenus.onClicked.addListener(async function (info, tab) {
            if (info.menuItemId == 'bilibili-search-sola') {
                //创建搜索界面
                await chrome.tabs.create({
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