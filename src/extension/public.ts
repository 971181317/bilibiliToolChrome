export async function getConfig(): Promise<any> {
    let get = await chrome.storage.sync.get(['chromeConfig']);
    return JSON.parse(get.chromeConfig);
}

export function setConfig(config: any) {
    chrome.storage.sync.set({ chromeConfig: JSON.stringify(config) });
}

//每日签到，有跨域问题的接口放在页面内注入执行
export async function SignIn(): Promise<void> {
    let config = await getConfig();
    if (config.signInDay == new Date().toDateString()) return;
    if (config.signIn) {
        //获取cookie
        let cookie = await chrome.cookies.get({
            'url': 'https://www.bilibili.com',
            'name': 'SESSDATA'
        });
        //桌面提示内容
        let notificationText: chrome.notifications.NotificationOptions<true> = {
            type: 'basic',
            iconUrl: 'img/favicon128-128.png',
            title: 'bilibili小插件 by淺い空',
            message: '已完成B站每日签到！！'
        }
        if (cookie == null) {
            notificationText.message = '没有登录b站，登陆后才可以使用每日签到哦！！'
        } else {
            //每日登录
            //登录主页
            $.get('https://www.bilibili.com');
            //直播签到
            $.get('https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign');
            //设置已签到的标志
            config.signInDay = new Date().toDateString();
        }
        //桌面通知
        chrome.notifications.create(null, notificationText);
        //设置下一天定时器，在浏览器长期待机时12点再次签到
        let now = new Date().getTime();
        //+8区
        let dayTime = now - (now + 8 * 3600000) % 86400000 + 86400000;
        let id = setTimeout(SignIn, dayTime - now);
        config.signInDay = id;
        setConfig(config);
    }
}