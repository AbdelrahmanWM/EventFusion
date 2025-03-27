/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

// Reference to the mock database from the parent route
// In a real app, you'd use a proper database
const events: any[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = events.find(e => e.id === params.id);
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const index = events.findIndex(e => e.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    // Update the event
    const updatedEvent = {
      ...events[index],
      ...data,
      id: params.id, // Ensure ID doesn't change
    };
    
    events[index] = updatedEvent;
    
    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = events.findIndex(e => e.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    // Remove the event
    events.splice(index, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
