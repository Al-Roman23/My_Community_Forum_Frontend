import React from "react";
import { FaReddit, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-200 pt-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">MyCommunityForum</h2>
          <p className="text-gray-400 mb-2">
            Empowering communities, one event at a time.
          </p>
          <p className="text-gray-400">
            MyCommunityForum is a community-driven platform to create, join, and
            track social service events in your local area.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              "Home",
              "Upcoming Events",
              "Create Event",
              "Joined Events",
              "Manage Events",
            ].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <p className="text-gray-400 mb-4">
            Email:{" "}
            <a
              href="mailto:support@socialserve.com"
              className="hover:text-white"
            >
              mycommunityforum@gmail.com
            </a>
          </p>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">
            <a
              href="https://x.com"
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaSquareXTwitter />
            </a>
            <a
              href="https://reddit.com"
              aria-label="Reddit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              <FaReddit />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 dark:bg-black border-t border-gray-700 text-center py-5 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyCommunityForum. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
