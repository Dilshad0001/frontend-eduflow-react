// logout

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Clock,
  CheckCircle2,
  User,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  Moon,
  Sun,
  GraduationCap,
  Calendar,
  MessageSquare,
  Award,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import axios from 'axios'; 
import axiosInstance from '../../AxioInstance';
import StudentProfile from './StudentProfile';
import { useDarkMode } from '../../context/DarkModeContext';

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);


  useEffect(() => {
  if (location.state && location.state.openProfileModal) {
    setIsProfileModalOpen(true);
    navigate(location.pathname, { replace: true, state: {} });
  }
}, [location, navigate]);


  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', route: '/student', icon: Home },
    { label: 'Subjects', route: '/student/subjects', icon: BookOpen },
    { label: 'Assignments', route: '/student/tasks/pending', icon: Clock, badge: 3 },
    { label: 'Grades', route: '/student/tasks/completed', icon: Award },
    { label: 'Schedule', route: '/student', icon: Calendar },
  ];

  const notifications = [
    { id: 1, title: 'Assignment Due', message: 'Math homework due in 2 hours', time: '2h', type: 'urgent' },
    { id: 2, title: 'New Course Material', message: 'Physics chapter 5 uploaded', time: '4h', type: 'info' },
    { id: 3, title: 'Grade Posted', message: 'Chemistry quiz results available', time: '1d', type: 'success' },
  ];

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await axiosInstance.post('account/logout/', {
          refresh: refreshToken
        }, {});
      }
    } catch (error) {
      console.error('Error during backend logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsProfileDropdownOpen(false); 
    setIsMobileMenuOpen(false); 
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const profileMenuItems = [
    { label: 'My Profile', icon: User, action: openProfileModal },
    { label: 'Progress', icon: TrendingUp, action: () => handleNavigation('/student') },
    { label: 'Settings', icon: Settings, action: () => handleNavigation('/student') },
    {label: 'Dark Theme',icon: isDarkMode ? Sun : Moon,action: toggleDarkMode },
    { label: 'Sign Out', icon: LogOut, action: handleLogout, danger: true },
  ];

  const handleNavigation = (route) => {
    navigate(route);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsNotificationOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('student/profile/');
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsProfileDropdownOpen(false);
        setIsNotificationOpen(false);
      }
      if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
      if (isProfileModalOpen && !event.target.closest('.profile-modal-content')) {

        if (!event.target.closest('.profile-modal-content') && event.target.classList.contains('profile-modal-overlay')) {
            closeProfileModal();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileModalOpen]); 

  const isActiveRoute = (route) => location.pathname === route;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return '🔴';
      case 'success': return '🟢';
      default: return '🔵';
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isDarkMode
          ? 'bg-slate-900/95 border-slate-800/50'
          : 'bg-white/95 border-gray-200/50'
      } backdrop-blur-xl border-b shadow-lg`}>
        <div className="max-w-7Xl mx-auto px-4 sm:px-6 lg:px-8 h-20 ">
          <div className="flex items-center justify-between h-21">

            {/* Logo Section */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation('/student/dashboard')}>
              <div className="relative group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300 ${
                  isDarkMode ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-emerald-600 to-teal-700'
                }`}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <span className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  EduFlow
                </span>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} -mt-1`}>
                  Where Knowledge Begins
                </p>
              </div>
            </div>

            {/* Search Bar - Enhanced */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                  isDarkMode ? 'text-slate-400 group-focus-within:text-emerald-400' : 'text-slate-500 group-focus-within:text-emerald-600'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, assignments, resources..."
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500 focus:bg-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:bg-white'
                  } hover:border-emerald-300`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.slice(0, 4).map((item) => {
                const IconComponent = item.icon;
                const isActive = isActiveRoute(item.route);
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavigation(item.route)}
                    className={`relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? `${isDarkMode ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'}`
                        : `${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'} hover:shadow-md`
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Section - Enhanced */}
            <div className="flex items-center space-x-2">

              {/* Quick Actions - Desktop Only */}
              <div className="hidden xl:flex items-center space-x-1">
                {navItems.slice(4).map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isActiveRoute(item.route);
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavigation(item.route)}
                      className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? `${isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'}`
                          : `${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'}`
                      }`}
                      title={item.label}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Notifications */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  {hasNotifications && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl border backdrop-blur-xl transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-slate-800/95 border-slate-700'
                      : 'bg-white/95 border-slate-200'
                  }`}>
                    <div className="p-4 border-b border-slate-200/10">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-slate-200/10 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {notification.title}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {notification.message}
                              </p>
                            </div>
                            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button className={`w-full text-sm font-medium py-2 px-4 rounded-xl transition-colors duration-200 ${
                        isDarkMode ? 'text-emerald-400 hover:bg-slate-700' : 'text-emerald-600 hover:bg-emerald-50'
                      }`}>
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* faq's */}
              <div className="relative">
                <button
                  onClick={() => {
                    const el = document.getElementById('faq-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative p-2.5 rounded-xl ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                  title="FAQs"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center space-x-3 p-2 rounded-xl transition-all duration-200 ${
                    isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {profile?.full_name || 'Student'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border backdrop-blur-xl transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-slate-800/95 border-slate-700'
                      : 'bg-white/95 border-slate-200'
                  }`}>
                    <div className="p-4 border-b border-slate-200/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {profile?.full_name || 'Student Name'}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {profile?.email || 'student@university.edu'}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Course Progress</span>
                        </div>
                        <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2`}>
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${profile?.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      {profileMenuItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={index}
                            onClick={item.action}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                              item.danger
                                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                : isDarkMode
                                  ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors duration-200 mobile-menu-button ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            // <div className={`lg:hidden mobile-menu transform transition-all duration-300 ease-in-out ${
            //   isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            // }`}>
<div className={`lg:hidden mobile-menu bg-white transform transition-all duration-300 ease-in-out ${
  isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
}`}>

              {/* Mobile Search */}
              <div className="px-4 py-3 border-t border-slate-200/10">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-emerald-500'
                    }`}
                  />
                </div>
              </div>

              {/* Mobile Nav Items */}
              <div className="px-4 pb-4 space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isActiveRoute(item.route);
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavigation(item.route)}
                      className={`relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? `${isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'} shadow-lg`
                          : `${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'}`
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
      </nav>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 profile-modal-overlay">
          {/* Blurred Background Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'bg-black/60' : 'bg-gray-900/60'} backdrop-blur-sm`}
            onClick={closeProfileModal} // Close modal when clicking on the overlay
          ></div>

          {/* Modal Content */}
          <div
            className={`relative z-20 w-120  p-1 rounded-2xl  shadow-2xl transform transition-all duration-300 ease-out profile-modal-content ${
              isDarkMode
                ? 'bg-slate-800 border border-slate-700 text-white'
                : 'bg-gray-200 border border-gray-200 text-slate-900'
            }`}
          >


              <StudentProfile/>

          </div>
        </div>
      )}
    </>
  );
};

export default StudentNavbar;


// Search