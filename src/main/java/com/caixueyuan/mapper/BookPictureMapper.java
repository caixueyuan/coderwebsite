package com.caixueyuan.mapper;

import com.caixueyuan.entity.BookPictureEntity;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by 25299 on 2018/4/29.
 */

@Mapper
public interface BookPictureMapper {

    @Select("select * from bookpictures where bookid = #{bookId}")
    @Results({
            @Result(property = "bookId",column = "bookid"),
            @Result(property = "bookPictureId",column = "bookPictureid"),
            @Result(property = "bookAddress",column = "bookaddress")
    })
    List<BookPictureEntity> getBookPicturesByBookId(Integer bookId);

    @Insert("insert into bookpictures(bookid,bookaddress)" +
            "values" +
            "(#{bookId},#{bookAddress})")
    void insertBookPicture(BookPictureEntity bookPictureEntity);

    @Insert("<script>"+
            "insert into bookpictures(bookid,bookaddress)" +
            "values" +
            "<foreach collection=\"list\" item=\"item\" index=\"index\" separator=\",\">"+
            "(#{item.bookId},#{item.bookAddress})"+
            "</foreach>"+
            "</script>")
    void batchInsertBookPicture(@Param("list")List<BookPictureEntity> bookPictureEntities);

}
