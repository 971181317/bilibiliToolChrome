/**
 * 开启获取B站封面功能
 */
window.bilibiliGetImg = () => {
    //在页面左边添加操作的按钮
    if ($("iframe#bilibili-tool-on-video").length == 0) {
        //添加左边小页面iframe
        $("body").append("<style>#bilibili-small-tool button {-webkit-text-size-adjust: 100%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);box-sizing: border-box;margin: 0;font: inherit;overflow: visible; text-transform: none;-webkit-appearance: button;font-family: inherit;display: inline-block;padding: 6px 12px;font-weight: 400;line-height: 1.42857143;white-space: nowrap;vertical-align: middle;touch-action: manipulation;cursor: pointer;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;color: #fff;background-color: #337ab7;border-color: #2e6da4;font-size: 15px;margin-bottom: 5px;text-align: center;}#bilibili-small-tool {top: 200px;left: 0px;position: fixed;width: 150px;height: 110px;background-color: #2d2d2d;color: #ffffff;padding: 10px;}#bilibili-small-tool .text {text-align: center;margin-bottom: 5px;font-size: 15px;padding-top: 5px;}</style><div id=\"bilibili-small-tool\"><div><div class=\"text\">获取当前视频图片</div><div id=\"bv\" class=\"text\">bv</div><div class=\"text\"><button id=\"get-img\" type=\"button\" class=\"text\">获取封面</button></div></div></div>")
        let bv = location.href.split("/")[4].split("?")[0];
        $('#bilibili-small-tool #bv').text(bv);
        //给按钮添加单机事件
        $("#get-img").click(() => {
            let url = "https://api.bilibili.com/x/web-interface/view?bvid=" + bv;
            //ajxs请求接口并打开图片
            $.get(url, (resp) => {
                window.open(resp.data.pic);
            });
        });
    }
}