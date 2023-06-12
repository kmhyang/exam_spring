package com.yedam.java.book.mapper;

import java.util.List;

import com.yedam.java.book.service.BookVO;

public interface BookMapper {
	//전체조회
	public List<BookVO> selectBookList();
	
	//단건조회 - 도서번호 예측
	public int getBookNo();
	
	//등록
	public int insertBookInfo(BookVO vo);
}
