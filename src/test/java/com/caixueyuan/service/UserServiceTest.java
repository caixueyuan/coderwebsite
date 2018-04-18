package com.caixueyuan.service;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created by 25299 on 2018/4/17.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void testCheckEmailIsExited(){
        String email = "2529982859@qq.com";
        boolean isExited = userService.checkEmailIsExited(email);
        Assert.assertEquals(isExited,true);

    }
}
