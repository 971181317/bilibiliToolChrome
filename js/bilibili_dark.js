function bilibiliDarkStart(easyDark) {
    $(window).scroll(function() { toDark(); });
    $(window).click(function() { toDark(); });
    $(function() { toDark(); });
    if (!easyDark) {
        $(window).mousemove(function() { toDark(); });
    }
}


function toDark() {
    let url = window.location.href;
    if (url.startsWith("https://www.bilibili.com/video/")) {
        console.log("视频播放页面dark")
        totalFontColor();
        dynamicAndUserHeader();
        videoBody();
    } else if (url.startsWith("https://www.bilibili.com/")) {
        console.log("主页dark")
        totalFontColor();
        mainHeaderDark();
        mainBodyDark();
        mainFooterDark();
    } else if (url.startsWith("https://t.bilibili.com")) {
        console.log("动态页dark")
        totalFontColor();
        dynamicAndUserHeader();
        dynamicBody();
    } else if (url.startsWith("https://space.bilibili.com")) {
        console.log("用户页面")
        totalFontColor();
        dynamicAndUserHeader();
        userBody();
    } else {
        // console.log("其他页面暂时没做,请联系作者，qq：9711813137，邮箱：971181317@qq.com")
    }
}

function itemSelect() {
    $(this).css("background", "rgb(2,157,208)");
}

function itemNotSelect() {
    $(this).css("background", "#2d2d2d");
}

function totalFontColor() {
    //总字体颜色更改
    $("body").css("color", "#ffffff");
    $("a").css("color", "#ffffff");
    $("p").css("color", "#ffffff");
    $("span").css("color", "#ffffff");
}

function mainFooterDark() {
    $(".international-footer").css("background", "#1c1c1c");
}

function mainBodyDark() {
    $("#app").css("background", "#1c1c1c");
    $("#primary-menu-itnl").css("color", "#ffffff");
    //最上面一行
    $("div.user-con.signin .mini-vip").css("background", "");
    $("div.user-con.signin .mini-favorite").css("background", "");
    $("div.user-con.signin .mini-history").css("background", "");
    //最上方广告
    $("a.name.no-link").css("color", "#ffffff");
    $(".bypb-window").css("color", "#ffffff");
    $(".bypb-window .online")
        .css("background", "#2d2d2d")
        .css("border", "1px solid #2d2d2d");

    $(".list-box").css("background", "#2d2d2d");
    $(".list-box div").css("background", "#2d2d2d");

    //排行榜弹出抽屉
    $(".popover-video-card.pvc").css("background", "#2d2d2d");

    //杂项
    $(".btn.btn-change").css("color", "#ffffff");
    $(".contact-help")
        .css("color", "#ffffff");
    let btnArr = [
        ".btn.more", ".more", ".btn.btn-change", ".change-btn", ".tl-link", "rank-number", "div.item.sortable", ".contact-help"
    ];
    btnArr.forEach((e) => {
        $(e)
            .mousemove(itemSelect)
            .mouseup(itemSelect)
            .mousedown(itemSelect)
            .mouseleave(itemNotSelect);
    });
    $(".tl-link").css("background", "#2d2d2d");
    $(".rank-number").css("background", "#2d2d2d");
    //排行榜数字
    $(".number")
        .css("background", "#2d2d2d")
        .css("color", "#ffffff");
    $(".number.on")
        .css("background", "rgb(2,157,208)")
        .css("color", "#ffffff");
}

function mainHeaderDark() {
    //头tab嵌套页面
    //收藏
    // $(".line-2").css("color", "#ffffff");
    // $(".tab-item.tab-item--normal")
    //     .mousemove(itemSelect)
    //     .mouseleave(itemNotSelect);
    // $(".header-video-card")
    //     .mousemove(itemSelect)
    //     .mouseleave(itemNotSelect);
    // $(".play-view-all a").css("background", "#2d2d2d");

    //动态
    $(".tab-bar").css("background", "#2d2d2d");

    $(".title").css("color", "#ffffff");
    $(".video-list").css("background", "#2d2d2d");
    $(".live-list").css("background", "#2d2d2d");
    $(".article-list").css("background", "#2d2d2d");
    $(".tip-box.no-more-tip").css("background", "#2d2d2d");
    $(".history-tip").css("background", "#2d2d2d");
    $(".list-item").css('color', "#ffffff");
    // $(".list-item")
    //     .mousemove(function() {
    //         $(this).css("background", "rgb(2,157,208)")
    //             .children(".main-container").children(".center-box").children("a")
    //             .css("background", "rgb(2,157,208)")
    //     })
    //     .mouseleave(function() {
    //         $(this).css("background", "#2d2d2d")
    //     });
    //banner下方主页内容
    $(".primary-menu-itnl li span").css("color", "#ffffff");
    $(".primary-menu-itnl li").css("border", "1px solid #1c1c1c");
    $(".international-header a").css("color", "#ffffff");
    $(".item .van-popover__reference").css("background", "#2d2d2d");
    //tab触摸后小窗口颜色适配
    $(".van-popover")
        .css("background", "#2d2d2d")
        .css("border", "1px solid #2d2d2d");
    $(".van-popper")
        .css("background", "#2d2d2d");
    $(".van-popper-channel")
        .css("background", "#2d2d2d");
    //主页左侧联系客服按钮
    $(".contact-help")
        .css("background", "#1c1c1c")
        .css("color", "#2d2d2d");
    //个人信息
    $(".link-title").css("color", "#ffffff");
    $(".link-item")
        .mousemove(itemSelect)
        .mouseleave(itemNotSelect);
    $(".contact-tips.email-tips").css("background", "#000000");
    $(".contact-tips.phone-tips").css("background", "#000000");
    $(".level-intro").css("background", "#3c3c3c");
    $(".level-intro__content").css("color", "#ffffff");
    $(".history-item a").css("color", "#000000");
    $("input .nav-search-keyword").css("color", "#000000");
    $(".channel-menu-mini").css("background", "#3d3d3d");
    //消息按钮
    $("div.im-list-box")
        .css("background", "#2d2d2d")
        .children("a")
        .css("color", "#ffffff");
}

function dynamicAndUserHeader() {
    $(".fixed-bg").css("background", "#1c1c1c");
    $(".home-content").css("background", "#1c1c1c");
    //头
    $(".mini-header__content.mini-header--login").css("background", "#2d2d2d");
    mainHeaderDark();
}

function dynamicBody() {
    //左个人信息
    $(".content").css("background", "#2d2d2d");
    $(".bottom").css("background", "#2d2d2d");
    //左边直播列表
    $(".live-panel").css("background", "#2d2d2d");
    $(".up-name.line-clamp-1").css("color", "#ffffff");
    $(".live-name.line-clamp-2").css("color", "#ffffff");
    //直播用户抽屉
    $(".userinfo-content").css("background", "#2d2d2d");
    // $(".btn-box").css("color", "#000000")
    //动态发布
    $(".section-block").css("background", "#2d2d2d");
    $(".publish-panel").css("background", "#2d2d2d");
    $(".core-style")
        .css("background", "#2d2d2d")
        .css("border", "1px solid #ffffff")
        .css("color", "#ffffff");
    //公告栏
    $(".notice-panel").css("background", "#2d2d2d");
    //话题
    $(".new-topic-panel").css("background", "#2d2d2d");
    $(".title.tc-black").css("color", "#ffffff");
    //动态上方头像
    $(".most-viewed-panel")
        .css("background", "#2d2d2d")
        .css("color", "#ffffff");
    //动态卡片
    $(".card")
        .css("background", "#2d2d2d");
    $(".card dir").css("background", "#2d2d2d");
    $(".live-container").css("background", "#2d2d2d");
    $(".video-wrap").css("background", "#2d2d2d");
    $(".post-content.repost").css("background", "#3d3d3d");
    $(".post-content.repost .content").css("background", "#3d3d3d");
    $(".post-content.repost .video-wrap").css("background", "#3d3d3d");
    $(".post-content.repost .video-wrap .text-area").css("background", "#3d3d3d");
    $(".shop-list").css("background", "#2d2d2d");
    $(".article-container").css("background", "#2d2d2d");
    $(".post-content.repost .text-area").css("background", "#3d3d3d");
    $(".music-container.bg-white.pointer.t-left")
        .css("background", "#2d2d2d")
        .css("color", "#ffffff");
    //番剧
    $(".bangumi-container.can-hover").css("background", "#2d2d2d");
    $(".text-content.ff-yahei.tc-black.fs-14.ls-0.line-clamp-1").css("color", "#ffffff");
    //有新动态
    $("p .message").css("color", "#9b7652");

    //评论
    $(".bb-comment").css("background", "#2d2d2d");
}

function userBody() {
    $("html").css("background", "#1c1c1c");
    $("#app").css("background", "#1c1c1c");
    //header
    $(".h").css("background", "#1c1c1c");
    //search
    $("#navigator").css("background", "#1c1c1c").css("box-shadow", "0 0 0 1px #2d2d2d");
    $(".n-inner.clearfix").css("background", "#2d2d2d").css("box-shadow", "0 0 0 1px #2d2d2d");
    $(".wrapper").css("border-color", "#1c1c1c");
    $("h3").css("color", "#ffffff");
    $("span.count").css("color", "rgb(2,157,208)");
    //body
    $(".s-space").css("background", "#1c1c1c");
    $(".col-1").css("background", "#2d2d2d")
        .css("border", "1px solid #1c1c1c");
    $(".col-2").children()
        .css("background", "#2d2d2d")
        .css("border-color", "#1c1c1c");
    $(".row.user-auth.no-auth").css("background", "#2d2d2d");
    $(".section")
        .css("background", "#2d2d2d")
        .css("border-color", "#1c1c1c");
    $("textarea.be-textarea_inner")
        .css("background", "#2d2d2d")
        .css("border-color", "#ffffff");
    //动态卡片
    $(".card")
        .css("background", "#2d2d2d")
        .css("border-color", "#2d2d2d");
    $(".card dir").css("background", "#2d2d2d");
    $(".live-container").css("background", "#2d2d2d");
    $(".video-wrap").css("background", "#2d2d2d");
    $(".post-content.repost").css("background", "#3d3d3d");
    $(".post-content.repost .content").css("background", "#3d3d3d");
    $(".post-content.repost .video-wrap").css("background", "#3d3d3d");
    $(".post-content.repost .video-wrap .text-area").css("background", "#3d3d3d");
    $(".shop-list").css("background", "#2d2d2d");
    $(".article-container").css("background", "#2d2d2d");
    $(".post-content.repost .text-area").css("background", "#3d3d3d");
    $(".music-container.bg-white.pointer.t-left")
        .css("background", "#2d2d2d")
        .css("color", "#ffffff");
    //番剧
    $(".bangumi-container.can-hover").css("background", "#2d2d2d");
    $(".text-content.ff-yahei.tc-black.fs-14.ls-0.line-clamp-1").css("color", "#ffffff");
    //投稿
    $(".col-full.clearfix").css("background", "#2d2d2d").css("box-shadow", "0 0 0 1px #2d2d2d");
    $(".contribution-sidenav").css("border-color", "#2d2d2d");
    $(".main-content").css("border-color", "#2d2d2d");
    $("#submit-video-type-filter").css("background", "#3c3c3c");
    //频道
    $(".col-full").css("background", "#2d2d2d").css("box-shadow", "0 0 0 1px #2d2d2d").css("border-color", "#2d2d2d");
    $(".channel-option.no-channel").css("background", "#2d2d2d");
    //收藏
    $(".small-item").css("border-color", "#2d2d2d");
    $(".be-pager li").css("background", "#2d2d2d");
    //订阅
    $(".pgc-item-title").css("color", "#ffffff");
    $(".pgc-item-desc").css("color", "#ffffff");
    $(".bangumi-pagelistbox.clearfix a").css("background", "#2d2d2d");
    //设置
    $("#setting-new-tag-btn").css("background", "#2d2d2d");
    $(".setting-tag-list a").css("background", "#2d2d2d");
    $("input#setting-new-tag").css("background", "#2d2d2d").css("color", "#ffffff");
    //充电
    $(".elec-status-bg-grey").css("background", "#2d2d2d");
}

function videoBody() {
    $("#app").css("background", "#1c1c1c");

    //右上角up猪
    $(".btn-panel").children().first().css("background", "#fb7299").css("color", "#ffffff");
    $(".btn-panel").children().last().css("background", "#00b5e5").css("color", "#ffffff");

    //弹幕
    $(".bui-collapse-header").css("background-color", "#2d2d2d");
    $(".player-auxiliary-danmaku-function").css("background", "#2d2d2d")
        .children().css("background", "#2d2d2d").css("color", "#ffffff");
    $(".player-auxiliary-danmaku-warp li,ul").css("background", "#2d2d2d");
    $(".player-auxiliary-danmaku-btn-history,.player-auxiliary-danmaku-btn-footer").css("background", "#2d2d2d").css("color", "#ffffff");
    $(".player-auxiliary-area relative").css("background", "#2d2d2d");

    //tag
    $(".tag-area li").css("background", "#2d2d2d");

    //评论
    $(".bb-comment").css("background", "#1c1c1c");
    $(".comment-send-lite ").css("background", "#2d2d2d");
}