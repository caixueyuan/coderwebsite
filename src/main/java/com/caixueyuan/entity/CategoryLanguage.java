package com.caixueyuan.entity;

/**
 * Created by 25299 on 2018/4/19.
 */
public class CategoryLanguage implements Comparable<CategoryLanguage>{
    private Integer categoryid;

    private String category;

    private String language;

    public CategoryLanguage(){

    }

    public CategoryLanguage(Integer categoryid, String category, String language) {
        this.categoryid = categoryid;
        this.category = category;
        this.language = language;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getCategoryid() {
        return categoryid;
    }

    @Override
    public String toString() {
        return "CategoryLanguage{" +
                "categoryid=" + categoryid +
                ", category='" + category + '\'' +
                ", language='" + language + '\'' +
                '}';
    }

    public void setCategoryid(Integer categoryid) {
        this.categoryid = categoryid;
    }

    @Override
    public int compareTo(CategoryLanguage o) {
        if(category.compareTo(o.category) > 0){
            return 1;
        }
        else if(category.compareTo(o.category) == 0){
            if(language.compareTo(o.language) > 0){
                return 1;
            }
            else if(language.compareTo(o.language) == 0){
                return 0;
            }
            else{
                return -1;
            }
        }
        else{
            return -1;
        }
    }
}
