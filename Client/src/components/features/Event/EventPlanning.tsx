"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { Calendar } from "@/components/ui/calendar";
import { Event } from "../../../app/types/event";

export default function EventPlanning() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`/api/events/${eventId}`, {
          method: "DELETE",
        });
        setEvents(events.filter((event) => event.id !== eventId));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleSaveEvent = (newEvent: Event) => {
    if (editingEvent) {
      setEvents(
        events.map((event) => (event.id === newEvent.id ? newEvent : event))
      );
    } else {
      setEvents([...events, newEvent]);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <main className="max-w-6xl mx-auto p-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Event Planning & Scheduling
        </h1>
        <h2 className="text-2xl">Create and manage your events</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <Button onClick={handleAddEvent} className="w-full mt-4">
            Create New Event
          </Button>
        </div>

        <div className="col-span-1 md:col-span-2">
          {showForm ? (
            <EventForm
              selectedDate={selectedDate}
              event={editingEvent}
              onClose={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
              onSave={handleSaveEvent}
            />
          ) : (
            <EventList
              events={events}
              selectedDate={selectedDate}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          )}
        </div>
      </div>
    </main>
  );
}
