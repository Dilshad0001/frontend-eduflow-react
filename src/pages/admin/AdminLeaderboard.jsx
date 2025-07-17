import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";

const AdminLeaderboard = () => {
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axiosInstance.get("adminuser/leaderboard/");
        setTopStudents(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white p-10 rounded-xl shadow border-0 w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">🏅 Top 3 Students</h3>

      {topStudents.length === 0 ? (
        <p className="text-gray-500 text-center">No leaderboard data available.</p>
      ) : (
        <ul className="space-y-3">
          {topStudents.map((student, index) => {
            const medals = ["🏆", "🥈", "🥉"];
            return (
              <li
                key={index}
                className="flex justify-between items-center px-4 py-2 rounded-md bg-gray-50 border border-gray-200 shadow-sm"
              >
                <span className="font-medium text-gray-800">
                  {medals[index]} {index + 1}. {student.student_name}
                </span>
                <span className="text-blue-600 font-semibold">{student.mark}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminLeaderboard;
