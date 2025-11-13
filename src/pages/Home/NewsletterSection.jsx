import React from "react";

const NewsletterSection = () => {
  return (
    <div className="w-full mx-auto">
      <section className="py-16 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-center px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Subscribe to get the latest community events and updates directly in
          your inbox.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email."
            className="w-full sm:flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors"
          />
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewsletterSection;
