"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
}

export const mockPromotions: Promotion[] = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "Join industry leaders to discuss the future of technology.",
    image: "/images/tech-conference.jpg",
    date: "April 15, 2025",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    title: "AI Innovation Summit",
    description: "Explore AI advancements and networking opportunities.",
    image: "/images/ai-summit.jpg",
    date: "May 22, 2025",
    location: "New York, NY",
  },
  {
    id: 3,
    title: "Startup Expo 2025",
    description: "Connect with startups and investors in an exciting event.",
    image: "/images/startup-expo.jpg",
    date: "June 10, 2025",
    location: "Los Angeles, CA",
  },
];

const PromotionCard: React.FC<Promotion & { onDelete: (id: number) => void; onUpdate: (event: Promotion) => void }> = ({
  id,
  title,
  description,
  image,
  date,
  location,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ id, title, description, image, date, location });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(editedEvent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 p-4">
      {isEditing ? (
        <div className="space-y-2">
          <input className="w-full border p-2" name="title" value={editedEvent.title} onChange={handleEditChange} />
          <textarea className="w-full border p-2" name="description" value={editedEvent.description} onChange={handleEditChange} />
          <input className="w-full border p-2" name="date" value={editedEvent.date} onChange={handleEditChange} />
          <input className="w-full border p-2" name="location" value={editedEvent.location} onChange={handleEditChange} />
          <button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
          {/* ✅ Only wrap this clickable part inside <Link> */}
          <Link
                href={{
                  pathname: `/event-promotion/${id}`,
                  query: {
                    title,
                    description,
                    image,
                    date,
                    location,
                  },
                }}
              >
                <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                  <p className="text-gray-600">{description}</p>
                  <p className="text-sm text-gray-500 mt-2">📅 {date} | 📍 {location}</p>
                </div>
              </Link>


          {/* ❌ Do NOT wrap these in <Link> */}
          <div className="mt-4 flex gap-2 px-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PromotionCard;
