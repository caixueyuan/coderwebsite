package com.caixueyuan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.caixueyuan.mapper")
@ComponentScan("com.caixueyuan.Utils")
@ComponentScan("com.caixueyuan.service")
public class CoderwebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoderwebsiteApplication.class, args);
	}
}
