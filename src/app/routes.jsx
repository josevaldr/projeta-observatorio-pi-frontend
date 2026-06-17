import { createBrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "../shared/layouts/DashboardLayout.jsx";
import ProtectedRoute from "../shared/components/ProtectedRoute.jsx";
import GuestRoute from "../shared/components/GuestRoute.jsx";

// Auth pages
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";

// Student pages
import Projects from "../features/student/pages/Projects.jsx";
import Feed from "../features/student/pages/Feed.jsx";
import Portfolio from "../features/student/pages/Portfolio.jsx";
import Profile from "../features/student/pages/Profile.jsx";
import PublicPortfolio from "../features/portfolio/pages/PublicPortfolio.jsx";

// Teacher pages
import TeacherClasses from "../features/professor/pages/Classes.jsx";
import TeacherProjects from "../features/professor/pages/Projects.jsx";
import TeacherProfile from "../features/professor/pages/Profile.jsx";

const studentLinks = [
  { label: "Feed", path: "/aluno" },
  { label: "Projetos", path: "/aluno/projetos" },
  { label: "Portfolio", path: "/aluno/portfolio" },
  { label: "Perfil", path: "/aluno/perfil" },
];

const professorLinks = [
  { label: "Turmas", path: "/professor" },
  { label: "Projetos", path: "/professor/projetos" },
  { label: "Perfil", path: "/professor/perfil" },
];

// Define and export the router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/cadastrar",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    path: "/aluno",
    element: (
      <ProtectedRoute allowedRoles={["aluno"]}>
        <DashboardLayout sidebarLinks={studentLinks} />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Feed /> },
      { path: "projetos", element: <Projects /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "perfil", element: <Profile /> },
    ],
  },
  {
    path: "/professor",
    element: (
      <ProtectedRoute allowedRoles={["professor"]}>
        <DashboardLayout sidebarLinks={professorLinks} />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <TeacherClasses /> },
      { path: "projetos", element: <TeacherProjects /> },
      { path: "perfil", element: <TeacherProfile /> },
    ],
  },
  {
    path: "/portfolio/:username",
    element: <PublicPortfolio />,
  },
]);
