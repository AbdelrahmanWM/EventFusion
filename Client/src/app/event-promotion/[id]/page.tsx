"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import SocialMediaShare from "@/components/features/Promotion/SocialMediaShare";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EventDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [promotion, setPromotion] = useState<any>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const eventData = {
      title: searchParams.get("title"),
      description: searchParams.get("description"),
      image: searchParams.get("image"),
      date: searchParams.get("date"),
      location: searchParams.get("location"),
    };
    setPromotion(eventData);
  }, [searchParams]);

  const handleRegisterAttendee = () => {
    const newAttendee = { name, email };
    setAttendees([...attendees, newAttendee]);
    setName('');
    setEmail('');
  };

  if (!promotion || !promotion.title) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-xl font-bold">Event not found</h2>
        <p className="text-gray-600">Sorry, we couldn't find the event you're looking for.</p>
        <br />
        <Link href="/event-promotion" className="inline-block bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition">
          ⬅ Go Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="p-4">
        <img src={promotion.image} alt={promotion.title} className="w-full h-72 object-cover rounded-md mb-4" />
        <h1 className="text-4xl font-bold mb-2">{promotion.title}</h1>
        <p className="text-lg text-muted-foreground mb-2">{promotion.description}</p>
        <p className="text-sm text-muted-foreground">📅 {promotion.date} | 📍 {promotion.location}</p>
      </Card>

      <Card className="p-4">
        <SocialMediaShare
          title={promotion.title}
          description={promotion.description}
          imageUrl={promotion.image}
          eventUrl={typeof window !== "undefined" ? window.location.href : ""}
        />
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-bold mb-2">Attendees ({attendees.length})</h3>
        <ul className="mb-4">
          {attendees.map((attendee, index) => (
            <li key={index} className="text-muted-foreground">
              {attendee.name} ({attendee.email})
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Register New Attendee</h3>
        <div className="grid gap-2 mb-2">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button onClick={handleRegisterAttendee} className="w-full">Register</Button>
      </Card>
    </div>
  );
};

export default EventDetailPage;
