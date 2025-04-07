"use client";

import { useState } from "react";

export default function EventFeedbackPage() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comments: "",
  });
  const [aggregateResults, setAggregateResults] = useState({
    averageRating: 4.2,
    feedbackCount: 123,
    feedbackList: [
      { name: "John Doe", rating: 5, comments: "Great event!" },
      { name: "Jane Smith", rating: 4, comments: "Very informative" },
      // More feedback entries...
    ],
  });

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
    // Here, you can send the feedback data to your server or API.
  };

  const renderFeedbackForm = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Submit Your Feedback</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-2">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={feedback.rating}
              onChange={handleFeedbackChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="comments" className="block text-sm font-medium mb-2">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={feedback.comments}
              onChange={handleFeedbackChange}
              placeholder="What did you like or dislike?"
              className="border p-2 w-full"
              rows={4}
            />
          </div>
          <button
            onClick={handleSubmitFeedback}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    );
  };

  const renderAggregateFeedback = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Feedback Results</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold">Average Rating</h3>
            <p>{aggregateResults.averageRating} / 5</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold">Total Feedbacks</h3>
            <p>{aggregateResults.feedbackCount} feedbacks received</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold">Feedback Comments</h3>
            <ul>
              {aggregateResults.feedbackList.map((entry, idx) => (
                <li key={idx} className="space-y-2 mb-2">
                  <p><strong>{entry.name}</strong>: {entry.comments}</p>
                  <p>Rating: {entry.rating} / 5</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Event Feedback</h1>
      {!feedbackSubmitted ? (
        renderFeedbackForm()
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Thank You for Your Feedback!</h2>
          <p>Your feedback has been submitted. We appreciate your input!</p>
        </div>
      )}
      {/* Organizers will be able to view aggregate feedback results */}
      {renderAggregateFeedback()}
    </div>
  );
}
