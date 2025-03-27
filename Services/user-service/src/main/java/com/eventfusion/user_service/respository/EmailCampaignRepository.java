package com.eventfusion.user_service.respository;

import com.eventfusion.user_service.model.EmailCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailCampaignRepository extends JpaRepository<EmailCampaign, Long> {
    List<EmailCampaign> findByScheduledTimeBefore(LocalDateTime time);
}
