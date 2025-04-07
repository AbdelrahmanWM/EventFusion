"use client";

import { useState } from "react";

export default function EventManagementPage() {
  const [activeTab, setActiveTab] = useState("details");

  // Simulated data for lists
  const [invitedUsers, setInvitedUsers] = useState([
    { email: "alice@example.com", role: "Speaker" },
    { email: "bob@example.com", role: "Attendee" },
  ]);

  const [resources, setResources] = useState(["schedule.pdf", "poster.jpg"]);

  const [promoCodes, setPromoCodes] = useState([
    { code: "EARLYBIRD", discount: 20 },
  ]);

  const [campaigns, setCampaigns] = useState([
    { subject: "Welcome!", scheduledAt: "2025-04-10T10:00" },
  ]);

  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignTime, setCampaignTime] = useState("");

  const tabs = [
    { key: "details", label: "Edit Event Details" },
    { key: "registrations", label: "Manage People" },
    { key: "resources", label: "Upload/Manage Resources" },
    { key: "tickets", label: "Payment & Tickets" },
    { key: "analytics", label: "Analytics & Feedback" },
    { key: "emails", label: "Email Campaigns" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Edit Event Details</h2>
            <form className="space-y-4">
              <input placeholder="Event Title" className="border p-2 w-full" />
              <textarea placeholder="Description" className="border p-2 w-full" />
              <input type="datetime-local" className="border p-2 w-full" />
              <input placeholder="Location" className="border p-2 w-full" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </form>
          </div>
        );

      case "registrations":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage People</h2>
            <form className="space-y-4 mb-6">
              <input placeholder="Invite by Email" className="border p-2 w-full" />
              <select className="border p-2 w-full">
                <option>Attendee</option>
                <option>Organizer</option>
                <option>Speaker</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Send Invite</button>
            </form>
            <h3 className="font-semibold mb-2">Invited Users</h3>
            <ul className="space-y-2">
              {invitedUsers.map((user, idx) => (
                <li key={idx} className="flex justify-between border p-2">
                  <span>{user.email} — {user.role}</span>
                  <button
                    className="text-red-500"
                    onClick={() => setInvitedUsers(invitedUsers.filter((_, i) => i !== idx))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case "resources":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload/Manage Resources</h2>
            <form className="space-y-4 mb-4">
              <input type="file" className="border p-2 w-full" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
            </form>
            <h3 className="font-semibold mb-2">Uploaded Files</h3>
            <ul className="space-y-2">
              {resources.map((file, idx) => (
                <li key={idx} className="flex justify-between border p-2">
                  <span>{file}</span>
                  <button
                    className="text-red-500"
                    onClick={() => setResources(resources.filter((_, i) => i !== idx))}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case "tickets":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment & Tickets</h2>
            <form className="space-y-4 mb-6">
              <input placeholder="Ticket Price" type="number" className="border p-2 w-full" />
              <input placeholder="Promo Code" className="border p-2 w-full" />
              <input placeholder="Discount %" type="number" className="border p-2 w-full" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Promo</button>
            </form>
            <h3 className="font-semibold mb-2">Active Promo Codes</h3>
            <ul className="space-y-2">
              {promoCodes.map((promo, idx) => (
                <li key={idx} className="flex justify-between border p-2">
                  <span>{promo.code} - {promo.discount}% off</span>
                  <button
                    className="text-red-500"
                    onClick={() => setPromoCodes(promoCodes.filter((_, i) => i !== idx))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case "analytics":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Analytics & Feedback</h2>
            <div className="space-y-2">
              <div>Total Registrations: 124</div>
              <div>Session Engagement: 78%</div>
              <div>Average Feedback Score: 4.5/5</div>
            </div>
          </div>
        );

      case "emails":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Email Campaigns</h2>
            <form className="space-y-4 mb-6">
              <input
                placeholder="Email Subject"
                className="border p-2 w-full"
                value={campaignSubject}
                onChange={(e) => setCampaignSubject(e.target.value)}
              />
              <input
                type="datetime-local"
                className="border p-2 w-full"
                value={campaignTime}
                onChange={(e) => setCampaignTime(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (campaignSubject && campaignTime) {
                    setCampaigns([...campaigns, { subject: campaignSubject, scheduledAt: campaignTime }]);
                    setCampaignSubject("");
                    setCampaignTime("");
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Schedule Campaign
              </button>
            </form>
            <h3 className="font-semibold mb-2">Scheduled Campaigns</h3>
            <ul className="space-y-2">
              {campaigns.map((c, idx) => (
                <li key={idx} className="flex justify-between border p-2">
                  <span>
                    {c.subject} — {new Date(c.scheduledAt).toLocaleString()}
                  </span>
                  <button
                    className="text-red-500"
                    onClick={() => setCampaigns(campaigns.filter((_, i) => i !== idx))}
                  >
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Event</h1>
      <div className="flex gap-4 border-b mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 whitespace-nowrap border-b-2 ${activeTab === tab.key
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {renderTabContent()}
    </div>
  );
}
