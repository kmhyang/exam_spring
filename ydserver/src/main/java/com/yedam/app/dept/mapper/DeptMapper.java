package com.yedam.app.dept.mapper;

import java.util.List;

import com.yedam.app.dept.DeptVO;

public interface DeptMapper {
	//전체조회
	public List<DeptVO> selectAllDept();
}
