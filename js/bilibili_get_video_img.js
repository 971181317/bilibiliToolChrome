//开启获取备战封面功能
function bilibiliGetImg() {
    //在页面右边添加操作的按钮
    if ($("#bilibili-small-tool").length == 0) {
        addHtml();
        //页面发生变更时改变数据
        window.onload = updateData;
        window.onclick = updateData;
        //按钮单机事件
        $("#get-img").click(function() {
            let url = "https://api.bilibili.com/x/web-interface/view?bvid=" + $("div#bv").text()
            $.get(url, function(resp) {
                window.open(resp.data.pic);
            })
        });
    }
}

function updateData() {
    let bv = location.href.split("/")[4].split("?")[0];
    $("div#bv").text(bv)
}

function addHtml() {
    $("body").append(
        "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\
        <script src=\"https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\
        <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\">\
        </script>\
        <style>\
            #bilibili-small-tool {\
                top: 200px;\
                right: 0px;\
                position: fixed;\
                width: 150px;\
                height: 110px;\
                background-color: #2d2d2d;\
                color: #ffffff;\
                padding: 10px;\
            }\
            \
            .tool-text {\
                text-align: center;\
                margin-bottom: 5px;\
                font-size: 15px;\
            }\
        </style>\
        <div id=\"bilibili-small-tool\">\
            <div>\
                <div class=\"tool-text\">\
                    获取当前视频图片\
                </div>\
                <div class=\"tool-text\" id=\"bv\">2</div>\
                <div class=\"tool-text\">\
                    <button id=\"get-img\" type=\"button\" class=\"btn btn-primary tool-text\">\
                        获取封面\
                    </button>\
                </div>\
            </div>\
        </div>"
    );
}