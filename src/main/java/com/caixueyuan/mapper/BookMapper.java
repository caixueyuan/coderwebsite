package com.caixueyuan.mapper;

import com.caixueyuan.entity.BookEntity;
import com.caixueyuan.entity.CategoryLanguage;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;

/**
 * Created by 25299 on 2018/4/29.
 */

@Mapper
public interface BookMapper {

    @Select("select * from books  where categoryid in (select categoryid from category_language " +
            "where category = #{category} and language = #{language}) order by booklove asc")
    @Results({
            @Result(property = "bookid",column = "bookid"),
            @Result(property = "bookTitle",column = "booktitle"),
            @Result(property = "bookContent",column = "bookcontent"),
            @Result(property = "bookPictureEntities",column = "bookid",javaType = List.class,
                many = @Many(select = "com.caixueyuan.mapper.BookPictureMapper.getBookPicturesByBookId",fetchType = FetchType.EAGER)),
            @Result(property = "bookLoveCount",column = "booklove")
    })
    List<BookEntity> getBooksByCategory(CategoryLanguage categoryLanguage);

    @Insert("insert into books(categoryid,booktitle,bookcontent)" +
            "values" +
            "(#{categoryLanguage.categoryid},#{bookTitle},#{bookContent})")
    @Options(useGeneratedKeys = true,keyProperty = "bookid",keyColumn = "bookid")
    void insertBook(BookEntity bookEntity);

    @Update("update books set booklove = booklove + 1 where bookid = #{bookId}")
    void likeBook(Integer bookId);

    @Update("update books set booklove = booklove - 1 where bookid = #{bookId}")
    void unlikeBook(Integer bookId);

    @Select("select * from books where bookid = #{bookid}")
    @Results({
            @Result(property = "bookid",column = "bookid"),
            @Result(property = "bookTitle",column = "booktitle"),
            @Result(property = "bookContent",column = "bookcontent"),
            @Result(property = "bookPictureEntities",column = "bookid",javaType = List.class,
                    many = @Many(select = "com.caixueyuan.mapper.BookPictureMapper.getBookPicturesByBookId",fetchType = FetchType.EAGER)),
            @Result(property = "bookLoveCount",column = "booklove")
    })
    BookEntity getOne(Integer bookid);

}
