// src/pages/Jobs.jsx

import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const res = await API.get("/jobs");
      setJobs(res.data);
    }

    async function fetchApplied() {
      const res = await API.get("/applications");
      const ids = res.data.map(a => a.jobId || a._id);
      setAppliedJobs(ids);
    }

    fetchJobs();
    fetchApplied();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6 min-h-screen">
        
        <h1 className="text-2xl font-bold mb-6">Jobs</h1>

        {/* 🔍 Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full p-3 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🔥 Jobs */}
        {filteredJobs.length === 0 ? (
          <p>No jobs found 😢</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isApplied={appliedJobs.includes(job._id)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Jobs;