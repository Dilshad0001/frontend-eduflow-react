


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";

function StudentLessonDetail() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const DUMMY_LESSON = {
    lesson_name: "Introduction to Web Development",
    video: "/media/sample-video.mp4",
    chapter: "Getting Started with HTML",
    description:
      "This lesson introduces you to the basics of web development. You will learn how HTML forms the structure of web pages and how to use tags effectively.",
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axiosInstance.get(`student/lesson/?lessonId=${lessonId}`);
        setLesson(response.data || DUMMY_LESSON);
      } catch (err) {
        console.error("Error fetching lesson, using dummy data:", err);
        setLesson(DUMMY_LESSON);
      }
      setLoading(false);
    };

    fetchLesson();
  }, [lessonId]);

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400 mx-auto"></div>
          </div>
          <p className="text-xl font-semibold text-slate-700 animate-pulse">
            Loading lesson content...
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Preparing your learning materials
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Chapter</span>
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-800 font-medium">{lesson.lesson_name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {lesson.video && (
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
                <div className="aspect-video relative">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                  >
                    <source src={`http://localhost:8000${lesson.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-white text-sm">
                          <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-400" : "bg-red-400"} animate-pulse`}></div>
                          <span>{isPlaying ? "Playing" : "Paused"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-200">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.lesson_name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {lesson.chapter}
                  </span>
                </div>
              </div>
              <div className="prose max-w-none">
                <h3>About this lesson</h3>
                <p>{lesson.description}</p>
              </div>
            </div>
          </div>

          {/* Lesson Info & Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* ✅ Lesson Info Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
              <h4 className="font-semibold text-lg mb-4">Lesson Info</h4>
              <ul className="text-sm text-gray-700 space-y-3">
                <li className="flex justify-between"><span>Lesson ID</span><span>8</span></li>
                <li className="flex justify-between"><span>Duration</span><span>15 minutes</span></li>
                <li className="flex justify-between"><span>Level</span><span>Beginner</span></li>
                <li className="flex justify-between"><span>Format</span><span>Video + Text</span></li>
              </ul>
            </div>

            {/* ✅ Quick Actions Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow space-y-3">
              <h4 className="font-semibold text-lg mb-4">Quick Actions</h4>
              <button className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-lg">
                Take Notes
              </button>
              <button className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-lg">
                Ask a Question
              </button>
              <button className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-lg">
                Download Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLessonDetail;
