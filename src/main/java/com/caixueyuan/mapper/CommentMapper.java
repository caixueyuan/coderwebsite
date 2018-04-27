package com.caixueyuan.mapper;

import com.caixueyuan.entity.CommentEntity;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 25299 on 2018/4/25.
 */

@Mapper
public interface CommentMapper {

    @Transactional
    @Select("select * from comments where answerid = #{answerid}")
    @Results({
            @Result(property = "commentId",column = "commentid"),
            @Result(property = "commentContent",column = "commentcontent"),
            @Result(property = "commentLove",column = "commentlove"),
            @Result(property = "answerEntity",column = "answerid",
                one=@One(select = "com.caixueyuan.mapper.AnswerMapper.getAnswerById",fetchType = FetchType.DEFAULT)),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER))
    })
    List<CommentEntity> getCommentsByAnswerId(Integer answerid);

    @Transactional
    @Select("select * from comments where commentid = #{commentId}")
    @Results({
            @Result(property = "commentId",column = "commentid"),
            @Result(property = "commentContent",column = "commentcontent"),
            @Result(property = "commentLove",column = "commentlove"),
            @Result(property = "answerEntity",column = "answerid",
                    one=@One(select = "com.caixueyuan.mapper.AnswerMapper.getAnswerById",fetchType = FetchType.DEFAULT)),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER))
    })
    CommentEntity getCommentById(Integer commentId);

    @Transactional
    @Insert("insert into comments(answerid,commentcontent,userid)" +
            "values" +
            "(#{answerEntity.answerId},#{commentContent},(select id from users where username = #{userEntity.userName}))")
    @Options(useGeneratedKeys = true,keyProperty = "commentId",keyColumn = "commentid")
    void insertComment(CommentEntity commentEntity);


    @Transactional
    @Select("select * from comments where answerid = #{answerid}")
    @Results({
            @Result(property = "commentId",column = "commentid"),
            @Result(property = "commentContent",column = "commentcontent"),
            @Result(property = "commentLove",column = "commentlove"),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER))
    })
    List<CommentEntity> getCommentsByAnswerIdWithOutAnswer(Integer answerid);

    @Update("update comments set commentlove = #{commentLove} where commentid = #{commentId}")
    void updateCommentLove(CommentEntity commentEntity);
}
