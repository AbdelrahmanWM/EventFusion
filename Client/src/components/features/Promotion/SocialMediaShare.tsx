import React from "react";

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
  // Twitter share URL
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(eventUrl)}&via=yourTwitterHandle`;

  // Facebook share URL
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    eventUrl
  )}`;

  // LinkedIn share URL
  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    eventUrl
  )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}&source=${encodeURIComponent(eventUrl)}`;

  return (
    <div className="flex space-x-4 mt-4">
      <a
        href={twitterShare}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Share on Twitter
      </a>
      <a
        href={facebookShare}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
      >
        Share on Facebook
      </a>
      <a
        href={linkedInShare}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
      >
        Share on LinkedIn
      </a>
    </div>
  );
};

export default SocialMediaShare;
