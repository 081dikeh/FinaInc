import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import DashBoardPage from "./pages/DashBoardPage";
import Calender from "./pages/Calender";
import Project from "./pages/Project";
import Chat from "./pages/Chat";
import Campaign from "./pages/Campaign";
import MyCard from "./pages/FinancePage/MyCard";
import { useState } from "react";
import Savings from "./pages/FinancePage/Savings";
import InAndOut from "./pages/FinancePage/InAndOut";
import Product from "./pages/ecommercePage/Product";
import Categories from "./pages/ecommercePage/Categories";
import Orders from "./pages/ecommercePage/Orders";
import Customer from "./pages/ecommercePage/Customer";

function App() {
    const [isClicked, setIsClicked] =  useState(false);
    const sidebarWidth = isClicked ? 'w-20' : 'w-64';
    const sidebarWidthPx = isClicked ? 80 : 255;

  return (
    <BrowserRouter>
      <div className="flex justify-between gap-0 bg-gray-100 font-geist h-screen w-screen ">
        <SideBar 
          isClicked={isClicked} 
          setIsClicked={setIsClicked} 
          sidebarWidth={sidebarWidth} />
        <div className={`flex flex-col relative transition-all duration-300 `}
        style={{ width: `calc(100% - ${sidebarWidthPx}px)` }}>
          <Header />
          <main className="p-6 w-full max-w-full flex-1 overflow-y-auto ">
            <Routes>
              <Route path='/' element={<DashBoardPage />} /> 
              {/* finance pages */}
              <Route path="/finance/my-card" element={<MyCard />} />
              <Route path="/finance/savings" element={<Savings />} />
              <Route path="/finance/in-out" element={<InAndOut />} />

              {/* ecommerce pages */}
              <Route path='/ecommerce/product' element={<Product />} />
              <Route path='/ecommerce/category' element={<Categories />} />
              <Route path='/ecommerce/orders' element={<Orders />} />
              <Route path='/ecommerce/customer' element={<Customer />} />
              

              <Route path='/calendar' element={<Calender />} />
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
