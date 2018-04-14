package com.caixueyuan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.caixueyuan.mapper")
public class CoderwebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoderwebsiteApplication.class, args);
	}
}
