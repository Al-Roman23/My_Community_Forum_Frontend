import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import CountdownTimer from "../../components/CountdownTimer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const eventTypes = [
  "Cultural Parade",
  "Street Festival",
  "Heritage Festival",
  "Film Support",
  "Music Festival",
  "National Celebration",
];

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserEvents = async (typeQuery = "") => {
    if (!user || typeof user.getIdToken !== "function") return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const params = {};
      if (typeQuery) params.type = typeQuery;
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/my-events`,
        { headers: { Authorization: `Bearer ${token}` }, params }
      );
      const data = Array.isArray(res.data) ? res.data : res.data?.events || [];
      setEvents(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch {
      Swal.fire("Error", "Failed to load your events!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserEvents(filterType);
  }, [user, filterType]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;
    if (new Date(editingEvent.date) < new Date())
      return Swal.fire("Error", "Date must be in the future!", "error");
    try {
      const token = await user.getIdToken();
      const { _id, ...updatedData } = editingEvent;
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/events/${_id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Updated!", "Event updated successfully!", "success");
      setEditingEvent(null);
      fetchUserEvents(filterType);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to update event!",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete your event permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;
    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted!", "Event deleted successfully.", "success");
      fetchUserEvents(filterType);
    } catch {
      Swal.fire("Error", "Failed to delete event!", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading your events...
      </div>
    );

  if (!events.length)
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        You haven’t created any events yet!
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto text-center mb-10 mt-20">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Manage Your Events
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          View, edit, or delete events you’ve created. Stay organized and keep
          your community engaged by managing your upcoming activities
          efficiently.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-6">
        <div className="flex-1 mt-2">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900"
              >
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6 space-y-2 text-gray-900 dark:text-gray-100 text-sm sm:text-base">
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
                  <p className="flex items-baseline gap-2">
                    <span className="font-semibold">Countdown:</span>
                    <span className="relative -top-0.3 text-yellow-600 dark:text-yellow-400">
                      <CountdownTimer targetDate={event.date} />
                    </span>
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="btn btn-sm btn-outline btn-primary flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-sm btn-outline btn-error flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-56 flex-shrink-0 mt-4 md:mt-3">
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

      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start md:items-center overflow-y-auto z-50 py-10">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-xl w-full max-w-lg mx-4 md:mx-0">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
              Edit Event
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                placeholder="Event Title"
                className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
              <textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                placeholder="Event Description"
                className="textarea textarea-bordered w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
              <select
                value={editingEvent.eventType}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    eventType: e.target.value,
                  })
                }
                className="select select-bordered w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={editingEvent.thumbnail}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    thumbnail: e.target.value,
                  })
                }
                placeholder="Thumbnail URL"
                className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <input
                type="text"
                value={editingEvent.location}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, location: e.target.value })
                }
                placeholder="Event Location"
                className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <DatePicker
                selected={new Date(editingEvent.date)}
                onChange={(d) => setEditingEvent({ ...editingEvent, date: d })}
                minDate={new Date()}
                className="input input-bordered w-full rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-outline flex-1 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setEditingEvent(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
