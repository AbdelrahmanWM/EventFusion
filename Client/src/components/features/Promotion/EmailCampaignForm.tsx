"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const predefinedTemplates = [
  { id: 1, name: "Event Reminder", content: "Join us for an amazing event!" },
  { id: 2, name: "Exclusive Offer", content: "Get a special discount for early registration!" },
  { id: 3, name: "Thank You Email", content: "Thank you for attending our event!" }
];

interface EmailCampaignFormProps {
  onSubmitCampaign: (data: any) => void;
  emailLogs: any[];
  setEmailLogs: (logs: any[]) => void;
}

const EmailCampaignForm: React.FC<EmailCampaignFormProps> = ({
  onSubmitCampaign,
  emailLogs,
  setEmailLogs
}) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [recipients, setRecipients] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    setTemplateId(selectedId);
    const selectedTemplate = predefinedTemplates.find(t => t.id === selectedId);
    if (selectedTemplate) {
      setContent(selectedTemplate.content);
      setSubject(selectedTemplate.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipients || !scheduledTime) {
      setStatusMessage("Please enter recipients and select a schedule time.");
      return;
    }

    const campaignData = {
      subject,
      content,
      recipients: recipients.split(",").map((email) => email.trim()),
      scheduledTime,
    };

    try {
      onSubmitCampaign(campaignData);
    } catch (error) {
      console.error("Error scheduling campaign:", error);
      setStatusMessage("An error occurred while scheduling.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Email Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Select Template</Label>
            <select
              value={templateId ?? ""}
              onChange={handleTemplateChange}
              className="w-full mt-1 border rounded-md p-2"
            >
              <option value="">-- Select Template --</option>
              {predefinedTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>

          <div>
            <Label>Content</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>

          <div>
            <Label>Recipients (comma-separated emails)</Label>
            <Input value={recipients} onChange={(e) => setRecipients(e.target.value)} required />
          </div>

          <div>
            <Label>Schedule Time</Label>
            <Input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} required />
          </div>

          <Button type="submit" className="w-full">
            Schedule Campaign
          </Button>

          {statusMessage && <p className="text-sm text-green-600 text-center">{statusMessage}</p>}
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Email Logs</h3>
          <div className="overflow-auto rounded border">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="border p-2 text-left">Subject</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Sent At</th>
                  <th className="border p-2 text-left">Recipients</th>
                </tr>
              </thead>
              <tbody>
                {emailLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="border p-2">{log.subject}</td>
                    <td className={`border p-2 ${log.status === "Sent" ? "text-green-600" : "text-yellow-600"}`}>
                      {log.status}
                    </td>
                    <td className="border p-2">{log.sentAt}</td>
                    <td className="border p-2">{log.recipients.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailCampaignForm;
