



import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";


export default function Faq() {
  const { isDarkMode } = useDarkMode();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I submit an assignment?",
      answer:
        "Go to your dashboard, select your course, and click the 'Submit' button next to the assignment. Upload your file and confirm submission.",
    },
    {
      question: "How can I track my progress?",
      answer:
        "Visit the 'My Progress' page to see completed lessons, grades, and pending tasks.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "You can upload PDF, DOCX, PPT, and image files (JPG, PNG). Each file must be under 20MB.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "On the login page, click 'Forgot Password' and follow the instructions sent to your email.",
    },
    {
      question: "How can I contact my instructor?",
      answer:
        "Use the built-in messaging feature or the course discussion board to reach your instructor.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={`max-w-7xl mx-auto p-1 py-0 min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-stone-100"
      }`}
    >
      {/* Header Section */}
      <div className="mb-12">
        <h1
          className={`text-4xl font-light mb-8 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Questions?
        </h1>
        <p
          className={`max-w-xl ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          If you have questions, we have answers for you here. In case we don't,
          please feel free to reach out to us here contact@liinn.com
        </p>
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Title */}
        <div>
          <h2
            className={`text-2xl font-normal mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            General questions
          </h2>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className={`w-full flex justify-between items-center py-6 text-left transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`font-medium pr-4 ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <X
                    className={`w-6 h-6 flex-shrink-0 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                ) : (
                  <Plus
                    className={`w-6 h-6 flex-shrink-0 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                )}
              </button>
              {openIndex === index && (
                <div
                  className={`pb-6 text-base leading-relaxed ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
