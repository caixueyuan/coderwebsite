package com.caixueyuan.controller;

import com.caixueyuan.entity.BookLoveEntity;
import com.caixueyuan.security.JwtUser;
import com.caixueyuan.service.BookLoveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Created by 25299 on 2018/4/30.
 */

@RestController
public class BookLoveController {

    @Autowired
    private BookLoveService bookLoveService;


    @RequestMapping(value ="likeBook",method = RequestMethod.POST)
    public Map<String,String> likeBook(@RequestBody Map<String,String> request){
        String string_id = request.get("bookid");
        Integer bookId = Integer.parseInt(string_id);
        JwtUser user =(JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        BookLoveEntity bookLoveEntity = new BookLoveEntity();
        bookLoveEntity.setBookId(bookId);
        bookLoveEntity.setUserId(user.getId());
        Map<String,String> result = bookLoveService.likeBook(bookLoveEntity);
        return result;
    }


    @RequestMapping(value ="unlikeBook",method = RequestMethod.POST)
    public Map<String,String> unlikeBook(@RequestBody Map<String,String> request){
        String temp_id = request.get("bookid");
        Integer bookId = Integer.parseInt(temp_id);
        JwtUser user =(JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        BookLoveEntity bookLoveEntity = new BookLoveEntity();
        bookLoveEntity.setBookId(bookId);
        bookLoveEntity.setUserId(user.getId());
        Map<String,String> result = bookLoveService.unlikeBook(bookLoveEntity);
        return result;
    }
}
