"use client";

import { useState, useEffect } from "react";

const predefinedTemplates = [
  { id: 1, name: "Event Reminder", content: "Join us for an amazing event!" },
  { id: 2, name: "Exclusive Offer", content: "Get a special discount for early registration!" },
  { id: 3, name: "Thank You Email", content: "Thank you for attending our event!" }
];

const EmailCampaignForm = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [recipients, setRecipients] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [emailLogs, setEmailLogs] = useState<any[]>([]);

  // Load email logs (mocked for now, will fetch from backend)
  useEffect(() => {
    setEmailLogs([
      { id: 1, subject: "Welcome!", status: "Sent", sentAt: "2025-03-27 10:00 AM", recipients: ["user1@example.com", "user2@example.com"] },
      { id: 2, subject: "Event Update", status: "Pending", sentAt: "2025-03-28 02:00 PM", recipients: ["user3@example.com"] }
    ]);
  }, []);

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    setTemplateId(selectedId);
    const selectedTemplate = predefinedTemplates.find(template => template.id === selectedId);
    if (selectedTemplate) {
      setContent(selectedTemplate.content);
      setSubject(selectedTemplate.name);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!recipients || !scheduledTime) {
      setStatusMessage("Please enter recipients and select a schedule time.");
      return;
    }

    const campaignData = {
      subject,
      content,
      recipients: recipients.split(",").map(email => email.trim()),
      scheduledTime
    };

    try {
      const response = await fetch("/api/emailCampaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(campaignData)
      });

      if (response.ok) {
        setStatusMessage("Email campaign scheduled successfully!");
      } else {
        setStatusMessage("Failed to schedule campaign.");
      }
    } catch (error) {
      console.error("Error scheduling campaign:", error);
      setStatusMessage("An error occurred while scheduling.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Email Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Select Template:</span>
          <select value={templateId ?? ""} onChange={handleTemplateChange} className="block w-full mt-1 p-2 border rounded">
            <option value="">-- Select Template --</option>
            {predefinedTemplates.map(template => (
              <option key={template.id} value={template.id}>{template.name}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Subject:</span>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="block w-full mt-1 p-2 border rounded" />
        </label>

        <label className="block">
          <span className="text-gray-700">Content:</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="block w-full mt-1 p-2 border rounded"></textarea>
        </label>

        <label className="block">
          <span className="text-gray-700">Recipients (comma-separated emails):</span>
          <input type="text" value={recipients} onChange={(e) => setRecipients(e.target.value)} required className="block w-full mt-1 p-2 border rounded" />
        </label>

        <label className="block">
          <span className="text-gray-700">Schedule Time:</span>
          <input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} required className="block w-full mt-1 p-2 border rounded" />
        </label>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          Schedule Campaign
        </button>
      </form>

      {statusMessage && <p className="mt-4 text-center text-green-600">{statusMessage}</p>}

      {/* Email Campaign Logs */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Email Logs</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Sent At</th>
              <th className="border border-gray-300 p-2">Recipients</th>
            </tr>
          </thead>
          <tbody>
            {emailLogs.map((log) => (
              <tr key={log.id} className="text-center">
                <td className="border border-gray-300 p-2">{log.subject}</td>
                <td className={`border border-gray-300 p-2 ${log.status === "Sent" ? "text-green-600" : "text-yellow-600"}`}>{log.status}</td>
                <td className="border border-gray-300 p-2">{log.sentAt}</td>
                <td className="border border-gray-300 p-2">{log.recipients.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailCampaignForm;
