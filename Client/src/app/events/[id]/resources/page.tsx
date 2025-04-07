"use client";

import { useState } from "react";

export default function EventResourcesPage() {
  const [isSpeakerOrOrganizer, setIsSpeakerOrOrganizer] = useState(true); // Simulate role for now
  const [resources, setResources] = useState([
    { id: 1, name: "Event Schedule.pdf", type: "pdf", url: "#", uploadedBy: "John Doe" },
    { id: 2, name: "Presentation Slides.pptx", type: "pptx", url: "#", uploadedBy: "Jane Smith" },
    // More resources...
  ]);
  const [newResource, setNewResource] = useState<File | null>(null);

  const handleResourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewResource(file);
    }
  };

  const handleSubmitResource = () => {
    if (newResource) {
      // Simulate uploading resource by adding to the list
      setResources([
        ...resources,
        { id: resources.length + 1, name: newResource.name, type: newResource.type, url: "#", uploadedBy: "Organizer" },
      ]);
      setNewResource(null); // Reset the input after submission
    }
  };

  const handleResourceDelete = (resourceId: number) => {
    setResources(resources.filter((resource) => resource.id !== resourceId));
  };

  const renderAttendeeResources = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Resources</h2>
      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="border p-4 rounded">
            <p className="font-semibold">{resource.name}</p>
            <a href={resource.url} download className="text-blue-600 hover:underline">
              Download
            </a>
            <p className="text-sm text-gray-500">Uploaded by: {resource.uploadedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpeakerOrganizerResources = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Resources</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="resourceUpload" className="block text-sm font-medium mb-2">Upload a Resource</label>
          <input
            type="file"
            id="resourceUpload"
            onChange={handleResourceUpload}
            className="border p-2 w-full"
          />
        </div>
        <button
          onClick={handleSubmitResource}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Resource
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6 mb-4">Existing Resources</h3>
      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="border p-4 rounded">
            <p className="font-semibold">{resource.name}</p>
            <a href={resource.url} download className="text-blue-600 hover:underline">
              Download
            </a>
            <p className="text-sm text-gray-500">Uploaded by: {resource.uploadedBy}</p>
            <button
              onClick={() => handleResourceDelete(resource.id)}
              className="text-red-600 hover:underline"
            >
              Delete Resource
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Event Resources</h1>
      {isSpeakerOrOrganizer ? renderSpeakerOrganizerResources() : renderAttendeeResources()}
    </div>
  );
}
