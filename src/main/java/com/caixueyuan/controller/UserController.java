package com.caixueyuan.controller;

import com.caixueyuan.entity.UserEntity;
import com.caixueyuan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.caixueyuan.Utils.Error;

/**
 * Created by 25299 on 2018/4/16.
 */

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "register",method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody UserEntity userEntity){
        String email = userEntity.getEmail();
        String userName = userEntity.getUserName();
        boolean isExited = userService.checkEmailIsExited(email);
        boolean nameIsExited = userService.checkUserNameIsExited(userName);
        boolean result = isExited || nameIsExited;
        HttpStatus status = (result == true?HttpStatus.BAD_REQUEST:HttpStatus.OK);
        if(isExited == true){
            Error error = new Error(4,"email is used");
            return new ResponseEntity<Error>(error,status);
        }
        if(nameIsExited == true){
            Error error = new Error(4,"userName is used");
            return new ResponseEntity<Error>(error,status);
        }

        userService.addUser(userEntity);
        return new ResponseEntity<String>("true",status);
    }

}
