import RevenueChart from "../components/layout/RevenueChart";
import StatCard from "../components/layout/StatCard"
import Orders from "../components/Orders"
import { revenueData, ordersData} from '../data/mockData';
export default function DashBoardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
          <div className="grid grid-cols-4 gap-4">
             <StatCard 
              title="Total Revenue" 
              value="$86,120" 
              change="+10%" 
              isPositive={true}
            />
            <StatCard 
              title="Total Customers" 
              value="21,400" 
              change="+5%" 
              isPositive={true}
            />
            <StatCard 
              title="Total Orders" 
              value="3,472" 
              change="-2%" 
              isPositive={false}
            />
            <StatCard 
              title="Total Products" 
              value="143" 
              change="+8%" 
              isPositive={true}
            />
          </div>
          <RevenueChart data={revenueData} />
          <Orders data={ordersData} />
    </div>
  );
}

