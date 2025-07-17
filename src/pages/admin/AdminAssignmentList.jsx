
import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";
import AssignedStudents from "./AssignedStudents";
import StudentSelector from "./StudentSelector";



const AdminAssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    task_name: "",
    task_file: null,
    description: "",
    submission_deadline: "",
  });
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      let endpoint = "adminuser/task/";
      let params = {};
      if (filter === "completed") params.completed = true;
      else if (filter === "incomplete") params.incomplet = true;
      const res = await axiosInstance.get(endpoint, { params });
      setAssignments(res.data);
    } catch (error) {
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, [filter]);

  const handleFileChange = (e) => {
    setNewAssignment({ ...newAssignment, task_file: e.target.files[0] });
  };

  const handleAddAssignment = async () => {
    const formData = new FormData();
    formData.append("task_name", newAssignment.task_name);
    if (newAssignment.task_file) formData.append("task_file", newAssignment.task_file);
    formData.append("description", newAssignment.description);
    formData.append("submission_deadline", newAssignment.submission_deadline);
    selectedStudentIds.forEach((id) => formData.append("students", id));
    formData.append("students_count",selectedStudentIds);
    formData.append("new_task",newAssignment);

    try {
      await axiosInstance.post("adminuser/task/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewAssignment({ task_name: "", task_file: null, description: "", submission_deadline: "" });
      setSelectedStudentIds([]);
      setAdding(false);
      fetchAssignments();
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  console.log('selected students id',selectedStudentIds.length);
  

  return (
    <div className="p-6 ml-58 -mr-10 " >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 bg">Assignment Tasks</h2>

      {/* Filter & Add Button */}
      <div className="mb-4 flex justify-between">
        <div className="flex space-x-2">
          {["all", "completed", "incomplete"].map((key) => (
            <button
              key={key}
              className={`px-4 py-1 text-sm rounded border ${
                filter === key
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => {
                setFilter(key);
                setSelectedAssignment(null);
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setAdding(true)}
          className="mr-160 px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Assignment
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-4 ">
        {/* Left: Table */}
        <div className="w-150 border rounded-md   overflow-hidden ">
          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-150 text-sm table-auto ">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left px-4 py-3">#</th>
                  <th className="text-left px-4 py-3">Task Name</th>
                  <th className="text-left px-4 py-3">File</th>
                  <th className="text-left px-4 py-3">Description</th>
                  <th className="text-left px-4 py-3">Deadline</th>
                  <th className="text-left px-4 py-3">Action</th>

                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adding && (
                  <tr className="bg-yellow-50">
                    <td className="px-4 py-3 text-gray-800">—</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full border px-2 py-1 text-sm"
                        value={newAssignment.task_name}
                        onChange={(e) => setNewAssignment({ ...newAssignment, task_name: e.target.value })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input type="file" className="w-full text-sm" onChange={handleFileChange} />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full border px-2 py-1 text-sm"
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                      />
                    </td>
                    {/* <td className="px-4 py-2 text-center">—</td> */}
                    <td className="px-4 py-2">
                      <input
                        type="datetime-local"
                        className="w-30 border px-2 py-1 text-sm"
                        value={newAssignment.submission_deadline}
                        onChange={(e) => setNewAssignment({
                          ...newAssignment,
                          submission_deadline: e.target.value,
                        })}
                      />
                    </td>
                    <td className="px-4 py-2 ">
                      <button onClick={handleAddAssignment} className="px-5 py-1 bg-blue-600  text-white rounded text-xs">Save</button>
                      <button
                        onClick={() => {
                          setAdding(false);
                          setSelectedStudentIds([]);
                        }}
                        className=" px-3.5 py-1 bg-gray-300 text-gray-800 rounded text-xs"
                      >Cancel</button>
                    </td>
                  </tr>
                )}
                {assignments.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`cursor-pointer hover:bg-gray-50 transition ${
                      selectedAssignment?.id === task.id ? "bg-blue-200" : ""
                    }`}
                    onClick={() => setSelectedAssignment(task)}
                  >
                    <td className="px-4 py-3 text-gray-800">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-800">{task.task_name}</td>
                    <td className="px-4 py-3">
                      {task.task_file ? (
                        <a
                          href={`${BASE_URL}${task.task_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >Download</a>
                      ) : (
                        <span className="text-gray-400 italic">No file</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-[180px] truncate" title={task.description}>
                      {task.description?.slice(0, 50) || "—"}{task.description?.length > 50 && "..."}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {task.submission_deadline ? new Date(task.submission_deadline).toLocaleString().slice(0,9) : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right Panel */}
        <div className=" w-130 border-0 rounded-md bg-white p-0  h-fit -mt-26">
          {adding ? (
            <StudentSelector
              selectedStudentIds={selectedStudentIds}
              setSelectedStudentIds={setSelectedStudentIds}
            />
          ) : selectedAssignment ? (
            <>
              <h3 className="text-md font-semibold text-gray-800 mb-2 ml-10 ">
                {selectedAssignment.task_name}
              </h3>
              <div className="mt-4 ">
                <AssignedStudents assignment={selectedAssignment} />
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm italic mt-10 text-center">
              Click any row to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAssignmentList;

