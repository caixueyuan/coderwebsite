package com.caixueyuan.entity;

import java.util.List;

/**
 * Created by 25299 on 2018/4/29.
 */
public class BookEntity {
    private Integer bookid;
    private String bookTitle;
    private String bookContent;
    private CategoryLanguage categoryLanguage;
    private List<BookPictureEntity> bookPictureEntities;
    private Integer bookLoveCount;

    @Override
    public String toString() {
        return "BookEntity{" +
                "bookid=" + bookid +
                ", bookTitle='" + bookTitle + '\'' +
                ", bookContent='" + bookContent + '\'' +
                ", categoryLanguage=" + categoryLanguage +
                ", bookPictureEntities=" + bookPictureEntities +
                ", bookLoveCount=" + bookLoveCount +
                '}';
    }

    public Integer getBookid() {
        return bookid;
    }
    public BookEntity(){
        super();
    }
    public BookEntity(Integer bookid, String bookTitle, String bookContent, CategoryLanguage categoryLanguage, List<BookPictureEntity> bookPictureEntities, Integer bookLoveCount) {
        this.bookid = bookid;
        this.bookTitle = bookTitle;
        this.bookContent = bookContent;
        this.categoryLanguage = categoryLanguage;
        this.bookPictureEntities = bookPictureEntities;
        this.bookLoveCount = bookLoveCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookEntity that = (BookEntity) o;

        if (bookid != null ? !bookid.equals(that.bookid) : that.bookid != null) return false;
        if (bookTitle != null ? !bookTitle.equals(that.bookTitle) : that.bookTitle != null) return false;
        if (bookContent != null ? !bookContent.equals(that.bookContent) : that.bookContent != null) return false;
        if (categoryLanguage != null ? !categoryLanguage.equals(that.categoryLanguage) : that.categoryLanguage != null)
            return false;
        if (bookPictureEntities != null ? !bookPictureEntities.equals(that.bookPictureEntities) : that.bookPictureEntities != null)
            return false;
        return bookLoveCount != null ? bookLoveCount.equals(that.bookLoveCount) : that.bookLoveCount == null;
    }

    @Override
    public int hashCode() {
        int result = bookid != null ? bookid.hashCode() : 0;
        result = 31 * result + (bookTitle != null ? bookTitle.hashCode() : 0);
        result = 31 * result + (bookContent != null ? bookContent.hashCode() : 0);
        result = 31 * result + (categoryLanguage != null ? categoryLanguage.hashCode() : 0);
        result = 31 * result + (bookPictureEntities != null ? bookPictureEntities.hashCode() : 0);
        result = 31 * result + (bookLoveCount != null ? bookLoveCount.hashCode() : 0);
        return result;
    }

    public void setBookid(Integer bookid) {
        this.bookid = bookid;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookContent() {
        return bookContent;
    }

    public void setBookContent(String bookContent) {
        this.bookContent = bookContent;
    }

    public CategoryLanguage getCategoryLanguage() {
        return categoryLanguage;
    }

    public void setCategoryLanguage(CategoryLanguage categoryLanguage) {
        this.categoryLanguage = categoryLanguage;
    }

    public List<BookPictureEntity> getBookPictureEntities() {
        return bookPictureEntities;
    }

    public void setBookPictureEntities(List<BookPictureEntity> bookPictureEntities) {
        this.bookPictureEntities = bookPictureEntities;
    }


    public Integer getBookLoveCount() {
        return bookLoveCount;
    }

    public void setBookLoveCount(Integer bookLoveCount) {
        this.bookLoveCount = bookLoveCount;
    }
}
