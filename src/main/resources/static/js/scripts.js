
jQuery(document).ready(function() {
    var COOKIE_NAME = "username";
    var COOKIE_PASSWORD = "password";


    if ($.cookie(COOKIE_NAME) && $.cookie(COOKIE_PASSWORD)) {
        $(".sign-in-htm").find("#user").val($.cookie(COOKIE_NAME));
        $(".sign-in-htm").find("#pass").val($.cookie(COOKIE_PASSWORD));

    }
    else {
        console.log($.cookie(COOKIE_NAME));
    }

    $(".sign-in-htm").find("#check123").click(function () {
        if (this.checked) {
            //判断元素是否填写
            var username = $(".sign-in-htm").find("#user").val();
            var password = $(".sign-in-htm").find("#pass").val();

            if (username !== '' && password !== '') {
                setCookie(COOKIE_NAME, username, 7);
                setCookie(COOKIE_PASSWORD, password, 7);
            }
        }

    });

    $(".sign-in-htm").find("#user").focus(function(){
        $(".sign-in-htm").find("#user").css("background-color","#414e75");
        $(".sign-in-htm").find("#pass").css("background-color","#414e75");
    })

    $(".sign-in-htm").find("#user").focus(function(){
        $(".sign-in-htm").find("#user").css("background-color","#414e75");
        $(".sign-in-htm").find("#pass").css("background-color","#414e75");
    })

    $(".sign-up-htm").find("#user").focus(function(){
        $(".sign-up-htm").find("#user").css("background-color","#414e75");
    });


    $(".sign-up-htm").find("#repeatpassword").focus(function(){
        var $input = $(".sign-up-htm");
        $input.find("#password").css("background-color","#414e75");
        $input.find("#repeatpassword").css("background-color","#414e75");
    })
    $(".sign-up-htm").find("#password").focus(function(){
        var $input = $(".sign-up-htm");
        $input.find("#password").css("background-color","#414e75");
        $input.find("#repeatpassword").css("background-color","#414e75");
    })

    $(".sign-up-htm").find("#email").focus(function(){
        $(".sign-up-htm").find("#email").css("background-color","#414e75");
    })
    //SIGN IN按钮点击事件
    /*$(".sign-in-htm").find("#signin").click(function(){
        var username = $(".sign-in-htm").find("#user").val();
        var password = $(".sign-in-htm").find("#pass").val();

        var paramData = {};
        paramData.username = username;
        paramData.password = password;

        var form = new FormData();
        form.append("username","zxj");
        form.append("password",123456);

        var ajax = $.ajax({
            type:"post",
            url : "login",
/!*            dataType:"json",
            contentType: "application/json",*!/
            data: form,
            processData:false,
            contentType:false,
            success:function(){
                window.alert("登陆成功");
            },
            error:function(){
                window.alert("登陆失败");
            }
        });
        console.log("caixueyuan");

    });*/

    // VARIABLES =============================================================
    var TOKEN_KEY = "jwtToken";
    var JWT_NAME = "JwtName";


    function setJwtToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    function setJwtName(jwtName){
        localStorage.setItem(JWT_NAME,jwtName);
    }

    function doLogin(loginData) {
        $.ajax({
            url: "/auth",
            type: "POST",
            data: JSON.stringify(loginData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                setJwtToken(data.token);
                setJwtName(loginData.username);
                console.log("username="+loginData.username);
                window.location.href = "/index.html";

            },
            error: function (jqXHR, textStatus, errorThrown) {
/*                if (jqXHR.status === 401 || jqXHR.status === 403) {
                    $('#loginErrorModal')
                        .modal("show")
                        .find(".modal-body")
                        .empty()
                        .html("<p>Message from server:<br>" + jqXHR.responseText + "</p>");
                } else {
                    throw new Error("an unexpected error occured: " + errorThrown);
                }*/
                window.alert("密码或者用户名错误");
                $(".sign-in-htm").find("#user").css("background-color","#ec9693");
                $(".sign-in-htm").find("#pass").css("background-color","#ec9693");
            }
        });
    }

    // REGISTER EVENT LISTENERS =============================================================
    $(".sign-in-htm").find("#signin").click(function (event) {
        event.preventDefault();
        console.log("caixueyuan");
        var formData = {
            username: $(".sign-in-htm").find("#user").val(),
            password: $(".sign-in-htm").find("#pass").val()
        };

        doLogin(formData);
    });


    $(".sign-up-htm").find("#signup").click(function () {
        event.preventDefault();
        var $signup = $(".sign-up-htm");
        var signUpData = {
            userName: $signup.find("#user").val(),
            password: $signup.find("#password").val(),
            email: $signup.find("#email").val()
        };

        $.ajax({
            url: "/register",
            type: "POST",
            data: JSON.stringify(signUpData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                window.alert("注册成功请重新登录");
                window.location.href = "/login.html";
            },
            error: function (data, textStatus, jqXHR) {

            }
        });
    })

    $(".sign-in-htm").find("#forgetPassword").click(function(){
       var username = $(".sign-in-htm").find("#user").val();
       var forgetPassword = {
           userName:username
       };
        $.ajax({
            url: "/forgetPassword",
            type: "POST",
            data: JSON.stringify(forgetPassword),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                window.alert("密码修改成功，请登陆");
                /*                window.location.href = "/login.html";*/
            },
            error: function (data, textStatus, jqXHR) {
                window.alert(data.responseText);
            }
        });
    });
});

//设置cookie
function setCookie(name,value,day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
};

//获取cookie
function getCookie(name){
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
        return arr[1];
    }else{
        return '';
    }
};

//删除cookie
function delCookie(name){
    setCookie(name,null,-1);
};