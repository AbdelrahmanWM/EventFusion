// EventPromotionPage.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import PromotionList from "../../components/features/Promotion/PromotionList";
import PromotionForm from "../../components/features/Promotion/PromotionForm";
import EmailCampaignForm from "../../components/features/Promotion/EmailCampaignForm";

import {
  Promotion,
  mockPromotions,
} from "../../components/features/Promotion/PromotionCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const EventPromotionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"promotions" | "emailCampaigns">(
    "promotions"
  );
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);

  const handleAddPromotion = (
    newPromotion: Omit<Promotion, "id" | "image">
  ) => {
    const placeholderImages = [
      "/images/tech-conference.jpg",
      "/images/ai-summit.jpg",
      "/images/startup-expo.jpg",
    ];
    const randomImage =
      placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    const enrichedPromotion = {
      ...newPromotion,
      id: Date.now(),
      image: randomImage,
    };
    setPromotions((prev) => [...prev, enrichedPromotion]);
    alert("Event added successfully!");
  };

  const handleEmailCampaignSubmit = (campaignData: any) => {
    const newLog = {
      id: Date.now(),
      subject: campaignData.subject,
      status: "Sent",
      sentAt: new Date().toLocaleString(),
      recipients: campaignData.recipients,
    };
    setEmailLogs((prev) => [...prev, newLog]);
    alert("Email campaign scheduled (mocked) successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Event Promotions</h1>

        <Tabs defaultValue="promotions" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="promotions">Event Details</TabsTrigger>
            <TabsTrigger value="emailCampaigns">Email Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="promotions">
            <Card className="p-4 space-y-6">
              <PromotionList
                promotions={promotions}
                setPromotions={setPromotions}
              />
              <PromotionForm onAddPromotion={handleAddPromotion} />
            </Card>
          </TabsContent>

          <TabsContent value="emailCampaigns">
            <Card className="p-4">
              <EmailCampaignForm
                onSubmitCampaign={handleEmailCampaignSubmit}
                emailLogs={emailLogs}
                setEmailLogs={setEmailLogs}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventPromotionPage;
