import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { weeklyData} from '../data/userActivity'

export default function UserActivity() {
  const [timeRange, setTimeRange] = useState('This Week');

 
  //Calculate totals for bottom summary
  const totalProductViewed = weeklyData.reduce((sum, item) => sum + item.productViewed, 0);
  const totalCheckOut = weeklyData.reduce((sum, item) => sum + item.checkOut, 0);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 flex flex-col justify-between col-span-2">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-brand-500 font-semibold">User Activity</h2>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          {timeRange}
          <ChevronDown size={16} />
        </button>
      </div>

      {/* LEGEND: Shows what each color represents */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary-dark"></div>
          <span className="text-xs text-gray-600 font-[500]">Product Viewed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-light"></div>
          <span className="text-xs text-gray-600 font-[500]">Check Out</span>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart 
            data={weeklyData}
            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
          >
            {/* GRID: Horizontal lines only */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#f5f5f6ff"
            />
            
            {/* X-AXIS: Days of the week */}
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              dy={10}
            />
            
            {/* Y-AXIS: Number scale */}
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#ffffffff', fontSize: 12 }}
              domain={[0, 10000]}
              ticks={[0, 2500, 5000, 7500, 10000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            
            {/* TOOLTIP: Shows on hover */}
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}
              itemStyle={{ color: '#fff', fontSize: '12px' }}
              formatter={(value) => value.toLocaleString()}
            />
            
            {/* BAR 1: Check Out (Purple - Bottom) */}
            <Bar 
              dataKey="checkOut" 
              fill="#8B5CF6" 
              radius={[8, 8, 8, 8]}
              maxBarSize={10}
              stackId="stack"
            />
            
            {/* INVISIBLE GAP BAR: Creates space between bars */}
            <Bar 
              dataKey="gap" 
              fill="transparent"
              stackId="stack"
            />
            
            {/* BAR 2: Product Viewed (Orange - Top) */}
            <Bar 
              dataKey="productViewed" 
              fill="#F59E0B" 
              radius={[8, 8, 8, 8]}
              maxBarSize={10}
              stackId="stack"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SUMMARY: Total numbers at the bottom */}
      <div className="flex justify-around pt-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1 font-[500]">Product Viewed</p>
          <p className="text-2xl font-semibold text-gray-900">
            {totalProductViewed.toLocaleString()}
          </p>
        </div>
        <div className="w-px"></div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1 font-[500]">Check Out</p>
          <p className="text-2xl font-semibold text-gray-900">
            {totalCheckOut.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

