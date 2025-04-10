"use client";

import React from "react";
import PromotionCard, { Promotion } from "./PromotionCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PromotionListProps {
  promotions: Promotion[]; 
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
}

const PromotionList: React.FC<PromotionListProps> = ({
  promotions,
  setPromotions,
}) => {
  const handleDelete = (id: number) => {
    setPromotions((prev) => prev.filter((promotion) => promotion.id !== id));
  };

  const handleUpdate = (updatedPromotion: Promotion) => {
    setPromotions((prev) =>
      prev.map((promotion) =>
        promotion.id === updatedPromotion.id ? updatedPromotion : promotion
      )
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">🌟 Upcoming Events 🌟</CardTitle>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default PromotionList;
