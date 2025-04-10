"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useServicesClient } from "@/hooks/userServicesClient";
export enum EventType {
  Conference = "Conference",
  Workshop = "Workshop",
  Seminar = "Seminar",
  Webinar = "Webinar"
}

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: EventType;
  tags: string[];
};

export default function EventsPage() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const servicesClient = useServicesClient()

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await servicesClient.getEvents();
      if (!response) throw new Error("Failed to fetch");

      const data = response.data;
      setEvents(data);
      setFilteredEvents(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterEvents(query, activeTypes);
  };

  const handleTypeToggle = (type: EventType) => {
    const updated = activeTypes.includes(type)
      ? activeTypes.filter((t) => t !== type)
      : [...activeTypes, type];
    setActiveTypes(updated);
    filterEvents(searchQuery, updated);
  };

  const filterEvents = (query: string, types: EventType[]) => {
    const filtered = events.filter((event) => {
      const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase());
      const matchesType = types.length === 0 || types.includes(event.type);
      return matchesQuery && matchesType;
    });
    setFilteredEvents(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Upcoming Events</h1>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search events by title..."
        className="w-full p-2 border rounded-md"
      />

      {/* Type Filters */}
      <div className="space-x-2 mt-4">
        {Object.values(EventType).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            className={`px-4 py-2 rounded ${
              activeTypes.includes(type)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Events Display */}
      <div className="mt-6">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="p-4 border rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <p className="text-sm text-gray-500">📍 {event.location}</p>
                  <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">🏷 Type: {event.type}</p>
                </div>
                <button
                  onClick={() => router.push(`/events/${event._id}`)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Event CTA */}
      <div className="text-right mt-8">
        <button
          onClick={() => router.push("/events/create")}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          + Create a New Event
        </button>
      </div>
    </div>
  );
}
