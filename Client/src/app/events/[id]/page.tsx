'use client';

import Image from 'next/image';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

export default function EventOverviewPage() {
  const event = {
    title: "Stress Relief Seminar",
    date: "Friday, April 25",
    time: "10:00 AM - 1:00 PM",
    location: "Concordia University, Montreal" || "Online",
    duration: "This event lasts for 3 hours",
    description: `Join us for a seminar focused on effective stress relief techniques. This event will cover mindfulness, guided meditation, and other wellness strategies. Suitable for students and professionals alike.`,
    longDescription: `This seminar is aimed at promoting mental well-being. Mr. X, a renowned wellness coach, will share proven stress relief strategies. You'll also participate in interactive activities designed to help reduce stress and improve focus.`,
    tags: ["Wellness", "Mindfulness", "Students", "Mental Health"],
    organizers: ["Graduate Students Association (GSA)"],
    stakeholders: ["Concordia University"],
    sponsors: ["Wellness Center", "Mindful Co."]
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Event Picture */}
      <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-md">
        <Image src="/event-cover.jpg" alt="Event Cover" fill className="object-cover" />
      </div>

      {/* Date and Title */}
      <div>
        <p className="text-gray-500 text-lg">{event.date}</p>
        <h1 className="text-3xl font-bold mt-1">{event.title}</h1>
      </div>

      {/* Time Details */}
      <div className="flex items-center gap-4 text-gray-600">
        <CalendarDays className="w-5 h-5" />
        <span>{event.date}</span>
        <Clock className="w-5 h-5" />
        <span>{event.time}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="w-5 h-5" />
        <span>{event.location}</span>
      </div>

      {/* About this event short */}
      <div>
        <p className="text-gray-700 italic">{event.duration}</p>
      </div>

      {/* Long Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">About this event</h2>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{event.longDescription}</p>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-medium mb-1">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* Organizers, Stakeholders, Sponsors */}
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Organized by</h3>
          <ul className="list-disc list-inside text-gray-700">
            {event.organizers.map((org, idx) => <li key={idx}>{org}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-medium">Stakeholders</h3>
          <ul className="list-disc list-inside text-gray-700">
            {event.stakeholders.map((stk, idx) => <li key={idx}>{stk}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-medium">Sponsors</h3>
          <ul className="list-disc list-inside text-gray-700">
            {event.sponsors.map((s, idx) => <li key={idx}>{s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
