const honeySwitch = {};
honeySwitch.themeColor = "rgb(2,157,208)";
honeySwitch.init = function() {
    var s = "<span class='slider'></span>";
    //包含switch标签的元素,添加样式切换
    $("[switch]").append(s);
};
//初始化展示方法
honeySwitch.showOn = function(ele) {
    $(ele).removeClass("switch-off").addClass("switch-on");
    if (honeySwitch.themeColor) {
        var c = honeySwitch.themeColor;
        $(ele).css({
            'border-color': c,
            'box-shadow': c + ' 0px 0px 0px 16px inset',
            'background-color': c
        });
    }
}
honeySwitch.showOff = function(ele) {
    $(ele).removeClass("switch-on").addClass("switch-off");
    $(".switch-off").css({
        'border-color': '#dfdfdf',
        'box-shadow': 'rgb(223, 223, 223) 0px 0px 0px 0px inset',
        'background-color': 'rgb(255, 255, 255)'
    });
}
$(function() {
    honeySwitch.init();
});