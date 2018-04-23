package com.caixueyuan.controller;

import com.caixueyuan.entity.CategoryEntity;
import com.caixueyuan.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by 25299 on 2018/4/19.
 */

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/associationList")
    public List<CategoryEntity> associationList(){

        List<CategoryEntity> data = categoryService.getAllCategories();


/*        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setCategory("前端");
        List<String> strings = new ArrayList<>();
        strings.add("HTML");
        strings.add("CSS");
        strings.add("JS");
        categoryEntity.setLanguages(strings);


        CategoryEntity categoryEntity1 = new CategoryEntity();
        categoryEntity1.setCategory("前端");
        List<String> strings1 = new ArrayList<>();
        strings1.add("HTML");
        strings1.add("CSS");
        strings1.add("JS");
        categoryEntity1.setLanguages(strings1);

        data.add(categoryEntity);
        data.add(categoryEntity1);*/
        return data;
    }
}
