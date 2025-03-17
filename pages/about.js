import React from "react";
import Head from "next/head";
import Image from "next/image";

export default function About() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white min-h-screen">
      <Head>
        <title>About - Campus Cart</title>
      </Head>

      {/* Header */}
      <header className="bg-blue-800 p-5 text-center text-2xl font-bold shadow-lg">
        Campus Cart
      </header>

      {/* About Section */}
      <main className="max-w-4xl mx-auto p-6 bg-blue-950 bg-opacity-90 shadow-lg rounded-lg mt-6">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p className="leading-relaxed">
          Campus Cart was created with the aim of making shopping easier and
          more accessible for students. We understand the struggles of managing
          academics, social life, and daily necessities, so we provide a
          convenient platform to purchase groceries without the hassle of
          leaving campus.
        </p>
        <p className="leading-relaxed mt-4">
          Our mission is to ensure that students have access to fresh,
          affordable, and quality groceries right at their doorstep. With a
          simple online ordering system and quick deliveries, we help students
          save time and focus on what truly matters.
        </p>
      </main>

      {/* Campus Section */}
      <section className="max-w-4xl mx-auto p-6 mt-6">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Campus</h2>
        <div className="overflow-hidden rounded-lg shadow-lg border-4 border-blue-300">
          <Image
            src="https://i.ytimg.com/vi/gzA-j9QYp3o/maxresdefault.jpg"
            alt="Campus"
            width={800}
            height={400}
            className="w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-center p-4 mt-6 shadow-lg">
        &copy; 2025 Campus Cart. All rights reserved.
      </footer>
    </div>
  );
}
