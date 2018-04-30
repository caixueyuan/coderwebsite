package com.caixueyuan.mapper;

import com.caixueyuan.entity.BookLoveEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 25299 on 2018/4/29.
 */

@Mapper
public interface BookLoveMapper {

    @Select("select * from book_loves where userid = #{userId}")
    @Results({
            @Result(property = "bookLoveId",column = "bookloveid"),
            @Result(property = "userId",column = "userid"),
            @Result(property = "bookId",column = "bookid")
    })
    List<BookLoveEntity> getBookLoveEntityByUserId(Integer userId);

    @Transactional
    @Insert("insert into book_loves(bookid,userid)" +
            "values" +
            "(#{bookId},#{userId})")
    void insertBookLoveEntity(BookLoveEntity bookLoveEntity);

    @Transactional
    @Select("select * from book_loves where userid = #{userId} and bookId = #{bookId}")
    @Results({
            @Result(property = "bookLoveId",column = "bookloveid"),
            @Result(property = "userId",column = "userid"),
            @Result(property = "bookId",column = "bookid")
    })
    BookLoveEntity getBookLove(BookLoveEntity bookLoveEntity);

    @Transactional
    @Delete("delete from book_loves where bookid = #{bookId} and userid = #{userId}")
    void deleteBookLove(BookLoveEntity bookLoveEntity);
}
