import { createBrowserRouter, Navigate } from "react-router-dom";

// Import your components
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";

// Define and export the router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
