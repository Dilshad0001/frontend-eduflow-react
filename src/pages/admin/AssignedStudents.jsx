





import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";
import { useNavigate } from "react-router-dom";

const AssignedStudents = ({ assignment }) => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, completed, not_completed
  const [markFilter, setMarkFilter] = useState("all"); // all, with_mark, no_mark

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;







  useEffect(() => {
  const fetchSubmission = async () => {
    // Reset state on assignment change
    setFilter("all");
    setMarkFilter("all");
    setSubmission([]);
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `adminuser/submission/?assignmentId=${assignment.id}`
      );
      setSubmission(response.data);
    } catch (err) {
      setError("Failed to fetch submissions.");
    } finally {
      setLoading(false);
    }
  };

  if (assignment?.id) {
    fetchSubmission();
  }
}, [assignment?.id]);


  const filteredSubmission = submission.filter((item) => {
    if (filter === "completed") {
      if (!item.is_completed) return false;

      if (markFilter === "with_mark")
        return item.mark !== null && item.mark !== undefined;
      if (markFilter === "no_mark")
        return item.mark === null || item.mark === undefined;
    } else if (filter === "not_completed") {
      return !item.is_completed;
    }

    return true;
  });

  return (
    <div className="mt-6 border rounded-lg p-0 bg-white w-130 shadow">
      {/* Filter Buttons */}
      <div className="flex gap-2 px-4 py-2">
        {["all", "completed", "not_completed"].map((key) => (
          <button
            key={key}
            className={`px-3 py-1 text-sm rounded border ${
              filter === key
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setFilter(key)}
          >
            {key === "not_completed"
              ? "Not Completed"
              : key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Additional Filter for Mark when Completed is selected */}
      {filter === "completed" && (
        <div className="flex gap-2 px-4 py-2">
          {[
            { key: "all", label: "All Marks" },
            { key: "with_mark", label: "With Mark" },
            { key: "no_mark", label: "No Mark" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`px-3 py-1 text-sm rounded border ${
                markFilter === key
                  ? "bg-green-600 text-white border-green-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setMarkFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Loading / Error / Table */}
      {loading ? (
        <p className="p-4">Loading submissions...</p>
      ) : error ? (
        <p className="text-red-500 p-4">{error}</p>
      ) : (
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">#</th>
              <th className="text-left px-4 py-2 border-b">Student Name</th>
              <th className="text-left px-4 py-2 border-b">Completed</th>
              <th className="text-left px-4 py-2 border-b">File</th>
              <th className="text-left px-4 py-2 border-b">Submitted At</th>
              <th className="text-left px-4 py-2 border-b">Mark</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmission.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/admin/submission/${item.id}`)}
              >
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{item.student}</td>
                <td className="px-4 py-2 border-b">
                  {item.is_completed ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border-b">
                  {item.file ? (
                    <a
                      href={`${BASE_URL}${item.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 underline"
                    >
                      View File
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No file</span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {item.submitted_at
                    ? new Date(item.submitted_at).toLocaleString()
                    : "—"}
                </td>
                <td className="px-4 py-2 border-b">{item.mark ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedStudents;
