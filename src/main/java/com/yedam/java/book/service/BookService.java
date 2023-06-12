package com.yedam.java.book.service;

import java.util.List;

public interface BookService {
	public List<BookVO> getBookList();
	public int getBookNo();
	public int insertBookInfo(BookVO vo);
}
