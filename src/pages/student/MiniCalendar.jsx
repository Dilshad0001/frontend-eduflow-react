import React from "react";

export default function MiniCalendar({ year, month }) {
  const now = new Date();
  const calendarYear = year !== undefined ? year : now.getFullYear();
  const calendarMonth = month !== undefined ? month : now.getMonth();

  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1);
  const lastDayOfMonth = new Date(calendarYear, calendarMonth + 1, 0);
  const today = new Date();

  const startDay = firstDayOfMonth.getDay(); // Sunday=0

  const days = [];
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(i);
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      {/* Month + Year */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        {firstDayOfMonth.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric"
        })}
      </h3>

      {/* Day Names */}
      <div className="grid grid-cols-7 text-xs font-semibold text-gray-600 mb-1">
        <div className="text-center">S</div>
        <div className="text-center">M</div>
        <div className="text-center">T</div>
        <div className="text-center">W</div>
        <div className="text-center">T</div>
        <div className="text-center">F</div>
        <div className="text-center">S</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}

        {days.map((day) => {
          const isToday =
            today.getFullYear() === calendarYear &&
            today.getMonth() === calendarMonth &&
            today.getDate() === day;

          return (
            <div
              key={day}
              className={`p-2 text-center cursor-pointer rounded-md ${
                isToday
                  ? "bg-blue-800 text-white font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
