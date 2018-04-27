/**
 * Created by morning on 2016/9/2.
 */

$(document).ready(function() {

    $.ajax({
        url: "/associationList",
        type: "POST",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            window.alert(data);
            console.log(data);
            var $out_side = $(".menu_list ul");
            for(var i in data){
                var $li = $("<li>").addClass("lis");
                var $p = $("<p>").addClass("fuMenu").text(data[i].category)
                var $div = $("<div1>").addClass("div1");
                var languages = data[i].languages;
                var categoryids = data[i].categoryids;
                var $img = $("<img class='xiala' src='images/blog/xiala.png' />")
                for(var j in languages){
                    var $p_inside = $("<p>").addClass("zcd").attr("id",categoryids[j]).text(languages[j]);
                    $div.append($p_inside);
                }
                $li.append($p);
                $li.append($img);
                $li.append($div);
                $out_side.append($li);
            }

            //绑定元素点击事件
            $(".menu_list ul").children().click(function() {
                //判断对象是显示还是隐藏
                if ($(this).children(".div1").is(":hidden")) {
                    //表示隐藏
                    if (!$(this).children(".div1").is(":animated")) {
                        //下拉箭头旋转
                        //判断是否是IE浏览器
                        if (myBrowser() == "IE") {
                            //IE浏览器不兼容transform属性，使用filter属性
                            $(this).children(".xiala").css({'filter': 'progid:DXImageTransform.Microsoft.BasicImage(rotation:1)'});
                        } else {
                            $(this).children(".xiala").css({'transform': 'rotate(90deg)'});
                        }
                        //如果当前没有进行动画，则添加新动画
                        $(this).children(".div1").animate({
                            height: 'show'
                        }, 1000)
                        //siblings遍历div1的元素
                            .end().siblings().find(".div1").hide(1000);
                    }
                } else {
                    //表示显示
                    if (!$(this).children(".div1").is(":animated")) {
                        //下拉箭头旋转恢复
                        //判断是否是IE浏览器
                        if (myBrowser() == "IE") {
                            //IE浏览器不兼容transform属性，使用filter属性
                            $(this).children(".xiala").css({'filter': 'progid:DXImageTransform.Microsoft.BasicImage(rotation:0)'});
                        } else {
                            $(this).children(".xiala").css({'transform': 'rotate(0deg)'});
                        }

                        $(this).children(".div1").animate({
                            height: 'hide'
                        }, 1000)
                            .end().siblings().find(".div1").hide(1000);
                    }
                }
            });


            //点击子菜单为子菜单添加样式，并移除所有其他子菜单样式
            $(".menu_list ul li .div1 .zcd").click(function() {
                //设置当前菜单为选中状态的样式，并移除同类同级别的其他元素的样式
                $(this).addClass("removes").siblings().removeClass("removes");

                var language = $(this).text();
                var category = $(this).parent().parent().find(".fuMenu").text();
                //插入博客处理机制
                var formData = {
                    category : category,
                    language : language
                };
                getQuestions(formData);
                console.log(language+"   "+category);
                //遍历获取所有父菜单元素
                $(".div1").each(function(){
                    //判断当前的父菜单是否是隐藏状态
                    if($(this).is(":hidden")){
                        //如果是隐藏状态则移除其样式
                        $(this).children(".zcd").removeClass("removes");
                    }
                });
            });

            //循环所有div1元素，下拉箭头在
            $(".lis>.fuMenu").click(function() {
                $(".div1").each(function(){
                    //判断当前的父菜单是否是隐藏状态
                    if(!$(this).is(":hidden")){
                        //如果当前点击时不是隐藏状态则将其箭头显示为原始状态
                        if(myBrowser()=="IE"){
                            //判断是否是IE浏览器
                            //IE浏览器不兼容transform属性，使用filter属性
                            $(this).parent().children("img").css({'filter':'progid:DXImageTransform.Microsoft.BasicImage(rotation:0)'});
                        }else{
                            $(this).parent().children("img").css({'transform':'rotate(0deg)'});
                        }
                    }
                });
            });
            //点击收缩菜单
            $("#hidIcon").click(function(){
                //隐藏菜单并显示隐藏后的左侧菜单
                $(".leftMenu").animate({"margin-left":"-220px"},"slow",function(){
                    $(".hidLeftMenu").css("display","block");
                    $(".leftMenu").css("display","none")
                })
            });
            //点击图标展开菜单显示
            $(".openMenu").click(function(){
                $(".hidLeftMenu").css("display","none");
                $(".leftMenu").css("display","block")
                    .animate({"margin-left":"0px"},"slow");
            });
            //阻止事件冒泡，子元素不再继承父元素的点击事件
            $('.div1').click(function(e){
                e.stopPropagation();
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.alert("错误");
        }
    });
    $('.theme-login').click(function(){

        $('.theme-popover-mask').fadeIn(100);

        $('.theme-popover').slideDown(200);

    });

    $('.theme-poptit .close').click(function(){

        $('.theme-popover-mask').fadeOut(100);

        $('.theme-popover').slideUp(200);

    });
    askQuestion();
});
function askQuestion(){
    $("#upload").click(function(){
        var questionTitle = $("#questionTitle").val();
        var userName = getJwtName();
        var categoryLanguage = {
            "categoryid":$(".removes").attr("id"),
            "language" : $(".removes").text(),
            "category" : $(".removes").parent().parent().find(".fuMenu").text()
        };
        var newQuestion = {
            "categoryLanguage":categoryLanguage,
            "questionTitle":questionTitle
        };
        console.log("newQuestion="+newQuestion);
        $.ajax({
            url: "/addQuestion",
            type: "POST",
            data: JSON.stringify(newQuestion),
            contentType: "application/json; charset=utf-8",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {
                $('.theme-popover-mask').fadeOut(100);

                $('.theme-popover').slideUp(200);
                showQuestion(data);
            }
        });
    });
}
function getQuestions(categorylanguage) {
    $.ajax({
        url: "/questionlist",
        type: "POST",
        data: JSON.stringify(categorylanguage),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            console.log("question="+data);
            showQuestion(data);
        }
    });
};

function showQuestion(data){
    $("#js-home-feed-list").empty();
    for(var i in data){
        //总的问题HTML
        var feed_item =
            '<div class="feed-item" id="@QuestionId">'
            +'<div class="avatar"></div>'
            +'<div class="feed-main">'
            +'<div class="feed-content">'
            +'</div>'
            +'<a style="cursor: pointer;" class="ignore"></a>'
            +'</div>'
            +'</div>'
            +'<div class="feed-item-options hidden"></div>'
            +'</div>';
        feed_item = feed_item.replace(new RegExp("@QuestionId","gm"),data[i].questionId);
        if(data[i].answerEntityList[0] == null){
            var $feed_item = $(feed_item);
            //设置问题的标题和链接
            var questionHref = data[i].questionId;
            var questionTitle = data[i].questionTitle;
            var $h2 = $("<h2>").append($("<a>").attr("name",questionHref).addClass("question-link").text(questionTitle));
            $feed_item.find(".feed-content").prepend($h2);
        }
        else{
            var $feed_item = $(feed_item);
            //设置问题的标题和链接
            var questionHref = data[i].questionId;
            var questionTitle = data[i].questionTitle;
            var $h2 = $("<h2>").append($("<a>").attr("name",questionHref).addClass("question-link").text(questionTitle));
            //设置回答的赞数
            var entry_body =
                '<div class="entry-body" id = @AnswerId>'
                +'<div class="zm-item-vote"><a class="zm-item-vote-count">@AnswerLove</a></div>'
                +'<div class="zm-votebar">'
                +'<button class="up " title="赞同">'
                +'<i class="icon vote-arrow"></i>'
                +'<span class="count">@AnswerLove</span>'
                +'</button>'
                +'<button class="down" title="反对，不会显示您的姓名">'
                +'<i class="icon vote-arrow"></i>'
                +'</button>'
                +'</div>'
                +'<div class="zm-item-answer-author-info">'
                +'<span class="summary-wrapper">'
                +'<span class="author-link-line">'
                +'<a class="author-link" href=@userHref>@userName</a>'
                +'</span>'
                +'</span>'
                +'</div>'
                +'<div class="zm-item-rich-text expandable">'
                +'<div style="display: none;">@AnswerContent</div>'
                +'<div class="zh-summary summary clearFix" style="display: block;">@AnswerShortContent'
                +'<a href="javascript:;" class="toggle-expand">显示全部</a>'
                +'</div>'
                +'</div>'
                +'</div>';
            var answerEntity = data[i].answerEntityList[0];
            entry_body = entry_body.replace(new RegExp("@AnswerId","gm"),answerEntity.answerId);
            entry_body = entry_body.replace(new RegExp("@AnswerLove","gm"),answerEntity.answerLove);
            entry_body = entry_body.replace(new RegExp("@userhref","gm"),"/user/"+answerEntity.userEntity.id);
            entry_body = entry_body.replace(new RegExp("@userName","gm"),answerEntity.userEntity.userName);
            entry_body = entry_body.replace(new RegExp("@AnswerContent","gm"),answerEntity.answerContent);
            entry_body = entry_body.replace(new RegExp("@AnswerShortContent","gm"),answerEntity.answerContent.substring(0,30));
            var feed_meta =
                '<div class="feed-meta">'
                +'<div class="zm-item-meta clearFix">'
                +'<div class="zm-meta-panel">'
                +'<a href="javascript:;" class="toggle-comment meta-item" num = "@CommentLength"><i class="z-icon-comment"></i>@CommentLength条评论</a>'
                +'<a href="#" class="js-report meta-item">作者保留权利</a>'
                +'<button class="item-collapse meta-item"><i class="z-icon-fold"></i>收起</button>'
                +'</div>'
                +'<div class="comment-app-holder" style="display: none">'
                +'<div class="_commentBox-bordered-3Fo"><i class="icon ioc-spike"></i>'
                +'<div class="_commentBox-list">'
                +'<div class="_commentBox-pageBorder _pager_root">'
                +'<span class="_pager-item _pager-muted">上一页</span>'
                +'<span class="_pager-item _pager-muted">1</span>'
                +'<a class="_pager-item">2</a>'
                +'<a class="_pager-item">3</a>'
                +'<a class="_pager-item">4</a>'
                +'<a class="_pager-item">5</a>'
                +'<a class="_pager-item">下一页</a>'
                +'</div>'
                +'<div class="_commentForm-border">'
                +'<input type="text" class="_inputBox_root" placeholder="写下你的评论...">'
                +'<div class="zm-comment zg-clear">'
                +'<a href="#" class="zg-right zg-btn-blue addComment">评论</a>'
                +'<a href="#" class="zm-comment-cancel">关闭</a>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
            feed_meta = feed_meta.replace(new RegExp("@CommentLength","gm"),data[i].answerEntityList[0].commentEntityList.length);
            $feed_item.find(".feed-content").prepend($(feed_meta));
            $feed_item.find(".feed-content").prepend($(entry_body));
            $feed_item.find(".feed-content").prepend($h2);
            var commentEntityList = answerEntity.commentEntityList;
            for(var j in commentEntityList){
                var commentHTML =
                    '<div class="_commentBox-root-PQNS" id = "@commentId">'
                    +'<a class="_commentBox-avatarLink"></a>'
                    +'<div class="_commentItem_body">'
                    +'<div class="_commentItem-header"><a href="@UserHref">@commentUserName</a></div>'
                    +'<div class="_commentItem-content">@commentContent</div>'
                    +'<div class="_commentItem-footer">'
                    +'<span class="_commentItem-links"><span>@commentLove</span><span>赞</span></span>'
                    +'<button class="_commentItem-action _commentBox-textBtn">'
                    +'<i class="zg-icon zg-icon-comment-like"></i><span>赞</span>'
                    +'</button>'
                    +'</div>'
                    +'</div>'
                    +'</div>';
                commentHTML = commentHTML.replace(new RegExp("@commentId","gm"),commentEntityList[j].commentId)
                commentHTML = commentHTML.replace(new RegExp("UserHref","gm"),"/user/"+commentEntityList[j].userEntity.id);
                commentHTML = commentHTML.replace(new RegExp("@commentUserName","gm"),commentEntityList[j].userEntity.userName);
                commentHTML = commentHTML.replace(new RegExp("@commentContent","gm"),commentEntityList[j].commentContent);
                commentHTML = commentHTML.replace(new RegExp("@commentLove","gm"),commentEntityList[j].commentLove);
                $feed_item.find("._commentBox-list").prepend($(commentHTML));
            }
        }

        $("#js-home-feed-list").append($feed_item);
    }

    /*
     var question =
     '<div class="feed-item" id="feedID-1005">'
     +'<div class="avatar"></div>'
     +'<div class="feed-main">'
     +'<div class="feed-content">'
     +'<h2><a href="/question/22049706" class="question-link">头发睡觉后变形，为什么洗过后就会恢复？</a></h2>'
     +'<div class="entry-body">'
     +'<div class="zm-item-vote"><a class="zm-item-vote-count">1889</a></div>'
     +'<div class="zm-votebar">'
     +'<button class="up pressed" title="赞同">'
     +'<i class="icon vote-arrow"></i>'
     +'<span class="count">1889</span>'
     +'</button>'
     +'<button class="down" title="反对，不会显示您的姓名">'
     +'<i class="icon vote-arrow"></i>'
     +'</button>'
     +'</div>'
     +'<div class="zm-item-answer-author-info">'
     +'<span class="summary-wrapper">'
     +'<span class="author-link-line">'
     +'<a class="author-link" href="/people/woshixiaosongshu">VincentFu</a>'
     +'</span>'
     +'</span>'
     +'</div>'
     +'<div class="zm-item-rich-text expandable">'
     +'<div style="display: none;">头发内部的α-角蛋白分子内的<b>氢键</b>，负责了头发约50%的弹性，既然睡觉能把头发睡乱，说明在外力（头部与枕头之间的挤压）作用下，氢键的排列和取向发生了难以恢复的变化，类似材料学中的塑性形变。而水，之所以能恢复头发原本的形状，源自于水中大量的氢键与毛发内部的氢键的相互作用，简单说就是水分子插入了α-角蛋白分子，形成了β-结构。而且恰巧水中氢键的键强较大，它对α-角蛋白内的氢键的攻击可以轻而易举地使后者断裂，从而使这种由外力产生氢键排列和取向土崩瓦解，待水分挥发后，β结构降解为α结构，头发内的氢键再按照头发本来喜欢的方式重新连接，恢复形状。</div>'
     +'<div class="zh-summary summary clearFix" style="display: block;">头发内部的α-角蛋白分子内的<b>氢键</b>，负责了头发约50%的弹性，既然睡觉能把头发睡乱，说明在外力（头部与枕头之间的挤压）作用下，氢键的排列和取向发生了难以恢复的变化，类似材料学中的塑性形变。而水，之所以能恢复头发原本的形状，源自于水中大量的氢键与'
     +'<a href="javascript:;" class="toggle-expand">显示全部</a>'
     +'</div>'
     +'</div>'
     +'</div>'
     +'<div class="feed-meta">'
     +'<div class="zm-item-meta clearFix">'
     +'<div class="zm-meta-panel">'
     +'<a href="javascript:;" class="toggle-comment meta-item" num="133"><i class="z-icon-comment"></i>133条评论</a>'
     +'<a href="#" class="js-report meta-item">作者保留权利</a>'
     +'<button class="item-collapse meta-item"><i class="z-icon-fold"></i>收起</button>'
     +'</div>'
     +'<div class="comment-app-holder" style="display: none">'
     +'<div class="_commentBox-bordered-3Fo"><i class="icon ioc-spike"></i>'
     +'<div class="_commentBox-list">'
     +'<div class="_commentBox-root-PQNS">'
     +'<a href="https//www.zhihu.com/people/xiaohu-72" class="_commentBox-avatarLink"></a>'
     +'<div class="_commentItem_body">'
     +'<div class="_commentItem-header"><a href="http://www.zhihu.com/people/xiaohu">小虎</a></div>'
     +'<div class="_commentItem-content">有道理</div>'
     +'<div class="_commentItem-footer">'
     +'<span class="_commentItem-links"><span>16</span><span>赞</span></span>'
     +'<button class="_commentItem-action _commentBox-textBtn">'
     +'<i class="zg-icon zg-icon-comment-like"></i><span>赞</span>'
     +'</button>'
     +'</div>'
     +'</div>'
     +'</div>'
     +'<div class="_commentBox-pageBorder _pager_root">'
     +'<span class="_pager-item _pager-muted">上一页</span>'
     +'<span class="_pager-item _pager-muted">1</span>'
     +'<a class="_pager-item">2</a>'
     +'<a class="_pager-item">3</a>'
     +'<a class="_pager-item">4</a>'
     +'<a class="_pager-item">5</a>'
     +'<a class="_pager-item">下一页</a>'
     +'</div>'
     +'<div class="_commentForm-border">'
     +'<input type="text" class="_inputBox_root" placeholder="写下你的评论...">'
     +'<div class="zm-comment zg-clear">'
     +'<a href="#" class="zg-right zg-btn-blue">评论</a>'
     +'<a href="#" class="zm-comment-cancel">关闭</a>'
     +'</div>'
     +'</div>'
     +'</div>'
     +'</div>'
     +'</div>'
     +'<a style="cursor: pointer;" class="ignore"></a>'
     +'</div>'
     +'</div>'
     +'</div>'
     +'<div class="feed-item-options hidden"></div>'
     +'</div>'
     +'</div>';
     */


    driver();
}

function addLikeProcess(){
    // 赞，取消赞
    $('._commentItem-footer').each(function () {
        $(this).children('button').eq(0).click(function () {
            val = $(this).parent().children('._commentItem-links').children('span:first').text();
            if($(this).children('span:first').html() == "赞"){
                $(this).children('span:first').html("取消赞");
                $(this).parent().children('._commentItem-links').children('span:first').text(parseInt(val) + 1);
            }
            else{
                $(this).children('span').html("赞")
                $(this).parent().children('._commentItem-links').children('span:first').text(parseInt(val) - 1);
            }
        })
    });
}
function driver(){
    //点击标题
    $(".question-link").click(function(event){
        event.preventDefault();
        window.open(window.location.origin+"/question.html?"+$(this).attr("name"),"_blank");
       console.log("href="+$(this).attr("name"));
    });
    // 支持，反对
    $('.zm-votebar').each(function () {
        // 支持
        $(this).children('button:first').click(function () {
            var upClass = $(this).attr('class');
            var downClass = $(this).next().attr('class');
            var num = $(this).children('span').text();
            if(upClass.indexOf('pressed') >= 0)
            {
                $(this).removeClass('pressed');
/*                $(this).children('span').text(parseInt(num) - 1);*/
                oppose($(this));
            }
            else{
                $(this).addClass('pressed');
/*                $(this).children('span').text(parseInt(num) + 1);*/
                support($(this));
            }

            if(downClass.indexOf('pressed') >= 0)
            {
                $(this).next().removeClass('pressed');
            }
        })

        // 反对
        $(this).children('button:last').click(function () {
            var downClass = $(this).attr('class');
            var upClass = $(this).prev().attr('class');
            var num = $(this).prev().children('span').text();
            if(downClass.indexOf('pressed') >= 0)
            {
                $(this).removeClass('pressed');
            }
            else{
                $(this).addClass('pressed');
            }

            if(upClass.indexOf('pressed') >= 0)
            {
                $(this).prev().removeClass('pressed');
/*                $(this).prev().children('span').text(parseInt(num) - 1);*/
                oppose($(this).prev());
            }
        })
    });

// 赞，取消赞
    $('._commentItem-footer').each(function () {
        $(this).children('button').eq(0).click(function () {
            if($(this).children('span:first').html() == "赞"){
                commentlike($(this));
            }
            else{
                commentunlike($(this));
            }
        })
    });
// 展开正文
    $('.zh-summary').each(function () {
        $(this).click(function () {
            $(this).css('display', 'none');
            $(this).prev().css('display', 'block');
            $(this).parent().parent().parent().addClass('zm-item-expanded');
        })
    })
// 收起正文
    $('.item-collapse').each(function () {
        $(this).click(function () {
            $(this).parent().parent().parent().prev().children('.zm-item-rich-text').children().eq(0).css('display', 'none');
            $(this).parent().parent().parent().prev().children('.zm-item-rich-text').children().eq(1).css('display', 'block');
            $(this).parent().parent().parent().parent().removeClass('zm-item-expanded');
        })
    })

// panel固定
    function oneNode() {
        this.feedID = '';           // feedID
        this.collapseFixed = false;     // 收起按钮是否固定
        this.upDownFixed = false;       // 支持反对是否固定
        this.ifPanelFixed = false;      // 评论栏是否固定
    }
    var lstNode = document.getElementsByClassName('feed-item');
    function PanelLst() {
        this.list = new Array();
    }
    PanelLst.prototype = {
        find: function (id) {
            for(var loop = 0; loop < this.list.length; loop++){
                if(this.list[loop].feedID == id){
                    return this.list[loop];
                }
            }
        },
        addNode: function (feedID) {
            var node = new oneNode();
            node.feedID = feedID;
            node.ifPanelFixed = false;
            node.upDownFixed = false;
            node.collapseFixed = false;
            this.list.push(node);
        },
        show: function () {
            for(var loop = 0; loop < this.list.length; loop++){
                console.log(this.list[loop].feedID);
            }
        }
    }
    var PanelLstInst = new PanelLst();
    for(loop = 0; loop <lstNode.length; loop++){
        PanelLstInst.addNode(lstNode[loop].id);
    }
    window.addEventListener('scroll', function () {
        $('.zm-item-meta .zm-meta-panel.focusIn').each(function () {
            var id = $(this).parent().parent().parent().parent().parent().attr('id');
            var nodePanel = PanelLstInst.find(id);

            var panelTop = this.getBoundingClientRect().top;
            var left = this.getBoundingClientRect().left;
            var commentListBottom = $(this).next().children('._commentBox-bordered-3Fo').children('._commentBox-list')[0].getBoundingClientRect().bottom;
            if(panelTop < 0 && commentListBottom > 0 && !nodePanel.ifPanelFixed){
                nodePanel.ifPanelFixed = true;
                var node = this.cloneNode(true);
                var thisNode = this;
                node.onclick = function () {
                    var num = parseInt($(thisNode).children('.toggle-comment').attr('num'));
                    $(thisNode).children('.toggle-comment').html("<i class='z-icon-comment'></i>" + num + " 条评论");
                    $(thisNode).next().css('display', 'none');
                    $(thisNode).removeClass('focusIn');
                    document.body.removeChild(document.body.lastChild);
                }
                document.querySelector('body').appendChild(node);
                $('body>div:last-child').addClass('scroll-floater').css('position', 'fixed').css('left', left).css('top', '44px').css('width', '584px');
            }
            else if((panelTop > 0 && nodePanel.ifPanelFixed)
                || (commentListBottom < 0 && nodePanel.ifPanelFixed)){
                nodePanel.ifPanelFixed = false;
                document.body.removeChild(document.body.lastChild);
            }
        })

        // 支持，反对
        $('.zm-item-expanded .zm-votebar').each(function () {
            var id = $(this).parent().parent().parent().parent().attr('id');
            var nodePanel = PanelLstInst.find(id);
            var contentTop = $(this).next().next().children(':first')[0].getBoundingClientRect().top;
            var contentBottom = $(this).next().next().children(':first')[0].getBoundingClientRect().bottom;
            if(contentTop < -10 && contentBottom > 150 && !nodePanel.upDownFixed){
                nodePanel.upDownFixed = true;
                $(this).addClass('scroll-floater').css('position', 'fixed').css('top', '60px');
            }
            else if((contentTop > -10 || contentBottom < 30)
                && nodePanel.upDownFixed){
                nodePanel.upDownFixed = false;
                $(this).removeClass('scroll-floater').attr('style', '');
            }
        })

        // 收起按钮
        $('.zm-item-expanded .feed-meta').each(function () {
            var id = $(this).parent().parent().parent().attr('id');
            var nodePanel = PanelLstInst.find(id);
            var panelBottom = $(this).children('.zm-item-meta').children('.zm-meta-panel')[0].getBoundingClientRect().bottom;
            var contentTop = $(this).prev()[0].getBoundingClientRect().top;
            var windowHeight = window.innerHeight;
            var left = $(this).children().children().children('button')[0].getBoundingClientRect().left;

            if(panelBottom > windowHeight && contentTop < windowHeight && !nodePanel.collapseFixed){
                nodePanel.collapseFixed = true;
                $(this).children().children().children('button').addClass('is-sticky').css('left', left).css('bottom', '12px');
            }
            else if((panelBottom < windowHeight || contentTop > windowHeight )
                && nodePanel.collapseFixed){
                nodePanel.collapseFixed = false;
                $(this).children().children().children('button').removeClass('is-sticky');
            }
        })

    })
// 评论展开收起
    $('.toggle-comment').each(function () {
        $(this).click(function () {
            var content = $(this).text();
            if(content != '收起评论'){
                $(this).html("<i class='z-icon-comment'></i>收起评论");
                $(this).parent().next().css('display', 'block');
                $(this).parent().addClass('focusIn');
            }
            else {
                var num = parseInt($(this).attr('num'));
                $(this).html("<i class='z-icon-comment'></i>" + num + " 条评论");
                $(this).parent().next().css('display', 'none');
                $(this).parent().removeClass('focusIn');
            }
        })
    })
// 点击添加评论
    $('.zu-top-add-question').click(function () {
        $('.modal-dialog-bg').css('display', 'block');
        $('.modal-wrapper').removeClass('hidden');
    })
// 关闭评论输入
    $('.modal-dialog-title-close').click(function () {
        $('.modal-wrapper').addClass('hidden');
        $('.modal-dialog-bg').css('display', 'none');
    })

    $('input._inputBox_root').focus(function () {
        $('._commentForm-border').addClass('expanded');
    })
    $('a.zm-comment-cancel').click(function () {
        $('._commentForm-border').removeClass('expanded');
    })


// 输入回答时高亮
    $('#mock').focus(function () {
        $(this).parent().addClass('zm-editable-editor-field-active');
    })
    $('#mock').blur(function () {
        $(this).parent().removeClass('zm-editable-editor-field-active');
    })

    addComment();


}

function commentunlike($this){
    var commentId = $this.parent().parent().parent().attr("id");
    var commentLove = $this.parent().children('._commentItem-links').children('span:first').text();
    var commentData = {
        "commentId":commentId,
        "commentLove":commentLove
    };
    $.ajax({
        url: "/commentunlike",
        type: "POST",
        data: JSON.stringify(commentData),
        contentType: "application/json; charset=utf-8",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            $this.children('span').html("赞")
            $this.parent().children('._commentItem-links').children('span:first').text(parseInt(commentLove) - 1);
        }
    });
}
function commentlike($this){
    var commentId = $this.parent().parent().parent().attr("id");
    var commentLove = $this.parent().children('._commentItem-links').children('span:first').text();
    var commentData = {
        "commentId":commentId,
        "commentLove":commentLove
    };
    $.ajax({
        url: "/commentlike",
        type: "POST",
        data: JSON.stringify(commentData),
        contentType: "application/json; charset=utf-8",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            $this.children('span:first').html("取消赞");
            $this.parent().children('._commentItem-links').children('span:first').text(parseInt(commentLove) + 1);
        }
    });
}

function addComment(){
//添加评论
    $(".addComment").click(function(){
        var commentContent = $(this).parent().prev().val();
        var userName = getJwtName();
        var answerid = $(this).parent().parent().parent().parent().parent().parent().parent().prev().attr("id");

        var commentData = {
            "commentContent":commentContent,
            "userEntity":{
                "userName":userName
            },
            "answersEntity":{
                "answerId":answerid
            }
        };
        var $this = $(this);
        $.ajax({
            url: "/addComment",
            type: "POST",
            data: JSON.stringify(commentData),
            contentType: "application/json; charset=utf-8",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {
                var commentHTML =
                    '<div class="_commentBox-root-PQNS" id = "@commentId">'
                    +'<a class="_commentBox-avatarLink"></a>'
                    +'<div class="_commentItem_body">'
                    +'<div class="_commentItem-header"><a href="@UserHref">@commentUserName</a></div>'
                    +'<div class="_commentItem-content">@commentContent</div>'
                    +'<div class="_commentItem-footer">'
                    +'<span class="_commentItem-links"><span>@commentLove</span><span>赞</span></span>'
                    +'<button class="_commentItem-action _commentBox-textBtn">'
                    +'<i class="zg-icon zg-icon-comment-like"></i><span>赞</span>'
                    +'</button>'
                    +'</div>'
                    +'</div>'
                    +'</div>';
                commentHTML = commentHTML.replace(new RegExp("@commentId","gm"),data.commentId);
                commentHTML = commentHTML.replace(new RegExp("@commentUserName","gm"),userName);
                commentHTML = commentHTML.replace(new RegExp("@commentContent","gm"),commentContent);
                commentHTML = commentHTML.replace(new RegExp("@commentLove","gm"),"0");

                $this.parent().parent().parent().prepend($(commentHTML));
                var $commentCount = $this.parent().parent().parent().parent().parent().prev().children("a:first");
                console.log("num"+parseInt($commentCount.attr("num")));
                var commentCount = parseInt($commentCount.attr("num"))+1;
                $commentCount.attr("num",commentCount);

                addLikeProcess();
            }
        });
        console.log(answerid);
    });
}
function support($this){
    var answerid = $this.parent().parent().attr("id");
    var answerLove = $this.children('span').text();
    var answerData = {
        "answerId":answerid,
        "answerLove":answerLove
    };
    $.ajax({
        url: "/answersupport",
        type: "POST",
        data: JSON.stringify(answerData),
        contentType: "application/json; charset=utf-8",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            $this.children('span').text(parseInt(answerLove) + 1);
        }
    });
};
function oppose($this){
    var answerid = $this.parent().parent().attr("id");
    var answerLove = $this.children('span').text();
    var answerData = {
        "answerId":answerid,
        "answerLove":answerLove
    };
    $.ajax({
        url: "/answeroppose",
        type: "POST",
        data: JSON.stringify(answerData),
        contentType: "application/json; charset=utf-8",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            $this.children('span').text(parseInt(answerLove) - 1);
        }
    });
};
function createAuthorizationTokenHeader() {
    var token = getJwtToken();
    if (token) {
        return {"Authorization": "Bearer " + token};
    } else {
        return {};
    }
}

function getJwtToken() {
    return localStorage.getItem("jwtToken");
}

function getJwtName(){
    return localStorage.getItem("JwtName");
}