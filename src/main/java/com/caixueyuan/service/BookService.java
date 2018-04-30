package com.caixueyuan.service;

import com.caixueyuan.entity.BookEntity;
import com.caixueyuan.entity.BookLoveEntity;
import com.caixueyuan.entity.BookPictureEntity;
import com.caixueyuan.entity.CategoryLanguage;
import com.caixueyuan.mapper.BookMapper;
import com.caixueyuan.mapper.BookPictureMapper;
import org.apache.ibatis.annotations.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 25299 on 2018/4/29.
 */

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    private BookPictureMapper bookPictureMapper;

    public List<BookEntity> getBooks(CategoryLanguage categoryLanguage){
        List<BookEntity> bookEntities = bookMapper.getBooksByCategory(categoryLanguage);
        return bookEntities;
    }

    public BookEntity getBook(Integer bookid){
        BookEntity bookEntity = bookMapper.getOne(bookid);
        return bookEntity;
    }


    public synchronized List<BookEntity> addBook(BookEntity bookEntity){
        bookMapper.insertBook(bookEntity);
        List<BookPictureEntity> bookPictureEntities = bookEntity.getBookPictureEntities();
        for(BookPictureEntity bookPictureEntity:bookPictureEntities){
            bookPictureEntity.setBookId(bookEntity.getBookid());
        }
        bookPictureMapper.batchInsertBookPicture(bookPictureEntities);
        List<BookEntity> bookEntities = bookMapper.getBooksByCategory(bookEntity.getCategoryLanguage());
        return bookEntities;
    }
}
