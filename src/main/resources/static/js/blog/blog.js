
/**
 * Created by 25299 on 2018/4/18.
 */

$(document).ready(function() {
/*    var vm = avalon.define({
        $id: "test",
        /!*        name: "司徒正美",
         array: [11,22,33*!/
        array : [{"front":"前端",'arr': [111,222, 333]},{"front":"后端",arr: [444,555, 666]},{"front":"服务器",arr: [777,888, 999]}]
    })*/
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
                getBlog(formData);
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



    $('.theme-poptit1 .close1').click(function(){

        $('.theme-popover-mask1').fadeOut(100);

        $('.theme-popover1').slideUp(200);

    });


    $("#upload").click(function(){
        var blogTitle = $("#blogTitle").val();
        var blogContent = $("#blogContent").val();
        /*       var userName = getJwtName();*/
        console.log("category="+$(".removes").parent().parent().find(".fuMenu").text());
        console.log("language="+$(".removes").text());
        var userName = getJwtName();
        var categoryLanguage = {
            "language" : $(".removes").text(),
            "category" : $(".removes").parent().parent().find(".fuMenu").text()
        };
        var data_insert = {
            "categoryLanguage" : categoryLanguage,
            "blogTitle" : blogTitle,
            "blogContent" : blogContent,
            "userName" : userName,
        };
        console.log("data" + data_insert);
        $.ajax({
            url: "/addBlog",
            type: "POST",
            data: JSON.stringify(data_insert),
            contentType: "application/json; charset=utf-8",
            headers: createAuthorizationTokenHeader(),
            //dataType: "json",
            success: function (data, textStatus, jqXHR) {
                //TODO
                $('.theme-popover-mask').fadeOut(100);

                $('.theme-popover').slideUp(200);
                // console.log('==============');
                $("#bloglist").empty();
                for(var i in data){
                    var blog = '<div class="col-md-12 col-sm-12">'
                        +'<div class="single-blog two-column">'
                        +'<div class="post-content overflow">'
                        +'<h1 class="post-title bold" id = "@blogId"><a href="@blogdetailhref">@blogTitle</a></h1>'
                        +'<h2 class="post-author" id = "@authorId"><a href="@authorhref">@blogauthor</a></h2>'
                        +'<p style="font-size:14px">@blogSummary</p>'
                        +'<a class="read-more theme-login1">View More</a>'
                        +'<div class="post-bottom overflow">'
                        +'<ul class="nav navbar-nav post-nav">'
                        +'<li><i class="fa fa-tag"></i>@hate</a></li>'
                        +'<li><i class="fa fa-heart"></i>@love</a></li>'
                        +'</ul>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'</div>';
                    blog = blog.replace(new RegExp("@blogId","gm"),data[i].blogid);
                    blog = blog.replace(new RegExp("@authorId","gm"),data[i].userid);
                    blog = blog.replace(new RegExp("@blogdetailhref",'gm'),data[i].blogdetailhref);
                    blog = blog.replace(new RegExp("@authorhref",'gm'),data[i].authorhref);
                    blog = blog.replace(new RegExp("@blogauthor","gm"),data[i].userName);
                    blog = blog.replace(new RegExp("@blogTitle","gm"),data[i].blogTitle);
                    blog = blog.replace(new RegExp("@blogSummary","gm"),data[i].blogContent.slice(0,100));
                    blog = blog.replace(new RegExp("@hate","gm"),data[i].hate);
                    blog = blog.replace(new RegExp("@love","gm"),data[i].love);
                    $("#bloglist").append($(blog));
                }

                $('.theme-login1').click(function(){
                    var blogdetail = '<div class="col-md-12 col-sm-12">'
                        +'<div class="single-blog two-column">'
                        +'<div class="post-content overflow">'
                        +'<h1 class="post-title bold">@blogTitle</a></h1>'
                        +'<h2 class="post-author"><a href="#">@userName</a></h2>'
                        +'<p style="font-size:14px">@blogContent</p>'
                        +'<div class="post-bottom overflow">'
                        +'<ul class="nav navbar-nav post-nav">'
                        +'<li><a href="#"><i class="fa fa-tag"></i>@hate</a></li>'
                        +'<li><a href="#"><i class="fa fa-heart"></i>@love</a></li>'
                        +'</ul>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'</div>';
                    var blogid = $(this).siblings().eq(0).attr("id");
                    var data = {
                        "blogid":blogid
                    };

                    $.ajax({
                        url: "/blogdetail",
                        type: "POST",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        headers: createAuthorizationTokenHeader(),
                        //dataType: "json",
                        success: function (data, textStatus, jqXHR) {
                            console.log(data);
                            $("#blogdetail").empty();
                            var closeHTML = '<div class="theme-poptit1">'
                                +'<a href="javascript:;" title="关闭" class="close1">×</a>'
                                +'<h2>博客详情</h2>'
                                +'</div>';
                            $("#blogdetail").append($(closeHTML));
                            var blogdetail = '<div class="col-md-12 col-sm-12">'
                                +'<div class="single-blog two-column">'
                                +'<div class="post-content overflow">'
                                +'<h1 class="post-title bold" id = "@blogId">@blogTitle</h1>'
                                +'<h2 class="post-author" id = "@authorId"><a href = "@authorhref">@blogauthor</a></h2>'
                                +'<p style="font-size:14px">@blogSummary</p>'
                                +'<div class="post-bottom overflow">'
                                +'<ul class="nav navbar-nav post-nav">'
                                +'<li><i class="fa fa-tag"></i>@hate</a></li>'
                                +'<li><i class="fa fa-heart"></i>@love</a></li>'
                                +'</ul>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>';
                            blogdetail = blogdetail.replace(new RegExp("@blogId","gm"),data.blogid);
                            blogdetail = blogdetail.replace(new RegExp("@authorId","gm"),data.userid);
                            blogdetail = blogdetail.replace(new RegExp("@blogdetailhref",'gm'),data.blogdetailhref);
                            blogdetail = blogdetail.replace(new RegExp("@authorhref",'gm'),data.authorhref);
                            blogdetail = blogdetail.replace(new RegExp("@blogauthor","gm"),data.userName);
                            blogdetail = blogdetail.replace(new RegExp("@blogTitle","gm"),data.blogTitle);
                            blogdetail = blogdetail.replace(new RegExp("@blogSummary","gm"),data.blogContent);
                            blogdetail = blogdetail.replace(new RegExp("@hate","gm"),data.hate);
                            blogdetail = blogdetail.replace(new RegExp("@love","gm"),data.love);
                            $("#blogdetail").append($(blogdetail));
                            $('.theme-poptit1 .close1').click(function(){

                                $('.theme-popover-mask1').fadeOut(100);

                                $('.theme-popover1').slideUp(200);

                            });
                            //添加love和hate功能
                            hate();
                            love();
                            $('.theme-popover-mask1').fadeIn(100);

                            $('.theme-popover1').slideDown(200);
                            // console.log('==============');
                            console.log('==============');
                        }
                    });


                });
            }
        });
    });

});

function love(){
    $(".fa-heart").parent().click(function () {
        var $blogid_love = $(this).parent().parent().siblings().eq(0).attr("id");
        var $bloglove = $(this).text();
        var formData = {
            "blogid":$blogid_love,
            "love":$bloglove
        };
        var $love_this = $(this);
        $.ajax({
            url: "/addbloglove",
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {
                $love_this.text(data.love);
                $love_this.prepend($('<i class="fa fa-heart"></i>'));
                console.log(data.love);
            }
        });
    });
}
function hate(){
    $(".fa-tag").parent().click(function(){
        var $blogid_love = $(this).parent().parent().siblings().eq(0).attr("id");
        var $bloghate = $(this).text();
        var formData = {
            "blogid":$blogid_love,
            "hate":$bloghate
        };
        var $hate_this = $(this);
        $.ajax({
            url: "/addbloghate",
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {
                $hate_this.text(data.hate);
                $hate_this.prepend($('<i class="fa fa-tag"></i>'));
                console.log(data.hate);
            }
        });
    });
}
function getBlog(categorylanguage){
    $.ajax({
        url: "/bloglist",
        type: "POST",
        data: JSON.stringify(categorylanguage),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            $("#bloglist").empty();
            for(var i in data){
                var blog = '<div class="col-md-12 col-sm-12">'
                    +'<div class="single-blog two-column">'
                    +'<div class="post-content overflow">'
                    +'<h1 class="post-title bold" id = "@blogId"><a href="@blogdetailhref">@blogTitle</a></h1>'
                    +'<h2 class="post-author" id = "@authorId"><a href="@authorhref">@blogauthor</a></h2>'
                    +'<p style="font-size:14px">@blogSummary</p>'
                    +'<a  class="read-more theme-login1">View More</a>'
                    +'<div class="post-bottom overflow">'
                    +'<ul class="nav navbar-nav post-nav">'
                    +'<li><i class="fa fa-tag"></i>@hate</a></li>'
                    +'<li><i class="fa fa-heart"></i>@love</a></li>'
                    +'</ul>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'</div>';
                blog = blog.replace(new RegExp("@blogId","gm"),data[i].blogid);
                blog = blog.replace(new RegExp("@authorId","gm"),data[i].userid);
                blog = blog.replace(new RegExp("@blogdetailhref",'gm'),data[i].blogdetailhref);
                blog = blog.replace(new RegExp("@authorhref",'gm'),data[i].authorhref);
                blog = blog.replace(new RegExp("@blogauthor","gm"),data[i].userName);
                blog = blog.replace(new RegExp("@blogTitle","gm"),data[i].blogTitle);
                blog = blog.replace(new RegExp("@blogSummary","gm"),data[i].blogContent.slice(0,100));
                blog = blog.replace(new RegExp("@hate","gm"),data[i].hate);
                blog = blog.replace(new RegExp("@love","gm"),data[i].love);
                $("#bloglist").append($(blog));


            }

            $('.theme-login1').click(function(){
                var blogdetail = '<div class="col-md-12 col-sm-12">'
                    +'<div class="single-blog two-column">'
                    +'<div class="post-content overflow">'
                    +'<h1 class="post-title bold">@blogTitle</a></h1>'
                    +'<h2 class="post-author"><a href="#">@userName</a></h2>'
                    +'<p style="font-size:14px">@blogContent</p>'
                    +'<div class="post-bottom overflow">'
                    +'<ul class="nav navbar-nav post-nav">'
                    +'<li><a href="#"><i class="fa fa-tag"></i>@hate</a></li>'
                    +'<li><a href="#"><i class="fa fa-heart"></i>@love</a></li>'
                    +'</ul>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'</div>';
                var blogid = $(this).siblings().eq(0).attr("id");
                var data = {
                    "blogid":blogid
                };

                $.ajax({
                    url: "/blogdetail",
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    headers: createAuthorizationTokenHeader(),
                    //dataType: "json",
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        $("#blogdetail").empty();
                        var closeHTML = '<div class="theme-poptit1">'
                                +'<a href="javascript:;" title="关闭" class="close1">×</a>'
                                +'<h3>博客详情</h3>'
                                +'</div>';
                        $("#blogdetail").append($(closeHTML));
                        var blogdetail = '<div class="col-md-12 col-sm-12">'
                            +'<div class="single-blog two-column">'
                            +'<div class="post-content overflow">'
                            +'<h1 class="post-title bold" id = "@blogId">@blogTitle</h1>'
                            +'<h2 class="post-author" id = "@authorId"><a href = "@authorhref">@blogauthor</a></h2>'
                            +'<p style="font-size:14px">@blogSummary</p>'
                            +'<div class="post-bottom overflow">'
                            +'<ul class="nav navbar-nav post-nav">'
                            +'<li><i class="fa fa-tag"></i>@hate</a></li>'
                            +'<li><i class="fa fa-heart"></i>@love</a></li>'
                            +'</ul>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                            +'</div>';
                        blogdetail = blogdetail.replace(new RegExp("@blogId","gm"),data.blogid);
                        blogdetail = blogdetail.replace(new RegExp("@authorId","gm"),data.userid);
                        blogdetail = blogdetail.replace(new RegExp("@blogdetailhref",'gm'),data.blogdetailhref);
                        blogdetail = blogdetail.replace(new RegExp("@authorhref",'gm'),data.authorhref);
                        blogdetail = blogdetail.replace(new RegExp("@blogauthor","gm"),data.userName);
                        blogdetail = blogdetail.replace(new RegExp("@blogTitle","gm"),data.blogTitle);
                        blogdetail = blogdetail.replace(new RegExp("@blogSummary","gm"),data.blogContent);
                        blogdetail = blogdetail.replace(new RegExp("@hate","gm"),data.hate);
                        blogdetail = blogdetail.replace(new RegExp("@love","gm"),data.love);
                        $("#blogdetail").append($(blogdetail));
                        $('.theme-poptit1 .close1').click(function(){

                            $('.theme-popover-mask1').fadeOut(100);

                            $('.theme-popover1').slideUp(200);

                        });
                        //添加love和hate功能
                        hate();
                        love();
                        $('.theme-popover-mask1').fadeIn(100);

                        $('.theme-popover1').slideDown(200);
                        // console.log('==============');
                        console.log('==============');
                    }
                });


            });

            hate();
            love();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.alert("错误");
        }
    });
}


//判断浏览器类型
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
    if (userAgent.indexOf("Trident") > -1) {
        return "Edge";
    } //判断是否Edge浏览器
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
function getJwtName(){
    return localStorage.getItem("JwtName");
}