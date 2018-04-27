package com.caixueyuan.mapper;

import com.caixueyuan.entity.AnswerEntity;
import com.caixueyuan.entity.QuestionEntity;
import com.caixueyuan.entity.UserEntity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * Created by 25299 on 2018/4/25.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class AnswerMapperTest {

    @Autowired
    private AnswerMapper answerMapper;

    @Test
    public void testInsertAnswer(){
        AnswerEntity answerEntity = new AnswerEntity();
        answerEntity.setAnswerContent("学习好JavaScript可以设计漂亮的网页，然后可以作为工作的加分项，还是追女朋友哦");
        answerEntity.setAnswerLove(5);
        UserEntity userEntity = new UserEntity();
        userEntity.setid(2);
        answerEntity.setUserEntity(userEntity);
        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setQuestionId(2);
        answerEntity.setQuestionEntity(questionEntity);
        answerMapper.insertAnswer(answerEntity);
    }

    @Test
    public void testGetAnswersByQuestionId(){
        Integer questionId = 1;
        List<AnswerEntity> answerEntities = answerMapper.getAnswersByQuestionId(questionId);
        for(AnswerEntity answerEntity:answerEntities){
            System.out.println(answerEntity.toString());
        }
    }

    @Test
    public void testGetAnswerById(){
        Integer answerId = 1;
        AnswerEntity answerEntity = answerMapper.getAnswerById(answerId);
        System.out.println(answerEntity.toString());
    }

    @Test
    public void testGetAnswersByQuestionIdWithOneAnswer(){
        Integer questionid = 2;
        List<AnswerEntity> answerEntities = answerMapper.getAnswersByQuestionIdWithQuestions(questionid);
        for(AnswerEntity answerEntity:answerEntities){
            System.out.println(answerEntity.toString());
        }

    }
}
