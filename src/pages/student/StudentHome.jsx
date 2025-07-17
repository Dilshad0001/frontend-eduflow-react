




import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxioInstance';
import AdBanners from './AdBanners';
import SubjectCylinder from './SubjectCylinder';
import Leaderboard from './Leaderboard';
import MiniCalendar from './MiniCalendar';
import ReviewCards from './ReviewCards';
import Faq from './Faq';
import { useDarkMode } from '../../context/DarkModeContext';

const StudentHome = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);
  const [profile, setProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [assignmentError, setAssignmentError] = useState('');
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('student/profile/');
        setProfile(res.data);

        if (!res.data || !res.data.full_name) {
          setShowProfileModal(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setShowProfileModal(true);
      }
    };

    fetchData();
  }, [navigate]);



  useEffect(() => {
    if (showProfileModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showProfileModal]);






  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 1 && diffDays <= 7) return `Due in ${diffDays} days`;
    if (diffDays < 0) return 'Overdue';

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };









  useEffect(() => {
    const fetchUpcomingAssignments = async () => {
      setLoadingAssignments(true);
      setAssignmentError('');

      try {
        const res = await axiosInstance.get("student/submission/?notCompleted=5");

        const formattedAssignments = res.data.map(task => ({
          id: task.id,
          title: task.assignment,
          course: task.subject_name || 'N/A',
          dueDate: formatDate(task.submission_deadline),
        }));
        setUpcomingAssignments(formattedAssignments);
        setAssignmentError("");
      } catch (err) {
        console.error("Fetch tasks error:", err);
        setAssignmentError("Failed to load upcoming assignments. Please check your login.");
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchUpcomingAssignments();
  }, []);











  

  const rotateCylinder = (direction) => {
    if (courses.length === 0) return;
    let newIndex = activeCourseIndex;
    if (direction === 'next') {
      newIndex = (activeCourseIndex + 1) % courses.length;
    } else if (direction === 'prev') {
      newIndex = (activeCourseIndex - 1 + courses.length) % courses.length;
    }
    setActiveCourseIndex(newIndex);
  };

  const handleCourseClick = (subjectId) => {
    navigate(`/student/subject/${subjectId}`);
  };

  const recentActivity = [
    { id: 1, icon: '✓', text: 'Completed Lesson 17', time: '2 hours ago' },
    { id: 2, icon: '%', text: 'Quiz Score: 95%', time: 'Yesterday' },
    { id: 3, icon: '💬', text: 'New forum reply', time: '2 days ago' }
  ];









  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-100 text-gray-800'
      } leading-relaxed font-sans`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section
          className={`border rounded-xl p-6 mb-8 shadow-sm ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold mb-2 text-blue-500">
                Welcome back, {profile?.full_name || 'complete your profile'}!
              </h1>
              <p
                className={`text-lg mb-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                Ready to continue your learning journey?
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-auto">
              {[
                { value: courses.length, label: 'Active Courses' },
                { value: '78%', label: 'Avg Progress' },
                { value: '42', label: 'Hours Learned' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-md text-center ${
                    isDarkMode
                      ? 'bg-slate-700 border border-slate-600'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="text-2xl font-bold text-blue-500">
                    {item.value}
                  </div>
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="py-10">
            <AdBanners />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div
            className={`lg:col-span-2 border rounded-xl p-6 shadow-sm relative overflow-hidden ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <SubjectCylinder />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Upcoming Assignments */}
            <div
              className={`border rounded-xl p-6 shadow-sm ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div
                className={`flex justify-between items-center mb-5 pb-3 border-b ${
                  isDarkMode ? 'border-slate-600' : 'border-gray-200'
                }`}
              >
                <h3 className="text-xl font-semibold">Upcoming Assignments </h3>
              </div>
              <div>
                {loadingAssignments ? (
                  <p
                    className={`text-sm text-center ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}
                  >
                    Loading assignments...
                  </p>
                ) : assignmentError ? (
                  <p className="text-red-500 text-sm text-center">
                    {assignmentError}
                  </p>
                ) : upcomingAssignments.length > 0 ? (
                  upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`border p-4 rounded-md border-l-4 mb-3 last:mb-0 cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-700 border-slate-600'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                      onClick={() =>
                        navigate(`/student/tasks/pending`)
                      }
                    >
                      <div className="font-semibold text-sm mb-1">
                        {assignment.title}
                      </div>
                      <div className="text-xs font-medium">
                        Due: {assignment.dueDate}
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    className={`text-sm text-center ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}
                  >
                    No upcoming assignments.
                  </p>
                )}
              </div>
            </div>

            {/* Mini Calendar */}
            <div
              className={`border rounded-xl p-6 shadow-sm ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <MiniCalendar />
            </div>

            {/* Recent Activity */}
            <div
              className={`border rounded-xl p-6 shadow-sm ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div
                className={`flex justify-between items-center mb-5 pb-3 border-b ${
                  isDarkMode ? 'border-slate-600' : 'border-gray-200'
                }`}
              >
                <h3 className="text-xl font-semibold">Recent Activity</h3>
              </div>
              <div>
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center gap-3 p-3 border rounded-md mb-2 last:mb-0 ${
                      isDarkMode
                        ? 'bg-slate-700 border-slate-600'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-0.5">{activity.text}</div>
                      <div
                        className={`text-xs ${
                          isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}
                      >
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of content */}
        <div className="mb-8">
          <div
            className={`border rounded-xl p-6 shadow-sm ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div
              className={`flex justify-between items-center mb-5 pb-3 border-b ${
                isDarkMode ? 'border-slate-600' : 'border-gray-200'
              }`}
            >
              <h2 className="text-xl font-semibold">Top Performers</h2>
            </div>
            <Leaderboard />
          </div>
        </div>

        <ReviewCards />


       <div id="faq-section" className="w-full">
         <Faq/>
      </div>
      </div>

      {/* Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
          <div
            className={`max-w-md w-full p-6 rounded-xl shadow-2xl relative ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            }`}
          >

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Complete Your Profile
              </h2>
              <p
                className={`mb-4 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                You haven't set up your profile yet. Please complete it to get started.
              </p>
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  navigate(location.pathname, { state: { openProfileModal: true } });
                }}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Go to Profile Setup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHome;


