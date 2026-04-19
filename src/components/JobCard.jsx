// src/components/JobCard.jsx

import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { MapPin, Clock } from "lucide-react";

function JobCard({ job, isApplied }) {
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(isApplied);
  }, [isApplied]);

  const applyJob = async () => {
    try {
      await API.post(`/applications/${job._id}`);
      setApplied(true);
      toast.success("Applied 🚀");
    } catch {
      setApplied(true);
      toast.error("Already applied ❌");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition duration-300 border">

      {/* 🔹 Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-gray-400">
            {job.company || "Company"}
          </p>
          <h2 className="text-lg font-semibold text-gray-800">
            {job.title}
          </h2>
        </div>

        {/* Save badge */}
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {applied ? "Saved" : "New"}
        </span>
      </div>

      {/* 🔹 Tags */}
      <div className="flex gap-2 flex-wrap mb-4">
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          Full-time
        </span>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          Remote
        </span>
      </div>

      {/* 🔹 Info */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>India</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>2d ago</span>
        </div>
      </div>

      {/* 🔹 Salary */}
      <p className="font-semibold text-gray-800 mb-4">
        ₹5L - ₹12L / year
      </p>

      {/* 🔹 Button */}
      <button
        onClick={applyJob}
        disabled={applied}
        className={`w-full py-2 rounded-lg text-sm font-medium transition ${
          applied
            ? "bg-green-500 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {applied ? "Applied ✅" : "Apply now"}
      </button>

    </div>
  );
}

export default JobCard;