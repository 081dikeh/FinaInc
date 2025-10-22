import React, { useState } from 'react';
import { ZoomIn, ZoomOut, ArrowRight } from 'lucide-react';
import { stateData, statePaths } from '../data/countryConfigs'
import { Link } from 'react-router-dom';



const CustomerGrowthDashboard = () => {
  const [hoveredState, setHoveredState] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  

  const maxCustomers = Math.max(...stateData.map(s => s.customers));

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.3, 1));
    if (zoomLevel <= 1.3) {
      setPanX(0);
      setPanY(0);
    }
  };

  const getStateColor = (stateCode) => {
    const state = stateData.find(s => s.code === stateCode);
    return state ? state.color : '#E5E7EB';
  };

  const isHighlighted = (stateCode) => {
    return stateData.some(s => s.code === stateCode);
  };



  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 col-span-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-brand-500 font-semibold">Customer Growth</h2>
        <Link className="text-brand-600 hover:underline flex gap-1 items-center font-[500]">View all <ArrowRight size={20} /></Link>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 overflow-hidden">
        {/* Decorative gradient bar */}
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
        
        <svg 
          viewBox="0 0 450 240" 
          className="w-full h-auto transition-transform duration-300 ease-out"
          style={{ 
            transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`,
            transformOrigin: 'center center'
          }}
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#D1D5DB" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="450" height="240" fill="url(#grid)" />

          {/* All US States */}
          {Object.entries(statePaths).map(([code, path]) => (
            <path
              key={code}
              d={path}
              fill={getStateColor(code)}
              opacity={isHighlighted(code) ? 0.9 : 0.6}
              stroke="#ffffff"
              strokeWidth="1"
              className="transition-all duration-200"
              style={{
                cursor: isHighlighted(code) ? 'pointer' : 'default',
                filter: hoveredState === code ? 'brightness(1.1)' : 'none'
              }}
              onMouseEnter={() => isHighlighted(code) && setHoveredState(code)}
              onMouseLeave={() => setHoveredState(null)}
            />
          ))}

          {/* Tooltip */}
          {hoveredState && (
            <g>
              <rect 
                x="150" 
                y="10" 
                width="150" 
                height="50" 
                fill="#1F2937" 
                rx="8"
                opacity="0.95"
              />
              <text 
                x="225" 
                y="30" 
                textAnchor="middle" 
                fill="white" 
                fontSize="14" 
                fontWeight="600"
              >
                {stateData.find(s => s.code === hoveredState)?.name}
              </text>
              <text 
                x="225" 
                y="48" 
                textAnchor="middle" 
                fill="white" 
                fontSize="13"
              >
                {stateData.find(s => s.code === hoveredState)?.customers.toLocaleString()} Customer
              </text>
            </g>
          )}
        </svg>

        {/* Functional Zoom Buttons */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button 
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2.5}
            className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomIn size={18} className="text-gray-600" />
          </button>
          <button 
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomOut size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-medium text-gray-600">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* State List with Progress Bars */}
      <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {stateData.map((state) => (
          <div 
            key={state.code} 
            className="flex items-center gap-3 cursor-pointer"
            onMouseEnter={() => setHoveredState(state.code)}
            onMouseLeave={() => setHoveredState(null)}
          >
            {/* State Badge */}
            <div 
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm transition-transform hover:scale-110"
              style={{ backgroundColor: state.color }}
            >
              {state.code}
            </div>
            
            {/* State Info and Progress Bar */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-gray-900">
                  {state.name}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {state.customers.toLocaleString()}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(state.customers / maxCustomers) * 100}%`,
                    backgroundColor: state.color 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        
        {/* View All States Button */}
        {stateData.length > 10 && (
          <button className="w-full py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
            View All {stateData.length} States →
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerGrowthDashboard;