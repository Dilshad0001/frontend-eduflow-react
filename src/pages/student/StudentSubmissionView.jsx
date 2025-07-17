
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Award,
  CheckCircle,
  AlertTriangle,
  FileText,
  ExternalLink,
} from "lucide-react";
import axiosInstance from "../../AxioInstance";
import { useDarkMode } from "../../context/DarkModeContext";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;



const StudentSubmissionView = () => {
  const { isDarkMode } = useDarkMode();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCardView, setIsCardView] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get("student/submission/");
        setSubmissions(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions. Redirecting to create profile...");
        setTimeout(() => {
          navigate("/student/createprofile=4");
        }, 1500);
      }
      setLoading(false);
    };

    fetchSubmissions();
  }, [navigate]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "submitted":
        return "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100";
      case "graded":
        return "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100";
      case "pending":
        return "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
      case "rejected":
        return "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getGradientColor = (status) => {
    switch (status?.toLowerCase()) {
      case "submitted":
        return "from-slate-500 to-slate-600";
      case "graded":
        return "from-green-500 to-green-600";
      case "pending":
        return "from-yellow-500 to-yellow-600";
      case "rejected":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getMarkColor = (mark) => {
    if (mark >= 90) return "text-green-700 dark:text-green-300";
    if (mark >= 80) return "text-emerald-700 dark:text-emerald-300";
    if (mark >= 70) return "text-yellow-700 dark:text-yellow-300";
    if (mark >= 60) return "text-orange-700 dark:text-orange-300";
    return "text-red-700 dark:text-red-300";
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "submitted":
        return <CheckCircle className="w-4 h-4 text-white" />;
      case "graded":
        return <Award className="w-4 h-4 text-white" />;
      case "pending":
        return <Clock className="w-4 h-4 text-white" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-white" />;
      default:
        return <FileText className="w-4 h-4 text-white" />;
    }
  };

  const CardView = () => (
    <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className={`group w-[75%] h-[75%] mx-auto rounded-xl border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className={`h-1.5 bg-gradient-to-r ${getGradientColor(submission.status)}`} />
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getGradientColor(
                    submission.status
                  )} flex items-center justify-center shadow-md`}
                >
                  {getStatusIcon(submission.status)}
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                    submission.status
                  )}`}
                >
                  {submission.status}
                </span>
              </div>
            </div>
            <h3
              className={`text-base font-semibold line-clamp-2 group-hover:text-slate-700 transition-colors ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {submission.assignment}
            </h3>

            {submission.mark !== null && (
              <div
                className={`rounded-lg p-3 border ${
                  isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Grade</span>
                  <span className={`text-xl font-bold ${getMarkColor(submission.mark)}`}>
                    {submission.mark}
                    <span className="text-sm font-normal">/100</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      submission.mark >= 90
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                        : submission.mark >= 80
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : submission.mark >= 70
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                        : submission.mark >= 60
                        ? "bg-gradient-to-r from-orange-400 to-orange-600"
                        : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                    style={{ width: `${submission.mark}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Submitted: {formatDate(submission.submitted_at)}</span>
            </div>

            {submission.file && (
              <a
                href={`${BACKEND_URL}${submission.file}`}
                className="inline-flex items-center justify-center py-2 px-4 w-full rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-medium transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Submission
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className={`group w-[90%] max-w-md mx-auto rounded-xl border hover:shadow-md transition-all duration-300 ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradientColor(
                  submission.status
                )} flex items-center justify-center`}
              >
                {getStatusIcon(submission.status)}
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {submission.assignment}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(submission.submitted_at)}
                </div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div
                className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                  submission.status
                )}`}
              >
                {submission.status}
              </div>
              {submission.mark !== null && (
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Grade: {submission.mark}/100
                </div>
              )}
              {submission.file && (
                <a
                  href={`${BACKEND_URL}${submission.file}`}
                  className="inline-flex items-center justify-center py-2 px-4 w-full rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-medium transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Submission
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-6 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : submissions.length === 0 ? (
          <div>No submissions found.</div>
        ) : isCardView ? (
          <CardView />
        ) : (
          <ListView />
        )}
      </div>
    </div>
  );
};

export default StudentSubmissionView;
