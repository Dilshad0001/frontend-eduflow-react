import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxioInstance';
import { useDarkMode } from '../../context/DarkModeContext';

const LessonCylinder = ({ subjectId, subjectName }) => {
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCourseIndex, setActiveCourseIndex] = useState(0);
    useEffect(() => {
        const fetchStudentSubjects = async () => {
            setLoading(true);
            setError('');

            const token = localStorage.getItem("access_token");

            if (!token) {
                setError("No authorization token found. Please login.");
                setLoading(false);
                navigate("/login");
                return;
            }

            try {
                const response = await axiosInstance.get(`student/lesson/?subjectId=${subjectId}`);
                console.log(response.data);

                const fetchedCourses = response.data.map(lesson => ({
                    id: lesson.id,
                    title: lesson.lesson_name,
                    instructor: 'Various Instructors',
                    department: lesson.course,
                    progress: Math.floor(Math.random() * 40) + 50,
                    lessonsCompleted: Math.floor(Math.random() * 15) + 5,
                    totalLessons: 20,
                    dueDate: 'Ongoing',
                    status: 'medium'
                }));

                setCourses(fetchedCourses);
            } catch (err) {
                console.error("Error fetching lessons:", err);
                if (err.response && err.response.status === 401) {
                    setError("Session expired or unauthorized. Please login again.");
                    navigate("/login");
                } else if (err.response && err.response.status === 404) {
                    setError("No lessons found. Please ensure your profile is complete.");
                } else {
                    setError("Failed to fetch lessons. Please try again later.");
                }
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentSubjects();
    }, [navigate, subjectId]);

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

    const handleCourseClick = (lessonId) => {
        navigate(`/student/lesson/${lessonId}`);
    };

    const getProgressColor = (progress) => {
        if (progress < 60) return 'bg-red-500';
        if (progress < 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div
            className={` p-6 shadow-sm rounded-2xl relative overflow-hidden border-none ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
        >
            <h2
                className={`text-2xl font-bold mb-6 text-center ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
            >
                Lessons of {subjectName}
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {loading ? (
                <p
                    className={`py-10 text-center ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                    Loading lessons...
                </p>
            ) : courses.length > 0 ? (
                <div className="relative flex items-center justify-center h-50 perspective-1000 rounded-full">
                    <button
                        onClick={() => rotateCylinder('prev')}
                        className="absolute left-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform -translate-x-1/2 focus:outline-none"
                        aria-label="Previous Lesson"
                    >
                        <svg
                            className="w-6 h-6 rounded-4xl"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => rotateCylinder('next')}
                        className="absolute right-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform translate-x-1/2 focus:outline-none"
                        aria-label="Next Lesson"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                    </button>

                    <div
                        className="flex items-center justify-center w-full h-full relative"
                        style={{ perspective: '1000px' }}
                    >
                        {courses.map((course, index) => {
                            const isCurrent = index === activeCourseIndex;
                            const isPrev = index === (activeCourseIndex - 1 + courses.length) % courses.length;
                            const isNext = index === (activeCourseIndex + 1) % courses.length;
                            const isHidden = !isCurrent && !isPrev && !isNext;

                            let transformClasses = '';
                            let zIndex = 10;
                            let opacity = 0.5;
                            let bgStyle = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';

                            if (isCurrent) {
                                transformClasses = 'translateZ(0) rotateY(0deg) scale(1)';
                                zIndex = 30;
                                opacity = 1;
                                bgStyle = isDarkMode
                                    ? 'bg-gray-900 border-blue-500 border-2'
                                    : 'bg-white border-blue-500 border-2';
                            } else if (isPrev) {
                                transformClasses =
                                    'translateZ(-170px) translateX(-120px) rotateY(20deg) scale(0.95)';
                                zIndex = 20;
                                opacity = 0.7;
                                bgStyle = isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-gray-100 border-gray-300';
                            } else if (isNext) {
                                transformClasses =
                                    'translateZ(-170px) translateX(120px) rotateY(-20deg) scale(0.95)';
                                zIndex = 20;
                                opacity = 0.7;
                                bgStyle = isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-gray-100 border-gray-300';
                            } else {
                                transformClasses = 'translateZ(-600px) scale(0.5)';
                                zIndex = 5;
                                opacity = 0;
                            }

                            const cardWidth = 320;
                            const cardHeight = 220;

                            return (
                                <div
                                    key={course.id}
                                    className={`absolute p-5 rounded-lg border shadow-lg flex flex-col justify-between overflow-hidden transition-all duration-500 ease-in-out ${bgStyle} ${isHidden ? 'pointer-events-none' : ''}`}
                                    style={{
                                        width: `${cardWidth}px`,
                                        height: `${cardHeight}px`,
                                        transform: transformClasses,
                                        zIndex: zIndex,
                                        opacity: opacity,
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                        left: '50%',
                                        marginLeft: `-${cardWidth / 2}px`,
                                        cursor: isCurrent ? 'default' : 'pointer'
                                    }}
                                    onClick={() =>
                                        isCurrent ? handleCourseClick(course.id) : setActiveCourseIndex(index)
                                    }
                                >
                                    <div>
                                        <div className={`text-lg font-bold mb-1 leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                            {course.title}
                                        </div>
                                        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {course.department}
                                        </div>
                                        <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Instructor: {course.instructor}
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Progress: {course.progress}%
                                        </div>
                                        <div className={`rounded-full h-2.5 mb-1 overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                            <div
                                                className={`h-full rounded-full ${getProgressColor(course.progress)}`}
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className={`flex justify-between text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <span>{course.lessonsCompleted}/{course.totalLessons} Lessons</span>
                                            <span className="font-medium text-blue-700">Due: {course.dueDate}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <p
                    className={`py-10 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                    No lessons available.
                </p>
            )}
        </div>
    );
};

export default LessonCylinder;


