// /app/events/page.tsx or /pages/events.tsx for Next.js

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const router = useRouter();
  
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events from your API or data source
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);  // Store all events
      setFilteredEvents(data);  // Set initial filtered events to all events
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterEvents(e.target.value, tags);
  };

  // Handle filter changes
  const handleTagChange = (tag) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)  // Remove tag if already in the list
      : [...tags, tag];  // Add tag if not in the list

    setTags(updatedTags);
    filterEvents(searchQuery, updatedTags); // Re-filter events based on updated tags
  };

  // Function to filter events based on search query and selected tags
  const filterEvents = (query, selectedTags) => {
    let filtered = events.filter((event) => {
      const matchesQuery = event.name.toLowerCase().includes(query.toLowerCase()) || 
                           event.description.toLowerCase().includes(query.toLowerCase());
      const matchesTags = selectedTags.every(tag => event.tags.includes(tag));

      return matchesQuery && matchesTags;
    });

    setFilteredEvents(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search events..."
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Tags/Filters */}
      <div className="mb-6">
        <h2 className="text-xl font-medium">Filters</h2>
        <div className="space-x-2">
          {/* Assuming you have predefined tags */}
          {['Conference', 'Webinar', 'Workshop', 'Meetup'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-4 py-2 rounded ${tags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="border p-4 rounded-md">
                <h3 className="text-2xl font-semibold">{event.name}</h3>
                <p>{event.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Date: {new Date(event.date).toLocaleString()}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Location: {event.location}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => router.push(`/event/${event.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View Event Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}

      {/* Create Event Button */}
      <div className="mt-8">
        <button
          onClick={() => router.push("/create-event")}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Create a New Event
        </button>
      </div>
    </div>
  );
}
