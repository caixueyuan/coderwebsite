package com.caixueyuan.entity;

/**
 * Created by 25299 on 2018/4/29.
 */
public class BookLoveEntity {
    private Integer bookLoveId;
    private Integer userId;
    private Integer bookId;

    public BookLoveEntity(Integer bookLoveId, Integer userId, Integer bookId) {
        this.bookLoveId = bookLoveId;
        this.userId = userId;
        this.bookId = bookId;
    }

    @Override
    public String toString() {
        return "BookLoveEntity{" +
                "bookLoveId=" + bookLoveId +
                ", userId=" + userId +
                ", bookId=" + bookId +
                '}';
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public BookLoveEntity(){
        super();
    }
    public Integer getBookLoveId() {
        return bookLoveId;
    }

    public void setBookLoveId(Integer bookLoveId) {
        this.bookLoveId = bookLoveId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookLoveEntity bookLove = (BookLoveEntity) o;

        if (bookLoveId != null ? !bookLoveId.equals(bookLove.bookLoveId) : bookLove.bookLoveId != null) return false;
        if (userId != null ? !userId.equals(bookLove.userId) : bookLove.userId != null) return false;
        return bookId != null ? bookId.equals(bookLove.bookId) : bookLove.bookId == null;
    }

    @Override
    public int hashCode() {
        int result = bookLoveId != null ? bookLoveId.hashCode() : 0;
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (bookId != null ? bookId.hashCode() : 0);
        return result;
    }
}
