


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";

const LessonDetailPage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const BASE_URL=import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axiosInstance.get(`adminuser/lesson/?lessonId=${lessonId}`);
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setLesson(null);
      }
      setLoading(false);
    };

    fetchLesson();
  }, [lessonId]);

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Lesson Not Found</h2>
          <p className="text-gray-600 mb-4">The requested lesson could not be found.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{lesson.lesson_name}</h1>

        {lesson.video ? (
          <div className="relative bg-black rounded-lg shadow-lg overflow-hidden mb-6">
            <video
              controls
              className="w-full h-auto"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
            >
              <source src={`${BASE_URL}${lesson.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-2 right-2 text-xs bg-white/80 px-2 py-1 rounded shadow">
              <span className={`text-${isPlaying ? "green" : "red"}-600 font-semibold`}>
                {isPlaying ? "Playing" : "Paused"}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic mb-6">No video available for this lesson.</p>
        )}

        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Lesson Details</h3>
          <p className="text-gray-600">
            {lesson.description || "No description provided for this lesson."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;
