package com.caixueyuan.mapper;

import com.caixueyuan.entity.AnswerEntity;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 25299 on 2018/4/25.
 */

@Mapper
public interface AnswerMapper {

    @Transactional
    @Select("select * from answers order by answerlove desc where questionid = #{questionId}")
    @Results({
            @Result(property = "answerId",column = "answerid"),
            @Result(property = "answerContent",column = "answercontent"),
            @Result(property = "answerLove",column = "answerlove"),
            @Result(property = "questionEntity",column = "questionid",
                one=@One(select = "com.caixueyuan.mapper.QuestionMapper.getQuestionsById",fetchType = FetchType.DEFAULT)),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER))
    })
    List<AnswerEntity> getAnswersByQuestionId(Integer questionId);

    @Transactional
    @Select("select * from answers where questionid = #{questionId}")
    @Results({
            @Result(property = "answerId",column = "answerid"),
            @Result(property = "answerContent",column = "answercontent"),
            @Result(property = "answerLove",column = "answerlove"),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER)),
            @Result(property = "commentEntityList",column = "answerid",javaType = List.class,
                    many=@Many(select = "com.caixueyuan.mapper.CommentMapper.getCommentsByAnswerIdWithOutAnswer"))
    })
    List<AnswerEntity> getAnswersByQuestionIdWithQuestions(Integer questionId);

    @Transactional
    @Select("select * from answers where answerid = #{answerId}")
    @Results({
            @Result(property = "answerId",column = "answerid"),
            @Result(property = "answerContent",column = "answercontent"),
            @Result(property = "answerLove",column = "answerlove"),
            @Result(property = "questionEntity",column = "questionid",
                    one=@One(select = "com.caixueyuan.mapper.QuestionMapper.getQuestionsById",fetchType = FetchType.DEFAULT)),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER))
    })
    AnswerEntity getAnswerById(Integer answerId);

    @Transactional
    @Insert("insert into answers(questionid,answercontent,userid)" +
            "values" +
            "(#{questionEntity.questionId},#{answerContent},#{userEntity.id})")
    void insertAnswer(AnswerEntity answerEntity);

    @Transactional
    @Select("select * from answers where questionid = #{questionId} and answerlove = (select max(answerlove) from answers where questionid = #{questionId});")
    @Results({
            @Result(property = "answerId",column = "answerid"),
            @Result(property = "answerContent",column = "answercontent"),
            @Result(property = "answerLove",column = "answerlove"),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER)),
            @Result(property = "commentEntityList",column = "answerid",javaType = List.class,
                    many=@Many(select = "com.caixueyuan.mapper.CommentMapper.getCommentsByAnswerIdWithOutAnswer"))
    })
    List<AnswerEntity> getAnswersByQuestionIdWithOneAnswer(Integer questionId);

    @Transactional
    @Update("update answers set answerlove = #{answerLove} where answerid = #{answerId}")
    void updateAnswerLove(AnswerEntity answerEntity);
}
