"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useServicesClient } from "@/hooks/userServicesClient";
import { IEvent, ISession, IChat } from "@/interfaces/IEvent";
import TokenUtility from "@/ServicesClient/tokenUtility";

export default function EventParticipationPage() {
  const { id } = useParams();
  const router = useRouter();
  const serviceClient = useServicesClient();

  const [eventData, setEventData] = useState<IEvent | null>(null);
  const [activeTab, setActiveTab] = useState("stream");
  const [points, setPoints] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [chatMessages, setChatMessages] = useState<IChat["comments"]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    async function fetchEvent() {
      if (id && typeof id === "string") {
        const res = await serviceClient.getEventById(id);
        if (res?.status === "success" && res.data) {
          setEventData(res.data);
          fetchChat(res.data._id);
        }
      }
    }
    fetchEvent();
  }, [id]);

  const fetchChat = async (eventID: string) => {
    const res = await serviceClient.getEventChat(eventID);
    if (res?.status === "success" && res.data) {
      setChatMessages(res.data.comments);
    }
  };

  const postMessage = async () => {
    if (!newMessage.trim()) return;
    const userInfo = TokenUtility.getDecodedToken();
    if (!userInfo || !userInfo?.username) {
      router.push("/login");
      return;
    }
    const res = await serviceClient.addMessage(
      eventData?._id as string,
      userInfo?.username as string,
      userInfo?.userID as string,
      newMessage,
      new Date().toISOString().split('T')[0]
    );
    if (res?.status === "success") {
      setChatMessages((prev) => [
        ...prev,
        {
          username: "Current User",
          userID: "userID",
          comment: newMessage,
          date: new Date(),
          isHidden: false,
        },
      ]);
      setNewMessage("");
    }
  };

  const mcqQuestions = [
    {
      question: "What is AI?",
      options: ["Artificial Intelligence", "Automated Integration", "Artificial Internet", "Automated Intelligence"],
      correctAnswer: "Artificial Intelligence",
    },
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
      setPoints(points + 10);
    }
    setUserAnswers([...userAnswers, { answer, correct: answer === correctAnswer }]);
  };

  const handleSubmitFeedback = async () => {
    try {
      const userInfo = TokenUtility.getDecodedToken();
      if (!userInfo || !userInfo?.userID) {
        router.push("/login");
        return;
      }
      const response = await serviceClient.createFeedback(
        eventData?._id as string,
        userInfo.userID as string,
        rating,
        feedback
      );
      if (response?.status === "success") {
        setIsModalOpen(false);
        setFeedback("");
        console.log("Feedback submitted:", feedback);
      } else {
        console.log("Feedback submission failed");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const renderTabContent = () => {
    if (!eventData) return <p>Loading event data...</p>;

    switch (activeTab) {
      case "stream":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Live Stream or Venue Info</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Live Stream Link:</h3>
                <a href={eventData.streamLink} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                  Watch here
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Venue:</h3>
                <p>{eventData.venueInformation}</p>
              </div>
            </div>
          </div>
        );

      case "sessions":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sessions Timeline</h2>
            <div className="space-y-6">
              {eventData.agenda.map((session: ISession, idx: number) => (
                <div key={idx} className="border border-gray-200 rounded-2xl shadow-sm p-6 bg-white hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-indigo-600">{session.title}</h3>
                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium text-gray-900">Speakers:</span> {session.speakers.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Start:</span> {session.startTime}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">End:</span> {session.endTime}
                    </p>
                    <p className="mt-2 text-gray-600">{session.agenda}</p>
                  </div>
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
              <h3 className="font-semibold">Chat</h3>
              <div className="border p-4">
                <div className="space-y-4">
                  {chatMessages
                    .filter((msg) => !msg.isHidden)
                    .map((msg, idx) => (
                      <div key={idx} className="border-b p-2">
                        <p className="font-semibold">{msg.username}</p>
                        <p>{msg.comment}</p>
                        <p className="text-xs text-gray-500">{new Date(msg.date).toLocaleString()}</p>
                      </div>
                    ))}
                </div>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Send a message..."
                  className="w-full p-2 mt-4"
                />
                <button
                  onClick={postMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Feedback</h2>
            <div className="space-y-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Provide Feedback
              </button>
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
            className={`py-2 px-4 font-semibold ${activeTab === tab.key ? 'border-b-2 border-blue-600' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {renderTabContent()}
      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">Submit Feedback</h3>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Provide your feedback here..."
        className="w-full p-2 mt-4 border rounded"
      />
      <div className="mt-4">
        <label className="font-semibold">Rating:</label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mt-2"
        />
        <div className="text-sm text-center mt-2">{rating} Stars</div>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Close
        </button>
        <button
          onClick={handleSubmitFeedback}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
