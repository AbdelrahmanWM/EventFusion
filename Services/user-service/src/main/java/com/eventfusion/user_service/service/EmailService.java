package com.eventfusion.user_service.service;

import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.mail.MailException;
import java.io.IOException;
import java.util.List;

@Service
public class EmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    // SendGrid email sender object
    private final SendGrid sendGrid;

    public EmailService() {
        this.sendGrid = new SendGrid(sendGridApiKey);
    }

    // Send an email based on the template and recipient list
    public void sendEmail(String subject, String content, List<String> recipients) throws MailException, IOException {
        for (String recipient : recipients) {
            sendSingleEmail(subject, content, recipient);
        }
    }

    // Send email to a single recipient
    private void sendSingleEmail(String subject, String content, String recipient) throws MailException, IOException {
        Email from = new Email("your-email@example.com"); // Verified sender email in SendGrid
        Email to = new Email(recipient);
        Content emailContent = new Content("text/html", content);
        Mail mail = new Mail(from, subject, to, emailContent);

        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());

        // Send the email
        Response response = sendGrid.api(request);
        System.out.println("Email sent to " + recipient + ". Response: " + response.getStatusCode());
    }
}
