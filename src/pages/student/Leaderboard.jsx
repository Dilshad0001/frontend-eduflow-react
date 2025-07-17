


import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";

function Leaderboard() {
  const [topStudents, setTopStudents] = useState([]);
  const [myMark, setMyMark] = useState(null);
  const [myRank, setMyRank] = useState(null);
  const [myName, setMyName] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axiosInstance.get("student/leaderboard/");
        setTopStudents(response.data.leaderboard.slice(0, 3));
        setMyMark(response.data.my_mark);
        setMyRank(response.data.my_rank);
        setMyName(response.data.my_name);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const isInTop3 = myRank !== null && myRank <= 3;

  return (
    <div className="w-full mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      {topStudents.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <ul className="space-y-3">
          {topStudents.map((student, index) => {
            const isCurrentUser = isInTop3 && myRank === index + 1;

            // Assign emoji based on rank
            let emoji = "";
            if (index === 0) emoji = "🏆";
            else if (index === 1) emoji = "🥈";
            else if (index === 2) emoji = "🥉";

            return (
              <li
                key={index}
                className={`flex justify-between items-center px-4 py-2 rounded-md ${
                  isCurrentUser
                    ? "bg-yellow-100 border border-yellow-400"
                    : "bg-gray-100"
                }`}
              >
                <span className="font-medium">
                  {emoji} {index + 1}. {student.student_name}
                </span>
                <span className="text-blue-600 font-semibold">
                  {student.mark}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {!isInTop3 && myRank && (
        <div className="mt-6">
          <div className="flex justify-between items-center bg-yellow-100 border border-yellow-400 rounded-md px-4 py-2">
            <span className="font-medium">
              {myRank}. {myName}
            </span>
            <span className="text-blue-600 font-semibold">{myMark}</span>
          </div>
        </div>
      )}

      {myRank === null && (
        <p className="mt-6 text-center text-gray-500">
          Your mark is not available.
        </p>
      )}
    </div>
  );
}

export default Leaderboard;



