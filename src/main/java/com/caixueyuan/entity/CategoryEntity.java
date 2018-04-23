package com.caixueyuan.entity;

import java.util.List;

/**
 * Created by 25299 on 2018/4/19.
 */
public class CategoryEntity{
    private String category;



    private List<String> languages;

    public CategoryEntity(){

    }
    public CategoryEntity(String category, List<String> languages) {
        this.category = category;
        this.languages = languages;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages;
    }

}
