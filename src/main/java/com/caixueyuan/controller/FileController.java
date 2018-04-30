package com.caixueyuan.controller;

import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * Created by 25299 on 2018/4/29.
 */

@RestController
public class FileController {

    private static final String separator = File.separator;

    @RequestMapping(value = "upload1",method = RequestMethod.POST)
    public boolean upLoad(MultipartFile file) throws FileNotFoundException{

        String fileAddress = ResourceUtils.getURL("classpath:").getPath()
                +separator+"static"+separator+"images"+separator+"books";
        File savefile = new File(fileAddress,file.getOriginalFilename());
        System.out.println(savefile.getAbsoluteFile());
        try {
            file.transferTo(savefile);//将文件保存E盘下
        } catch (IOException e) {
            return false;
        }
        return true;
    }


}
