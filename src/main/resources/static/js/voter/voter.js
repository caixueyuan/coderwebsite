/**
 * Created by 25299 on 2018/4/28.
 */

$(document).ready(function () {

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
            for (var i in data) {
                var $li = $("<li>").addClass("lis");
                var $p = $("<p>").addClass("fuMenu").text(data[i].category)
                var $div = $("<div1>").addClass("div1");
                var languages = data[i].languages;
                var categoryids = data[i].categoryids;
                var $img = $("<img class='xiala' src='images/blog/xiala.png' />")
                for (var j in languages) {
                    var $p_inside = $("<p>").addClass("zcd").attr("id", categoryids[j]).text(languages[j]);
                    $div.append($p_inside);
                }
                $li.append($p);
                $li.append($img);
                $li.append($div);
                $out_side.append($li);
            }

            //绑定元素点击事件
            $(".menu_list ul").children().click(function () {
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
            $(".menu_list ul li .div1 .zcd").click(function () {
                //设置当前菜单为选中状态的样式，并移除同类同级别的其他元素的样式
                $(this).addClass("removes").siblings().removeClass("removes");

                var language = $(this).text();
                var category = $(this).parent().parent().find(".fuMenu").text();
                //插入博客处理机制
                var formData = {
                    category: category,
                    language: language
                };
                getBooks(formData);
                console.log(language + "   " + category);
                //遍历获取所有父菜单元素
                $(".div1").each(function () {
                    //判断当前的父菜单是否是隐藏状态
                    if ($(this).is(":hidden")) {
                        //如果是隐藏状态则移除其样式
                        $(this).children(".zcd").removeClass("removes");
                    }
                });
            });

            //循环所有div1元素，下拉箭头在
            $(".lis>.fuMenu").click(function () {
                $(".div1").each(function () {
                    //判断当前的父菜单是否是隐藏状态
                    if (!$(this).is(":hidden")) {
                        //如果当前点击时不是隐藏状态则将其箭头显示为原始状态
                        if (myBrowser() == "IE") {
                            //判断是否是IE浏览器
                            //IE浏览器不兼容transform属性，使用filter属性
                            $(this).parent().children("img").css({'filter': 'progid:DXImageTransform.Microsoft.BasicImage(rotation:0)'});
                        } else {
                            $(this).parent().children("img").css({'transform': 'rotate(0deg)'});
                        }
                    }
                });
            });
            //点击收缩菜单
            $("#hidIcon").click(function () {
                //隐藏菜单并显示隐藏后的左侧菜单
                $(".leftMenu").animate({"margin-left": "-220px"}, "slow", function () {
                    $(".hidLeftMenu").css("display", "block");
                    $(".leftMenu").css("display", "none")
                })
            });
            //点击图标展开菜单显示
            $(".openMenu").click(function () {
                $(".hidLeftMenu").css("display", "none");
                $(".leftMenu").css("display", "block")
                    .animate({"margin-left": "0px"}, "slow");
            });
            //阻止事件冒泡，子元素不再继承父元素的点击事件
            $('.div1').click(function (e) {
                e.stopPropagation();
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.alert("错误");
        }
    });

    addBookViewDriver();
    addBookDriver();
    changeBookDriver();
    likeBookDriver();

    uploadDriver();


});

//点赞功能
function likeBookDriver() {
    $('body').on("click", '.heart', function () {

        var $this = $(this);
        var A = $this.attr("id");
        var B = A.split("like");
        var messageID = B[1];
        var C = parseInt($("#likeCount" + messageID).html());
        $this.css("background-position", "")
        var D = $this.attr("rel");
        if (D === 'like') {
            likeBook(C,messageID,$this);
        }
        else {
            unlikeBook(C,messageID,$this);
        }

    });
}

function undoLikeBookDriver() {
    $('.heart').unbind();
}

//查看书籍详情页面弹出功能
function  viewBookDetailDriver() {
    $('.theme-login').click(function (event) {
        event.preventDefault();
        viewBookDetail($(this));


    });

    $('.theme-poptit .close').click(function () {

        $('.theme-popover-mask').fadeOut(100);

        $('.theme-popover').slideUp(200);

    });
}


//添加书籍页面弹出驱动
function addBookViewDriver() {
    $('.theme-login1').click(function (event) {
        event.preventDefault();
        $('.theme-popover-mask1').fadeIn(100);
        $('.theme-popover1').slideDown(200);

    });

    $('.theme-poptit1 .close').click(function () {

        $('.theme-popover-mask1').fadeOut(100);

        $('.theme-popover1').slideUp(200);

    });
}

//添加书籍驱动
function addBookDriver(){
    $("#addBook").click(function(){
        var categoryLanguage = {
            "categoryid":$(".removes").attr("id"),
            "language" : $(".removes").text(),
            "category" : $(".removes").parent().parent().find(".fuMenu").text()
        };

        var bookTitle = $("#newBookTitle").val();
        var bookContent = $("#newBookContent").val();
        var diyUploadHovers = $(this).parent().siblings().eq(1).children(".diyUploadHover");
        var array = new Array();
        console.log(diyUploadHovers);
        for(var i = 0;i<diyUploadHovers.length;i++){
            array[i] = {
                "bookAddress":diyUploadHovers[i].getAttribute("name")
            };
        }
        var formData = {
            "bookTitle":bookTitle,
            "bookContent":bookContent,
            "bookPictureEntities":array,
            "categoryLanguage":categoryLanguage
        };
        $.ajax({
            url: "/addBook",
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $('.theme-popover-mask1').fadeOut(100);
                $('.theme-popover1').slideUp(200);
                showBooks(data);
                viewBookDetailDriver();
                changeBookDriver();
            }
        });
    });
}

//取消添加书籍驱动
function undoAddBookDriver(){
    $("#addBook").unbind();
}
//图片翻动驱动
function changeBookDriver() {
    $(function () {

        $(".container1 img").click(function cover() {
            $(this).addClass("zoom").fadeOut(700, append);
            function append() {
                $(this).removeClass("zoom").appendTo(".container1").show();
                var name = $(".container1").children("img").first().attr("alt");
            }

        })
    });
}

function likeBook(C,messageID,$this){
    var formData ={
        "bookid": $this.parent().parent().parent().attr("id")
    };
    $.ajax({
        url: "/likeBook",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            if(data.result == '点赞成功'){
                $("#likeCount" + messageID).html(C + 1);
                $this.addClass("heartAnimation").attr("rel", "unlike");
            }
            else{
                $this.addClass("heartAnimation").attr("rel", "unlike");
                window.alert("你已经点赞了");
            }
        }
    });
}
function unlikeBook(C,messageID,$this){
    var formData = {
        "bookid":$this.parent().parent().parent().attr("id")
    };
    $.ajax({
        url: "/unlikeBook",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            if(data.result == '取消点赞成功'){
                $("#likeCount" + messageID).html(C - 1);
                $this.removeClass("heartAnimation").attr("rel", "like");
                $this.css("background-position", "left");
            }
            else{
                $this.removeClass("heartAnimation").attr("rel", "like");
                $this.css("background-position", "left");
                window.alert("你没有点赞了");
            }

        }
    });
}
//上传图片驱动
function uploadDriver() {
    $(function () {

        //上传图片
        var $tgaUpload = $('#goodsUpload').diyUpload({
            url: '/upload1',
            success: function (data) {
                console.log("my name is caixueyuan");
                console.log(data);
            },
            error: function (err) {
            },
            buttonText: '',
            accept: {
                title: "Images",
                extensions: 'gif,jpg,jpeg,bmp,png'
            },
            thumb: {
                width: 120,
                height: 90,
                quality: 100,
                allowMagnify: true,
                crop: true,
                type: "image/jpeg"
            }
        });
    });
}


function viewBookDetail($this){
    var bookid = $this.parents(".portfolio-item").attr("id");
    console.log(bookid);
    var formData = {
        "bookid":bookid
    };
    $.ajax({
        url: "/bookdetail",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            var preffix = "/images/books/"
            $("#bookdetail").empty();
            $ol = $("<ol>");
            $li_one = $("<li><h2>以下为书籍详情</h2></li>");
            $li_two = $("<li><h2>图片</h2></li>");
            $div = $("<div>").addClass("container1");
            var bookPictureEntities = data.bookPictureEntities;
            for(var i in bookPictureEntities){
                $div.append($("<img>").attr("src",preffix+bookPictureEntities[i].bookAddress).attr("alt",""+(parseInt(i)+1)));
            }
            $li_two.append($div);
            var blogTitle = '<li><h2 style="color:blue;">书名</h2><span id="blogTitle"  type="text">@bookName</span></li>';
            blogTitle = blogTitle.replace(new RegExp("@bookName","gm"),data.bookTitle);
            $li_three = $(blogTitle);

            var blogContent = '<li><h2 style="color:blue;">书内容</h2><span id="blogContent" type="text">@bookContent</span></li>';
            blogContent = blogContent.replace(new RegExp("@bookContent","gm"),data.bookContent);
            $li_four = $(blogContent);

            $ol.append($li_one);
            $ol.append($li_two);
            $ol.append($li_three);
            $ol.append($li_four);
            $("#bookdetail").append($ol);
            changeBookDriver();
            $('.theme-popover-mask').fadeIn(100);
            $('.theme-popover').slideDown(200);
        }
    });
}

function getBooks(formData) {

    $.ajax({
        url: "/booklist",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            undoLikeBookDriver();
            console.log("question=" + data);
            showBooks(data);
            viewBookDetailDriver();
        }
    });

}

function showBooks(data) {
    var preffix = "/images/books/";

    $(".row").empty();
    $portfolio_items= $("<div>").addClass("portfolio-items");
    for(var i in data){
        var bookEntity = '<div class="col-xs-6 col-sm-4 col-md-3 portfolio-item branded logos" id="@bookId">\
        <div class="portfolio-wrapper">\
        <div class="portfolio-single">\
        <div class="portfolio-thumb">\
        <img src="@bookPicture" height="261" width="269" class="img-responsive" alt="">\
        </div>\
        <div class="portfolio-view">\
        <ul class="nav nav-pills">\
        <li><a href="#" class="theme-login"><i class="fa fa-link"></i></a>\
        </li>\
        </ul>\
        </div>\
        </div>\
        <div class="portfolio-info ">\
        <h2>@bookTitle</h2>\
        </div>\
        <div class="feed" id="feed1">\
        <h5>@bookContent</h5>\
        <div class="heart " id="@likeId" rel="like"></div>\
        <div class="likeCount" id="@likeCount">@bookLove</div>\
        </div>\
        </div>\
        </div>';
        bookEntity = bookEntity.replace(new RegExp("@bookId","gm"),data[i].bookid);
        var bookPictureEntities = data[i].bookPictureEntities;
        var filePictureEntity = bookPictureEntities[0];
        var filePictureAddress = preffix + filePictureEntity.bookAddress;
        bookEntity = bookEntity.replace(new RegExp("@bookPicture","gm"),filePictureAddress);
        bookEntity = bookEntity.replace(new RegExp("@bookTitle","gm"),data[i].bookTitle);
        bookEntity = bookEntity.replace(new RegExp("@bookContent","gm"),data[i].bookContent.substring(0,80));
        bookEntity = bookEntity.replace(new RegExp("@bookLove","gm"),data[i].bookLoveCount);
        bookEntity = bookEntity.replace(new RegExp("@likeId","gm"),"like"+data[i].bookid);
        bookEntity = bookEntity.replace(new RegExp("@likeCount","gm"),"likeCount"+data[i].bookid);
        $portfolio_items.prepend($(bookEntity));
    }

    $(".row").append($portfolio_items);
    var porfolio ='<div class="portfolio-pagination">\
        <ul class="pagination">\
        <li class="active"><a href="#">left</a></li>\
        <li><a href="#">1</a></li>\
        <li><a href="#">2</a></li>\
        <li><a href="#">3</a></li>\
        <li><a href="#">4</a></li>\
        <li><a href="#">5</a></li>\
        <li><a href="#">6</a></li>\
        <li><a href="#">7</a></li>\
        <li><a href="#">8</a></li>\
        <li><a href="#">9</a></li>\
        <li><a href="#">right</a></li>\
        </ul>\
        </div>';
    $(".row").append($(porfolio));


}
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

function getJwtName() {
    return localStorage.getItem("JwtName");
}