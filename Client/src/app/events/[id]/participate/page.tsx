"use client";

import { useState } from "react";

export default function EventParticipationPage() {
  const [activeTab, setActiveTab] = useState("stream");
  const [points, setPoints] = useState(0); // Track points from MCQs
  const [userAnswers, setUserAnswers] = useState([]);

  const eventSessions = [
    {
      speaker: "John Doe",
      title: "Opening Keynote",
      description: "Join us for an exciting opening to the event!",
      duration: "9:00 AM - 10:00 AM",
    },
    {
      speaker: "Jane Smith",
      title: "AI in Healthcare",
      description: "Discover the potential of AI in transforming healthcare.",
      duration: "10:30 AM - 12:00 PM",
    },
    // More sessions...
  ];

  const mcqQuestions = [
    {
      question: "What is AI?",
      options: ["Artificial Intelligence", "Automated Integration", "Artificial Internet", "Automated Intelligence"],
      correctAnswer: "Artificial Intelligence",
    },
    // More questions...
  ];

  const tabs = [
    { key: "stream", label: "Live Stream/Info" },
    { key: "sessions", label: "Sessions Timeline" },
    { key: "play", label: "Play: Answer MCQs" },
    { key: "networking", label: "Networking" },
    { key: "feedback", label: "Feedback" },
  ];

  const handleAnswer = (answer: string, correctAnswer: string) => {
    if (answer === correctAnswer) {
      setPoints(points + 10); // Award 10 points for a correct answer
    }
    setUserAnswers([...userAnswers, { answer, correct: answer === correctAnswer }]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "stream":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Live Stream or Venue Info</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Live Stream Link:</h3>
                <a href="https://www.youtube.com" className="text-blue-600">Watch here</a>
              </div>
              <div>
                <h3 className="font-semibold">Venue:</h3>
                <p>The event will be held at the Grand Hall, 123 Event St.</p>
              </div>
            </div>
          </div>
        );

      case "sessions":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Sessions Timeline</h2>
            <div className="space-y-4">
              {eventSessions.map((session, idx) => (
                <div key={idx} className="border-b p-4">
                  <h3 className="font-semibold">{session.title}</h3>
                  <p>Speaker: {session.speaker}</p>
                  <p>{session.duration}</p>
                  <p>{session.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "play":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Play: Answer MCQs</h2>
            <div>
              <h3 className="font-semibold">Current Score: {points} Points</h3>
              <div className="space-y-4">
                {mcqQuestions.map((q, idx) => (
                  <div key={idx} className="border p-4">
                    <p>{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(option, q.correctAnswer)}
                          className="text-blue-600"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "networking":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Networking</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Chat</h3>
                <div className="border p-4">
                  <textarea placeholder="Send a message..." className="w-full p-2" />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Send</button>
                </div>
              </div>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Feedback</h2>
            <div className="space-y-4">
              <a href="/feedback-form" className="bg-blue-600 text-white px-4 py-2 rounded">
                Provide Feedback
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Event Participation</h1>
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
