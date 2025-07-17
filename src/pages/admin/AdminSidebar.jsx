import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Settings,
  FileBarChart2,
  Bell,
  HelpCircle,
  LogOut,
  UserCircle,
} from 'lucide-react';

const AdminSidebar = ({ collapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Top - Logo / Collapse */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && (
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            {!collapsed && <span>Dashboard</span>}
          </button>

          {/* Users */}
          <button
            onClick={() => navigate('/admin/users')}
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Users className="w-5 h-5 mr-3" />
            {!collapsed && <span>Users</span>}
          </button>

          {/* Courses */}
          <button
            onClick={() => navigate('course')}
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-3" />
            {!collapsed && <span>Courses</span>}
          </button>

          {/* Assignments */}
          <button
            onClick={() => navigate('assignment')}
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ClipboardList className="w-5 h-5 mr-3" />
            {!collapsed && <span>Assignments</span>}
          </button>

          {/* Settings */}
          <button
            // onClick={() => navigate('/admin/settings')}
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-5 h-5 mr-3" />
            {!collapsed && <span>Settings</span>}
          </button>

          {/* Reports */}
          <button
            // onClick={() => navigate('/admin/reports')}
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <FileBarChart2 className="w-5 h-5 mr-3" />
            {!collapsed && <span>Reports</span>}
          </button>

          {/* Notifications */}
          <button
            // onClick={() => navigate('/admin/notifications')}
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Bell className="w-5 h-5 mr-3" />
            {!collapsed && <span>Notifications</span>}
          </button>

          {/* Help Center */}
          <button
            className="flex items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            {!collapsed && <span>Help Center</span>}
          </button>
        </nav>

        {/* Bottom - User Info and Logout */}
        <div className="px-4 py-4 border-t space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-gray-600" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full bg-red-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
