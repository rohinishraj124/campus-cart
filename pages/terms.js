import React from "react";

const TermsAndConditions = ({ theme }) => {
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
        Campus Cart - Terms & Conditions
      </header>

      {/* Main Section */}
      <main
        className={`max-w-4xl mx-auto p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-blue-950"
        } bg-opacity-90 shadow-lg rounded-lg mt-6`}
      >
        <h2 className="text-3xl font-semibold mb-4">Terms & Conditions</h2>

        {/* Terms Sections */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
            <p className="leading-relaxed">
              By accessing and using Campus Cart, you agree to comply with these Terms & Conditions.
              If you do not agree, please do not use our services.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. User Accounts</h3>
            <p className="leading-relaxed">
              To access certain features, you may need to create an account. You are responsible
              for maintaining the confidentiality of your account credentials.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Ordering and Payments</h3>
            <p className="leading-relaxed">
              All orders must be paid for at checkout. We accept various payment methods, and all
              transactions are securely processed.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Cancellations & Refunds</h3>
            <p className="leading-relaxed">
              Orders can be canceled within one hour of placement. Refunds are processed based on
              our refund policy, which can be found on our website.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. User Responsibilities</h3>
            <p className="leading-relaxed">
              Users must not engage in fraudulent activity, abuse our services, or violate any
              applicable laws while using Campus Cart.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">6. Changes to Terms</h3>
            <p className="leading-relaxed">
              We reserve the right to update these terms at any time. Any changes will be posted
              here, and continued use of the site constitutes acceptance of the updated terms.
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

export default TermsAndConditions;
