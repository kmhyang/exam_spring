package com.yedam.java.book.comtroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.yedam.java.book.service.BookService;
import com.yedam.java.book.service.BookVO;

@Controller
public class BookController {
	@Autowired
	BookService bookService;
	
	//전체조회 페이지
	@GetMapping("bookList")
	public String getBookList(Model model) {
		List<BookVO> list = bookService.getBookList();
		model.addAttribute("bookList", list);
		return "book/bookList";
	}
	
	//등록 페이지
	@GetMapping("bookInsert")
	public String bookInserForm(Model model) { //페이지라서 String
		int bookNo = bookService.getBookNo();
		model.addAttribute("bookNo", bookNo);
		return "book/bookInsert";
	}
	
	//등록 처리
	@PostMapping("bookInsert")
	public String bookInsert(BookVO vo) {
		bookService.insertBookInfo(vo);
		return "redirect:bookList";
	}
	
	//대여현황 페이지
	@GetMapping("rentList")
	public String getRentList(Model model) {
		model.addAttribute("rentList", bookService.getRentList());
		return "book/rentList";
	}
	
}
