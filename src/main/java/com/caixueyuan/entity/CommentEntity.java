package com.caixueyuan.entity;

/**
 * Created by 25299 on 2018/4/24.
 */
public class CommentEntity {
    private Integer commentId;
    private AnswerEntity answerEntity;
    private String commentContent;
    private UserEntity userEntity;
    private Integer commentLove;

    public Integer getCommentId() {
        return commentId;
    }

    @Override
    public String toString() {
        return "CommentEntity{" +
                "commentId=" + commentId +
                ", answersEntity=" + answerEntity +
                ", commentContent='" + commentContent + '\'' +
                ", userEntity=" + userEntity +
                ", commentLove=" + commentLove +
                '}';
    }

    public CommentEntity(Integer commentId, AnswerEntity answersEntity, String commentContent, UserEntity userEntity, Integer commentLove) {
        this.commentId = commentId;
        this.answerEntity = answersEntity;
        this.commentContent = commentContent;
        this.userEntity = userEntity;
        this.commentLove = commentLove;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CommentEntity that = (CommentEntity) o;

        if (commentId != null ? !commentId.equals(that.commentId) : that.commentId != null) return false;
        if (answerEntity != null ? !answerEntity.equals(that.answerEntity) : that.answerEntity != null)
            return false;
        if (commentContent != null ? !commentContent.equals(that.commentContent) : that.commentContent != null)
            return false;
        if (userEntity != null ? !userEntity.equals(that.userEntity) : that.userEntity != null) return false;
        return commentLove != null ? commentLove.equals(that.commentLove) : that.commentLove == null;
    }

    @Override
    public int hashCode() {
        int result = commentId != null ? commentId.hashCode() : 0;
        result = 31 * result + (answerEntity != null ? answerEntity.hashCode() : 0);
        result = 31 * result + (commentContent != null ? commentContent.hashCode() : 0);
        result = 31 * result + (userEntity != null ? userEntity.hashCode() : 0);
        result = 31 * result + (commentLove != null ? commentLove.hashCode() : 0);
        return result;
    }

    public CommentEntity() {
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public AnswerEntity getAnswersEntity() {
        return answerEntity;
    }

    public void setAnswersEntity(AnswerEntity answersEntity) {
        this.answerEntity = answersEntity;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public Integer getCommentLove() {
        return commentLove;
    }

    public void setCommentLove(Integer commentLove) {
        this.commentLove = commentLove;
    }
}
