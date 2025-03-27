"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PromotionForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Use the router to redirect after submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the promotion data to the backend
      const response = await fetch("/api/promotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date,
          location,
          image,
        }),
      });

      if (response.ok) {
        alert("Submission Successful");
        // Reset form fields
        setTitle("");
        setDescription("");
        setDate("");
        setLocation("");
        setImage("");
        // Redirect to the Event Promotion page
        router.push("/event-promotion");
      } else {
        alert("There was an error with your submission. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting promotion:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Add Event Promotion</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-lg font-semibold text-gray-700">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-lg font-semibold text-gray-700">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-lg font-semibold text-gray-700">Image URL</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto bg-black text-white py-3 px-6 rounded-lg focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Promotion"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
