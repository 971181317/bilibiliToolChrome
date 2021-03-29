//控制视频页面获取封面小页面
(function (){
    //接受主页面传来的bv值
    window.addEventListener('message', function(event) {
        //修改btn的值
        $("#bv").text(event.data)
    });
    //给按钮添加单机事件
    $("#get-img").click(function () {
        //给主页面发信息，准备开启新页面
        parent.window.postMessage("bilibiliGetImg", "*");
    })
})();