"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Event } from "../types/event";

interface EventFormProps {
  selectedDate?: Date;
  event?: Event | null;
  onClose: () => void;
  onSave: (event: Event) => void;
}

export default function EventForm({ selectedDate, event, onClose, onSave }: EventFormProps) {
  const [eventData, setEventData] = useState<Event>({
    id: "",
    title: "",
    description: "",
    venue: "",
    startTime: "09:00",
    endTime: "10:00",
    date: selectedDate || new Date(),
    agenda: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const method = event ? "PUT" : "POST";
      const url = event ? `/api/events/${event.id}` : "/api/events";
      
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save event");
      }
      
      const data = await response.json();
      onSave(data.event);
      
      alert(event ? "Event updated successfully!" : "Event created successfully!");
    } catch (error) {
      console.error("Error saving event:", error);
      setError("Failed to save event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-md border">
      <h3 className="text-xl font-bold mb-4">{event ? "Edit Event" : "Create New Event"}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Event Title
            </label>
            <Input
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="agenda" className="block text-sm font-medium mb-1">
              Agenda
            </label>
            <Textarea
              id="agenda"
              name="agenda"
              value={eventData.agenda}
              onChange={handleChange}
              rows={3}
              placeholder="List the schedule and activities for this event"
            />
          </div>
          
          <div>
            <label htmlFor="venue" className="block text-sm font-medium mb-1">
              Venue
            </label>
            <Select 
              onValueChange={(value) => handleSelectChange("venue", value)}
              defaultValue={eventData.venue}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conference-room-a">Conference Room A</SelectItem>
                <SelectItem value="conference-room-b">Conference Room B</SelectItem>
                <SelectItem value="main-hall">Main Hall</SelectItem>
                <SelectItem value="outdoor-space">Outdoor Space</SelectItem>
                <SelectItem value="custom">Custom Venue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                Start Time
              </label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={eventData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                End Time
              </label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={eventData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : event ? "Update Event" : "Save Event"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
