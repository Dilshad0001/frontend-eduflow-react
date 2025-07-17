import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MiniCalendar from "../student/MiniCalendar";
import AdminLeaderboard from "./AdminLeaderboard";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosInstance.get("adminuser/dashboard/");
        const data = res.data;

        setStats([
          { label: "Total Users", value: data.total_users },
          { label: "Profile Completed", value: data.profile_completed },
          { label: "Courses", value: data.total_courses },
          { label: "Subjects", value: data.total_subjects },
          { label: "Lessons", value: data.total_lessons },
          { label: "Assignments", value: data.total_assignments },
          { label: "Completed Submissions", value: data.completed_submissions },
          { label: "Incomplete Submissions", value: data.incomplete_submissions },
          { label: "Evaluated Submissions", value: data.evaluated_submissions },
          { label: "Not Evaluated Submissions", value: data.not_evaluated_submissions },
        ]);

        setChartData([
          { day: "Mon", submissions: 24 },
          { day: "Tue", submissions: 30 },
          { day: "Wed", submissions: 45 },
          { day: "Thu", submissions: 38 },
          { day: "Fri", submissions: 50 },
          { day: "Sat", submissions: 27 },
          { day: "Sun", submissions: 18 },
        ]);

        setRecentActivity([
          "Student John Doe submitted Assignment 1",
          "Course 'React Basics' was updated",
          "New user registered: jane@example.com",
          "Instructor approved Assignment 3",
          "Student feedback received",
          "Student Alice completed 'Python 101'",
          "Instructor Michael added new course 'Data Science'",
          "Course 'Machine Learning' reached 100 students",
        ]);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border"
          >
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="text-2xl font-bold text-indigo-600">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-xl p-6 shadow-sm bg-white border-gray-200 col-span-1 w-130">
          <MiniCalendar />
        </div>

        <div className="col-span-2  bg-white rounded-xl  ml-30 p-6 shadow-sm border flex flex-col justify-center items-center w-170">
            <AdminLeaderboard/>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow col-span-2 border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Submissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submissions" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm text-gray-700 max-h-[300px] overflow-y-auto pr-2">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="h-2 w-2 mt-2 bg-indigo-500 rounded-full"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;