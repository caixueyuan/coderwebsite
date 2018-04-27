package com.caixueyuan.service;

import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.entity.QuestionEntity;
import com.caixueyuan.mapper.QuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by 25299 on 2018/4/25.
 */

@Service
public class QuestionService {

    @Autowired
    private QuestionMapper questionMapper;

    public List<QuestionEntity> getQuestionList(CategoryLanguage categoryLanguage){
        String lauguage = categoryLanguage.getLanguage();
        List<QuestionEntity> questionEntityList = questionMapper.getQuestionsByLanguage(lauguage);
        return questionEntityList;
    }

    public List<QuestionEntity> insertQuestion(QuestionEntity questionEntity){
/*        questionMapper.insertQuestion(questionEntity);*///TODO
        String language = questionEntity.getCategoryLanguage().getLanguage();
        List<QuestionEntity> questionEntityList = questionMapper.getQuestionsByLanguage(language);
        return questionEntityList;
    }


    public QuestionEntity getQuestion(Integer questionId){
        QuestionEntity questionEntity = questionMapper.getQuestionsById(questionId);
        return questionEntity;
    }
}
