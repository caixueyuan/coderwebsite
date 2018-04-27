package com.caixueyuan.controller;

import com.caixueyuan.entity.CommentEntity;
import com.caixueyuan.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 25299 on 2018/4/26.
 */

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping(value = "/addComment",method = RequestMethod.POST)
    public CommentEntity addComment(@RequestBody CommentEntity commentEntity){
        System.out.println(commentEntity.toString());
        CommentEntity commentEntity1 = commentService.addComment(commentEntity);
        return commentEntity1;
    }

    @RequestMapping(value = "commentlike",method = RequestMethod.POST)
    public void likeComment(@RequestBody CommentEntity commentEntity){
        System.out.println(commentEntity.toString());
        commentService.likeComment(commentEntity);
        return;
    }

    @RequestMapping(value = "commentunlike",method = RequestMethod.POST)
    public void unlikeComment(@RequestBody CommentEntity commentEntity){
        System.out.println(commentEntity.toString());
        commentService.unlikeComment(commentEntity);
        return;
    }
}
