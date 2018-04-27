package com.caixueyuan.mapper;

import com.caixueyuan.entity.BlogEntity;
import com.caixueyuan.entity.BlogInsertEntity;
import org.apache.ibatis.annotations.*;

import org.apache.ibatis.mapping.FetchType;
import java.util.List;

/**
 * Created by 25299 on 2018/4/20.
 */
@Mapper
public interface BlogMapper {

    @Select("select * from blog where categoryid in (select categoryid from category_language where language = #{language})")
    @Results({
            @Result(property = "blogid",column = "blogid"),
            @Result(property = "blogTitle" ,column = "blogtitle"),
            @Result(property = "blogContent" ,column = "blogcontent"),
            @Result(property = "hate" ,column = "hate"),
            @Result(property = "love" ,column = "love"),
            @Result(property = "userid",column = "userid"),
            @Result(property = "userName",column = "userid",
                one=@One(select="com.caixueyuan.mapper.UserMapper.getUserNameById",fetchType= FetchType.EAGER))
/*            @Result(property = "CategoryLanguage",column = "categoryid",
                one=@One(select="com.caixueyuan.mapper.CategoryMapper.getCategoryId",fetchType= FetchType.EAGER))*/
    })
    List<BlogEntity> getBlogsByCategory(String language);

    @Insert("insert into blog(categoryid,blogtitle,blogcontent,userid,love,hate)" +
            "values" +
            "(" +
            "#{categoryid}," +
            "#{blogTitle}," +
            "#{blogContent}," +
            "#{userid}," +
            "#{love}," +
            "#{hate}" +
            ");")
    void insertBlog(BlogInsertEntity blogInsertEntity);

    @Select("select * from blog where blogid = #{blogid}")
    @Results({
            @Result(property = "blogid",column = "blogid"),
            @Result(property = "blogTitle" ,column = "blogtitle"),
            @Result(property = "blogContent" ,column = "blogcontent"),
            @Result(property = "hate" ,column = "hate"),
            @Result(property = "love" ,column = "love"),
            @Result(property = "userid",column = "userid"),
            @Result(property = "userName",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getUserNameById",fetchType= FetchType.EAGER))
    })
    BlogEntity getBlogById(Integer blogid);

    @Update("update blog set love = #{love} where blogid = #{blogid}")
    void addBlogLove(BlogEntity blogEntity);

    @Update("update blog set hate = #{hate} where blogid = #{blogid}")
    void addBlogHate(BlogEntity blogEntity);
}
