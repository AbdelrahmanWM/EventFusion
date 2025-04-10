"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useServicesClient } from "@/hooks/userServicesClient";
import { IEvent } from "@/interfaces/IEvent";
import TokenUtility, { MyTokenPayload } from "@/ServicesClient/tokenUtility";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventOverviewPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState<string>("");
  const [balanceUpdated, setBalanceUpdated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // To track if the user is registered
  const servicesClient = useServicesClient();
  const navigator = useRouter();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await servicesClient.getEventById(id as string);
        const data = res.data;
        if (!data) {
          setError("No event found.");
        } else {
          setEvent(data);
          await checkUserRole(data._id); // Check user registration status on event load
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

  const checkUserRole = async (eventID: string) => {
    const userInfo: MyTokenPayload | null = TokenUtility.getDecodedToken();
    if (userInfo && userInfo.userID) {
      try {
        const request = await servicesClient.getUserRolesByEvent(
          eventID,
          userInfo.userID
        );

        if (
          request &&
          request.data &&
          request.data.roles.includes("Attendee")
        ) {
          setIsRegistered(true); // User is already registered
        }
      } catch (error) {
        console.log(error);
        setIsRegistered(false);
      }
    }
  };

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTicketSelect = (ticketId: number) => {
    setSelectedTicket(ticketId);
  };

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleRegisterWithTicket = async () => {
    if (selectedTicket !== null) {
      try {
        const ticketPrice = event!.tickets[selectedTicket].price;
        const appliedPromo = event!.promos?.find(
          (promo) => promo.name.toUpperCase() === promoCode.trim().toUpperCase()
        );
        let finalPrice = ticketPrice;
        if (appliedPromo) {
          finalPrice = ticketPrice - appliedPromo.discount;
        }
        const userInfo: MyTokenPayload | null = TokenUtility.getDecodedToken();
        const token = TokenUtility.getToken();
        if (!userInfo || !token || !userInfo.username) {
          navigator.push("/login");
          return;
        }

        const request = await servicesClient.updateUserBalance(
          userInfo?.username as string,
          finalPrice,
          token as string
        );
        if (!request || request.error) {
          navigator.push("/login");
          return;
        }

        const userRoleUpdate = await servicesClient.assignUserRole(
          userInfo.userID,
          event!._id,
          "Attendee",
          token as string
        );
        if (userRoleUpdate) {
          setBalanceUpdated(true);
          setIsRegistered(true); // User is now registered as 'Attendee'
          setTimeout(() => {
            setBalanceUpdated(false);
            setIsModalOpen(false); // Close modal after role update
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to update user balance and role", error);
      }
    }
  };

  if (loading) return <div className="p-6 text-center">Loading event...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  const startDate = new Date(event!.date_time.start);
  const endDate = new Date(event!.date_time.end);
  const dateString = startDate.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeString = `${startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const currentDate = new Date();
  const registrationOpen =
    currentDate >= new Date(event!.registration.period_start) &&
    currentDate <= new Date(event!.registration.period_end);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Event Picture */}
      <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-md">
        <img
          src={
            event && event.pictures && event.pictures.coverPicture
              ? event.pictures.coverPicture
              : "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&q=60&w=3000"
          }
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
          Duration:{" "}
          {Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))}{" "}
          minutes
        </p>
      </div>

      {/* Long Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">About this event</h2>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {event!.aboutTheEvent.join("\n")}
        </p>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-medium mb-1">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {event!.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Register Button */}
      <div className="mt-6 text-center">
  {isRegistered ? (
    <div>
      <button className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-md cursor-not-allowed">
        Registered
      </button>
      {event?.date_time?.start &&
        event?.date_time?.end &&
        new Date(event.date_time.start).getTime() < Date.now() &&
        new Date(event.date_time.end).getTime() > Date.now() && (
          <Link href={`/events/${event._id}/participate`}>
            <button className="ml-6 px-6 py-2 text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
              Join Event!
            </button>
          </Link>
        )}
    </div>
  ) : registrationOpen ? (
    <button
      onClick={handleRegisterClick}
      className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
    >
      Register
    </button>
  ) : (
    <button className="px-6 py-2 text-white bg-gray-400 rounded-lg shadow-md cursor-not-allowed">
      Registration Closed
    </button>
  )}
</div>

      {/* Modal for Ticket Selection */}
      {/* Modal for Ticket Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Select a Ticket</h2>
            <div className="space-y-4">
              {event!.tickets.map((ticket, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center p-4 rounded-lg cursor-pointer ${
                    selectedTicket === idx ? "bg-blue-100" : "hover:bg-blue-50"
                  }`}
                  onClick={() => handleTicketSelect(idx)}
                >
                  <span>{ticket.name}</span>
                  <span className="text-blue-600">${ticket.price}</span>
                </div>
              ))}
            </div>

            {/* Promo Code Section */}
            <div className="mt-4">
              <label
                htmlFor="promoCode"
                className="block text-sm font-medium text-gray-700"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promoCode"
                value={promoCode}
                onChange={handlePromoChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Total Price Section */}
            {selectedTicket !== null && (
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium">Total:</span>
                <span className="text-xl font-semibold text-blue-600">
                  {(() => {
                    const ticket = event!.tickets[selectedTicket];
                    const appliedPromo = event!.promos?.find(
                      (promo) =>
                        promo.name.toUpperCase() ===
                        promoCode.trim().toUpperCase()
                    );
                    const discountedPrice = appliedPromo
                      ? ticket.price - appliedPromo.discount
                      : ticket.price;

                    return `$${discountedPrice.toFixed(2)}`;
                  })()}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleRegisterWithTicket}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {balanceUpdated ? "Balance Updated!" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
