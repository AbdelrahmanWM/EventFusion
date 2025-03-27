import { NextRequest, NextResponse } from "next/server";

import {Event} from "../../../types/event"
const events: Event[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = events.find(e => e.id === id);
    
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
//for later
// export async function PUT(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const eventId = context.params.id;
//     const data = await request.json();
//     const index = events.findIndex(e => e.id === eventId);
    
//     if (index === -1) {
//       return NextResponse.json(
//         { error: "Event not found" },
//         { status: 404 }
//       );
//     }
    
//     const updatedEvent = {
//       ...events[index],
//       ...data,
//       id: eventId,
//     };
    
//     events[index] = updatedEvent;
    
//     return NextResponse.json({ event: updatedEvent });
//   } catch (error) {
//     console.error("Error updating event:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const eventId = context.params.id;
//     const index = events.findIndex(e => e.id === eventId);
    
//     if (index === -1) {
//       return NextResponse.json(
//         { error: "Event not found" },
//         { status: 404 }
//       );
//     }
    
//     events.splice(index, 1);
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
