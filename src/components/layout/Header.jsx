import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Mail, Bell, ChevronDown, User, Settings, LifeBuoy, LogOut, Clock } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import { useProfile } from '../../context/ProfileContext';
import { events as calendarEvents } from '../../data/calendarMockData';
import { conversations } from '../../data/chatMockData';
import { notifications as initialNotifications } from '../../data/notificationsData';

function useOutsideClose(setOpen) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setOpen]);
  return ref;
}

export default function Header() {
  const navigate = useNavigate();
  const { profile, logout } = useProfile();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const userRef = useOutsideClose(setUserDropdownOpen);
  const calendarRef = useOutsideClose(setCalendarOpen);
  const mailRef = useOutsideClose(setMailOpen);
  const notifRef = useOutsideClose(setNotifOpen);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadMessages = conversations.filter((c) => c.unread > 0).length;
  const upcomingEvents = calendarEvents.slice(0, 4);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-2 max-w-full w-full shadow-sm relative z-40">
      <div className="flex items-center justify-between">
        {/* Left Section - Global Search */}
        <div className="flex items-center max-w-md w-full">
          <GlobalSearch />
        </div>

        {/* Right Section - Icons and User */}
        <div className="flex items-center gap-4 ml-6">
          {/* Calendar Icon */}
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => {
                setCalendarOpen((o) => !o);
                setMailOpen(false);
                setNotifOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Calendar className="text-gray-600" size={22} />
            </button>
            {calendarOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-brand-500">Upcoming Events</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {upcomingEvents.map((ev) => (
                    <div key={ev.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50">
                      <div className="w-9 h-9 rounded-lg bg-brand-800 text-primary-light flex items-center justify-center flex-shrink-0">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-500">{ev.title}</p>
                        <p className="text-xs text-brand-100">
                          {ev.date} · {ev.startTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    navigate('/calendar');
                    setCalendarOpen(false);
                  }}
                  className="w-full text-center text-sm font-semibold text-primary-light py-3 border-t border-gray-100 hover:bg-gray-50 rounded-b-xl"
                >
                  View Calendar
                </button>
              </div>
            )}
          </div>

          {/* Mail Icon */}
          <div className="relative" ref={mailRef}>
            <button
              onClick={() => {
                setMailOpen((o) => !o);
                setCalendarOpen(false);
                setNotifOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Mail className="text-gray-600" size={22} />
              {unreadMessages > 0 && (
                <span className="absolute top-0 right-0 bg-primary-light text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </button>
            {mailOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-brand-500">Messages</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {conversations.slice(0, 5).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        navigate('/chat');
                        setMailOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                    >
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brand-500 truncate">{c.name}</p>
                        <p className="text-xs text-brand-100 truncate">{c.lastMessage}</p>
                      </div>
                      {c.unread > 0 && (
                        <span className="bg-primary-light text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    navigate('/chat');
                    setMailOpen(false);
                  }}
                  className="w-full text-center text-sm font-semibold text-primary-light py-3 border-t border-gray-100 hover:bg-gray-50 rounded-b-xl"
                >
                  View All Messages
                </button>
              </div>
            )}
          </div>

          {/* Notification Icon with Badge */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen((o) => !o);
                setCalendarOpen(false);
                setMailOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell className="text-gray-600" size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-900 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-brand-500">Notifications</p>
                  <button
                    onClick={markAllRead}
                    className="text-xs font-semibold text-primary-light hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 ${
                        !n.read ? 'bg-brand-800/40' : ''
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          n.read ? 'bg-transparent' : 'bg-primary-light'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-brand-500">{n.title}</p>
                        <p className="text-xs text-brand-100">{n.description}</p>
                        <p className="text-[11px] text-brand-100 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors"
            >
              {/* Avatar with online indicator */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* User Info */}
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">{profile.name}</p>
                <p className="text-xs text-gray-500">{profile.role}</p>
              </div>

              {/* Dropdown Icon */}
              <ChevronDown
                className={`text-gray-600 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`}
                size={18}
              />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  <User size={16} /> My Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={() => {
                    navigate('/support');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  <LifeBuoy size={16} /> Help Center
                </button>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
