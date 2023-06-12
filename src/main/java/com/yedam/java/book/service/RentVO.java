package com.yedam.java.book.service;

import lombok.Data;

@Data
public class RentVO {
	private int bookNo;
	private String bookName;
	private int rentTotalPrice;
	private int rentCount;

	
}
