import "../../css/bilibili_get_video_img.css"
/**
 * 控制视频页面获取封面小页面使用的js
 */
(function () {
    //接受主页面传来的bv值
    window.addEventListener('message', function (event) {
        let text: string = event.data;
        // 判断是否为插件发出
        if (text.startsWith('[Bilibili By Sola]')) {
            //修改显示的bv值
            $("#bv").text(text.substring(18));
        }
    });
    //给按钮添加单机事件
    $("#get-img").click(function () {
        //给主页面发信息，准备开启新页面
        parent.window.postMessage("[Bilibili By Sola]bilibiliGetImg", "*");
    });
})();