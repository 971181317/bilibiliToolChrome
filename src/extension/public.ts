import { http } from '../common/http';
import { script } from './script'
export async function getConfig(): Promise<any> {
    let get = await chrome.storage.sync.get(['chromeConfig']);
    return JSON.parse(get.chromeConfig);
}

export function setConfig(config: any): void {
    chrome.storage.sync.set({ chromeConfig: JSON.stringify(config) });
}

export async function getCurrentTab(): Promise<chrome.tabs.Tab> {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
export const extensionOperation = {
    // 通过使用页面调取接口
    userBilibiliInterfaceOnPage: async (config: any, tab: chrome.tabs.Tab) => {
        if (tab.url.indexOf("bilibili.com") > -1 && config.signIn) {
            let SESSDATA = await chrome.cookies.get({
                'url': 'https://www.bilibili.com',
                'name': 'SESSDATA'
            });
            let bili_jct = await chrome.cookies.get({
                'url': 'https://www.bilibili.com',
                'name': 'bili_jct'
            });
            // v2老方法，以弃用
            // chrome.tabs.executeScript(null, {
            //     code: 'userBilibiliInterface("' + SESSDATA + '","' + bili_jct + '");'
            // });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: script.doUserBilibiliInterface,
                args: [SESSDATA.value, bili_jct.value]
            });
        }
    },
    // 夜间模式
    dark: (config: any, tab: chrome.tabs.Tab) => {
        if (tab.url.indexOf("bilibili.com") > -1 && config.isDark) {
            // 注入css
            chrome.scripting.insertCSS({
                files: ["dist/css/bilibili_dark_inject.css"],
                target: { tabId: tab.id }
            });
        }
    },
    // 视频页监听
    video: (config: any, tab: chrome.tabs.Tab) => {
        if (tab.url.indexOf("bilibili.com/video") > -1 && config.videoImg) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: script.doBilibiliGetImg
            });
        }
    },

    // 每日登录
    signIn: async () => {
        let config = await getConfig();
        if (config.signInDay !== new Date().toDateString() && config.signIn) {
            //获取cookie
            let cookie = await chrome.cookies.get({
                url: 'https://www.bilibili.com',
                name: 'SESSDATA'
            });
            //桌面提示内容
            let notificationText: chrome.notifications.NotificationOptions<true> = {
                type: 'basic',
                iconUrl: '../../img/favicon128-128.png',
                title: 'bilibili小插件 by淺い空',
                message: '已完成B站每日签到！！'
            }

            if (cookie == null) {
                notificationText.message = '没有登录b站，登陆后才可以使用每日签到哦！！'
            } else {
                //每日登录
                //登录主页
                let coin = await http.httpGet('https://www.bilibili.com');
                //直播签到
                let live = await http.httpGet('https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign');

                if (coin.status > 399 || live.status > 399) {
                    notificationText.message = '网络错误，每日签到失败了啊！！'
                } else {
                    //设置已签到的标志
                    config.signInDay = new Date().toDateString();
                    //设置下一天定时器，在浏览器长期待机时12点再次签到
                    let now = new Date().getTime();
                    //+8区
                    let dayTime = now - (now + 8 * 3600000) % 86400000 + 86400000;
                    let id = setTimeout(extensionOperation.signIn, dayTime - now);
                    config.signInDay = id;
                    setConfig(config);
                }
            }
            //桌面通知
            chrome.notifications.create(null, notificationText);
        }
    }
}
