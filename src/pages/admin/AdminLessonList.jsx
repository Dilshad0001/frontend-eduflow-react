




import { useState, useEffect } from "react";
import { PlayCircle } from "lucide-react";
import axiosInstance from "../../AxioInstance";
import { useNavigate } from "react-router-dom";

const AdminLessonList = ({ subjectId, subjectName }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newLessonName, setNewLessonName] = useState("");
  const [newLessonVideo, setNewLessonVideo] = useState(null); // For video file
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editingLessonName, setEditingLessonName] = useState("");
  const [editingLessonVideo, setEditingLessonVideo] = useState(null);
  const [savingLesson, setSavingLesson] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const navigate=useNavigate()
  const BASE_URL=import.meta.env.VITE_API_BASE_URL;

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("adminuser/lesson/", {
        params: subjectId ? { subjectId } : {},
      });
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
    setLoading(false);
  };

  const handleAddLesson = async () => {
    if (!newLessonName.trim()) return;
    setSavingLesson(true);
    try {
      const formData = new FormData();
      formData.append("lesson_name", newLessonName);
      formData.append("subject", subjectId);
      if (newLessonVideo) {
        formData.append("video", newLessonVideo);
      }

      await axiosInstance.post("adminuser/lesson/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewLessonName("");
      setNewLessonVideo(null);
      setIsAddingLesson(false);
      fetchLessons();
    } catch (error) {
      console.error("Failed to add lesson:", error);
    }
    setSavingLesson(false);
  };

  const handleEdit = (lesson) => {
    setEditingLessonId(lesson.id);
    setEditingLessonName(lesson.lesson_name);
    setEditingLessonVideo(null); // clear any previous edit selection
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("lesson_name", editingLessonName);
      if (editingLessonVideo) {
        formData.append("video", editingLessonVideo);
      }

      await axiosInstance.patch("adminuser/lesson/", formData, {
        params: { lessonId: editingLessonId },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingLessonId(null);
      setEditingLessonName("");
      setEditingLessonVideo(null);
      fetchLessons();
    } catch (error) {
      console.error("Failed to update lesson:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete("adminuser/lesson/", {
        params: { lessonId: id },
      });
      fetchLessons();
      alert("are you sure delete the subject")
    } catch (error) {
      console.error("Failed to delete lesson:", error);
      alert("lesson delete show some error")
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [subjectId]);

  return (
    <div className="py-10 pt-3  w-110">
      <h2 className="text-xl font-semibold text-gray-800  p-4  ">
        Lessons of <span className="text-gray-700">{subjectName}</span>
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-gray-700 rounded-full"></div>
          <span className="ml-3 text-sm text-gray-600">Loading lessons...</span>
        </div>
      ) : (
        <div className="border rounded-md bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700 w-12">#</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Lesson Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Video</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Add new lesson row */}
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-500 italic">—</td>
                  <td className="px-4 py-2">
                    {isAddingLesson ? (
                      <input
                        type="text"
                        value={newLessonName}
                        onChange={(e) => setNewLessonName(e.target.value)}
                        placeholder="Lesson name"
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span className="text-gray-400 italic">New Lesson</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isAddingLesson && (
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setNewLessonVideo(e.target.files[0])}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isAddingLesson ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddLesson}
                          disabled={savingLesson}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          {savingLesson ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingLesson(false);
                            setNewLessonName("");
                            setNewLessonVideo(null);
                          }}
                          className="text-red-500 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAddingLesson(true)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                      >
                        + Add Lesson
                      </button>
                    )}
                  </td>
                </tr>

                {/* Lesson rows */}
                {lessons.map((lesson, index) => (
                  // <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
                    <tr
  key={lesson.id}
  className="hover:bg-gray-50 transition-colors cursor-pointer"
  onClick={() => {
    if (editingLessonId !== lesson.id) navigate(`/admin/lessons/${lesson.id}`);
  }}
>
                    <td className="px-4 py-3 text-gray-800 font-medium">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-800">
                      {editingLessonId === lesson.id ? (
                        <input
                          type="text"
                          value={editingLessonName}
                          onChange={(e) => setEditingLessonName(e.target.value)}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        lesson.lesson_name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingLessonId === lesson.id ? (
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setEditingLessonVideo(e.target.files[0])}
                        />
                      ) : lesson.video ? (
<video
  controls
  className="w-68 h-18 object-cover rounded shadow"
>
  <source src={`${BASE_URL}${lesson.video}`} type="video/mp4" />
  Your browser does not support the video tag.
</video>
                      ) : (
                        <span className="text-gray-400 italic">No video</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {editingLessonId === lesson.id ? (
                        <button
                          onClick={handleUpdate}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(lesson)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(lesson.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLessonList;
