package com.caixueyuan.entity;

/**
 * Created by 25299 on 2018/4/23.
 */
public class BlogInsertEntity {
    private Integer blogid;
    private Integer categoryid;
    private String blogTitle;
    private String blogContent;
    private Integer userid;
    private Integer hate;
    private Integer love;

    public BlogInsertEntity(Integer blogid, Integer categoryid, String blogTitle, String blogContent, Integer userid, Integer hate, Integer love) {
        this.blogid = blogid;
        this.categoryid = categoryid;
        this.blogTitle = blogTitle;
        this.blogContent = blogContent;
        this.userid = userid;
        this.hate = hate;
        this.love = love;
    }
    public BlogInsertEntity(){

    }


    public Integer getBlogid() {
        return blogid;
    }

    public void setBlogid(Integer blogid) {
        this.blogid = blogid;
    }

    public Integer getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(Integer categoryid) {
        this.categoryid = categoryid;
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

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
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
}
