package com.caixueyuan.controller;

import com.caixueyuan.entity.BookEntity;
import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by 25299 on 2018/4/29.
 */

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/booklist",method = RequestMethod.POST)
    public List<BookEntity> getBooks(@RequestBody CategoryLanguage categoryLanguage){
        System.out.println("in the BooController");
        System.out.println(categoryLanguage.toString());
        List<BookEntity> bookEntities = bookService.getBooks(categoryLanguage);
        return bookEntities;
    }

    @RequestMapping(value = "addBook",method = RequestMethod.POST)
    public List<BookEntity> addBook(@RequestBody BookEntity bookEntity){
        System.out.println("in the addBook");
        System.out.println(bookEntity.toString());

        List<BookEntity> bookEntities = bookService.addBook(bookEntity);
        return bookEntities;
        //先插入books,再插入bookPicture，然后根据category来获取列表
    }


    @RequestMapping(value = "bookdetail",method = RequestMethod.POST)
    public BookEntity viewBookDetail(@RequestBody Map<String,Object> request){
        String temp = (String)request.get("bookid");
        Integer bookid = Integer.parseInt(temp);
        BookEntity bookEntity = bookService.getBook(bookid);
        return bookEntity;
    }

}
