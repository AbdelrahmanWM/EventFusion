// EventPromotionPage.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import PromotionList from "../components/PromotionList";
import PromotionForm from "../components/PromotionForm";
import EmailCampaignForm from "../components/EmailCampaignForm";

import { Promotion, mockPromotions } from "../components/PromotionCard";

const EventPromotionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"promotions" | "emailCampaigns">("promotions");
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);

  const handleAddPromotion = (newPromotion: Omit<Promotion, "id" | "image">) => {
    const placeholderImages = [
      "/images/tech-conference.jpg",
      "/images/ai-summit.jpg",
      "/images/startup-expo.jpg",
    ];
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    const enrichedPromotion = { ...newPromotion, id: Date.now(), image: randomImage };
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

        <div className="flex space-x-4 border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === "promotions" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
            onClick={() => setActiveTab("promotions")}
          >
            Event Details
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "emailCampaigns" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
            onClick={() => setActiveTab("emailCampaigns")}
          >
            Email Campaigns
          </button>
        </div>


        {activeTab === "promotions" ? (
          <>
            <PromotionList promotions={promotions} setPromotions={setPromotions} />
            <PromotionForm onAddPromotion={handleAddPromotion} />
          </>
        ) : (
          <EmailCampaignForm 
            onSubmitCampaign={handleEmailCampaignSubmit} 
            emailLogs={emailLogs} 
            setEmailLogs={setEmailLogs} 
          />
        )}
      </div>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0 mt-auto">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Smart Education Events System (SEES) - SOEN343. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">Terms</Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">Privacy</Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventPromotionPage;
