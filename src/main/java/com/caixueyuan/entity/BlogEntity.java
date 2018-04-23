package com.caixueyuan.entity;

/**
 * Created by 25299 on 2018/4/20.
 */
public class BlogEntity {
    private Integer blogid;
    private CategoryLanguage categoryLanguage;
    private String blogTitle;
    private String blogContent;
    private String userName;
    private Integer userid;
    private Integer hate;
    private Integer love;

    public BlogEntity(Integer blogid, CategoryLanguage categoryLanguage, String blogTitle, String blogContent, String userName, Integer userid, Integer hate, Integer love) {
        this.blogid = blogid;
        this.categoryLanguage = categoryLanguage;
        this.blogTitle = blogTitle;
        this.blogContent = blogContent;
        this.userName = userName;
        this.userid = userid;
        this.hate = hate;
        this.love = love;
    }

    public BlogEntity(){

    }

    @Override
    public String toString() {
        return "BlogEntity{" +
                "blogid=" + blogid +
                ", categoryLanguage=" + categoryLanguage +
                ", blogTitle='" + blogTitle + '\'' +
                ", blogContent='" + blogContent + '\'' +
                ", userName='" + userName + '\'' +
                ", userid='" + userid + '\'' +
                ", hate=" + hate +
                ", love=" + love +
                '}';
    }

    public Integer getBlogid() {
        return blogid;
    }

    public void setBlogid(Integer blogid) {
        this.blogid = blogid;
    }

    public CategoryLanguage getCategoryLanguage() {
        return categoryLanguage;
    }

    public void setCategoryLanguage(CategoryLanguage categoryLanguage) {
        this.categoryLanguage = categoryLanguage;
    }

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }

    public String getBlogContent() {
        return blogContent;
    }

    public void setBlogContent(String blogContent) {
        this.blogContent = blogContent;
    }



    public Integer getHate() {
        return hate;
    }

    public void setHate(Integer hate) {
        this.hate = hate;
    }

    public Integer getLove() {
        return love;
    }

    public void setLove(Integer love) {
        this.love = love;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }
}
