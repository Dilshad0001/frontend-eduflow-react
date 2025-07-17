import React from 'react';
import clsx from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

const AdBanners = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <div
      className={clsx(
        'pt-5 px-1 pb-10 flex flex-col items-center gap-5',
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      )}
    >
      {/* Smart Study Tools */}
      <div
        className={clsx(
          'w-full max-w-full h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg relative group',
          isDarkMode
            ? 'bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700'
            : 'bg-gradient-to-br from-pink-300 via-purple-200 to-indigo-200'
        )}
      >
        {/* Floating decoration */}
        <div
          className={clsx(
            'absolute top-5 -left-12 w-24 h-24 rounded-full animate-bounce opacity-30',
            isDarkMode ? 'bg-white' : 'bg-white bg-opacity-30'
          )}
        ></div>

        <div className="flex items-center justify-between h-full px-10 relative z-10">
          <div className={isDarkMode ? 'text-gray-100' : 'text-gray-800'}>
            <h2
              className={clsx(
                'text-3xl font-bold mb-2',
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              )}
            >
              Smart Study Tools
            </h2>
            <p
              className={clsx(
                'text-lg mb-4',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              )}
            >
              Flashcards, quizzes, and progress tracking
            </p>
            <button
              className={clsx(
                'px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300',
                isDarkMode
                  ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              )}
            >
              Try Free for 30 Days
            </button>
          </div>
          <div className="flex gap-2">
            {['📚', '🧠', '📈'].map((icon, index) => (
              <div
                key={index}
                className={clsx(
                  'w-10 h-10 rounded-lg flex items-center justify-center text-xl animate-bounce',
                  isDarkMode
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-white bg-opacity-40'
                )}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarship Ad */}
      <div
        className={clsx(
          'w-full max-w-full h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg relative group',
          isDarkMode
            ? 'bg-gradient-to-br from-red-700 to-pink-700'
            : 'bg-gradient-to-br from-pink-400 to-red-500'
        )}
      >
        {/* Sparkling decoration */}
        <div
          className={clsx(
            'absolute top-8 right-24 text-2xl animate-ping opacity-75',
            isDarkMode ? 'text-white' : 'text-white'
          )}
        >
          ✦
        </div>

        <div className="flex items-center justify-between h-full px-10 relative z-10">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">$10,000 Scholarship</h2>
            <p className="text-lg mb-4 opacity-90">
              Apply now for our annual student grant program
            </p>
            <button
              className={clsx(
                'px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border-2',
                isDarkMode
                  ? 'bg-white bg-opacity-10 border-white border-opacity-30 hover:bg-white hover:text-red-600'
                  : 'bg-white bg-opacity-20 border-white border-opacity-40 hover:bg-white hover:text-red-500'
              )}
            >
              Apply Now
            </button>
          </div>
          <div className="text-6xl animate-pulse">🎓</div>
        </div>
      </div>
    </div>
  );
};

export default AdBanners;
