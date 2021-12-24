import { http } from '../common/http'
// 挂在window,方便插件注入脚本使用


/**
 * 部分调用b站接口放在页面调取，注入内容无法无法获取cookie
 * @param SESSDATA cookie中的内容
 * @param csrf cookie中的内容
 * @returns 是否成功
 */
window.userBilibiliInterface = async (SESSDATA: string, csrf: string): Promise<void> => {
    if (SESSDATA == "" && csrf == "") return;

    // x/vip/privilege/my  获取是否已领取
    //获取b币劵（type=1）和会员购优惠劵（type=2S）
    // x/vip/privilege/receive 领取
    let resp = await http.httpGet("https://api.bilibili.com/x/vip/privilege/my?csrf=" + csrf);
    let respJson = await resp.json();
    respJson.data.list.forEach(async (e: any) => {
        if (e.state == 0) {
            console.log(e);
            await http.httpPost("https://api.bilibili.com/x/vip/privilege/receive?csrf=" + csrf + "&type=" + e.type, "");
        }
    });
}
