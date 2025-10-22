import React from 'react';
import { Link } from 'react-router-dom';
import { customers } from '../data/userActivity';
import { ArrowRight } from 'lucide-react';

export default function CustomerList() {

return (
    <div className="w-full relative max-w-md bg-white rounded-lg shadow-xl p-6 col-span-2">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl text-brand-500 font-semibold">Customer List</h2>
          <Link className="text-brand-600 hover:underline flex gap-1 items-center font-[500]">View all <ArrowRight size={20} /></Link>
        </div>
        <p className="text-sm text-gray-500">+12 New Customer This Day</p>
      </div>

      {/* Customer List with Purple Scrollbar */}
      <div 
        className="space-y-3 pr-2"
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#8B5CF6 #F3F4F6'
        }}
      >
        {customers.map((customer) => (
          <div 
            key={customer.id}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <img 
              src={customer.avatar}
              alt={customer.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${customer.name}&background=random`;
              }}
            />
            
            {/* Customer Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {customer.name}
              </h3>
              <p className="text-xs text-gray-500">
                {customer.activeTime}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Purple Gradient Scrollbar Indicator (Right Edge) */}
      {/* <div 
        className="absolute right-0 top-24 bottom-6 w-1 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(139, 92, 246, 0) 0%, rgba(139, 92, 246, 1) 20%, rgba(139, 92, 246, 1) 80%, rgba(139, 92, 246, 0) 100%)',
          borderRadius: '10px'
        }}
      /> */}

      {/* Custom Scrollbar Styles for Webkit Browsers */}
      <style>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7C3AED 0%, #6D28D9 100%);
        }
      `}</style>
    </div>
  );
  
};


