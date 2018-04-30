package com.caixueyuan.entity;

/**
 * Created by 25299 on 2018/4/29.
 */
public class BookPictureEntity {

    private Integer bookPictureId;
    private Integer bookId;
    private String bookAddress;

    public BookPictureEntity(Integer bookPictureId, Integer bookId, String bookAddress) {
        this.bookPictureId = bookPictureId;
        this.bookId = bookId;
        this.bookAddress = bookAddress;
    }

    public BookPictureEntity(){

    }
    public Integer getBookPictureId() {
        return bookPictureId;
    }

    public void setBookPictureId(Integer bookPictureId) {
        this.bookPictureId = bookPictureId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getBookAddress() {
        return bookAddress;
    }

    public void setBookAddress(String bookAddress) {
        this.bookAddress = bookAddress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookPictureEntity that = (BookPictureEntity) o;

        if (bookPictureId != null ? !bookPictureId.equals(that.bookPictureId) : that.bookPictureId != null)
            return false;
        if (bookId != null ? !bookId.equals(that.bookId) : that.bookId != null) return false;
        return bookAddress != null ? bookAddress.equals(that.bookAddress) : that.bookAddress == null;
    }

    @Override
    public int hashCode() {
        int result = bookPictureId != null ? bookPictureId.hashCode() : 0;
        result = 31 * result + (bookId != null ? bookId.hashCode() : 0);
        result = 31 * result + (bookAddress != null ? bookAddress.hashCode() : 0);
        return result;
    }



}
