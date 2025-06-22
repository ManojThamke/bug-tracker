import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Kanban from "./pages/Kanban";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import AssignedIssues from "./pages/AssignedIssues";
import FilterSearch from "./pages/FilterSearch";
import Settings from "./pages/Settings";
import CreateTicket from "./pages/CreateTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes → INSIDE Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="projects" element={<Projects />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="assigned-issues" element={<AssignedIssues />} />
          <Route path="filter-search" element={<FilterSearch />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-ticket" element={<CreateTicket />} />
        </Route>
      </Routes>

      {/* Toast notifications → visible globally */}
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </BrowserRouter>
  );
}

export default App;
