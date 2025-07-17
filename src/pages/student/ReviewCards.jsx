// import React, { useState } from 'react';
// import {
//   Star,
//   ThumbsUp,
//   Heart,
//   MoreVertical,
//   Calendar
// } from 'lucide-react';
// import { useDarkMode } from '../../context/DarkModeContext';

// const ReviewCards = () => {
//   const { isDarkMode } = useDarkMode();
//   const [likedReviews, setLikedReviews] = useState(new Set());

//   const reviews = [
//     {
//       id: 1,
//       userName: "Sarah M.",
//       userTitle: "Web Developer",
//       courseName: "JavaScript Basics",
//       rating: 5,
//       reviewText: "Great course! Easy to follow and understand.",
//       helpful: 24,
//       date: "2 days ago",
//       avatar: "SM",
//       verified: true
//     },
//     {
//       id: 2,
//       userName: "Mike C.",
//       userTitle: "Data Analyst",
//       courseName: "Python Data Science",
//       rating: 4,
//       reviewText: "Good content but needs more examples.",
//       helpful: 18,
//       date: "1 week ago",
//       avatar: "MC",
//       verified: false
//     },
//     {
//       id: 3,
//       userName: "Emily R.",
//       userTitle: "Frontend Engineer",
//       courseName: "React Advanced",
//       rating: 5,
//       reviewText: "Perfect for intermediate developers!",
//       helpful: 31,
//       date: "3 days ago",
//       avatar: "ER",
//       verified: true
//     },
//     {
//       id: 4,
//       userName: "David K.",
//       userTitle: "Designer",
//       courseName: "UI/UX Design",
//       rating: 3,
//       reviewText: "Basic content, good for beginners only.",
//       helpful: 12,
//       date: "5 days ago",
//       avatar: "DK",
//       verified: false
//     },
//     {
//       id: 5,
//       userName: "Jessica T.",
//       userTitle: "Backend Developer",
//       courseName: "Node.js APIs",
//       rating: 4,
//       reviewText: "Comprehensive course, well explained.",
//       helpful: 27,
//       date: "1 week ago",
//       avatar: "JT",
//       verified: true
//     },
//     {
//       id: 6,
//       userName: "Alex T.",
//       userTitle: "ML Engineer",
//       courseName: "Machine Learning",
//       rating: 5,
//       reviewText: "Outstanding! Best ML course ever.",
//       helpful: 45,
//       date: "4 days ago",
//       avatar: "AT",
//       verified: true
//     }
//   ];

//   const handleLike = (reviewId) => {
//     const newLikedReviews = new Set(likedReviews);
//     if (newLikedReviews.has(reviewId)) {
//       newLikedReviews.delete(reviewId);
//     } else {
//       newLikedReviews.add(reviewId);
//     }
//     setLikedReviews(newLikedReviews);
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 transition-colors ${
//           i < rating
//             ? 'fill-amber-400 text-amber-400'
//             : isDarkMode
//               ? 'text-gray-600'
//               : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   const getGradientByRating = (rating) => {
//     if (rating >= 5)
//       return isDarkMode
//         ? 'from-green-900 to-emerald-900 border-green-700'
//         : 'from-green-50 to-emerald-50 border-green-200';
//     if (rating >= 4)
//       return isDarkMode
//         ? 'from-blue-900 to-cyan-900 border-blue-700'
//         : 'from-blue-50 to-cyan-50 border-blue-200';
//     if (rating >= 3)
//       return isDarkMode
//         ? 'from-yellow-900 to-amber-900 border-yellow-700'
//         : 'from-yellow-50 to-amber-50 border-yellow-200';
//     return isDarkMode
//       ? 'from-red-900 to-pink-900 border-red-700'
//       : 'from-red-50 to-pink-50 border-red-200';
//   };

//   const getAvatarColor = (rating) => {
//     if (rating >= 5) return 'bg-gradient-to-br from-green-400 to-emerald-500';
//     if (rating >= 4) return 'bg-gradient-to-br from-blue-400 to-cyan-500';
//     if (rating >= 3) return 'bg-gradient-to-br from-yellow-400 to-amber-500';
//     return 'bg-gradient-to-br from-red-400 to-pink-500';
//   };

//   return (
//     <div
//       className={`max-w-7xl mx-auto p-8 min-h-screen ${
//         isDarkMode
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
//           : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
//       }`}
//     >
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h1
//           className={`text-4xl font-bold mb-4 ${
//             isDarkMode
//               ? 'text-white'
//               : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent'
//           }`}
//         >
//           What Our Students Say
//         </h1>
//         <p
//           className={`max-w-2xl mx-auto ${
//             isDarkMode ? 'text-gray-300' : 'text-gray-600'
//           }`}
//         >
//           Discover authentic feedback from learners who have transformed their careers with our courses
//         </p>
//       </div>

//       {/* Reviews Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {reviews.map((review) => (
//           <div
//             key={review.id}
//             className={`relative group bg-gradient-to-br ${getGradientByRating(
//               review.rating
//             )} backdrop-blur-sm rounded-2xl border-2 p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden`}
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="relative flex items-start justify-between mb-4">
//               <div className="flex items-center space-x-3">
//                 <div
//                   className={`w-12 h-12 rounded-xl ${getAvatarColor(
//                     review.rating
//                   )} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
//                 >
//                   {review.avatar}
//                 </div>
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <h3
//                       className={`font-bold ${
//                         isDarkMode ? 'text-white' : 'text-gray-900'
//                       }`}
//                     >
//                       {review.userName}
//                     </h3>
//                     {review.verified && (
//                       <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//                         <svg
//                           className="w-3 h-3 text-white"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                   <p
//                     className={`text-xs ${
//                       isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}
//                   >
//                     {review.userTitle}
//                   </p>
//                 </div>
//               </div>
//               <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded-lg">
//                 <MoreVertical
//                   className={`w-4 h-4 ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-2">
//                 <div className="flex space-x-1">{renderStars(review.rating)}</div>
//                 <span
//                   className={`font-bold ${
//                     isDarkMode ? 'text-white' : 'text-gray-900'
//                   }`}
//                 >
//                   {review.rating}.0
//                 </span>
//               </div>
//               <div
//                 className={`flex items-center space-x-1 text-xs ${
//                   isDarkMode ? 'text-gray-500' : 'text-gray-500'
//                 }`}
//               >
//                 <Calendar className="w-3 h-3" />
//                 <span>{review.date}</span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <span
//                 className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                   isDarkMode
//                     ? 'bg-gray-700 text-gray-200'
//                     : 'bg-white/70 text-gray-800'
//                 } shadow-sm`}
//               >
//                 {review.courseName}
//               </span>
//             </div>

//             <p
//               className={`text-sm leading-relaxed mb-6 line-clamp-3 ${
//                 isDarkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}
//             >
//               "{review.reviewText}"
//             </p>

//             <div
//               className={`flex items-center justify-between pt-4 border-t ${
//                 isDarkMode ? 'border-gray-700' : 'border-white/30'
//               }`}
//             >
//               <button
//                 onClick={() => handleLike(review.id)}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
//                   likedReviews.has(review.id)
//                     ? 'bg-red-100 text-red-600'
//                     : isDarkMode
//                     ? 'hover:bg-gray-700 text-gray-400'
//                     : 'hover:bg-white/50 text-gray-600'
//                 }`}
//               >
//                 <Heart
//                   className={`w-4 h-4 transition-all ${
//                     likedReviews.has(review.id) ? 'fill-current scale-110' : ''
//                   }`}
//                 />
//                 <span className="text-sm font-medium">
//                   {review.helpful + (likedReviews.has(review.id) ? 1 : 0)}
//                 </span>
//               </button>
//               <button
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
//                   isDarkMode
//                     ? 'hover:bg-gray-700 text-gray-400'
//                     : 'hover:bg-white/50 text-gray-600'
//                 }`}
//               >
//                 <ThumbsUp className="w-4 h-4" />
//                 <span className="text-xs font-medium">Helpful</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Stats */}
//       <div className="mt-16 text-center">
//         <div
//           className={`inline-flex items-center space-x-8 rounded-2xl px-8 py-4 shadow-lg ${
//             isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
//           }`}
//         >
//           {[
//             { label: 'Average Rating', value: '4.8' },
//             { label: 'Reviews', value: '1.2k+' },
//             { label: 'Satisfaction', value: '95%' }
//           ].map((stat, index) => (
//             <React.Fragment key={stat.label}>
//               {index > 0 && (
//                 <div
//                   className={`w-px h-8 ${
//                     isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
//                   }`}
//                 />
//               )}
//               <div className="text-center">
//                 <div
//                   className={`text-2xl font-bold ${
//                     isDarkMode ? 'text-white' : 'text-gray-900'
//                   }`}
//                 >
//                   {stat.value}
//                 </div>
//                 <div
//                   className={`text-xs ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}
//                 >
//                   {stat.label}
//                 </div>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewCards;




import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  Heart,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

const ReviewCards = () => {
  const { isDarkMode } = useDarkMode();
  const [likedReviews, setLikedReviews] = useState(new Set());

  const reviews = [
    {
      id: 1,
      userName: "Sarah M.",
      userTitle: "Web Developer",
      courseName: "JavaScript Basics",
      rating: 5,
      reviewText: "Great course! Easy to follow and understand.",
      helpful: 24,
      date: "2 days ago",
      avatar: "SM",
      verified: true
    },
    {
      id: 2,
      userName: "Mike C.",
      userTitle: "Data Analyst",
      courseName: "Python Data Science",
      rating: 4,
      reviewText: "Good content but needs more examples.",
      helpful: 18,
      date: "1 week ago",
      avatar: "MC",
      verified: false
    },
    {
      id: 3,
      userName: "Emily R.",
      userTitle: "Frontend Engineer",
      courseName: "React Advanced",
      rating: 5,
      reviewText: "Perfect for intermediate developers!",
      helpful: 31,
      date: "3 days ago",
      avatar: "ER",
      verified: true
    },
    {
      id: 4,
      userName: "David K.",
      userTitle: "Designer",
      courseName: "UI/UX Design",
      rating: 3,
      reviewText: "Basic content, good for beginners only.",
      helpful: 12,
      date: "5 days ago",
      avatar: "DK",
      verified: false
    },
    {
      id: 5,
      userName: "Jessica T.",
      userTitle: "Backend Developer",
      courseName: "Node.js APIs",
      rating: 4,
      reviewText: "Comprehensive course, well explained.",
      helpful: 27,
      date: "1 week ago",
      avatar: "JT",
      verified: true
    },
    {
      id: 6,
      userName: "Alex T.",
      userTitle: "ML Engineer",
      courseName: "Machine Learning",
      rating: 5,
      reviewText: "Outstanding! Best ML course ever.",
      helpful: 45,
      date: "4 days ago",
      avatar: "AT",
      verified: true
    }
  ];

  const handleLike = (reviewId) => {
    const newLikedReviews = new Set(likedReviews);
    if (newLikedReviews.has(reviewId)) {
      newLikedReviews.delete(reviewId);
    } else {
      newLikedReviews.add(reviewId);
    }
    setLikedReviews(newLikedReviews);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${
          i < rating
            ? 'fill-amber-400 text-amber-400'
            : isDarkMode
              ? 'text-gray-600'
              : 'text-gray-300'
        }`}
      />
    ));
  };

  const getGradientByRating = (rating) => {
    if (rating >= 5)
      return isDarkMode
        ? 'from-green-900 to-emerald-900 border-green-700'
        : 'from-green-50 to-emerald-50 border-green-200';
    if (rating >= 4)
      return isDarkMode
        ? 'from-blue-900 to-cyan-900 border-blue-700'
        : 'from-blue-50 to-cyan-50 border-blue-200';
    if (rating >= 3)
      return isDarkMode
        ? 'from-yellow-900 to-amber-900 border-yellow-700'
        : 'from-yellow-50 to-amber-50 border-yellow-200';
    return isDarkMode
      ? 'from-red-900 to-pink-900 border-red-700'
      : 'from-red-50 to-pink-50 border-red-200';
  };

  const getAvatarColor = (rating) => {
    if (rating >= 5) return 'bg-gradient-to-br from-green-400 to-emerald-500';
    if (rating >= 4) return 'bg-gradient-to-br from-blue-400 to-cyan-500';
    if (rating >= 3) return 'bg-gradient-to-br from-yellow-400 to-amber-500';
    return 'bg-gradient-to-br from-red-400 to-pink-500';
  };

  return (
    <div
      className={`max-w-7xl mx-auto p-4 sm:p-6 md:p-8 min-h-screen ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
      }`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode
              ? 'text-white'
              : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent'
          }`}
        >
          What Our Students Say
        </h1>
        <p
          className={`max-w-2xl mx-auto text-sm sm:text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Discover authentic feedback from learners who have transformed their careers with our courses
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`relative group bg-gradient-to-br ${getGradientByRating(
              review.rating
            )} backdrop-blur-sm rounded-2xl border-2 p-3 sm:p-4 md:p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${getAvatarColor(
                    review.rating
                  )} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg`}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3
                      className={`font-bold text-sm sm:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {review.userName}
                    </h3>
                    {review.verified && (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2 h-2 sm:w-3 sm:h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {review.userTitle}
                  </p>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded-lg">
                <MoreVertical
                  className={`w-4 h-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">{renderStars(review.rating)}</div>
                <span
                  className={`font-bold text-sm ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {review.rating}.0
                </span>
              </div>
              <div
                className={`flex items-center space-x-1 text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>{review.date}</span>
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-white/70 text-gray-800'
                } shadow-sm`}
              >
                {review.courseName}
              </span>
            </div>

            <p
              className={`text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              "{review.reviewText}"
            </p>

            <div
              className={`flex items-center justify-between pt-3 sm:pt-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-white/30'
              }`}
            >
              <button
                onClick={() => handleLike(review.id)}
                className={`flex items-center space-x-2 px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                  likedReviews.has(review.id)
                    ? 'bg-red-100 text-red-600'
                    : isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-white/50 text-gray-600'
                }`}
              >
                <Heart
                  className={`w-4 h-4 transition-all ${
                    likedReviews.has(review.id) ? 'fill-current scale-110' : ''
                  }`}
                />
                <span className="font-medium">
                  {review.helpful + (likedReviews.has(review.id) ? 1 : 0)}
                </span>
              </button>
              <button
                className={`flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all text-xs sm:text-sm ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-white/50 text-gray-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="font-medium">Helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-16 text-center">
        <div
          className={`inline-flex items-center space-x-6 sm:space-x-8 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white/60 backdrop-blur-sm'
          }`}
        >
          {[
            { label: 'Average Rating', value: '4.8' },
            { label: 'Reviews', value: '1.2k+' },
            { label: 'Satisfaction', value: '95%' }
          ].map((stat, index) => (
            <React.Fragment key={stat.label}>
              {index > 0 && (
                <div
                  className={`w-px h-6 sm:h-8 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                />
              )}
              <div className="text-center">
                <div
                  className={`text-xl sm:text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCards;
