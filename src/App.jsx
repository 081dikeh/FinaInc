import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import DashBoardPage from "./pages/DashBoardPage";
import Calender from "./pages/Calender";
import Ecommerce from "./pages/Ecommerce";
import Project from "./pages/Project";
import Chat from "./pages/Chat";
import Campaign from "./pages/Campaign";
import MyCard from "./pages/FinancePage/MyCard";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-gray-100 font-geist h-screen w-screen ">
        <SideBar />
        <div className="flex flex-col relative w-[calc(100%-256px)]">
          <Header />
          <main className="p-6 w-full max-w-full flex-1 overflow-y-auto ">
            <Routes>
              <Route path='/' element={<DashBoardPage />} /> 
              <Route path="/finance/my-card" element={<MyCard />} />
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
