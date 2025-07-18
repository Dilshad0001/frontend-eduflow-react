import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Grid, List, BookOpen, ChevronRight } from "lucide-react";
import axiosInstance from "../../AxioInstance";
import StudentLessonList from "./StudentLessonList";
import { useDarkMode } from "../../context/DarkModeContext";

const StudentSubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const getProgressData = (subjectId) => ({
    progress: Math.floor(Math.random() * 40) + 60,
    assignments: Math.floor(Math.random() * 10) + 1,
    lastAccessed: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No authorization token found. Please login.");
        setLoading(false);
        navigate("/login");
        return;
      }
      try {
        const response = await axiosInstance.get("student/subject");
        setSubjects(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to fetch subjects.");
        setSubjects([]);
        navigate("/student/createprofile=3");
      }
      setLoading(false);
    };
    fetchSubjects();
  }, [navigate]);

  useEffect(() => {
    if (selectedSubject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSubject]);

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubjectColor = (index) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-emerald-500 to-emerald-600",
      "from-orange-500 to-orange-600",
      "from-pink-500 to-pink-600",
      "from-teal-500 to-teal-600",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "text-slate-400" : "text-gray-600"
        }`}
      >
        Loading subjects...
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode
          ? "bg-slate-900 text-slate-200"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800"
      }`}
    >
      {/* Main content */}
      <div
        className={`max-w-7xl mx-auto px-4 py-8 transition duration-300 ${
          selectedSubject ? "filter blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Controls */}
        <div
          className={`rounded-2xl shadow-sm border p-6 mb-8 ${
            isDarkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? "text-slate-400" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-slate-200"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`flex rounded-xl p-1 ${
                  isDarkMode ? "bg-slate-700" : "bg-gray-100"
                }`}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? isDarkMode
                        ? "bg-slate-600 text-blue-400"
                        : "bg-white text-blue-600"
                      : isDarkMode
                      ? "text-slate-300"
                      : "text-gray-500"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? isDarkMode
                        ? "bg-slate-600 text-blue-400"
                        : "bg-white text-blue-600"
                      : isDarkMode
                      ? "text-slate-300"
                      : "text-gray-500"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div
            className={`border-l-4 p-6 rounded-r-xl shadow-sm mb-8 ${
              isDarkMode
                ? "bg-slate-800 border-red-500"
                : "bg-red-50 border-red-400"
            }`}
          >
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {filteredSubjects.length === 0 && !error && (
          <div className="text-center py-16">
            <BookOpen
              className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? "text-slate-400" : "text-gray-400"
              }`}
            />
            <h3 className="text-lg font-semibold">
              {searchTerm ? "No subjects found" : "No subjects enrolled"}
            </h3>
          </div>
        )}

        {/* Subject Cards */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-4"
          }
        >
          {filteredSubjects.map((subject, index) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="group block cursor-pointer relative"
            >
              <div
                className={`rounded-2xl shadow-sm hover:shadow-lg border overflow-hidden transition-transform transform ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`h-2 bg-gradient-to-r ${getSubjectColor(index)}`}
                ></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getSubjectColor(
                        index
                      )} rounded-xl flex items-center justify-center text-white font-bold`}
                    >
                      {subject.subject_name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 ${
                        isDarkMode ? "text-slate-400" : "text-gray-400"
                      } opacity-0 group-hover:opacity-100`}
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {subject.subject_name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {subject.course}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
          <div
            className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-2xl shadow-xl relative ${
              isDarkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => setSelectedSubject(null)}
              className={`absolute top-3 right-3 rounded-full p-2 ${
                isDarkMode
                  ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              {selectedSubject.subject_name} - {selectedSubject.course}
            </h2>
            <StudentLessonList subjectId={selectedSubject.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSubjectList;
