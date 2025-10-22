import { useState } from 'react';
import { Search, Calendar, Mail, Bell, ChevronDown } from 'lucide-react';

export default function Header() {
  const [notificationCount] = useState(12);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 p-2 ml-64">
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-200 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Section - Icons and User */}
        <div className="flex items-center gap-4 ml-6">
          {/* Calendar Icon */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="text-gray-600" size={22} />
          </button>

          {/* Mail Icon */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Mail className="text-gray-600" size={22} />
          </button>

          {/* Notification Icon with Badge */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="text-gray-600" size={22} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-900 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors"
            >
              {/* Avatar with online indicator */}
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt="Bryan Adams"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* User Info */}
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Bryan Adams</p>
                <p className="text-xs text-gray-500">Manager</p>
              </div>

              {/* Dropdown Icon */}
              <ChevronDown 
                className={`text-gray-600 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} 
                size={18} 
              />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <a href="#help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Help Center
                </a>
                <hr className="my-2 border-gray-200" />
                <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

