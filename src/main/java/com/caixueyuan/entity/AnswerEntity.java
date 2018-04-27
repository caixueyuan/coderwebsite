package com.caixueyuan.entity;

import java.util.List;

/**
 * Created by 25299 on 2018/4/24.
 */
public class AnswerEntity {
    private Integer answerId;
    private QuestionEntity questionEntity;
    private String answerContent;
    private UserEntity userEntity;
    private Integer answerLove;
    private List<CommentEntity> commentEntityList;

    public AnswerEntity(Integer answerId, QuestionEntity questionEntity, String answerContent, UserEntity userEntity, Integer answerLove, List<CommentEntity> commentEntityList) {
        this.answerId = answerId;
        this.questionEntity = questionEntity;
        this.answerContent = answerContent;
        this.userEntity = userEntity;
        this.answerLove = answerLove;
        this.commentEntityList = commentEntityList;
    }

    @Override
    public String toString() {
        return "AnswerEntity{" +
                "answerId=" + answerId +
                ", questionEntity=" + questionEntity +
                ", answerContent='" + answerContent + '\'' +
                ", userEntity=" + userEntity +
                ", answerLove=" + answerLove +
                ", commentEntityList=" + commentEntityList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AnswerEntity that = (AnswerEntity) o;

        if (answerId != null ? !answerId.equals(that.answerId) : that.answerId != null) return false;
        if (questionEntity != null ? !questionEntity.equals(that.questionEntity) : that.questionEntity != null)
            return false;
        if (answerContent != null ? !answerContent.equals(that.answerContent) : that.answerContent != null)
            return false;
        if (userEntity != null ? !userEntity.equals(that.userEntity) : that.userEntity != null) return false;
        return answerLove != null ? answerLove.equals(that.answerLove) : that.answerLove == null;
    }

    @Override
    public int hashCode() {
        int result = answerId != null ? answerId.hashCode() : 0;
        result = 31 * result + (questionEntity != null ? questionEntity.hashCode() : 0);
        result = 31 * result + (answerContent != null ? answerContent.hashCode() : 0);
        result = 31 * result + (userEntity != null ? userEntity.hashCode() : 0);
        result = 31 * result + (answerLove != null ? answerLove.hashCode() : 0);
        return result;
    }

    public AnswerEntity(){

    }
    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public QuestionEntity getQuestionEntity() {
        return questionEntity;
    }

    public void setQuestionEntity(QuestionEntity questionEntity) {
        this.questionEntity = questionEntity;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public void setAnswerContent(String answerContent) {
        this.answerContent = answerContent;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public Integer getAnswerLove() {
        return answerLove;
    }

    public void setAnswerLove(Integer answerLove) {
        this.answerLove = answerLove;
    }

    public List<CommentEntity> getCommentEntityList() {
        return commentEntityList;
    }

    public void setCommentEntityList(List<CommentEntity> commentEntityList) {
        this.commentEntityList = commentEntityList;
    }
}
