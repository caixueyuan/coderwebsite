package com.caixueyuan.mapper;

import com.caixueyuan.entity.CategoryLanguage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by 25299 on 2018/4/19.
 */

@Mapper
public interface CategoryMapper {

    @Select("select * from category_language")
    @Results({
            @Result(property = "categoryid",column = "categoryid"),
            @Result(property = "category" ,column = "category"),
            @Result(property = "language" ,column = "language")
    })
    List<CategoryLanguage> getAll();

    @Select("select * from category_language where category = #{category} and language = #{language}")
    @Results({
            @Result(property = "categoryid",column = "categoryid"),
            @Result(property = "category" ,column = "category"),
            @Result(property = "language" ,column = "language")
    })
    CategoryLanguage getCategoryId(CategoryLanguage categoryLanguage);

    @Select("select * from category_language where categoryid = #{categoryid}")
    @Results({
            @Result(property = "categoryid",column = "categoryid"),
            @Result(property = "category" ,column = "category"),
            @Result(property = "language" ,column = "language")
    })
    CategoryLanguage getCategoryByIdTrue(Integer categoryid);
}
