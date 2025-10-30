import { NavLink } from "react-router-dom";
import FinaLogo from '../../assets/FinaLogo.png'
import { ClipboardCheck, MessageSquareText, Calendar, LayoutGrid, ShoppingCart, Rocket, Banknote, Phone, CircleQuestionMark, ChevronsLeft, ChevronsRight, ChevronDown, ChevronUp, Wallet} from 'lucide-react';
import { useState } from "react";



export default function SideBar() {
  const [isClicked, setIsClicked] =  useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);

  const toggleFinance = () => {
    setIsFinanceOpen(!isFinanceOpen);
  };

  const toggleEcommerce = () => {
    setIsEcommerceOpen(!isEcommerceOpen);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  
  const getLinkClass = ({ isActive }) => {
    return `px-3 py-3 transition-all duration-300 flex gap-2 font-[500] hover:bg-primary-light hover:text-white rounded-md ${
      isActive 
        ? 'bg-primary-light text-white p-2' 
        : 'bg-white'
    }`;
  };



  return (
    <div className=" h-screen bg-white fixed top-0 left-0 h-screen w-64 overflow-y-auto z-20 shadow-lg">
        <aside className="w-64 p-6 flex flex-col justify-between h-full">
            <div className="mb-8 flex justify-between items-center">
                <h2 className=" text-xl text-brand-400 font-semibold flex items-center gap-2"><img src={FinaLogo} alt="" />Fina Inc</h2>

                <span className="text-brand-100 cursor-pointer" onClick={handleClick}>
                  {isClicked ? <ChevronsRight /> : <ChevronsLeft />}
                </span>
            </div>

            <nav className=" flex flex-col gap-4 text-base text-brand-300">
                <NavLink className={getLinkClass} to="/"> 
                  <LayoutGrid />
                  Dashboard
                </NavLink>

                <div>
                  <div
                    onClick={toggleFinance}
                    className="w-full flex items-center justify-between px-3 py-3 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Wallet size={20} />
                      <span className="font-semibold">Finance</span>
                    </div>
                    {isFinanceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {/* Finance Submenu */}
                  {isFinanceOpen && (
                    <div className="flex flex-col ml-6 mt-2 gap-2">
                      <NavLink
                        to="/finance/my-card"
                        className={getLinkClass}
                      >
                        My Card
                      </NavLink>
                      <NavLink
                        to="/finance/savings"
                        className={getLinkClass}
                      >
                        Savings
                      </NavLink>
                      <NavLink
                        to="/finance/in-out"
                        className={getLinkClass}
                      >
                        In & Out
                      </NavLink>
                    </div>
                  )}
                </div>

                <div>
                  <div
                    onClick={toggleEcommerce}
                    className="w-full flex items-center justify-between px-3 py-3 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart />
                      <span className="font-semibold">E-Commerce</span>
                    </div>
                    {isEcommerceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {/* Finance Submenu */}
                  {isEcommerceOpen && (
                    <div className="flex flex-col ml-6 mt-2 gap-2">
                      <NavLink
                        to="/ecommerce/product"
                        className={getLinkClass}
                      >
                        Product
                      </NavLink>
                      <NavLink
                        to="/ecommerce/category"
                        className={getLinkClass}
                      >
                        Category
                      </NavLink>
                      <NavLink
                        to="/ecommerce/orders"
                        className={getLinkClass}
                      >
                        Orders
                      </NavLink>
                      <NavLink
                        to="/ecommerce/customer"
                        className={getLinkClass}
                      >
                        Customer
                      </NavLink>
                    </div>
                  )}
                </div>

                <NavLink className={getLinkClass} to="/project">
                  <ClipboardCheck />
                  Project
                </NavLink>

                <NavLink className={getLinkClass} to="/campaign">
                  <Rocket />
                  Campaign
                </NavLink>

                <NavLink className={getLinkClass} to="/calendar">
                  <Calendar />
                  Calendar
                </NavLink>

                <NavLink className={getLinkClass} to="/chat">
                  <MessageSquareText />
                  Chat
                </NavLink>
            </nav>

            <div className="mt-auto text-base text-brand-300 font-[500]">
                <a href="" className="flex gap-2 px-3 py-3"><CircleQuestionMark />Support</a>
                <a href="" className="flex gap-2 px-3 py-3"><Phone />Contact Us</a>
            </div>
        </aside>
    </div>
  );
}

/* className={`${isOpen ? 'bg-primary' : 'bg-white'}`} */