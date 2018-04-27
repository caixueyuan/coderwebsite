package com.caixueyuan.mapper;

import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.entity.QuestionEntity;
import com.caixueyuan.entity.UserEntity;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * Created by 25299 on 2018/4/24.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuestionMapperTest {

    @Autowired
    private QuestionMapper questionMapper;

    @Test
    public void testInsertQuestion(){
        QuestionEntity questionEntity = new QuestionEntity();
        CategoryLanguage categoryLanguage = new CategoryLanguage();
        categoryLanguage.setCategoryid(3);
        categoryLanguage.setCategory("前端");
        categoryLanguage.setLanguage("JavaScript");
        questionEntity.setCategoryLanguage(categoryLanguage);
        questionEntity.setQuestionLove(0);
        questionEntity.setQuestionTitle("学好JavaScript有什么用");
        UserEntity userEntity = new UserEntity();
        userEntity.setid(2);
        userEntity.setUserName("caixueyuan");
        questionEntity.setUserEntity(userEntity);
        questionMapper.insertQuestion(questionEntity);
    }

    @Test
    public void testGetQuestionsById(){
        Integer questionId = 1;
        QuestionEntity questionEntity = questionMapper.getQuestionsById(questionId);
        System.out.println(questionEntity.toString());
    }

    @Test
    public void testGetQuestionsByCategory(){
        CategoryLanguage categoryLanguage = new CategoryLanguage();
        categoryLanguage.setCategoryid(3);
        categoryLanguage.setCategory("前端");
        categoryLanguage.setLanguage("JavaScript");

        List<QuestionEntity> questionEntitys = questionMapper.getQuestionsByLanguage("JavaScript");
        for(QuestionEntity questionEntity:questionEntitys){
            System.out.println(questionEntity.toString());
        }
    }
}
