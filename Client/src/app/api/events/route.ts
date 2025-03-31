import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/app/types/event";

// Mock database - replace with actual database in production
const events: Event[] = [
  {
    id: "1",
    title: "Team Meeting",  
    description: "Weekly team meeting to discuss progress and blockers",
    venue: "Conference Room",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    date: new Date("2022-01-10"),
    agenda: "1. Standup\n2. Sprint planning",
    }]

export async function GET() {
  try {
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the event data
    if (!data.title || !data.date) {
      return NextResponse.json(
        { error: "Title and date are required" },
        { status: 400 }
      );
    }
    
    // Create a new event
    const newEvent = {
      id: Date.now().toString(),
      ...data,
    };
    
    // Add to our mock database
    events.push(newEvent);
    
    return NextResponse.json({ event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
