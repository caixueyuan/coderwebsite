package com.caixueyuan.Utils;

import org.springframework.stereotype.Service;

import java.util.Random;

/**
 * Created by 25299 on 2018/4/18.
 */

@Service
public class RandomUtil {
    /** 产生一个随机的字符串*/
    public static String RandomString(int length) {
        String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuffer buf = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int num = random.nextInt(62);
            buf.append(str.charAt(num));
        }
        return buf.toString();
    }
}
