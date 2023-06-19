package com.yedam.app.emp.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yedam.app.emp.mapper.EmpMapper;
import com.yedam.app.emp.service.EmpVO;

@CrossOrigin
@RestController
public class EmpRestController {

	@Autowired
	EmpMapper empMapper;
	
	//전체조회 - 검색조건 : 부서번호
	@GetMapping("empList")
	public List<EmpVO> empList(EmpVO empVO){
		return empMapper.selectEmpAll(empVO);
	}
	
	//단건조회
	@GetMapping("empInfo")
	public EmpVO empInfo(EmpVO empVO) {
		return empMapper.selectEmpInfo(empVO);
	}
	
	//등록
	@PostMapping("empInsert")
	public EmpVO empInsert(@RequestBody EmpVO empVO) {
		empMapper.insertEmpInfo(empVO);
		return empVO;
	}
	
	//수정
	@PostMapping("empUpdate")
	public EmpVO empUpdate(@RequestBody EmpVO empVO) {
		empMapper.updateEmpInfo(empVO);
		return empVO;
	}
	
	//단건 삭제
	@GetMapping("empDelete")
	public EmpVO empDelete(EmpVO empVO) {
		empMapper.deleteEmpInfo(empVO);
		return empVO;
	}
	
	//다건 삭제
	@PostMapping("empDelete")
	public List<String> empsDelete(@RequestBody List<EmpVO> empList){
		List<String> delList = new ArrayList<>();
		
		for(EmpVO empVO : empList) {
			int result = empMapper.deleteEmpInfo(empVO);
			if(result > 0) {
				delList.add(empVO.getEmployeeId());
			}
		}
		
		return delList;
	}
}
