package com.caixueyuan.service;

import com.caixueyuan.entity.AnswerEntity;
import com.caixueyuan.entity.QuestionEntity;
import com.caixueyuan.mapper.AnswerMapper;
import com.caixueyuan.mapper.QuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 25299 on 2018/4/25.
 */

@Service
public class AnswerService {

    @Autowired
    private AnswerMapper answerMapper;

    @Autowired
    private QuestionMapper questionMapper;

    public void answerSupport(AnswerEntity answerEntity){
        answerEntity.setAnswerLove(answerEntity.getAnswerLove()+1);
        answerMapper.updateAnswerLove(answerEntity);
    }

    public void answerOppose(AnswerEntity answerEntity){
        answerEntity.setAnswerLove(answerEntity.getAnswerLove()-1);
        answerMapper.updateAnswerLove(answerEntity);
    }

    public QuestionEntity addAnswer(AnswerEntity answerEntity){
        answerMapper.insertAnswer(answerEntity);
        Integer questionId = answerEntity.getQuestionEntity().getQuestionId();
        QuestionEntity questionEntity = questionMapper.getQuestionsById(questionId);
        return questionEntity;
    }
}
