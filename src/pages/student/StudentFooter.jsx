
import { 
  Mail, Phone, MapPin, BookOpen, Users, Award, Globe, 
  Facebook, Twitter, Instagram, Linkedin, Youtube 
} from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

const StudentFooter = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <footer
      className={`mt-16 border-t ${
        isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
      }`}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                EduFlow
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Empowering students with innovative learning management solutions. 
              Transform your educational journey with our comprehensive platform.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white'
                      : 'bg-gray-100 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold border-b pb-2 ${
              isDarkMode ? 'text-white border-slate-700' : 'text-gray-900 border-gray-200'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Dashboard', 'My Courses', 'Assignments', 'Grades', 'Calendar'].map((label, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold border-b pb-2 ${
              isDarkMode ? 'text-white border-slate-700' : 'text-gray-900 border-gray-200'
            }`}>
              Support
            </h4>
            <ul className="space-y-2">
              {['Help Center', 'Student Guide', 'Technical Support', 'System Status', 'Report Issue'].map((label, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold border-b pb-2 ${
              isDarkMode ? 'text-white border-slate-700' : 'text-gray-900 border-gray-200'
            }`}>
              Contact
            </h4>
            <div className="space-y-3">
              {[
                {icon: Mail, label: 'Email', value: 'support@eduflow.com', href: 'mailto:support@eduflow.com'},
                {icon: Phone, label: 'Phone', value: '+1 (234) 567-8900', href: 'tel:+1234567890'},
              ].map(({icon: Icon, label, value, href}, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</p>
                    <a
                      href={href}
                      className={`text-sm transition-colors ${
                        isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Address</p>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    123 Education St<br />Learning City, LC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-12 pt-8 border-t ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {icon: Users, value: '50K+', label: 'Active Students'},
              {icon: BookOpen, value: '500+', label: 'Courses Available'},
              {icon: Award, value: '95%', label: 'Success Rate'},
              {icon: Globe, value: '40+', label: 'Countries'},
            ].map(({icon: Icon, value, label}, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</span>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={`border-t ${
        isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                &copy; {new Date().getFullYear()} EduFlow LMS. All rights reserved.
              </p>
              <div className={`flex items-center space-x-1 text-xs ${
                isDarkMode ? 'text-slate-500' : 'text-gray-500'
              }`}>
                <span>Made with</span>
                <span className="text-red-500">❤️</span>
                <span>for students worldwide</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;
