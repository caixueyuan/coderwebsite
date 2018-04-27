/**
 * Created by 25299 on 2018/4/27.
 */
/**
 * Created by morning on 2016/9/2.
 */


$(document).ready(function() {

    var questionId = getHref();
    var data = {
        "questionId":questionId
    };
    $.ajax({
        url: "/getWholeQuestion",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            showQuestion(data);

        }
    });


});

function showQuestion(data){
    $(".zu-main-content-inner").empty();
    var zh_question_title = '<div id="zh-question-title" class="zm-editable-status-normal" name = "@questionId">'
        +'<h1 class="zm-item-title">'
        +'<span>@questionTitle'
        +'</span>'
        +'</h1>'
        +'</div>';
    zh_question_title = zh_question_title.replace(new RegExp("@questionTitle","gm"),data.questionTitle);
    zh_question_title = zh_question_title.replace(new RegExp("@questionId","gm"),data.questionId);
    var $zh_question_title = $(zh_question_title);
    $(".zu-main-content-inner").append($zh_question_title);

    //设置回答的个数
    var zh_answer_title = '<div class="zh-answer-title">'
        +'<h3 data-num="@answerLength" id="zh-question-answer-num">@answerLength 个回答</h3>'
        +'</div>';
    zh_answer_title = zh_answer_title.replace(new RegExp("@answerLength","gm"),data.answerEntityList.length);
    var $zh_answer_title = $(zh_answer_title);
    $(".zu-main-content-inner").append($zh_answer_title);

    //设置回答
    var zh_question_answer_wrap = '<div id="zh-question-answer-wrap" class="zh-question-answer-wrapper"></div>';
    var $zh_question_answer_wrap = $(zh_question_answer_wrap);

    var answers = data.answerEntityList;
    for(var i in answers){
        //添加回答
        var zm_item_answer = '<div class="zm-item-answer zm-item-expanded" id = "@answerId">'
            +'<div class="zm-votebar">'
            +'<button class="up" title="赞同">'
            +'<i class="icon vote-arrow"></i>'
            +'<span class="count">@answerLove</span>'
            +'</button>'
            +'<button class="down" title="反对，不会显示您的姓名"><i class="icon vote-arrow"></i></button>'
            +'</div>'//设置回答的赞数
            +'<div class="answer-head">'
            +'<div class="zm-item-answer-author-info">'
            +'<span class="summary-wrapper">'
            +'<span class="author-link-line"><a class="author-link" id = "@answerUserId">@answerUserName</a></span>'
            +'</span>'
            +'</div>'
            +'</div>'//设置回答的用户的名字
            +'<div class="zm-item-rich-text expandable">'
            +'<div class="zh-summary clearFix" style="display: none;"></div>'
            +'<div class="zm-editable-content clearFix">@answerContent</div>'
            +'</div>'//设置回答的内容
            +'<div class="zm-item-meta answer-action">'
            +'<div class="zm-meta-panel">'
            +'<a href="javascript:;" class="toggle-comment meta-item" num="@commentCount"><i class="z-icon-comment"></i>@commentCount&nbsp;条评论</a>'
            +'<span class="zg-bull">•</span>'
            +'<a href="#" class="js-report meta-item">作者保留权利</a>'
            +'</div>'
            +'<div class="comment-app-holder" style="display: none;">'
            +'<div class="_commentBox-bordered-3Fo">'
            +'<i class="icon icon-spike"></i>'
            +'<div class="_commentBox-list">'//添加评论
            +'</div>'
            +'<div class="_commentBox-pageBorder _pager_root hidden">'
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
            +'<a href="javascript:;" class="zg-right zg-btn-blue addComment">评论</a>'
            +'<a href="javascript:;" class="zm-comment-cancel">关闭</a>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>';
        zm_item_answer = zm_item_answer.replace(new RegExp("@answerId","gm"),answers[i].answerId);
        zm_item_answer = zm_item_answer.replace(new RegExp("@answerLove","gm"),answers[i].answerLove);
        zm_item_answer = zm_item_answer.replace(new RegExp("@answerUserId","gm"),answers[i].userEntity.id);
        zm_item_answer = zm_item_answer.replace(new RegExp("@answerUserName","gm"),answers[i].userEntity.userName);
        zm_item_answer = zm_item_answer.replace(new RegExp("@answerContent","gm"),answers[i].answerContent);
        zm_item_answer = zm_item_answer.replace(new RegExp("@commentCount","gm"),answers[i].commentEntityList.length);
        var $zm_item_answer = $(zm_item_answer);

        //设置评论
        var commentEntityList = answers[i].commentEntityList;
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
            $zm_item_answer.find("._commentBox-list").prepend($(commentHTML));
        }
        //finally
        $zh_question_answer_wrap.append($zm_item_answer);
    }

    $(".zu-main-content-inner").append($zh_question_answer_wrap);

    var zh_question_answer_form_wrap = '<div id="zh-question-answer-form-wrap" class="zh-question-answer-form-wrap">'
        +'<div class="zm-editable-editor-wrap">'
        +'<div class="zm-answer-form">'
        +'<div>'
        +'<div class="zu-answer-form-title">'
        +'<a href="/people/jiang-chen-guang">@userName</a>'
        +'<span>'
        +'<a name="edit-bio" class="zu-edit-button" href="#">'
        +'<i class="zu-edit-button-icon"></i>请填写你的回答'
        +'</a>'
        +'</span>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class="zm-editable-editor-outer">'
        +'<div class="zm-editable-editor-field-wrap">'
        +'<div id="mock" class="zm-editable-editor-field-element editable" contenteditable="true">'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class="zm-command">'
        +'<span class="zg-right">'
        +'<a class="submit-button zg-btn-blue" href="javascript:;">发布回答</a>'
        +'</span>'
        +'</div>'
        +'</div>'
        +'</div>'
    zh_question_answer_form_wrap = zh_question_answer_form_wrap.replace(new RegExp("@userName","gm"),getJwtName());
    $(".zu-main-content-inner").append($(zh_question_answer_form_wrap));


    driver();
}

function addAnswer(){
    $(".submit-button").click(function(){
        var questionId = $(".zm-editable-status-normal").attr("name");
        var answerContent = $(".zm-editable-editor-field-element").text();
        var data = {
            "questionEntity":{
                "questionId":questionId
            },
            "answerContent":answerContent
        };
        $.ajax({
            url: "/addAnswer",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {
                showQuestion(data);
            }
        });
    });
}
function getHref(){
    var href = window.location.href;
    var parameter = href.substring(href.indexOf("?")+1,href.length);
    var questionId = parseInt(parameter);
    return questionId;
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

    addAnswer();
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
        var answerid = $(this).parent().parent().parent().parent().parent().parent().attr("id");

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

                $this.parent().parent().parent().children("._commentBox-list").prepend($(commentHTML));
                var $commentCount = $this.parent().parent().parent().parent().prev().children("a:first");
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