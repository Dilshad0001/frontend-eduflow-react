


import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";

const StudentSelector = ({ selectedStudentIds, setSelectedStudentIds }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get("adminuser/student"); // adjust to your actual endpoint
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, []);

  const toggleStudent = (id) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-30 ml-20">
      <h3 className="text-md font-semibold mb-2 ml-20 ">
        Assign to Students ({selectedStudentIds.length} selected)
      </h3>
      <div className="max-h-64 overflow-y-auto">
        {students.map((student) => (
          <div key={student.id} className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              checked={selectedStudentIds.includes(student.id)}
              onChange={() => toggleStudent(student.id)}
            />
            <label>{student.full_name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSelector;
