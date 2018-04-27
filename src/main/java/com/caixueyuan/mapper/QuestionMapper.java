package com.caixueyuan.mapper;

import com.caixueyuan.entity.QuestionEntity;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 25299 on 2018/4/24.
 */

@Mapper
public interface QuestionMapper {

    @Transactional
    @Select("select * from questions where categoryid in (select categoryid from category_language where language = #{language})")
    @Results({
            @Result(property = "questionId",column = "questionid"),
            @Result(property = "questionLove",column = "questionLove"),
            @Result(property = "questionContent",column = "questioncontent"),
            @Result(property = "categoryLanguage",column = "categoryid",
                one=@One(select="com.caixueyuan.mapper.CategoryMapper.getCategoryByIdTrue",fetchType= FetchType.EAGER)),
            @Result(property = "userEntity",column = "userid",
                one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER)),
            @Result(property = "answerEntityList",column="questionid",javaType = List.class,
                    many = @Many(select = "com.caixueyuan.mapper.AnswerMapper.getAnswersByQuestionIdWithOneAnswer"))

    })
    List<QuestionEntity> getQuestionsByLanguage(String language);

    @Transactional
    @Select("select * from questions where questionid = #{questionId}")
    @Results({
            @Result(property = "questionId",column = "questionid"),
            @Result(property = "questionLove",column = "questionLove"),
            @Result(property = "questionContent",column = "questioncontent"),
            @Result(property = "categoryLanguage",column = "categoryid",
                    one=@One(select="com.caixueyuan.mapper.CategoryMapper.getCategoryByIdTrue",fetchType= FetchType.EAGER)),
            @Result(property = "userEntity",column = "userid",
                    one=@One(select="com.caixueyuan.mapper.UserMapper.getOneByIdWithOutPassword",fetchType = FetchType.EAGER)),
            @Result(property = "answerEntityList",column="questionid",javaType = List.class,
                    many = @Many(select = "com.caixueyuan.mapper.AnswerMapper.getAnswersByQuestionIdWithQuestions"))
    })
    QuestionEntity getQuestionsById(Integer questionId);

    @Transactional
    @Insert("insert into questions(categoryid,questiontitle,userid)" +
            "values" +
            "(#{categoryLanguage.categoryid},#{questionTitle},#{userEntity.id})")
    void insertQuestion(QuestionEntity questionEntity);

}
