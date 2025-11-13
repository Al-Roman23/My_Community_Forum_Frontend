import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => alert("Sign-out successful."))
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <nav className="w-full bg-base-100 shadow-md py-3 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10">
        <div className="text-xl sm:text-2xl font-bold text-primary">
          <Link to="/">MyCommunityForum</Link>
        </div>

        <div className="hidden md:block">
          <Link
            to="/upcoming-events"
            className="text-base-content hover:text-primary font-medium"
          >
            Upcoming Events
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          {!user ? (
            <Link
              to="/login"
              className="hidden md:inline-block btn btn-sm btn-primary text-primary-content"
            >
              Login
            </Link>
          ) : (
            <div className="hidden md:block dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle tooltip tooltip-bottom avatar"
                data-tip={user.name}
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt={user.name} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/create-event">Create Event</Link>
                </li>
                <li>
                  <Link to="/manage-events">Manage Event</Link>
                </li>
                <li>
                  <Link to="/joined-events">Joined Event</Link>
                </li>
                <li>
                  <button
                    className="btn btn-error btn-sm w-full"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-base-100 border-t border-gray-200 dark:border-gray-700 mt-3 px-4 py-3 space-y-3">
          <Link
            to="/upcoming-events"
            className="block text-base-content hover:text-primary font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Upcoming Events
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="block btn btn-sm btn-primary text-primary-content w-full"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 rounded-full overflow-hidden">
                  <img src={user.photoURL} alt={user.name} />
                </div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  {user.name}
                </p>
              </div>
              <Link
                to="/create-event"
                className="block text-base-content hover:text-primary font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Create Event
              </Link>
              <Link
                to="/manage-events"
                className="block text-base-content hover:text-primary font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Manage Event
              </Link>
              <Link
                to="/joined-events"
                className="block text-base-content hover:text-primary font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Joined Event
              </Link>
              <button
                className="btn btn-error btn-sm w-full"
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
