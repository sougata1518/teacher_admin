import { useState } from "react";
import Navbar from "./Navbar";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    description: "React, Tailwind, UI development"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Amazon",
    location: "Hyderabad",
    description: "Spring Boot, Microservices"
  }
];

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 p-4">
        
        {/* Left Sidebar */}
        <div className="col-span-3 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold mb-3">Filters</h3>
          <p className="text-sm text-gray-600 cursor-pointer">Remote</p>
          <p className="text-sm text-gray-600 cursor-pointer">Internship</p>
          <p className="text-sm text-gray-600 cursor-pointer">Full Time</p>
        </div>

        {/* Center Feed */}
        <div className="col-span-6 space-y-4">
          {jobs.map(job => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="bg-white p-4 rounded-xl shadow cursor-pointer hover:border-blue-500 border"
            >
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))}
        </div>

        {/* Right Panel - Selected Job */}
        <div className="col-span-3 bg-white rounded-xl p-4 shadow sticky top-20 h-fit">
          {selectedJob ? (
            <>
              <h2 className="text-xl font-bold mb-2">
                {selectedJob.title}
              </h2>
              <p className="text-gray-600">
                {selectedJob.company}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {selectedJob.location}
              </p>

              <p className="text-sm text-gray-700">
                {selectedJob.description}
              </p>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
                Apply
              </button>
            </>
          ) : (
            <p className="text-gray-500">Select a job</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
