import CustomerList from "../components/CustomerList";
import CustGrowth from "../components/CustGrowth";
import RevenueChart from "../components/layout/RevenueChart";
import StatCard from "../components/layout/StatCard"
import Orders from "../components/Orders"
import TopProducts from "../components/TopProducts";
import UserActivity from "../components/UserActivity";
import { revenueData, ordersData, topProductsData } from '../data/mockData';
import iconBadge1 from '../assets/dashboard-assets/icon-badge1.png';
import iconBadge2 from '../assets/dashboard-assets/icon-badge2.png';
import iconBadge3 from '../assets/dashboard-assets/icon-badge3.png';
import iconBadge4 from '../assets/dashboard-assets/icon-badge4.png';


//import { Chevron}


export default function DashBoardPage() {
  return (
    <div>
        <div className="mb-6">
          <h1 className="text-3xl text-brand-500 font-semibold">Welcome Back Bryan</h1>
          <p className="text-base text-brand-200">Here’s what happening with your store today</p>
        </div>
          <div className="grid grid-cols-4 gap-4">
             <StatCard 
              title="Total Revenue" 
              titleIcon={iconBadge1} 
              value="$86,120" 
              change="+10%" 
              isPositive={true}
            />
            <StatCard 
              title="Total Customers"
              titleIcon={iconBadge2} 
              value="21,400" 
              change="+5%" 
              isPositive={true}
            />
            <StatCard 
              title="Total Orders"
              titleIcon={iconBadge3} 
              value="3,472" 
              change="-2%" 
              isPositive={false}
            />
            <StatCard 
              title="Total Products" 
              titleIcon={iconBadge4}
              value="143" 
              change="+8%" 
              isPositive={true}
            />
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <div className="grid grid-cols-7 gap-4">
              <RevenueChart data={revenueData} />
              <CustGrowth/>
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              <Orders data={ordersData} />
              <UserActivity/>
            </div>

            <div className="grid grid-cols-7 gap-4">
              <TopProducts data={topProductsData} />
              <CustomerList/>
            </div>
          </div>

          {/* <div className="flex gap-6 mt-6">
            <div className="flex flex-col gap-7 mt-4">
              <RevenueChart data={revenueData} />
              <Orders data={ordersData} />
              <TopProducts data={topProductsData} />
            </div>

            <div className="flex flex-col gap-7 mt-4">
              <CustGrowth/>
              <UserActivity/>
              <CustomerList/>
            </div>
          </div> */}
          
          
    </div>
  );
}

