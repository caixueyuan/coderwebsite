package com.caixueyuan.controller;

import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.entity.QuestionEntity;
import com.caixueyuan.entity.UserEntity;
import com.caixueyuan.security.JwtUser;
import com.caixueyuan.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by 25299 on 2018/4/24.
 */

@RestController
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @RequestMapping(value = "/questionlist",method = RequestMethod.POST)
    public List<QuestionEntity> getBlogsByLanguage(@RequestBody CategoryLanguage categoryLanguage){
        System.out.println(categoryLanguage.toString());
        List<QuestionEntity> questionEntityList = questionService.getQuestionList(categoryLanguage);
        return questionEntityList;
    }

    @RequestMapping(value = "/addQuestion",method = RequestMethod.POST)
    public List<QuestionEntity> addQuestion(@RequestBody QuestionEntity questionEntity){
        System.out.println(questionEntity.toString());
        JwtUser jwtUser =(JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity userEntity = questionEntity.getUserEntity();
        if(userEntity == null){
            userEntity = new UserEntity();
            userEntity.setid(jwtUser.getId());
            questionEntity.setUserEntity(userEntity);
        }
        else{
            userEntity.setid(jwtUser.getId());
        }
        List<QuestionEntity> questionEntityList = questionService.insertQuestion(questionEntity);
        return questionEntityList;
    }

    @RequestMapping(value = "/getWholeQuestion",method = RequestMethod.POST)
    public QuestionEntity getWholeQuestion(@RequestBody Map<String,Object> map){
        Integer questionId = (Integer)map.get("questionId");
        System.out.println(questionId);
        QuestionEntity questionEntity = questionService.getQuestion(questionId);
        return questionEntity;
    }
}
