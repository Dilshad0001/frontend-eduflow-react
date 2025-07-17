



import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxioInstance";
import { Pencil, Save } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

function StudentProfile() {
  const { isDarkMode } = useDarkMode();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    course: ""
  });

  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/student/profile/");
        const res_course = await axiosInstance.get("/student/course/");
        const res_user = await axiosInstance.get("/account/self/");

        setCourses(res_course.data);
        setUser(res_user.data);

        setProfile(res.data);
        setFormData({
          full_name: res.data.full_name || "",
          phone_number: res.data.phone_number || "",
          course: res.data.course || ""
        });
      } catch (err) {
        if (err.response && err.response.status === 204 || err.response.status === 404) {
          setProfile(null);
          setIsEdit(true)
        } else {
          setError("Failed to load student profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("11");
      
      if (profile && isEdit) {
        console.log("22");
        await axiosInstance.patch("/student/profile/", formData);
        console.log("33");
        alert("Profile updated successfully");
        setProfile({ ...profile, ...formData });
        setIsEdit(false);
        window.location.reload();
      } else {
        console.log("44=",formData);
        const res = await axiosInstance.post("/student/profile/", formData);
        console.log("55");
        alert("Profile created successfully");
        setProfile(res.data);
        window.location.reload();
      }
    } catch (err) {
      console.log("66");
      console.error(err);
      alert("An error occurred while saving the profile");
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <div className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-4xl shadow-md overflow-hidden ${
        isDarkMode ? "bg-slate-800" : "bg-white"
      }`}
    >
      {/* Top section */}
      <div
        className={`relative p-8 pb-16 ${
          isDarkMode
            ? "bg-gradient-to-r from-slate-800 to-slate-700"
            : "bg-gradient-to-r from-gray-50 to-gray-100"
        }`}
      >
        <div className="flex items-center space-x-6">
          <div>
            <h1
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {profile ? profile.full_name : user?.email.split("@")[0] || "Guest"}
            </h1>
            <p className={`${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
              {user?.email || "N/A"}
            </p>
          </div>
        </div>
        {!isEdit && profile && (
          <button
            onClick={() => setIsEdit(true)}
            className="absolute top-8 right-8 text-white font-medium px-6 py-2 rounded-lg shadow"
          >
            <Pencil className="w-4 h-4 text-blue-800" />
          </button>
        )}
        {isEdit && profile && (
          <button
            onClick={() => setIsEdit(false)}
            className="absolute top-8 right-8 text-gray-500 hover:text-gray-700 font-medium px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Profile details or edit form */}
      <div className="p-8">
        {isEdit || !profile ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  className={`block text-sm font-serif mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`px-2 py-1 h-10 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8 ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-700 text-slate-200"
                      : "border-gray-300 bg-gray-50 text-gray-800"
                  }`}
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  className={`block text-sm font-serif mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`px-2 py-1 h-10 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8 ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-700 text-slate-200"
                      : "border-gray-300 bg-gray-50 text-gray-800"
                  }`}
                  required
                />
              </div>

              {/* Course */}
              <div>
                <label
                  className={`block text-sm font-serif mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Course
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={`px-2 py-1 h-10 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8 ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-700 text-slate-200"
                      : "border-gray-300 bg-gray-50 text-gray-800"
                  }`}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="text-blue-800 font-medium px-8 py-3 rounded-lg shadow-md"
              >
                {profile ? <Save className="w-4 h-4" /> : "Create Profile"}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* View-only fields */}
            {[
              { label: "Full Name", value: profile.full_name },
              { label: "Phone Number", value: profile.phone_number },
              {
                label: "Course",
                value:
                  courses.find((c) => c.id === profile.course)?.course_name || "N/A"
              },
              { label: "Email", value: user?.email || "N/A" }
            ].map((field, i) => (
              <div key={i}>
                <label
                  className={`block text-sm font-serif mb-2 ${
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  {field.label}
                </label>
                <div
                  className={`w-full px-2 py-1 border h-10 rounded-lg ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-slate-200"
                      : "bg-gray-50 border-gray-200 text-gray-800"
                  }`}
                >
                  {field.value}
                </div>
              </div>
            ))}

            {/* Email block */}
            <div className="md:col-span-2">
              <label
                className={`block text-sm font-serif mb-2 ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                My email Address
              </label>
              <div
                className={`flex items-center space-x-3 w-full px-4 py-3 border rounded-lg ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-slate-200"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{user?.email || "N/A"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
