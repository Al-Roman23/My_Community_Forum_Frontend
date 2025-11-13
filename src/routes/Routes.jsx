import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UpcomingEvents from "../pages/Events/UpcomingEvents";
import PrivateRoute from "./PrivateRoute";
import CreateEvent from "../pages/Events/CreateEvent";
import ManageEvents from "../pages/Events/ManageEvents";
import JoinedEvents from "../pages/Events/JoinedEvents";
import EventDetails from "../pages/Events/EventDetails";
import PassedEventPhotos from "../components/PassedEventPhotos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <h1>Sorry!</h1> },
      { path: "upcoming-events", element: <UpcomingEvents /> },
      { path: "event/:id", element: <EventDetails /> },
      { path: "passed-event-photos", element: <PassedEventPhotos /> },
      {
        path: "create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
