import React, { useState } from 'react';
import { Car, Calendar, Target, Check, Plus } from 'lucide-react';

export default function SavedItem({ title, dueDate, goalAmount, monthlyContribution, currentAmount }) {
  const [isActive, setIsActive] = useState(false);
  const percentage = Math.round((currentAmount / goalAmount) * 100);


  return (

      <div className="bg-white rounded-3xl shadow-sm p-6 w-full max-w-[360px] text-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 rounded-full p-3">
              <Car className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">{title}</h3>
              <p className="text-gray-500 text-xs">+ {monthlyContribution.toFixed(2)} each month</p>
            </div>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
              isActive
                ? 'bg-purple-500 text-white'
                : 'border-2 border-gray-300'
            }`}
          >
            {isActive && <Check className="w-5 h-5" />}
          </button>
        </div>

        {/* Amount and Progress */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">
              ${currentAmount.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-blue-500">
              {percentage}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Goal and Due Date */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Goal</span>
            </div>
            <span className="text-gray-900 font-semibold">
              ${goalAmount.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Due Date</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {dueDate}
            </span>
          </div>
        </div>

        {/* Top Up Button */}
        <button className="w-full bg-primary-light hover:bg-purple-600 text-white font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2">

          <Plus size={20} />
          <span>Top Up</span>
        </button>
      </div>

  );
}