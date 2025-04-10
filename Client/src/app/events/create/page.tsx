"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useServicesClient } from "@/hooks/userServicesClient";

export default function CreateEventPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const servicesClient = useServicesClient();

  const [eventData, setEventData] = useState({
    title: "",
    summary: "",
    aboutTheEvent: [""],
    description: "",
    tags: [""],
    type: "Conference",
    format: "Hybrid",
    date_time: {
      start: "",
      end: "",
      timezone: "UTC",
    },
    location: "",
  pictures:{
        coverPicture:""
    },
    agenda: [
      {
        title: "",
        startTime: "",
        endTime: "",
        speakers: [""],
        agenda: "",
      },
    ],
    streamLink: "",
    venueInformation: "",
    registration: {
      period_start: "",
      period_end: "",
    },
    tickets: [
      {
        name: "",
        price: "",
      },
    ],
    promos: [
      {
        name: "",
        discount: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, key, value) => {
    setEventData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, value) => {
    const newArr = [...eventData[section]];
    newArr[index] = value;
    setEventData({ ...eventData, [section]: newArr });
  };

  const handleAgendaChange = (index, field, value) => {
    const newAgenda = [...eventData.agenda];
    newAgenda[index][field] = value;
    setEventData({ ...eventData, agenda: newAgenda });
  };

  const handleAgendaSpeakersChange = (agendaIndex, speakerIndex, value) => {
    const newAgenda = [...eventData.agenda];
    newAgenda[agendaIndex].speakers[speakerIndex] = value;
    setEventData({ ...eventData, agenda: newAgenda });
  };

  const handleComplexArrayChange = (section, index, key, value) => {
    const updated = [...eventData[section]];
    updated[index][key] = value;
    setEventData({ ...eventData, [section]: updated });
  };

  const addToArray = (section, defaultValue) => {
    setEventData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultValue],
    }));
  };

  const addSpeakerToAgenda = (agendaIndex) => {
    const updatedAgenda = [...eventData.agenda];
    updatedAgenda[agendaIndex].speakers.push("");
    setEventData({ ...eventData, agenda: updatedAgenda });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await servicesClient.createEvent(eventData) ;

      if (res.status=="success") {
        const data = res.data
        router.push(`/events/${data._id}`);
      } else {
        const text = await res.text();
        setError(text || "Something went wrong!");
      }
    } catch {
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="title" placeholder="Title" className="w-full border p-2" value={eventData.title} onChange={handleChange} required/>
        <input name="summary" placeholder="Summary" className="w-full border p-2" value={eventData.summary} onChange={handleChange} required/>
        <textarea name="description" placeholder="Full description" className="w-full border p-2" value={eventData.description} onChange={handleChange} required/>
        <input name="location" placeholder="Location" className="w-full border p-2" value={eventData.location} onChange={handleChange}/>
        <input name="streamLink" placeholder="Stream link" className="w-full border p-2" value={eventData.streamLink} onChange={handleChange} />
        <input name="coverPicture" placeholder="Cover picture" type="url" className="w-full border p-2" value={eventData.pictures.coverPicture} onChange={(e) => handleNestedChange("pictures", "coverPicture", e.target.value)} />
        <textarea name="venueInformation" placeholder="Venue Info" className="w-full border p-2" value={eventData.venueInformation} onChange={handleChange} required/>

        <h2 className="font-semibold mt-4">Type and Format</h2>        
        <select id="type" name="type" className="w-full border p-2" value={eventData.type} onChange={handleChange}>
          <option value="" disabled selected>Select an event type</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Webinar">Webinar</option>
        </select>

        <select id="format" name="format" className="w-full border p-2" value={eventData.format} onChange={handleChange}>
          <option value="" disabled selected>Select an event format</option>
          <option value="In-Person">In-person</option>
          <option value="Online">Online</option>
          <option value="Hybrid">Hybrid</option>
        </select>
 

        <h2 className="font-semibold">About the Event</h2>
        {eventData.aboutTheEvent.map((val, i) => (
          <input key={i} value={val} onChange={(e) => handleArrayChange("aboutTheEvent", i, e.target.value)} className="w-full border p-2 mb-2" />
        ))}
        <button type="button" onClick={() => addToArray("aboutTheEvent", "")}>+ Add More</button>

        <h2 className="font-semibold mt-4">Tags</h2>
        {eventData.tags.map((val, i) => (
          <input key={i} value={val} onChange={(e) => handleArrayChange("tags", i, e.target.value)} className="w-full border p-2 mb-2" />
        ))}
        <button type="button" onClick={() => addToArray("tags", "")}>+ Add Tag</button>

        <h2 className="font-semibold mt-4">Agenda</h2>
        {eventData.agenda.map((item, i) => (
          <div key={i} className="border p-4 space-y-2">
            <input placeholder="Title" value={item.title} onChange={(e) => handleAgendaChange(i, "title", e.target.value)} className="w-full border p-2" />
            <input placeholder="Start Time" value={item.startTime} onChange={(e) => handleAgendaChange(i, "startTime", e.target.value)} className="w-full border p-2" />
            <input placeholder="End Time" value={item.endTime} onChange={(e) => handleAgendaChange(i, "endTime", e.target.value)} className="w-full border p-2" />
            <textarea placeholder="Agenda" value={item.agenda} onChange={(e) => handleAgendaChange(i, "agenda", e.target.value)} className="w-full border p-2" />
            <h3>Speakers</h3>
            {item.speakers.map((speaker, j) => (
              <input key={j} value={speaker} onChange={(e) => handleAgendaSpeakersChange(i, j, e.target.value)} className="w-full border p-2 mb-2" />
            ))}
            <button type="button" onClick={() => addSpeakerToAgenda(i)}>+ Add Speaker</button>
          </div>
        ))}
        <button type="button" onClick={() => addToArray("agenda", { title: "", startTime: "", endTime: "", speakers: [""], agenda: "" })}>+ Add Agenda</button>

        <h2 className="font-semibold mt-4">Tickets</h2>
        {eventData.tickets.map((ticket, i) => (
          <div key={i} className="border p-2">
            <input placeholder="Ticket Name" value={ticket.name} onChange={(e) => handleComplexArrayChange("tickets", i, "name", e.target.value)} className="w-full border p-2" />
            <input placeholder="Price" type="number" value={ticket.price} onChange={(e) => handleComplexArrayChange("tickets", i, "price", e.target.value)} className="w-full border p-2" />
          </div>
        ))}
        <button type="button" onClick={() => addToArray("tickets", { name: "", price: "" })}>+ Add Ticket</button>

        <h2 className="font-semibold mt-4">Promos</h2>
        {eventData.promos.map((promo, i) => (
          <div key={i} className="border p-2">
            <input placeholder="Promo Code" value={promo.name} onChange={(e) => handleComplexArrayChange("promos", i, "name", e.target.value)} className="w-full border p-2" />
            <input placeholder="Discount %" type="number" value={promo.discount} onChange={(e) => handleComplexArrayChange("promos", i, "discount", e.target.value)} className="w-full border p-2" />
          </div>
        ))}
        <button type="button" onClick={() => addToArray("promos", { name: "", discount: "" })}>+ Add Promo</button>

        <h2 className="font-semibold mt-4">Date/Time</h2>
        <input type="datetime-local" required value={eventData.date_time.start} onChange={(e) => handleNestedChange("date_time", "start", e.target.value)} className="w-full border p-2" />
        <input type="datetime-local" required value={eventData.date_time.end} onChange={(e) => handleNestedChange("date_time", "end", e.target.value)} className="w-full border p-2" />
        <input placeholder="Timezone" value={eventData.date_time.timezone} onChange={(e) => handleNestedChange("date_time", "timezone", e.target.value)} className="w-full border p-2" />

        <h2 className="font-semibold mt-4">Registration</h2>
        <input type="datetime-local" required value={eventData.registration.period_start} onChange={(e) => handleNestedChange("registration", "period_start", e.target.value)} className="w-full border p-2" />
        <input type="datetime-local" required value={eventData.registration.period_end} onChange={(e) => handleNestedChange("registration", "period_end", e.target.value)} className="w-full border p-2" />

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Create Event</button>
      </form>
    </div>
  );
}
