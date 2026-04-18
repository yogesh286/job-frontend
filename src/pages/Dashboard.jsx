// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import { ResponsiveLine } from "@nivo/line";

function Dashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get("/applications");
        setApps(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const stats = {
    applied: apps.filter(a => a.status === "applied").length,
    interview: apps.filter(a => a.status === "interview").length,
    selected: apps.filter(a => a.status === "selected").length,
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex gap-6 p-6">

        {/* CENTER */}
        <div className="flex-[3] space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">

            <StatCard title="Applications" value={stats.applied} color="purple" />
            <StatCard title="Shortlisted" value={stats.interview} color="teal" />
            <StatCard title="Selected" value={stats.selected} color="orange" />

          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-700">
              Applications Overview
            </h2>

            <div style={{ height: 250 }}>
              <ResponsiveLine
                data={[
                  {
                    id: "Applications",
                    data: [
                      { x: "Mon", y: 2 },
                      { x: "Tue", y: 5 },
                      { x: "Wed", y: 3 },
                      { x: "Thu", y: 6 },
                      { x: "Fri", y: 4 },
                    ],
                  },
                ]}
                margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: 0, max: 10 }}

                curve="monotoneX"   // ✅ FIXED

                colors={["#7c3aed"]}
                lineWidth={3}
                pointSize={6}
                useMesh={true}
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-700">
              Recent Applications
            </h2>

            {apps.length === 0 && (
              <p className="text-gray-400 text-sm">No data</p>
            )}

            {apps.slice(0, 5).map((a) => (
              <div
                key={a._id}
                className="flex justify-between py-2 text-sm text-gray-600 border-b"
              >
                <span>{a.title}</span>
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {a.status}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-[1] space-y-6">

          {/* Profile */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <img
              src="https://i.pravatar.cc/100"
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <h2 className="font-semibold text-gray-800">
              Your Name
            </h2>
            <p className="text-sm text-gray-400">
              Developer
            </p>
          </div>

          {/* Activity */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-3 text-gray-700">
              Activity
            </h2>

            {apps.slice(0, 3).map((a) => (
              <p key={a._id} className="text-sm text-gray-500 mb-2">
                Applied for <b>{a.title}</b>
              </p>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">

      <p className="text-sm text-gray-500">{title}</p>

      <div className="flex items-center justify-between mt-3">

        <h2 className="text-xl font-bold text-gray-800">
          {value}
        </h2>

        <div
          className={`w-10 h-10 rounded-full ${
            color === "purple"
              ? "bg-purple-400"
              : color === "teal"
              ? "bg-teal-400"
              : "bg-orange-400"
          }`}
        />

      </div>

    </div>
  );
}

export default Dashboard;