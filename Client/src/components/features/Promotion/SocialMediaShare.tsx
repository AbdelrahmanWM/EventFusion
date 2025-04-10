"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface SocialMediaShareProps {
  title: string;
  description: string;
  imageUrl: string;
  eventUrl: string;
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({
  title,
  description,
  imageUrl,
  eventUrl,
}) => {
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(eventUrl)}&via=yourTwitterHandle`;

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    eventUrl
  )}`;

  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    eventUrl
  )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}&source=${encodeURIComponent(eventUrl)}`;

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <a href={twitterShare} target="_blank" rel="noopener noreferrer">
        <Button variant="default" className="bg-[#1DA1F2] hover:bg-[#1A91DA]">
          Share on Twitter
        </Button>
      </a>
      <a href={facebookShare} target="_blank" rel="noopener noreferrer">
        <Button variant="default" className="bg-[#1877F2] hover:bg-[#145DBF]">
          Share on Facebook
        </Button>
      </a>
      <a href={linkedInShare} target="_blank" rel="noopener noreferrer">
        <Button variant="default" className="bg-[#0A66C2] hover:bg-[#084B9E]">
          Share on LinkedIn
        </Button>
      </a>
    </div>
  );
};

export default SocialMediaShare;
