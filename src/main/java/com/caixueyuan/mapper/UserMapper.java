package com.caixueyuan.mapper;

import com.caixueyuan.entity.UserEntity;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by 25299 on 2018/4/13.
 */

@Mapper
public interface UserMapper {

    @Select("select * from USERS")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "userName",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "email",column = "email")
    })
    List<UserEntity> getAll();

    @Select("select * from USERS where username = #{userName}")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "userName",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "email",column = "email")
    })
    UserEntity getOneByName(String userName);

    @Select("select * from users where id = #{id}")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "userName",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "email",column = "email")
    })
    UserEntity getOneById(Integer id);

    @Select("select * from Users where username = #{userName} and password = #{password}")
    @Results({
            @Result(property = "id",column = "id"),
            @Result(property = "userName",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "email",column = "email")
    })
    List<UserEntity> getOneByUserName(UserEntity userEntity);

    @Insert("insert into users(username,password,email) values (#{userName},#{password},#{email})")
    void insertOne(UserEntity user);

    @Update("update users set password = #{password} where id = #{id}")
    void updateOne(UserEntity userEntity);
}
