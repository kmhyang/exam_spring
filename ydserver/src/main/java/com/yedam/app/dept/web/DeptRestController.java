package com.yedam.app.dept.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yedam.app.dept.DeptVO;
import com.yedam.app.dept.mapper.DeptMapper;

@CrossOrigin
@RestController
public class DeptRestController {

	@Autowired
	DeptMapper deptMapper;
	
	@GetMapping("deptList")
	public List<DeptVO> deptList(){
		return deptMapper.selectAllDept();
	}
}
