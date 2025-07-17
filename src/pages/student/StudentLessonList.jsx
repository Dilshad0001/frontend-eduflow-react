
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ChevronRight, Clock, CheckCircle, AlertCircle, Video, Eye } from "lucide-react";
import axiosInstance from "../../AxioInstance";


function StudentLessonList({ subjectId }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getLessonProgress = (lessonId, index) => ({
    progress: Math.floor(Math.random() * 100),
    isCompleted: Math.random() > 0.7,
    duration: `${Math.floor(Math.random() * 25) + 5} min`,
    viewCount: Math.floor(Math.random() * 150) + 20,
  });

  const getLessonColor = (index) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-emerald-500 to-emerald-600",
      "from-orange-500 to-orange-600",
      "from-pink-500 to-pink-600",
      "from-teal-500 to-teal-600",
      "from-indigo-500 to-indigo-600",
      "from-rose-500 to-rose-600",
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchLessons = async () => {
      if (!subjectId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`student/lesson/?subjectId=${subjectId}`);
        setLessons(response.data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons");
        setLessons([]);
      }

      setLoading(false);
    };

    fetchLessons();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-1">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Video className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No lessons found</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Lessons will appear here once they're added to this subject.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => {
        const progressData = getLessonProgress(lesson.id, index);

        return (
          <div
            key={lesson.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/student/lesson/${lesson.id}`)}
          >
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 group-hover:border-blue-300">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    {lesson.video ? (
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 relative">
                        <video
                          src={lesson.video}
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`w-16 h-12 bg-gradient-to-br ${getLessonColor(
                          index
                        )} rounded-lg flex items-center justify-center`}
                      >
                        <Video className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="absolute -top-1 -left-1 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {lesson.lesson_name}
                    </h3>

                    <div className="mt-2 flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getLessonColor(
                            index
                          )}`}
                          style={{ width: `${progressData.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {progressData.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center space-x-6 mx-6">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{progressData.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{progressData.viewCount}</span>
                  </div>
                  <div className="flex items-center">

                  </div>
                </div>

                <div className="flex items-center space-x-3 ml-4">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                      Continue
                    </button>

                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StudentLessonList;
