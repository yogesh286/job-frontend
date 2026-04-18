// src/pages/MyApplications.jsx

import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function fetchApps() {
      const res = await API.get("/applications");
      setApps(res.data);
    }
    fetchApps();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        
        <h1 className="text-2xl font-bold mb-6">
          My Applications
        </h1>

        {apps.length === 0 ? (
          <p className="text-gray-500">No applications yet 😢</p>
        ) : (
          <div className="space-y-4">
            {apps.map((app) => (
              <div
                key={app._id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <h2 className="font-semibold text-lg">
                  {app.title}
                </h2>

                <p className="text-sm text-gray-500">
                  Status: {app.status}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyApplications;