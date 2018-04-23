package com.caixueyuan.mapper;

import com.caixueyuan.entity.BlogEntity;
import com.caixueyuan.entity.BlogInsertEntity;
import com.caixueyuan.entity.CategoryLanguage;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * Created by 25299 on 2018/4/20.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class BlogMapperTest {

    @Autowired
    private BlogMapper blogMapper;

    @Test
    public void testGetBlogsByCategory(){
        String language = "JAVA";
        List<BlogEntity> blogEntities = blogMapper.getBlogsByCategory(language);
        Assert.assertEquals(blogEntities.size(),4);
        for(BlogEntity item:blogEntities){
            System.out.println(item.toString());
        }
    }

    @Test
    public void testInsertBlog(){
        BlogInsertEntity blogInsertEntity = new BlogInsertEntity();
        blogInsertEntity.setBlogContent("Object.esExtensible()来判断该对象是否是可扩展的\n" +
                "Object.preventExtensions()将对象转换为不可扩展的，一旦设置为不可扩展，就没有办法设置为可扩展啦\n" +
                "Object.seal()将对象设置为不可扩展，将对象的所有的自有属性都设置为不可配置的\n" +
                "Object.isSealed()检测对象是否封闭\n" +
                "Object.freeze()将对象设置为不可扩展的和将其属性设置为不可配置的，将自有的所有数据属性设置为制只读\n" +
                "Object.isFrozen()检测对象是否冻结");
        blogInsertEntity.setBlogTitle("JavaScript学习笔记（二）");
        blogInsertEntity.setCategoryid(3);
        blogInsertEntity.setHate(0);
        blogInsertEntity.setLove(0);
        blogInsertEntity.setUserid(1);
        blogMapper.insertBlog(blogInsertEntity);
    }

    @Test
    public void testGetBlogById(){
        Integer blogid = 6;
        BlogEntity blogEntity = blogMapper.getBlogById(blogid);
        System.out.println(blogEntity.toString());
    }

    @Test
    public void testAddBlogLove(){
        Integer blogid = 6;
        Integer love = 1;
        BlogEntity blogEntity = new BlogEntity();
        blogEntity.setLove(love);
        blogEntity.setBlogid(blogid);
        blogMapper.addBlogLove(blogEntity);
        BlogEntity blogEntity1 = blogMapper.getBlogById(blogid);
        System.out.println(blogEntity1.toString());
    }
}
