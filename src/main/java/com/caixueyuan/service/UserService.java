package com.caixueyuan.service;

import com.caixueyuan.entity.UserEntity;
import com.caixueyuan.mapper.UserMapper;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 25299 on 2018/4/16.
 */

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 如果数据库中存在email的话，那么返回的数据会大于或者等于1
     * @param email
     * @return
     */
    public boolean checkEmailIsExited(String email){
        if(email == null){
            System.out.println("email is null");
        }

        List<UserEntity> users = userMapper.getOneByEmail(email);
        if(users.size() >= 1){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * 判断前端的用户名是否存在在数据库中
     * @param userName
     * @return
     */
    public boolean checkUserNameIsExited(String userName){
        if(userName == null){
            System.out.println("userName is null");
        }
        UserEntity user = userMapper.getOneByName(userName);
        if(user != null){
            return true;
        }
        else{
            return false;
        }
    }

    public void addUser(UserEntity userEntity){
        String password = userEntity.getPassword();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userEntity.setPassword(encoder.encode(password.trim()));
        userMapper.insertOne(userEntity);
    }

    public UserEntity selectUserByName(String userName){
        return userMapper.getOneByName(userName);
    }

    public void updateUserPassword(UserEntity userEntity){
        String newPassword = userEntity.getPassword();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userEntity.setPassword(encoder.encode(newPassword.trim()));
        userMapper.updateOne(userEntity);
    }

}
