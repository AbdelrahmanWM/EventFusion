"use client";

import React, { useState } from "react";
import PromotionCard, { Promotion, mockPromotions } from "./PromotionCard";
import Link from "next/link"; // Import Link from Next.js

const PromotionList: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);

  // Function to delete an event
  const handleDelete = (id: number) => {
    setPromotions((prev) => prev.filter((promotion) => promotion.id !== id));
  };

  // Function to update an event
  const handleUpdate = (updatedPromotion: Promotion) => {
    setPromotions((prev) =>
      prev.map((promotion) =>
        promotion.id === updatedPromotion.id ? updatedPromotion : promotion
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🌟 Upcoming Events 🌟
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            {...promotion}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionList;
