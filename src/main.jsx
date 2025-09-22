import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Error from "./Error";
import MentorsPage from "./pages/MentorsPage";
import CollegePage from "./pages/CollegePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppInitializer from "./components/AppInitializer";
import MentorProfilePage from "./pages/MentorProfilePage";
import MentorLoginPage from "./pages/Auth/MentorLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import { ToastContainer } from "react-toastify";
import SchedulePage from "./pages/SchedulePage";

const router = createBrowserRouter([
  {
    path: "/mentor/login",
    element: <MentorLoginPage />,
    errorElement: <Error />,
  },
  {
    path: "dashboard/mentor",
    element: (
      <ProtectedRoute requiredRole="mentor">
        <MentorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "student/dashboard",
    element: (
      <ProtectedRoute requiredRole="student">
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: "college",
        element: (
          <PublicRoute>
            <CollegePage />
          </PublicRoute>
        ),
      },
      {
        path: "college/:collegeId",
        element: (
          <PublicRoute>
            <MentorsPage />
          </PublicRoute>
        ),
      },
      { 
        path: "mentorspage",
        element: (
          <PublicRoute>
            <MentorsPage /> 
          </PublicRoute>
        ),
      },
      {
        path: "dashboard/schedule",
        element: (
          <ProtectedRoute requiredRole="student">
            <SchedulePage/>
          </ProtectedRoute>
        ),
      }, 
      {
        path: "profile/:id",
        element: (
          <ProtectedRoute requiredRole="student">
            <MentorProfilePage />
          </ProtectedRoute>
        ),
      }, 
    ],
  },
]);

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <GoogleOAuthProvider clientId={clientID}>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
    </GoogleOAuthProvider>
  </StrictMode>
);
