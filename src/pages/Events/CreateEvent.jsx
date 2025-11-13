import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../provider/AuthContext";

const eventTypes = [
  "Cultural Parade",
  "Street Festival",
  "Heritage Festival",
  "Film Support",
  "Music Festival",
  "National Celebration",
];

const CreateEvent = () => {
  const { user, loading } = useContext(AuthContext);
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Swal.fire("Error", "Please log in before creating an event.", "error");
      return navigate("/login");
    }

    if (!date || date < new Date()) {
      Swal.fire("Error", "Please select a future date!", "error");
      return;
    }

    const eventData = {
      ...formData,
      date: date.toISOString(),
      creatorEmail: currentUser.email,
    };

    try {
      const token = await currentUser.getIdToken(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/events`,
        eventData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success!", "Event created successfully!", "success");
        navigate("/upcoming-events");
      } else {
        Swal.fire("Warning", "Unexpected response from server!", "warning");
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to create event!",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Loading user information...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="h-20"></div>
      <div className="flex-1 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              Organize Your Event
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Create and share events with your community easily. Reach out to
              volunteers, manage event details, and inspire others to make a
              positive impact together.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="title"
                onChange={handleChange}
                placeholder="Event Title"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
              <textarea
                name="description"
                onChange={handleChange}
                placeholder="Event Description"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                rows={4}
                required
              />
              <select
                name="eventType"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              >
                <option value="">Select Event Type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                name="thumbnail"
                onChange={handleChange}
                placeholder="Thumbnail Image URL"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
              <input
                name="location"
                onChange={handleChange}
                placeholder="Location"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                minDate={new Date()}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholderText="Select Event Date"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="h-24"></div>
    </div>
  );
};

export default CreateEvent;
