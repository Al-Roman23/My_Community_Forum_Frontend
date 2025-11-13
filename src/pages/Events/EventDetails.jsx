import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import { getAuth } from "firebase/auth";
import CountdownTimer from "../../components/CountdownTimer";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}`
        );
        const eventData = res.data || res.data.event;
        setEvent(eventData);

        if (currentUser) {
          const token = await currentUser.getIdToken(true);
          const joinedRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/joinedEvents/my-joined`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const joinedEventIds = joinedRes.data.map((e) => e._id);
          setHasJoined(joinedEventIds.includes(id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, currentUser]);

  const handleJoin = async () => {
    if (!currentUser) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to join an event.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then((res) => {
        if (res.isConfirmed) navigate("/login", { state: { from: location } });
      });
      return;
    }

    try {
      setJoining(true);
      const token = await currentUser.getIdToken(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/joinedEvents`,
        { eventId: event._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire(
        "Success",
        "You have successfully joined the event!",
        "success"
      );
      setHasJoined(true);
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to join event!",
        "error"
      );
    } finally {
      setJoining(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        Loading event details...
      </div>
    );

  if (!event)
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        Event not found or deleted.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="text-center mb-10 mt-6 sm:mt-12">
        <h1 className="text-5xl sm:text-2xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
          Event Details
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mx-auto">
          Everything you need to know about this event, from date and location
          to type and countdown.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-64 sm:h-80 object-cover"
        />
        <div className="p-8 space-y-5 text-gray-900 dark:text-gray-100 text-base sm:text-lg">
          <p>
            <span className="font-semibold text-lg">Title:</span>{" "}
            <span className="text-blue-700 dark:text-blue-400 text-xl">
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
          <p className="flex items-baseline gap-2">
            <span className="font-semibold">Countdown:</span>
            <span className="relative -top-0.5 text-yellow-600 dark:text-yellow-400">
              <CountdownTimer targetDate={event.date} />
            </span>
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleJoin}
              disabled={joining || hasJoined}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-colors duration-300 ${
                hasJoined
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {hasJoined
                ? "Already Joined"
                : joining
                ? "Joining..."
                : "Join Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
