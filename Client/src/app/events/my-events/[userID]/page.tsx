"use client";

import { useState } from "react";

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState("attending");
  
  const eventsData = {
    attending: [
      { id: 1, name: "Tech Conference 2025", date: "May 15, 2025", location: "Online", role: "Attendee" },
      { id: 2, name: "Product Launch", date: "June 10, 2025", location: "New York, NY", role: "Attendee" },
    ],
    organizing: [
      { id: 3, name: "AI Developer Meetup", date: "July 25, 2025", location: "Los Angeles, CA", role: "Organizer" },
    ],
    speaking: [
      { id: 4, name: "Tech Talk Series", date: "August 5, 2025", location: "San Francisco, CA", role: "Speaker" },
    ]
  };

  const renderEventsList = (events) => {
    if (events.length === 0) {
      return <p className="text-gray-500">You have no events in this category.</p>;
    }

    return (
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="border p-4 rounded">
            <p className="font-semibold text-lg">{event.name}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
            <p className="text-sm text-gray-500">{event.location}</p>
            <p className="text-sm text-blue-600">{event.role}</p>
            <a href={`/event/${event.id}`} className="text-blue-600 hover:underline">View Event</a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>
      <div className="flex gap-4 border-b mb-4">
        <button
          onClick={() => setActiveTab("attending")}
          className={`py-2 px-4 border-b-2 ${activeTab === "attending" ? "border-blue-600 text-blue-600" : "border-transparent"}`}
        >
          Attending
        </button>
        <button
          onClick={() => setActiveTab("organizing")}
          className={`py-2 px-4 border-b-2 ${activeTab === "organizing" ? "border-blue-600 text-blue-600" : "border-transparent"}`}
        >
          Organizing
        </button>
        <button
          onClick={() => setActiveTab("speaking")}
          className={`py-2 px-4 border-b-2 ${activeTab === "speaking" ? "border-blue-600 text-blue-600" : "border-transparent"}`}
        >
          Speaking
        </button>
      </div>

      {activeTab === "attending" && renderEventsList(eventsData.attending)}
      {activeTab === "organizing" && renderEventsList(eventsData.organizing)}
      {activeTab === "speaking" && renderEventsList(eventsData.speaking)}
    </div>
  );
}
