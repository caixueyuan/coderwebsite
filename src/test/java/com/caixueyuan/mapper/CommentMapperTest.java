package com.caixueyuan.mapper;

import com.caixueyuan.entity.AnswerEntity;
import com.caixueyuan.entity.CommentEntity;
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
public class CommentMapperTest {

    @Autowired
    private CommentMapper commentMapper;

    @Test
    public void testInsertComment(){
        CommentEntity commentEntity = new CommentEntity();
        AnswerEntity answerEntity = new AnswerEntity();
        answerEntity.setAnswerId(1);
        commentEntity.setAnswersEntity(answerEntity);
        commentEntity.setCommentContent("Thanks");
        commentEntity.setCommentLove(1);
        UserEntity userEntity = new UserEntity();
        userEntity.setUserName("caixueyuan");
        commentEntity.setUserEntity(userEntity);
        commentMapper.insertComment(commentEntity);
        System.out.println(commentEntity.toString());
    }

    @Test
    public void testGetCommentsByAnswerId(){
        Integer answerid = 1;
        List<CommentEntity> commentEntities = commentMapper.getCommentsByAnswerId(answerid);
        for(CommentEntity commentEntity:commentEntities){
            System.out.println(commentEntity.toString());
        }
    }


    @Test
    public void testGetCommentById(){
        Integer commentid = 1;
        CommentEntity commentEntity = commentMapper.getCommentById(commentid);
        System.out.println(commentEntity.toString());
    }
}
