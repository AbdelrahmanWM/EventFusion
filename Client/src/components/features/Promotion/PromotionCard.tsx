"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import EventPromotionImg from "../../../public/images/event-promotion.png";

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
    image: "../../public/images/event-promotion.png",
    date: "April 15, 2025",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    title: "AI Innovation Summit",
    description: "Explore AI advancements and networking opportunities.",
    image: "../../public/images/event-promotion.png",
    date: "May 22, 2025",
    location: "New York, NY",
  },
  {
    id: 3,
    title: "Startup Expo 2025",
    description: "Connect with startups and investors in an exciting event.",
    image: "../../public/images/event-promotion.png",
    date: "June 10, 2025",
    location: "Los Angeles, CA",
  },
];

const PromotionCard: React.FC<
  Promotion & {
    onDelete: (id: number) => void;
    onUpdate: (event: Promotion) => void;
  }
> = ({ id, title, description, image, date, location, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    id,
    title,
    description,
    image,
    date,
    location,
  });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(editedEvent);
    setIsEditing(false);
  };

  return (
    <Card className="transition transform hover:scale-[1.02] duration-200">
      {isEditing ? (
        <CardContent className="space-y-3">
          <Input
            name="title"
            value={editedEvent.title}
            onChange={handleEditChange}
            placeholder="Title"
          />
          <Textarea
            name="description"
            value={editedEvent.description}
            onChange={handleEditChange}
            placeholder="Description"
          />
          <Input
            name="date"
            value={editedEvent.date}
            onChange={handleEditChange}
            placeholder="Date"
          />
          <Input
            name="location"
            value={editedEvent.location}
            onChange={handleEditChange}
            placeholder="Location"
          />
          <div className="text-right">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      ) : (
        <>
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
            <Image
              src={EventPromotionImg}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </Link>

          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground">
            📅 {date} | 📍 {location}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="destructive" onClick={() => onDelete(id)}>
              Delete
            </Button>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default PromotionCard;
