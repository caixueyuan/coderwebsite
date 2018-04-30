package com.caixueyuan.service;

import com.caixueyuan.entity.BookLoveEntity;
import com.caixueyuan.mapper.BookLoveMapper;
import com.caixueyuan.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by 25299 on 2018/4/30.
 */

@Service
public class BookLoveService {

    @Autowired
    private BookLoveMapper bookLoveMapper;

    @Autowired
    private BookMapper bookMapper;


    public synchronized Map<String,String> likeBook(BookLoveEntity bookLoveEntity){
        BookLoveEntity bookLoveEntity1 = bookLoveMapper.getBookLove(bookLoveEntity);
        Map<String,String> result = new HashMap<String,String>();
        if(bookLoveEntity1 == null){
            bookLoveMapper.insertBookLoveEntity(bookLoveEntity);
            bookMapper.likeBook(bookLoveEntity.getBookId());
            result.put("result","点赞成功");
        }
        else{
            result.put("result","你已经点赞了");
        }
        return result;
    }

    public synchronized Map<String,String> unlikeBook(BookLoveEntity bookLoveEntity){
        System.out.println(bookLoveEntity.toString());
        BookLoveEntity bookLoveEntity1 = bookLoveMapper.getBookLove(bookLoveEntity);
        Map<String,String> result = new HashMap<String,String>();
        if(bookLoveEntity1 != null){
            bookLoveMapper.deleteBookLove(bookLoveEntity);
            bookMapper.unlikeBook(bookLoveEntity.getBookId());
            result.put("result","取消点赞成功");
        }
        else{
            result.put("result","你没有点赞了");
        }
        return result;
    }
}
