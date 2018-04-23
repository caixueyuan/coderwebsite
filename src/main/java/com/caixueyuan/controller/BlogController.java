package com.caixueyuan.controller;

import com.caixueyuan.entity.BlogEntity;
import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.security.JwtUser;
import com.caixueyuan.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by 25299 on 2018/4/20.
 */

@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    @RequestMapping(value = "/bloglist",method = RequestMethod.POST)
    public List<BlogEntity> getBlogsByLanguage(@RequestBody CategoryLanguage categoryLanguage){
        String language = categoryLanguage.getLanguage();
        List<BlogEntity> blogEntities = blogService.getBlogsByLanguage(language);
        return blogEntities;
    }

    @RequestMapping(value = "/addBlog",method = RequestMethod.POST)
    public List<BlogEntity> addBlog(@RequestBody BlogEntity blogEntity){
        System.out.println(blogEntity.getCategoryLanguage().toString());
        JwtUser user =(JwtUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        blogEntity.setUserid(user.getId());
        List<BlogEntity> blogEntities = blogService.insertBlog(blogEntity);
        return blogEntities;
    }

    @RequestMapping(value = "/blogdetail",method = RequestMethod.POST)
    public BlogEntity addBlog(@RequestBody Map<String,Object> map){
        String temp = (String)map.get("blogid");
        Integer blogid = Integer.parseInt(temp);
        BlogEntity blogEntity = blogService.getBlogById(blogid);
        System.out.println(blogEntity.toString());
        return blogEntity;
    }

    @RequestMapping(value = "/addbloglove",method = RequestMethod.POST)
    public BlogEntity addBlogLove(@RequestBody BlogEntity blogEntity){
/*        Integer love = blogEntity.getLove();
        Integer blogid = blogEntity.getBlogid();*/
        BlogEntity result = blogService.addBlogLove(blogEntity);
        return result;
    }

    @RequestMapping(value = "/addbloghate",method = RequestMethod.POST)
    public BlogEntity addBlogHate(@RequestBody BlogEntity blogEntity){
        BlogEntity result = blogService.addBlogHate(blogEntity);
        return result;
    }
}
