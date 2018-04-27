package com.caixueyuan.service;

import com.caixueyuan.entity.CommentEntity;
import com.caixueyuan.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 25299 on 2018/4/26.
 */

@Service
public class CommentService {

    @Autowired
    private CommentMapper commentMapper;

    public CommentEntity addComment(CommentEntity commentEntity){
        commentMapper.insertComment(commentEntity);
        return commentEntity;
    }

    public void likeComment(CommentEntity commentEntity){
        commentEntity.setCommentLove(commentEntity.getCommentLove()+1);
        commentMapper.updateCommentLove(commentEntity);
    }

    public void unlikeComment(CommentEntity commentEntity){
        commentEntity.setCommentLove(commentEntity.getCommentLove()-1);
        commentMapper.updateCommentLove(commentEntity);
    }

}
