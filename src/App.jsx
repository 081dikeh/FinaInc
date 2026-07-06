import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import DashBoardPage from "./pages/DashBoardPage";
import Calender from "./pages/Calender";
import Project from "./pages/Project";
import Chat from "./pages/Chat";
import Campaign from "./pages/Campaign";
import MyCard from "./pages/FinancePage/MyCard";
import CardDetails from "./pages/FinancePage/CardDetails";
import { useState } from "react";
import Savings from "./pages/FinancePage/Savings";
import AddSavings from "./pages/FinancePage/AddSavings";
import InAndOut from "./pages/FinancePage/InAndOut";
import Product from "./pages/ecommercePage/Product";
import AddProduct from "./pages/ecommercePage/AddProduct";
import Categories from "./pages/ecommercePage/Categories";
import Orders from "./pages/ecommercePage/Orders";
import Customer from "./pages/ecommercePage/Customer";
import Support from "./pages/Support";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { ProfileProvider } from "./context/ProfileContext";

const AUTH_ROUTES = ["/login", "/signup"];

function DashboardLayout() {
  const [isClicked, setIsClicked] = useState(false);
  const sidebarWidth = isClicked ? "w-20" : "w-64";
  const sidebarWidthPx = isClicked ? 80 : 255;

  return (
    <div className="flex justify-between gap-0 bg-gray-100 font-geist h-screen w-screen ">
      <SideBar isClicked={isClicked} setIsClicked={setIsClicked} sidebarWidth={sidebarWidth} />
      <div
        className={`flex flex-col relative transition-all duration-300 `}
        style={{ width: `calc(100% - ${sidebarWidthPx}px)` }}
      >
        <Header />
        <main className="p-6 w-full max-w-full flex-1 overflow-y-auto ">
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            {/* finance pages */}
            <Route path="/finance/my-card" element={<MyCard />} />
            <Route path="/finance/my-card/:cardId" element={<CardDetails />} />
            <Route path="/finance/savings" element={<Savings />} />
            <Route path="/finance/savings/add" element={<AddSavings />} />
            <Route path="/finance/in-out" element={<InAndOut />} />

            {/* ecommerce pages */}
            <Route path="/ecommerce/product" element={<Product />} />
            <Route path="/ecommerce/product/add" element={<AddProduct />} />
            <Route path="/ecommerce/category" element={<Categories />} />
            <Route path="/ecommerce/orders" element={<Orders />} />
            <Route path="/ecommerce/customer" element={<Customer />} />

            <Route path="/calendar" element={<Calender />} />
            <Route path="/project" element={<Project />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/campaign" element={<Campaign />} />

            {/* account & help pages */}
            <Route path="/support" element={<Support />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    );
  }

  return <DashboardLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <AppRoutes />
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
