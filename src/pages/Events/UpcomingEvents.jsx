import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../../components/CountdownTimer";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");

  const fetchEvents = async (typeQuery = "") => {
    setLoading(true);
    try {
      const params = {};
      if (typeQuery) params.type = typeQuery;
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/search`,
        { params }
      );
      const data = Array.isArray(res.data) ? res.data : res.data?.events || [];
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(filterType);
  }, [filterType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-400 text-lg">
        Loading events...
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-400 text-lg text-center px-4">
        No upcoming events found!
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto text-center mb-10 mt-20 px-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Upcoming Events
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
          Explore and join meaningful community events happening near you. Stay
          engaged, make a difference, and track when each event begins.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10">
        <div className="flex-1 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900"
              >
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-48 sm:h-52 object-cover"
                />
                <div className="p-4 sm:p-6 space-y-2 text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                  <p>
                    <span className="font-semibold">Title:</span>{" "}
                    <span className="text-blue-700 dark:text-blue-400">
                      {event.title}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {event.description || "No description available"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    <span className="text-red-500 dark:text-red-400">
                      {event.location}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    <span className="text-purple-600 dark:text-purple-400">
                      {event.eventType}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex flex-wrap items-baseline gap-2">
                    <span className="font-semibold">Countdown:</span>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      <CountdownTimer targetDate={event.date} />
                    </span>
                  </p>
                  <Link
                    to={`/event/${event._id}`}
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-64 flex-shrink-0 mt-6 md:mt-3">
          <div className="sticky md:top-28 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 text-center md:text-left">
              Filter by Type
            </h3>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="">All Types</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
