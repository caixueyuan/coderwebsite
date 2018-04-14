package com.caixueyuan;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 25299 on 2018/4/11.
 */

@RestController
public class HelloController
{
    @RequestMapping("/hello")
    public String say(){
        return "Hello world";
    }
}
