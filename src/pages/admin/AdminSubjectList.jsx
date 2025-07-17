






import { useState, useEffect } from "react";
import axiosInstance from "../../AxioInstance";
import AdminLessonList from "./AdminLessonList";

const AdminSubjectList = ({ courseId, courseName }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [editingSubjectName, setEditingSubjectName] = useState("");
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [savingSubject, setSavingSubject] = useState(false);


  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("adminuser/subject/", {
        params: courseId ? { courseId } : {},
      });
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects", error);
    }
    setLoading(false);
  };

  const handleAddSubject = async () => {
    if (!newSubjectName.trim()) return;
    try {
      await axiosInstance.post("adminuser/subject/", {
        subject_name: newSubjectName,
        course: courseId,
      });
      setNewSubjectName("");
      fetchSubjects();
    } catch (error) {
      console.error("Failed to add subject:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete("adminuser/subject/", {
        params: { subjectId: id },
      });
      alert("are you sure delete the subject")
      fetchSubjects();
    } catch (error) {
      console.error("Failed to delete subject:", error);
           alert(" subject delete show some error")
    }
  };

  const handleEdit = (subject) => {
    setEditingSubjectId(subject.id);
    setEditingSubjectName(subject.subject_name);
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.patch("adminuser/subject/", {
        subject_name: editingSubjectName,
      }, {
        params: { subjectId: editingSubjectId },
      });
      setEditingSubjectId(null);
      setEditingSubjectName("");
      fetchSubjects();
    } catch (error) {
      console.error("Failed to update subject:", error);
    }
  };

  useEffect(() => {
    setSelectedSubject(null);
    fetchSubjects();
  }, [courseId]);

  return (
    <div className="-mx-11 w-full bg-white rounded-md px-6 -py-10 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 p-4 pt-10">Subjects of {courseName}</h2>

      {loading ? (
        <div className="flex items-center justify-center py-12 border rounded-md bg-gray-50">
          <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
          <span className="ml-3 text-sm text-gray-600">Loading subjects...</span>
        </div>
      ) : (
        <div className={`flex ${selectedSubject ? "gap-4" : ""} transition-all duration-300`}>
          <div className={`${selectedSubject ? "w-1/2" : "w-full"} transition-all`}>
            <div className="border rounded-md overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">#</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">Subject Name</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">Course</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">



                    <tr className="bg-gray-50">
  <td className="px-4 py-3 text-gray-500 italic">—</td>
  <td className="px-4 py-2">
    {isAddingSubject ? (
      <input
        type="text"
        value={newSubjectName}
        onChange={(e) => setNewSubjectName(e.target.value)}
        placeholder="Subject name"
        className="border px-2 py-1 rounded w-full"
      />
    ) : (
      <span className="text-gray-400 italic">New Subject</span>
    )}
  </td>
  <td className="px-4 py-2 text-gray-500">{courseName}</td>
  <td className="px-4 py-2">
    {isAddingSubject ? (
      <div className="flex gap-2">
        <button
          onClick={async () => {
            if (!newSubjectName.trim()) return;
            setSavingSubject(true);
            try {
              await axiosInstance.post("adminuser/subject/", {
                subject_name: newSubjectName,
                course: courseId,
              });
              setNewSubjectName("");
              setIsAddingSubject(false);
              fetchSubjects();
            } catch (error) {
              console.error("Failed to add subject:", error);
            }
            setSavingSubject(false);
          }}
          disabled={savingSubject}
          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
        >
          {savingSubject ? "Saving..." : "Save"}
        </button>
        <button
          onClick={() => {
            setIsAddingSubject(false);
            setNewSubjectName("");
          }}
          className="text-red-500 text-xs"
        >
          Cancel
        </button>
      </div>
    ) : (
      <button
        onClick={() => setIsAddingSubject(true)}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
      >
        + Add Subject
      </button>
    )}
  </td>
</tr>


                    {subjects.map((subject,index) => (
                      <tr
                        key={subject.id}
                        className={`hover:bg-gray-50 ${
                          selectedSubject?.id === subject.id
                            ? "bg-gray-100 border-l-4 border-blue-600"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedSubject({
                            id: subject.id,
                            subject_name: subject.subject_name,
                          })
                        }
                      >
                        <td className="px-4 py-3 text-gray-800">{index + 1}</td>

                        {/* Editable field */}
                        <td className="px-4 py-3 text-gray-800">
                          {editingSubjectId === subject.id ? (
                            <input
                              type="text"
                              value={editingSubjectName}
                              onChange={(e) => setEditingSubjectName(e.target.value)}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            subject.subject_name
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                            {subject.course}
                          </span>
                        </td>

                        <td className="px-4 py-3 flex gap-2">
                          {editingSubjectId === subject.id ? (
                            <button
                              onClick={handleUpdate}
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(subject);
                              }}
                              className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(subject.id);
                            }}
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
          </div>

          {selectedSubject && (
            <div className="w-1/2 -my-18 -mb-30">
              <AdminLessonList
                subjectId={selectedSubject.id}
                subjectName={selectedSubject.subject_name}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSubjectList;
