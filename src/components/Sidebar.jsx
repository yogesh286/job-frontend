// components/Sidebar.jsx
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 h-auto bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Job Portal</h2>

      <ul className="space-y-4">

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400"
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400"
            }
          >
            Jobs
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/my-applications"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400"
            }
          >
            My Applications
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/kanban"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400"
            }
          >
            Tracker
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;