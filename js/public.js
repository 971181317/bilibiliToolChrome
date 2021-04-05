//每日签到
function signIn() {
    chrome.storage.sync.get(['signIn', 'signInDay'], function(result) {
        //判断今天是否签到
        if (result.signInDay === new Date().toDateString()) return;
        if (result.signIn == true) {
            //获取cookie
            chrome.cookies.get({
                'url': 'https://www.bilibili.com',
                'name': 'SESSDATA'
            }, function(cookie) {
                //桌面提示内容
                let notificationText = {
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
                    chrome.storage.sync.set({ signInDay: new Date().toDateString() }, function() {});
                }
                //桌面通知
                chrome.notifications.create(null, notificationText);
                //设置下一天定时器，在浏览器长期待机时12点再次签到
                let now = new Date().getTime();
                //+8区
                let dayTime = now - (now + 8 * 3600000) % 86400000 + 86400000;
                let id = setTimeout(signIn, dayTime - now);
                chrome.storage.sync.set({ timeOutId: id }, function() {});
            });
        }
    });
}