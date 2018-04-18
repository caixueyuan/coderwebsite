/**
 * Created by 25299 on 2018/4/15.
 */

jQuery(document).ready(function() {
    var TOKEN_KEY = "jwtToken";
    var JWT_NAME = "JwtName";

    var $ul = $("#menumanager");
    if(getJwtToken()){
        var $li = $("<li>")
        var $a = $("<a>").attr("href","user.html");
        $a.append($("<i>").addClass("fa fa-angle-down").text(getJwtName()));
        $li.append($a);

        var $ul_inside = $("<ul>").addClass("sub-menu").attr("role","menu");

        $ul_inside.append($("<li>").append($("<a>").attr("href","user.html").text(getJwtName())));
        $ul_inside.append($("<li>").append($("<a>").text("注销").click(function(){
            doLogout();
        })));
        $li.append($ul_inside);
        $ul.append($li);
    }
    else{
        var $li = $("<li>");
        $li.append($("<a>").attr("href","login.html").text("登陆/注册"));
        $ul.append($li);
    }

/*    $ul.append('<li><a href="login.html">登陆/注册</a></li>');*/

    function doLogout(){
        removeJwtToken();
        window.location.reload();
    }
    function removeJwtToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
    function getJwtToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    function getJwtName(){
        return localStorage.getItem(JWT_NAME);
    }
});


