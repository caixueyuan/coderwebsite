package com.caixueyuan.entity;

import java.util.List;

/**
 * Created by 25299 on 2018/4/24.
 */
public class QuestionEntity {
    private Integer questionId;
    private CategoryLanguage categoryLanguage;
    private String questionTitle;
    private UserEntity userEntity;
    private Integer questionLove;
    private List<AnswerEntity> answerEntityList;

    public QuestionEntity(Integer questionId, CategoryLanguage categoryLanguage, String questionTitle, UserEntity userEntity, Integer questionLove, List<AnswerEntity> answerEntityList) {
        this.questionId = questionId;
        this.categoryLanguage = categoryLanguage;
        this.questionTitle = questionTitle;
        this.userEntity = userEntity;
        this.questionLove = questionLove;
        this.answerEntityList = answerEntityList;
    }

    public QuestionEntity() {
    }

    @Override
    public String toString() {
        return "QuestionEntity{" +
                "questionId=" + questionId +
                ", categoryLanguage=" + categoryLanguage +
                ", questionTitle='" + questionTitle + '\'' +
                ", userEntity=" + userEntity +
                ", questionLove=" + questionLove +
                ", answerEntityList=" + answerEntityList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        QuestionEntity that = (QuestionEntity) o;

        if (questionId != null ? !questionId.equals(that.questionId) : that.questionId != null) return false;
        if (categoryLanguage != null ? !categoryLanguage.equals(that.categoryLanguage) : that.categoryLanguage != null)
            return false;
        if (questionTitle != null ? !questionTitle.equals(that.questionTitle) : that.questionTitle != null)
            return false;
        if (userEntity != null ? !userEntity.equals(that.userEntity) : that.userEntity != null) return false;
        return questionLove != null ? questionLove.equals(that.questionLove) : that.questionLove == null;
    }

    @Override
    public int hashCode() {
        int result = questionId != null ? questionId.hashCode() : 0;
        result = 31 * result + (categoryLanguage != null ? categoryLanguage.hashCode() : 0);
        result = 31 * result + (questionTitle != null ? questionTitle.hashCode() : 0);
        result = 31 * result + (userEntity != null ? userEntity.hashCode() : 0);
        result = 31 * result + (questionLove != null ? questionLove.hashCode() : 0);
        return result;
    }

    public Integer getQuestionId() {
        return questionId;

    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public CategoryLanguage getCategoryLanguage() {
        return categoryLanguage;
    }

    public void setCategoryLanguage(CategoryLanguage categoryLanguage) {
        this.categoryLanguage = categoryLanguage;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public Integer getQuestionLove() {
        return questionLove;
    }

    public void setQuestionLove(Integer questionLove) {
        this.questionLove = questionLove;
    }

    public List<AnswerEntity> getAnswerEntityList() {
        return answerEntityList;
    }

    public void setAnswerEntityList(List<AnswerEntity> answerEntityList) {
        this.answerEntityList = answerEntityList;
    }
}
