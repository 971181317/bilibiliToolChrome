// 插件执行页面方法的func
export const script = {
    doUserBilibiliInterface: (SESSDATA: string, csrf: string) => window.userBilibiliInterface(SESSDATA, csrf),
    doBilibiliGetImg: () => window.bilibiliGetImg()
}