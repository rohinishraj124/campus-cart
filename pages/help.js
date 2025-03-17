import React, { useState } from "react";

const Help = ({ theme }) => {
  const [question, setQuestion] = useState("");

  const handleQuestionSubmit = () => {
    if (question.trim() === "") return;
    alert("Your question has been submitted! We'll get back to you soon.");
    setQuestion("");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white"
          : "bg-gradient-to-r from-blue-900 to-blue-600 text-white"
      }`}
    >
      {/* Header */}
      <header className="bg-blue-800 p-5 text-center text-2xl font-bold shadow-lg">
        Campus Cart - Help Center
      </header>

      {/* Main Section */}
      <main
        className={`max-w-4xl mx-auto p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-blue-950"
        } bg-opacity-90 shadow-lg rounded-lg mt-6`}
      >
        <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>

        {/* FAQs */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">1. How do I place an order?</h3>
            <p className="leading-relaxed">
              You can place an order by browsing our products, adding items to your cart,
              and proceeding to checkout. Follow the on-screen instructions to complete
              your purchase.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. What payment methods do you accept?</h3>
            <p className="leading-relaxed">
              We accept cash on delivery now, but soon we will accept credit/debit cards,
              PayPal, and campus meal plans for payment.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. How long does delivery take?</h3>
            <p className="leading-relaxed">
              Orders are typically delivered within 2 hours. 10-15 minute delivery is
              available for select items.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Can I modify or cancel my order?</h3>
            <p className="leading-relaxed">
              Yes, you can modify or cancel your order within 15 minutes of placing it.
              Contact our support team for assistance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. Who can I contact for further support?</h3>
            <p className="leading-relaxed">
              You can reach our customer support team via email at
              <span className="font-semibold"> support@campusgrocery.com</span> or call us
              at <span className="font-semibold">(123) 456-7890</span>.
            </p>
          </div>
        </div>

        {/* Ask a Question */}
        <div className="mt-6 p-4 bg-blue-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Still have a question?</h3>
          <p className="text-gray-200 mb-2">Type your question below, and we'll get back to you as soon as possible.</p>
          <input
            type="text"
            placeholder="Enter your question here..."
            className="w-full p-2 rounded-md text-black"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleQuestionSubmit}
          >
            Submit
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-center p-4 mt-6 shadow-lg">
        &copy; 2025 Campus Cart. All rights reserved.
      </footer>
    </div>
  );
};

export default Help;
