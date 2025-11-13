import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import { getAuth } from "firebase/auth";
import CountdownTimer from "../../components/CountdownTimer";

const eventTypes = [
  "Cultural Parade",
  "Street Festival",
  "Heritage Festival",
  "Film Support",
  "Music Festival",
  "National Celebration",
];

const JoinedEvents = () => {
  const { user, loading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [joiningIds, setJoiningIds] = useState([]);
  const [filterType, setFilterType] = useState("");

  const fetchJoinedEvents = async () => {
    setFetching(true);
    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) return;
      const token = await currentUser.getIdToken(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/joinedEvents/my-joined`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sorted = (
        Array.isArray(res.data) ? res.data : res.data?.events || []
      )
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((e) => ({ ...e, hasJoined: true }));
      setAllEvents(sorted);
      setEvents(sorted);
    } catch {
      Swal.fire("Error", "Failed to load joined events!", "error");
    } finally {
      setFetching(false);
    }
  };

  const joinEvent = async (id) => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) return Swal.fire("Error", "Please login!", "error");
    setJoiningIds((prev) => [...prev, id]);
    try {
      const token = await currentUser.getIdToken(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/joinedEvents`,
        { eventId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", "You have joined this event!", "success");
      setEvents((prev) =>
        prev.map((e) => (e._id === id ? { ...e, hasJoined: true } : e))
      );
      setAllEvents((prev) =>
        prev.map((e) => (e._id === id ? { ...e, hasJoined: true } : e))
      );
    } catch {
      Swal.fire("Error", "Failed to join event!", "error");
    } finally {
      setJoiningIds((prev) => prev.filter((i) => i !== id));
    }
  };

  useEffect(() => {
    if (!loading && user) fetchJoinedEvents();
  }, [user, loading]);

  useEffect(
    () =>
      setEvents(
        filterType
          ? allEvents.filter((e) => e.eventType === filterType)
          : allEvents
      ),
    [filterType, allEvents]
  );

  if (loading || fetching)
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading joined events...
      </div>
    );

  if (!user)
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Please login to view your joined events.
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto text-center mb-10 mt-20">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          My Joined Events
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Keep track of all the events you’ve joined, see upcoming dates, and
          stay engaged with your community. Easily monitor your participation
          and never miss an event you care about.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!events.length && (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              No joined events.
            </p>
          )}
          {events.map((e) => {
            const joining = joiningIds.includes(e._id);
            return (
              <div
                key={e._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900"
              >
                <img
                  src={e.thumbnail}
                  alt={e.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 space-y-2 text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                  <p>
                    <span className="font-semibold">Title:</span>{" "}
                    <span className="text-blue-700 dark:text-blue-400">
                      {e.title}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {e.description || "No description available"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    <span className="text-red-500 dark:text-red-400">
                      {e.location}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    <span className="text-purple-600 dark:text-purple-400">
                      {e.eventType}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      {new Date(e.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex items-baseline gap-2">
                    <span className="font-semibold">Countdown:</span>
                    <span className="relative -top-0.3 text-yellow-600 dark:text-yellow-400">
                      <CountdownTimer targetDate={e.date} />
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => joinEvent(e._id)}
                  disabled={e.hasJoined || joining}
                  className={`mt-3 w-full py-2 font-semibold rounded-lg transition ${
                    e.hasJoined
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {e.hasJoined
                    ? "Joined"
                    : joining
                    ? "Joining..."
                    : "Join Event"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full md:w-56 flex-shrink-0">
          <div className="sticky top-28 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Filter by Type
            </h3>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="">All Types</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="h-5"></div>
    </div>
  );
};

export default JoinedEvents;
