'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash, Edit } from "lucide-react";
import { Event } from "../types/event";

interface EventListProps {
  events: Event[];
  selectedDate?: Date;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export default function EventList({ events, selectedDate, onEdit, onDelete }: EventListProps) {
  const filteredEvents = selectedDate 
    ? events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === selectedDate.toDateString();
      })
    : events;

  if (filteredEvents.length === 0) {
    return (
      <div className="bg-card p-6 rounded-md border text-center">
        <h3 className="text-xl font-medium mb-2">No events scheduled</h3>
        <p className="text-muted-foreground">
          {selectedDate 
            ? `No events scheduled for ${selectedDate.toLocaleDateString()}`
            : "Select a date to view events or create a new one"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredEvents.map((event) => (
        <div key={event.id} className="bg-card p-4 rounded-md border">
          <h3 className="text-lg font-bold">{event.title}</h3>
          
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          
          {event.description && (
            <p className="mt-2 text-sm">{event.description}</p>
          )}
          
          {event.agenda && (
            <div className="mt-3">
              <h4 className="text-sm font-semibold">Agenda</h4>
              <p className="text-sm mt-1">{event.agenda}</p>
            </div>
          )}
          
          <div className="mt-3 flex justify-between items-center">
            <span className="text-sm bg-secondary px-2 py-1 rounded-md">
              {event.venue}
            </span>
            
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(event)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(event.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
