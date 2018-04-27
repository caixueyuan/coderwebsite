package com.caixueyuan.service;

import com.caixueyuan.entity.CategoryEntity;
import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 25299 on 2018/4/19.
 */

@Service
public class CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    public List<CategoryEntity> getAllCategories(){
        Map<String,List<CategoryLanguage>> maps = new HashMap<>();

        List<CategoryLanguage> categoryLanguages = categoryMapper.getAll();
        for(CategoryLanguage item : categoryLanguages){
            String category = item.getCategory();
            List<CategoryLanguage> categoryLanguageList = maps.get(category);
            if(categoryLanguageList == null){
                categoryLanguageList = new ArrayList<CategoryLanguage>();
                categoryLanguageList.add(item);
                maps.put(category,categoryLanguageList);
            }
            else{
                categoryLanguageList.add(item);
            }
        }

        List<CategoryEntity> categoryEntities = new ArrayList<>();
        for(String key : maps.keySet()){
            CategoryEntity categoryEntity = new CategoryEntity();
            categoryEntity.setCategory(key);
            List<String> languages = new ArrayList<>();
            List<Integer> categoryids = new ArrayList<>();
            for(CategoryLanguage item : maps.get(key)){
                languages.add(item.getLanguage());
                categoryids.add(item.getCategoryid());
            }
            categoryEntity.setCategoryids(categoryids);
            categoryEntity.setLanguages(languages);
            categoryEntities.add(categoryEntity);
        }
        return categoryEntities;
    }

    public CategoryLanguage getLanguageId(CategoryLanguage categoryLanguage){
        CategoryLanguage categoryLanguage1 = categoryMapper.getCategoryId(categoryLanguage);
        return categoryLanguage1;
    }

}
