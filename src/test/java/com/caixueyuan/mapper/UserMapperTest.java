package com.caixueyuan.mapper;

import com.caixueyuan.entity.UserEntity;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * Created by 25299 on 2018/4/14.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testInsertOne(){
        userMapper.insertOne(new UserEntity("caixueyuan","123456","2529982859@qq.com", true));
        userMapper.insertOne(new UserEntity("caixueyuan1","123456","2529982859@qq.com", true));
        userMapper.insertOne(new UserEntity("caixueyuan2","123456","2529982859@qq.com", true));
        Assert.assertEquals(3,userMapper.getAll().size());
    }

    @Test
    public void testGetAll(){
        List<UserEntity> lists = userMapper.getAll();
        System.out.println(lists.toString());
    }
    @Test
    public void testGetOneById(){
        Integer userId = 1;
        UserEntity userEntity = userMapper.getOneById(1);
        System.out.println(userEntity);
        System.out.println(userEntity.toString());
    }
    @Test
    public void testGetOneByUserName(){
        UserEntity userEntity = new UserEntity("caixueyuan","123456","2529982859@qq.com", true);
        List<UserEntity> lists = userMapper.getOneByUserName(userEntity);
        Assert.assertEquals(1,lists.size());
    }
    @Test
    public void testUpdateOne(){
        UserEntity userEntity = new UserEntity(1,"caixueyuan","12345678","2529982859@qq.com", true);
        userMapper.updateOne(userEntity);
    }



}