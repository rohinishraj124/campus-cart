import React from "react";

const PrivacyPolicy = ({ theme }) => {
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
        Campus Cart - Privacy Policy
      </header>

      {/* Main Section */}
      <main
        className={`max-w-4xl mx-auto p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-blue-950"
        } bg-opacity-90 shadow-lg rounded-lg mt-6`}
      >
        <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>

        {/* Policy Sections */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">1. Information We Collect</h3>
            <p className="leading-relaxed">
              We collect personal information such as your name, email, phone number,
              and payment details when you register or make a purchase on our platform.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
            <p className="leading-relaxed">
              Your information is used to process orders, improve our services, and
              provide customer support. We do not sell your data to third parties.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Data Security</h3>
            <p className="leading-relaxed">
              We implement security measures to protect your personal information from
              unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Cookies and Tracking</h3>
            <p className="leading-relaxed">
              We use cookies to enhance user experience, track site usage, and
              personalize content. You can manage cookie preferences in your browser
              settings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. Your Rights</h3>
            <p className="leading-relaxed">
              You have the right to access, update, or delete your personal data.
              Contact us at <span className="font-semibold">privacy@campusgrocery.com</span> for assistance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">6. Policy Updates</h3>
            <p className="leading-relaxed">
              We may update this privacy policy from time to time. Changes will be
              posted on this page, and we encourage you to review it periodically.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-center p-4 mt-6 shadow-lg">
        &copy; 2025 Campus Cart. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
