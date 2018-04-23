package com.caixueyuan.service;

import com.caixueyuan.entity.BlogEntity;
import com.caixueyuan.entity.BlogInsertEntity;
import com.caixueyuan.entity.CategoryEntity;
import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.mapper.BlogMapper;
import com.caixueyuan.mapper.CategoryMapper;
import com.caixueyuan.security.JwtUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 25299 on 2018/4/20.
 */
@Service
public class BlogService {

    @Autowired
    private BlogMapper blogMapper;

    @Autowired
    private CategoryMapper categoryMapper;

    public List<BlogEntity> getBlogsByLanguage(String language){
        List<BlogEntity> blogEntities = blogMapper.getBlogsByCategory(language);
        return blogEntities;
    }

/*    public void insertBlog(BlogEntity blogEntity){
        CategoryLanguage categoryLanguage = categoryMapper.getCategoryId(blogEntity.getCategoryLanguage());
        Integer categoryid = categoryLanguage.getCategoryid();
        BlogInsertEntity blogInsertEntity = new BlogInsertEntity();
        blogInsertEntity.setBlogContent(blogEntity.getBlogContent());
        blogInsertEntity.setBlogTitle(blogEntity.getBlogTitle());
        blogInsertEntity.setCategoryid(categoryid);
        blogInsertEntity.setHate(0);
        blogInsertEntity.setUserid(blogEntity.getUserid());
        blogInsertEntity.setLove(0);
        blogMapper.insertBlog(blogInsertEntity);
    }*/

    public List<BlogEntity> insertBlog(BlogEntity blogEntity){
        System.out.println(blogEntity.getCategoryLanguage().toString());
        CategoryLanguage categoryLanguage = categoryMapper.getCategoryId(blogEntity.getCategoryLanguage());
        Integer categoryid = categoryLanguage.getCategoryid();
        BlogInsertEntity blogInsertEntity = new BlogInsertEntity();
        blogInsertEntity.setBlogContent(blogEntity.getBlogContent());
        blogInsertEntity.setBlogTitle(blogEntity.getBlogTitle());
        blogInsertEntity.setCategoryid(categoryid);
        blogInsertEntity.setHate(0);
        blogInsertEntity.setUserid(blogEntity.getUserid());
        blogInsertEntity.setLove(0);
        blogMapper.insertBlog(blogInsertEntity);
        String language = blogEntity.getCategoryLanguage().getLanguage();
        List<BlogEntity> blogEntities = blogMapper.getBlogsByCategory(language);
        return blogEntities;
    }

    public BlogEntity getBlogById(Integer blogid){
        BlogEntity blogEntity = blogMapper.getBlogById(blogid);
        return blogEntity;
    }

    public BlogEntity addBlogLove(BlogEntity blogEntity){
        blogEntity.setLove(blogEntity.getLove()+1);
        blogMapper.addBlogLove(blogEntity);
        BlogEntity blogEntity1 = blogMapper.getBlogById(blogEntity.getBlogid());
        return blogEntity1;
    }

    public BlogEntity addBlogHate(BlogEntity blogEntity){
        blogEntity.setHate(blogEntity.getHate()+1);
        blogMapper.addBlogHate(blogEntity);
        BlogEntity blogEntity1 = blogMapper.getBlogById(blogEntity.getBlogid());
        return blogEntity1;
    }
}
