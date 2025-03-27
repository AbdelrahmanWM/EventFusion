import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import SocialMediaShare from "../../components/SocialMediaShare"; // Import the SocialMediaShare component

const EventDetailPage: React.FC = () => {
  const { id } = useParams(); // Get the event id from URL parameters
  const [promotion, setPromotion] = useState<any>(null); // Store event details
  const [attendees, setAttendees] = useState<any[]>([]); // Store attendee list
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch event details from backend
    const fetchEventDetails = async () => {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      setPromotion(data.event);
      setAttendees(data.attendees);
    };

    fetchEventDetails();
  }, [id]);

  const handleRegisterAttendee = async () => {
    const newAttendee = { name, email, eventId: id };
    const response = await fetch(`/api/attendees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAttendee),
    });
    if (response.ok) {
      setAttendees([...attendees, newAttendee]);
      setName('');
      setEmail('');
    } else {
      alert('Error registering attendee');
    }
  };

  if (!promotion) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-xl font-bold">Event not found</h2>
        <p className="text-gray-600">Sorry, we couldn't find the event you're looking for.</p>
        <br />
        <Link href="/event-promotion" className="inline-block bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition">
          ⬅ Go Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="hero mb-6">
        <img src={promotion.image} alt={promotion.title} className="w-full h-72 object-cover rounded-lg shadow-lg" />
      </div>

      <h1 className="text-4xl font-bold mb-4">{promotion.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{promotion.description}</p>
      <div className="event-info mb-4">
        <p className="text-sm text-gray-500">📅 {promotion.date}</p>
        <p className="text-sm text-gray-500">📍 {promotion.location}</p>
      </div>

      <SocialMediaShare
        title={promotion.title}
        description={promotion.description}
        imageUrl={promotion.image}
        eventUrl={`https://yourdomain.com/event-details/${id}`} // Make sure to use the full event URL here
      />

      <div className="attendees mb-6">
        <h3 className="text-xl font-bold">Attendees ({attendees.length})</h3>
        <ul>
          {attendees.map((attendee, index) => (
            <li key={index} className="mb-2">
              {attendee.name} ({attendee.email})
            </li>
          ))}
        </ul>
      </div>

      {/* Attendee registration form */}
      <div className="register-attendee mt-6">
        <h3 className="text-xl font-bold mb-2">Register New Attendee</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleRegisterAttendee}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition mt-2"
        >
          Register Attendee
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
