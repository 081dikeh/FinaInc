import React from 'react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <input 
        type="text" 
        placeholder="Search..." 
        className="px-4 py-2 rounded-lg w-96"
      />
      
      <div className="flex items-center gap-4">
        <button className="text-gray-600">Notifications</button>
        <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
      </div>
    </header>
  );
}

