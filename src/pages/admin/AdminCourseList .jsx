




import { useState, useEffect } from "react";
import axiosInstance from "../../AxioInstance";
import AdminSubjectList from "./AdminSubjectList";

const AdminCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourseName, setEditCourseName] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("adminuser/course/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
    setLoading(false);
  };

  const handleAddCourse = async () => {
    if (!newCourseName.trim()) return;
    setSaving(true);
    try {
      await axiosInstance.post("adminuser/course/", {
        course_name: newCourseName,
      });
      setNewCourseName("");
      setIsAdding(false);
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axiosInstance.delete("adminuser/course/", {
          params: { courseId: id },
        });
        fetchCourses();
        if (selectedCourse?.id === id) setSelectedCourse(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleUpdateCourse = async () => {
    if (!editCourseName.trim()) return;
    setSaving(true);
    try {
      await axiosInstance.patch(
        "adminuser/course/",
        { course_name: editCourseName },
        { params: { courseId: editCourseId } }
      );
      setEditCourseId(null);
      setEditCourseName("");
      fetchCourses();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update course");
    }
    setSaving(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="mx-55 flex w-320 h-screen bg-white">
      {/* Left Panel */}
      <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto ">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Courses</h1>

        <div className="border rounded-md bg-white overflow-hidden w-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-gray-700 font-medium">#</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium">Course Name</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Add New Course Row */}
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-gray-500 italic">—</td>
                <td className="px-4 py-2">
                  {isAdding ? (
                    <input
                      type="text"
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      placeholder="Course name"
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    <span className="text-gray-400 italic">New Course</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {isAdding ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddCourse}
                        disabled={saving}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => {
                          setIsAdding(false);
                          setNewCourseName("");
                        }}
                        className="text-red-500 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAdding(true)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                    >
                      + Add Course
                    </button>
                  )}
                </td>
              </tr>

              {/* Existing Courses */}
              {courses.map((course,index) => (
                <tr
                  key={course.id}
                  className={`hover:bg-gray-50 ${
                    selectedCourse?.id === course.id ? "bg-gray-100 border-l-4 border-blue-600" : ""
                  }`}
                >
                  <td
                    className="px-4 py-3 text-gray-800"
                    onClick={() => setSelectedCourse(course)}
                  >
                    {/* {course.id} */}
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {editCourseId === course.id ? (
                      <input
                        type="text"
                        value={editCourseName}
                        onChange={(e) => setEditCourseName(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span onClick={() => setSelectedCourse(course)}>{course.course_name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {editCourseId === course.id ? (
                      <>
                        <button
                          onClick={handleUpdateCourse}
                          disabled={saving}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => {
                            setEditCourseId(null);
                            setEditCourseName("");
                          }}
                          className="text-red-500 text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditCourseId(course.id);
                            setEditCourseName(course.course_name);
                          }}
                          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-xs"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 overflow-y-auto bg-gray-50 p-6">
        {selectedCourse ? (
          <>
            <div className="flex items-center justify-between -mb-10">


            </div>
            <AdminSubjectList
              courseId={selectedCourse.id}
              courseName={selectedCourse.course_name}
            />
          </>
        ) : (
          <div className="text-center text-sm text-gray-500 mt-40">
            Select a course to view subjects
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourseList;
