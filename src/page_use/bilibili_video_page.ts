/**
 * 开启获取B站封面功能
 */
(() => {
    bilibiliGetImg()
})();
function bilibiliGetImg() {
    //在页面左边添加操作的按钮
    if ($("iframe#bilibili-tool-on-video").length == 0) {
        //添加左边小页面iframe
        $("body").append("<style>#bilibili-tool-on-video{top: 200px;left: 0px;position: fixed;}</style><iframe id='bilibili-tool-on-video' width='150px' height='110px'></iframe>");
        $("#bilibili-tool-on-video").attr("src", chrome.runtime.getURL("dist/page/bilibili_get_video_img.html"));

        //加载时给小页面发送bv号
        $(() => {
            let bv = location.href.split("/")[4].split("?")[0];
            //给子页面发送标识符和bv号
            window.frames[0].postMessage('[Bilibili By Sola]' + bv, "*");
        });

        //给主页面添加监听器，监听小页面发来的打开新窗口信息
        window.addEventListener('message', (event) => {
            //修改btn的值
            if (event.data == "[Bilibili By Sola]bilibiliGetImg") {
                let url = "https://api.bilibili.com/x/web-interface/view?bvid=" + location.href.split("/")[4].split("?")[0];
                //ajxs请求接口并打开图片
                $.get(url, (resp) => {
                    window.open(resp.data.pic);
                });
            }
        });
    }
}