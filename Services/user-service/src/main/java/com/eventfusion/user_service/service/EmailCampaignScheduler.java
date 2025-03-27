package com.eventfusion.user_service.service;

import com.eventfusion.user_service.model.EmailCampaign;
import com.eventfusion.user_service.repository.EmailCampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmailCampaignScheduler {

    @Autowired
    private EmailCampaignRepository emailCampaignRepository;

    @Autowired
    private EmailService emailService;

    // Run this every minute to check if any campaigns need to be sent
    @Scheduled(cron = "0 * * * * ?")
    public void sendScheduledCampaigns() {
        List<EmailCampaign> campaigns = emailCampaignRepository.findByScheduledTimeBefore(LocalDateTime.now());

        for (EmailCampaign campaign : campaigns) {
            try {
                // Send the campaign email
                emailService.sendEmail(campaign.getSubject(), campaign.getContent(), campaign.getRecipients());
                System.out.println("Campaign sent: " + campaign.getSubject());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
