"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    category: "Conference", // Default category
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.name || !eventData.description || !eventData.date || !eventData.location) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Send event data to the API endpoint to create the event
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        // Redirect to the newly created event page after submission
        const result = await response.json();
        router.push(`/event/${result.id}`);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Something went wrong!");
      }
    } catch (error) {
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            placeholder="Event Name"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="border p-2 w-full"
            placeholder="Describe your event"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            className="border p-2 w-full"
            placeholder="Event Location"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={eventData.category}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="Conference">Conference</option>
            <option value="Webinar">Webinar</option>
            <option value="Workshop">Workshop</option>
            <option value="Meetup">Meetup</option>
            <option value="Seminar">Seminar</option>
          </select>
        </div>

        <div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Create Event</button>
        </div>
      </form>
    </div>
  );
}
