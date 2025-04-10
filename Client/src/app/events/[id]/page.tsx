'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useServicesClient } from "@/hooks/userServicesClient";
import { IEvent } from '@/interfaces/IEvent';

export default function EventOverviewPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const servicesClient = useServicesClient();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await servicesClient.getEventById(id as string);
        const data = await res.data;
        if (!data) {
          setError("No event found.");
        } else {
          setEvent(data);
        }
      } catch (error) {
        console.error("Failed to fetch event", error);
        setError("Failed to fetch event.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id, servicesClient]);

  if (loading) return <div className="p-6 text-center">Loading event...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  const startDate = new Date(event!.date_time.start);
  const endDate = new Date(event!.date_time.end);
  const dateString = startDate.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const timeString = `${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Event Picture */}
      <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-md">
      <img 
    src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&q=60&w=3000" 
    alt="Event Cover" 
    className="w-full h-full object-cover rounded-lg shadow-md"
/>
      </div>

      {/* Date and Title */}
      <div>
        <p className="text-gray-500 text-lg">{dateString}</p>
        <h1 className="text-3xl font-bold mt-1">{event!.title}</h1>
      </div>

      {/* Time Details */}
      <div className="flex items-center gap-4 text-gray-600">
        <CalendarDays className="w-5 h-5" />
        <span>{dateString}</span>
        <Clock className="w-5 h-5" />
        <span>{timeString}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="w-5 h-5" />
        <span>{event!.location}</span>
      </div>

      {/* Event Duration Info */}
      <div>
        <p className="text-gray-700 italic">
          Duration: {Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))} minutes
        </p>
      </div>

      {/* Long Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">About this event</h2>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {event!.aboutTheEvent.join('\n')}
        </p>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-medium mb-1">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {event!.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* Agenda */}
      {event!.agenda.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 text-lg">Agenda</h3>
          <ul className="space-y-4">
            {event!.agenda.map((session, idx) => (
              <li key={idx} className="border rounded-xl p-4 shadow-sm bg-gray-50">
                <p className="font-semibold">{session.title}</p>
                <p className="text-sm text-gray-600">
                  {session.startTime} - {session.endTime}
                </p>
                <p className="text-sm text-gray-700">{session.agenda}</p>
                {session.speakers.length > 0 && (
                  <p className="text-sm text-gray-700 mt-1">Speakers: {session.speakers.join(', ')}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


// 'use client';

// import Image from 'next/image';
// import { CalendarDays, Clock, MapPin } from 'lucide-react';

// export default function EventOverviewPage() {
//   const event = {
//     title: "Stress Relief Seminar",
//     date: "Friday, April 25",
//     time: "10:00 AM - 1:00 PM",
//     location: "Concordia University, Montreal" || "Online",
//     duration: "This event lasts for 3 hours",
//     description: `Join us for a seminar focused on effective stress relief techniques. This event will cover mindfulness, guided meditation, and other wellness strategies. Suitable for students and professionals alike.`,
//     longDescription: `This seminar is aimed at promoting mental well-being. Mr. X, a renowned wellness coach, will share proven stress relief strategies. You'll also participate in interactive activities designed to help reduce stress and improve focus.`,
//     tags: ["Wellness", "Mindfulness", "Students", "Mental Health"],
//     organizers: ["Graduate Students Association (GSA)"],
//     stakeholders: ["Concordia University"],
//     sponsors: ["Wellness Center", "Mindful Co."]
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       {/* Event Picture */}
//       <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-md">
//         <Image src="/event-cover.jpg" alt="Event Cover" fill className="object-cover" />
//       </div>

//       {/* Date and Title */}
//       <div>
//         <p className="text-gray-500 text-lg">{event.date}</p>
//         <h1 className="text-3xl font-bold mt-1">{event.title}</h1>
//       </div>

//       {/* Time Details */}
//       <div className="flex items-center gap-4 text-gray-600">
//         <CalendarDays className="w-5 h-5" />
//         <span>{event.date}</span>
//         <Clock className="w-5 h-5" />
//         <span>{event.time}</span>
//       </div>

//       {/* Location */}
//       <div className="flex items-center gap-2 text-gray-600">
//         <MapPin className="w-5 h-5" />
//         <span>{event.location}</span>
//       </div>

//       {/* About this event short */}
//       <div>
//         <p className="text-gray-700 italic">{event.duration}</p>
//       </div>

//       {/* Long Description */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">About this event</h2>
//         <p className="text-gray-800 leading-relaxed whitespace-pre-line">{event.longDescription}</p>
//       </div>

//       {/* Tags */}
//       <div>
//         <h3 className="font-medium mb-1">Tags</h3>
//         <div className="flex flex-wrap gap-2">
//           {event.tags.map((tag, idx) => (
//             <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{tag}</span>
//           ))}
//         </div>
//       </div>

//       {/* Organizers, Stakeholders, Sponsors */}
//       <div className="space-y-4">
//         <div>
//           <h3 className="font-medium">Organized by</h3>
//           <ul className="list-disc list-inside text-gray-700">
//             {event.organizers.map((org, idx) => <li key={idx}>{org}</li>)}
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-medium">Stakeholders</h3>
//           <ul className="list-disc list-inside text-gray-700">
//             {event.stakeholders.map((stk, idx) => <li key={idx}>{stk}</li>)}
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-medium">Sponsors</h3>
//           <ul className="list-disc list-inside text-gray-700">
//             {event.sponsors.map((s, idx) => <li key={idx}>{s}</li>)}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
