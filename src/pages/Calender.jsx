import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import PageTitle from "../components/layout/PageTitle";
import Modal from "../components/Modal";
import AddEventModal from "./CalendarComponents/AddEventModal";
import { events as initialEvents, eventColors } from "../data/calendarMockData";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function Calendar() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [allEvents, setAllEvents] = useState(initialEvents);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [dayModalOpen, setDayModalOpen] = useState(false);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const eventsByDate = useMemo(() => {
    const map = {};
    allEvents.forEach((ev) => {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    });
    return map;
  }, [allEvents]);

  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, current: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, current: true });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: cells.length - (firstDayOfMonth + daysInMonth) + 1, current: false });
    }
    return cells;
  }, [year, month]);

  const goToPrevMonth = () => setCursor(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCursor(new Date(year, month + 1, 1));
  const goToToday = () => setCursor(new Date(today.getFullYear(), today.getMonth(), 1));

  const handleDayClick = (day, current) => {
    if (!current) return;
    setSelectedDay(toDateKey(year, month, day));
    setDayModalOpen(true);
  };

  const handleAddEvent = (event) => {
    setAllEvents((prev) => [...prev, event]);
  };

  const isToday = (day, current) =>
    current &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Calendar" navigationRoute="Calendar" />
        <button
          onClick={() => {
            setSelectedDay(null);
            setIsAddOpen(true);
          }}
          className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          <Plus />
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-brand-500">
            {cursor.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-semibold text-brand-400 border-2 border-[#E0E2E7] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Today
            </button>
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-lg hover:bg-primary-light hover:text-white transition-colors bg-brand-800 text-primary-light"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-primary-light hover:text-white transition-colors bg-brand-800 text-primary-light"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Weekday Row */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd}
              className="text-xs font-semibold text-brand-100 uppercase text-center py-2"
            >
              {wd}
            </div>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((cell, idx) => {
            const dateKey = cell.current ? toDateKey(year, month, cell.day) : null;
            const dayEvents = dateKey ? eventsByDate[dateKey] || [] : [];
            return (
              <div
                key={idx}
                onClick={() => handleDayClick(cell.day, cell.current)}
                className={`min-h-[100px] p-2 rounded-xl border transition-colors flex flex-col gap-1 ${
                  cell.current
                    ? "border-gray-100 hover:border-primary-light cursor-pointer bg-white"
                    : "border-transparent bg-gray-50/50 text-gray-300"
                }`}
              >
                <span
                  className={`text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday(cell.day, cell.current)
                      ? "bg-primary-light text-white"
                      : cell.current
                      ? "text-brand-500"
                      : "text-gray-300"
                  }`}
                >
                  {cell.day}
                </span>
                <div className="flex flex-col gap-1">
                  {dayEvents.slice(0, 2).map((ev) => (
                    <span
                      key={ev.id}
                      className={`text-[11px] font-medium px-1.5 py-0.5 rounded truncate ${
                        eventColors[ev.type]?.bg || "bg-gray-100"
                      } ${eventColors[ev.type]?.text || "text-gray-600"}`}
                    >
                      {ev.title}
                    </span>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="text-[11px] text-brand-100 font-medium">
                      +{dayEvents.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6">
        {Object.entries(eventColors).map(([type, style]) => (
          <div key={type} className="flex items-center gap-2 text-sm text-brand-300 capitalize">
            <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
            {type}
          </div>
        ))}
      </div>

      {/* Day Detail Modal */}
      <Modal
        isOpen={dayModalOpen}
        onClose={() => setDayModalOpen(false)}
        title={selectedDay ? new Date(selectedDay).toDateString() : ""}
      >
        <div className="flex flex-col gap-3">
          {(eventsByDate[selectedDay] || []).length === 0 && (
            <p className="text-sm text-brand-100">No events scheduled for this day.</p>
          )}
          {(eventsByDate[selectedDay] || []).map((ev) => (
            <div
              key={ev.id}
              className="p-4 rounded-xl border border-gray-100 flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-brand-500">{ev.title}</h4>
                <span
                  className={`text-[11px] font-semibold px-2 py-1 rounded-full capitalize ${
                    eventColors[ev.type]?.bg
                  } ${eventColors[ev.type]?.text}`}
                >
                  {ev.type}
                </span>
              </div>
              <p className="text-sm text-brand-100 flex items-center gap-1.5">
                <Clock size={14} /> {ev.startTime} - {ev.endTime}
              </p>
              {ev.location && (
                <p className="text-sm text-brand-100 flex items-center gap-1.5">
                  <MapPin size={14} /> {ev.location}
                </p>
              )}
              {ev.description && (
                <p className="text-sm text-brand-300 mt-1">{ev.description}</p>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              setDayModalOpen(false);
              setIsAddOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg mt-2"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </Modal>

      <AddEventModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddEvent}
        defaultDate={selectedDay}
      />
    </section>
  );
}
