package com.caixueyuan.entity;

import java.util.List;

/**
 * Created by 25299 on 2018/4/19.
 */
public class CategoryEntity{
    private String category;


    private List<Integer> categoryids;
    private List<String> languages;

    public CategoryEntity(){

    }
    public CategoryEntity(String category, List<Integer> categoryids, List<String> languages) {
        this.category = category;
        this.categoryids = categoryids;
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

    public List<Integer> getCategoryids() {
        return categoryids;
    }

    public void setCategoryids(List<Integer> categoryids) {
        this.categoryids = categoryids;
    }
}
