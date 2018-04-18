package com.caixueyuan.Utils;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created by 25299 on 2018/4/17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class MailApplicationTests {

        /*@Autowired
        private MailUtil mailUtil;

        @Test
        public void sendSimpleEmail() {
            String deliver = "xxx@163.com";
            String[] receiver = {"xxx@gmail.com"};
            String[] carbonCopy = {"xxx@qq.com"};
            String subject = "This is a simple email";
            String content = "This is a simple content";

            try {
                mailUtil.sendSimpleEmail(deliver, receiver, carbonCopy, subject, content);
            } catch (Exception e) {
                assertFalse("Send simple email failed", true);
                e.printStackTrace();
            }
        }

        @Test
        public void sendHtmlMail(){
            String deliver = "xxx@163.com";
            String[] receiver = {"xxx@gmail.com"};
            String[] carbonCopy = {"xxx@qq.com"};
            String subject = "退信代码说明";
            String content = "<h1>org.springframework.mail.MailSendException: Failed messages: " +
                    "com.sun.mail.smtp.SMTPSendFailedException: 554 DT:SPM 163 smtp9,DcCowAAXf2r4c8da2cPWBQ--." +
                    "33626S3 1523020853,please see " +
                    "http://mail.163.com/help/help_spam_16.htm?ip=43.243.148.212&hostid=smtp9&time=1523020853</h1>";
            boolean isHtml = true;

            mailUtil.sendHtmlEmail(deliver, receiver, carbonCopy, subject, content, isHtml);
        }

        @Test
        public void sendAttachmentFileEmail() {
            String FILE_PATH = "/Users/mengday/Desktop/02.png";
            String deliver = "xxx@163.com";
            String[] receiver = {"xxx@gmail.com"};
            String[] carbonCopy = {"xxx@qq.com"};
            String subject = "退信代码说明";
            String content = "<h1>org.springframework.mail.MailSendException: Failed messages: " +
                    "com.sun.mail.smtp.SMTPSendFailedException: 554 DT:SPM 163 smtp9,DcCowAAXf2r4c8da2cPWBQ--." +
                    "33626S3 1523020853,please see " +
                    "http://mail.163.com/help/help_spam_16.htm?ip=43.243.148.212&hostid=smtp9&time=1523020853</h1>";
            boolean isHtml = true;

            File file = new File(FILE_PATH);
            String fileName = FILE_PATH.substring(FILE_PATH.lastIndexOf(File.separator));

            try {
                mailUtil.sendAttachmentFileEmail(deliver, receiver, carbonCopy, subject, content, isHtml, fileName, file);
            } catch (Exception e) {
                e.printStackTrace();
                assertFalse("Send attachment file email failed", true);
            }
        }
*/

/*        @Test
        public void sendTemplateEmail() {
            String deliver = "xxx@163.com";
            String[] receiver = {"xxx@gmail.com"};
            String[] carbonCopy = {"xxx@qq.com"};
            String subject = "DT:SPM 发送的邮件内容包含了未被许可的信息，或被系统识别为垃圾邮件。请检查是否有用户发送病毒或者垃圾邮件";
            String template = "mailTemplate";
            String content = "554 DT:SPM 发送的邮件内容包含了未被许可的信息，或被系统识别为垃圾邮件。请检查是否有用户发送病毒或者垃圾邮件";

            Context context = new Context();
            context.setVariable("content", content);

            try {
                mailUtil.sendTemplateEmail(deliver, receiver, carbonCopy, subject, template, context);
            } catch (Exception e) {
                e.printStackTrace();
                assertFalse("Send template email failed", true);
            }
        }*/

}
