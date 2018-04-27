package com.caixueyuan.controller;

import com.caixueyuan.entity.AnswerEntity;
import com.caixueyuan.entity.QuestionEntity;
import com.caixueyuan.entity.UserEntity;
import com.caixueyuan.security.JwtUser;
import com.caixueyuan.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 25299 on 2018/4/25.
 */

@RestController
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    //TODO 进行前后台对接
    @RequestMapping(value = "/answersupport",method = RequestMethod.POST)
    public void answersupport(@RequestBody AnswerEntity answerEntity){
        System.out.println("answersupport="+answerEntity.toString());
        answerService.answerSupport(answerEntity);
    }

    @RequestMapping(value = "/answeroppose",method = RequestMethod.POST)
    public void answeroppose(@RequestBody AnswerEntity answerEntity){
        System.out.println("answeroppose="+answerEntity.toString());
        answerService.answerOppose(answerEntity);
    }

    @RequestMapping(value = "/addAnswer",method = RequestMethod.POST)
    public QuestionEntity addAnswer(@RequestBody AnswerEntity answerEntity){
        System.out.println(answerEntity.toString());
        JwtUser jwtUser =(JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity userEntity = answerEntity.getUserEntity();
        if(userEntity != null){
            userEntity.setid(jwtUser.getId());
        }
        else{
            userEntity = new UserEntity();
            userEntity.setid(jwtUser.getId());
            answerEntity.setUserEntity(userEntity);
        }
        QuestionEntity result = answerService.addAnswer(answerEntity);
        return result;
    }
}
