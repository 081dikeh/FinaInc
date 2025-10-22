import { AreaChart, Area,  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import storeIcon from '../../assets/dashboard-assets/store-icon.png';
import ecommerceIcon from '../../assets/dashboard-assets/icon-badge3.png';
import websiteIcon from '../../assets/dashboard-assets/website-icon.png';

export default function RevenueChart({ data }) {

    return (
        <div className="bg-white p-6 rounded-lg shadow col-span-5 flex flex-col justify-around">
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h3 className='text-xl text-brand-500 font-semibold'>Revenue</h3>
                    <p className='text-sm text-brand-100'>Based on Source</p>
                </div>           
                <button className="text-brand-200 font-bold text-xl hover:text-brand-500 transition ">⋮</button>
            </div>
            

            {/* stats card */}
            <div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-1">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={websiteIcon} className='w-[32px]' alt="" />
                        </div>
                        <div>
                            <p className="text-xs text-brand-200 font-[500]">Website</p>
                            <p className="text-lg font-bold text-brand-500">$6,650.05</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={ecommerceIcon} className='w-[32px]' alt="" />
                        </div>
                        <div>
                            <p className="text-xs text-brand-200 font-[500]">E-Commerce</p>
                            <p className="text-lg font-bold text-brand-500">$6,650.05</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={storeIcon} className='w-[32px]' alt="" />
                        </div>
                        <div>
                            <p className="text-xs text-brand-200 font-[500]">Store</p>
                            <p className="text-lg font-bold text-brand-500">$6,650.05</p>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>

                        <defs>
                            <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorEcommerce" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorStore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 2" stroke="#e8e8e8ff" />
                        <XAxis 
                            dataKey="month" 
                            tick={{ fontSize: 12 }}
                            stroke="#667085"
                        />
                        <YAxis 
                            tick={{ fontSize: 12 }}
                            stroke="#667085"
                            domain={[0, 1400]}
                            ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#423577', 
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white'
                            }}
                        />

                        <Area 
                            type="monotone" 
                            dataKey="website" 
                            stroke="#7F63F1" 
                            strokeWidth={2}
                            dot={false}
                            fill="#7F63F1"
                            fillOpacity={0.1}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="ecommerce" 
                            stroke="#FC9736" 
                            strokeWidth={2}
                            dot={false}
                            fill="#FC9736"
                            fillOpacity={0.1}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="store" 
                            stroke="#2D99FE" 
                            strokeWidth={2}
                            dot={false}
                            fill="#2D99FE"
                            fillOpacity={0.1}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        
        </div>
    );
}