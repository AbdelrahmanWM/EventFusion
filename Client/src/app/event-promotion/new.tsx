"use client";

import React from "react";
import Link from "next/link";
import PromotionForm from "@/components/features/Promotion/PromotionForm";

const NewPromotionPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create a New Promotion</h1>
      <PromotionForm />

      {/* Footer */}
      <footer className="w-full border-t py-6 mt-auto">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Smart Education Events System (SEES) -
            SOEN343. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewPromotionPage;
