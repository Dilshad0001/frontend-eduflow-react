
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid3X3, List, Calendar, Clock, AlertTriangle,
  UploadCloud, UserX, XCircle
} from "lucide-react";
import axiosInstance from "../../AxioInstance";
import { useDarkMode } from "../../context/DarkModeContext";




const StudentPendingTasks = () => {
  const { isDarkMode } = useDarkMode();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCardView, setIsCardView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const BASE_URL=import.meta.env.VITE_API_BASE_URL;

  const fetchSubmissions = async () => {
    try {
      const res = await axiosInstance.get("student/submission/");
      const incomplete = res.data.filter((item) => !item.is_completed);
      setSubmissions(incomplete);
      setError("");
    } catch (err) {
      console.error("Fetch submission error:", err);
      setError("Failed to load submissions.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);
  console.log("sub file==",submissions);
  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const isOverdue = (date) => new Date(date) < new Date();

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getPriorityLevel = (date) => {
    const daysLeft = getDaysUntilDeadline(date);
    const overdue = isOverdue(date);
    if (overdue) return { label: "Overdue", level: 4 };
    if (daysLeft <= 1) return { label: "Critical", level: 3 };
    if (daysLeft <= 3) return { label: "High", level: 2 };
    return { label: "Normal", level: 1 };
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setFile(null);
    setUploadError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
    setFile(null);
    setUploadError("");
  };

  const handleFileUpload = async () => {
    if (!file || !selectedSubmission) {
      setUploadError("Please select a file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.patch(`student/submission/?submissionId=${selectedSubmission.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      closeModal();
      fetchSubmissions(); // refresh after upload
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  console.log("file==",submissions);
  

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Pending Submissions</h2>
          <div className="flex gap-2">
            <button onClick={() => setIsCardView(true)} className={`p-2 rounded ${isCardView ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
              <Grid3X3 />
            </button>
            <button onClick={() => setIsCardView(false)} className={`p-2 rounded ${!isCardView ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
              <List />
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-10">
            <div className="inline-flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24"></svg>
              <span>Loading...</span>
            </div>
          </div>
        )}

        {error && <div className="p-4 bg-red-100 text-red-800 rounded">{error}</div>}

        {!loading && !error && submissions.length === 0 && (
          <div className="text-center text-gray-500">
            <UserX className="mx-auto mb-2 w-12 h-12" />
            No pending submissions.
          </div>
        )}

        {!loading && !error && submissions.length > 0 && (
          <div className={`grid gap-6 ${isCardView ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {submissions.map((submission) => {
              const overdue = isOverdue(submission.submitted_at);
              const priority = getPriorityLevel(submission.submitted_at);

              return (
                <div key={submission.id} className={`group border ${isDarkMode ? "bg-gray-800 border-gray-700 hover:border-blue-500" : "bg-white border-gray-200 hover:border-blue-300"} rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-200`}>
                  <div className="p-4 flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-1">{submission.assignment}</h3>

 <div className="text-sm mb-2 flex items-center gap-1">
  <UploadCloud className="w-4 h-4" />
  File:{" "}
<a
  href={`${BASE_URL}${submission.file}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 underline hover:text-blue-800"
>
  View
</a>

</div>

                    <p className="text-sm mb-2 text-gray-500">Status: {submission.status}</p>

                    <div className="text-sm mb-2 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Submitted At: {formatDate(submission.submitted_at)}
                    </div>

                    <div className="text-sm mb-2 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Priority: {priority.label}
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                      <button
                        onClick={() => openModal(submission)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 text-sm"
                      >
                        <UploadCloud className="w-4 h-4" />
                        Submit
                      </button>

                      {overdue && (
                        <div className="text-red-600 text-xs flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          Overdue
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Popup Modal */}
{showModal && (
  <div className="fixed inset-0 backdrop-blur-sm bg-black/30 dark:bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white  p-6 rounded-lg w-full max-w-md shadow-lg relative">
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
        <XCircle size={20} />
      </button>
      <h3 className="text-lg font-semibold mb-4">Submit Assignment</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 w-full"
      />

      {uploadError && <p className="text-red-500 text-sm mb-2">{uploadError}</p>}

      <button
        onClick={handleFileUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
      >
        {uploading ? "Submitting..." : "Submit"}
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default StudentPendingTasks;
