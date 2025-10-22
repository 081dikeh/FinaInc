import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import StatCard from "./components/layout/StatCard";
import RevenueChart from './components/layout/RevenueChart';
import { revenueData } from './data/mockData';
import DashBoardPage from './pages/DashBoardPage'
import Finance from './pages/Finance'
import Calender from './pages/Calender'
import Ecommerce from './pages/Ecommerce'
import Project from './pages/Project'
import Chat from './pages/Chat'
import Campaign from './pages/Campaign'

function App() {
  return (
    <BrowserRouter>
    <div className="flex min-h-screen bg-gray-100 font-geist">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 ml-64">
            <Routes>
              <Route path='/' element={<DashBoardPage />} />
              <Route path='/finance' element={<Finance />} />
              <Route path='/calendar' element={<Calender />} />
              <Route path='/ecommerce' element={<Ecommerce />} />
              <Route path='/project' element={<Project />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/campaign' element={<Campaign />} />
            </Routes>         
        </main>
      </div>
      
    </div>
    </BrowserRouter>
  );
}

export default App;

