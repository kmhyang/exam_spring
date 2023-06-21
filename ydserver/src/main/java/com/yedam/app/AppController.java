package com.yedam.app;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class AppController {
	
	@GetMapping("emp")
	public String empPage() {
		return "index";
	}
}
