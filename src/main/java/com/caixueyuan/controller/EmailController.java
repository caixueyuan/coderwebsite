package com.caixueyuan.controller;

import com.caixueyuan.Utils.RandomUtil;
import com.caixueyuan.entity.UserEntity;
import com.caixueyuan.service.MailService;
import com.caixueyuan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by 25299 on 2018/4/17.
 */

@RestController
public class EmailController {

    @Autowired
    private MailService mailService;

    @Autowired
    private UserService userService;

    @Autowired
    private RandomUtil randomUtil;

    @RequestMapping(value = "forgetPassword",method = RequestMethod.POST)
    public void forgetPassword(@RequestBody Map<String,Object> map){
        //获取前端发送的JSON
        String userName = (String)map.get("userName");

        UserEntity userEntity = userService.selectUserByName(userName);
        String newPassword =randomUtil.RandomString(6);
        userEntity.setPassword(newPassword);

        System.out.println("newPassword="+newPassword);
        userService.updateUserPassword(userEntity);

        mailService.sendSimpleMail(userEntity.getEmail(),"密码修改","现在进行密码修改，系统发送新的密码到你的邮箱中，新密码为" +
                newPassword + ",请重新登陆，谢谢啦");
    }
}

