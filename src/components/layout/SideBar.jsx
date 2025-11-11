import { NavLink } from "react-router-dom";
import FinaLogo from '../../assets/FinaLogo.png'
import { ClipboardCheck, MessageSquareText, Calendar, LayoutGrid, ShoppingCart, Rocket, Banknote, Phone, CircleQuestionMark, ChevronsLeft, ChevronsRight, ChevronDown, ChevronUp, Wallet} from 'lucide-react';
import { useState } from "react";

export default function SideBar({ sidebarWidth, isClicked, setIsClicked }) {

  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const toggleFinance = () => {
    if (!isClicked) {
      setIsFinanceOpen(!isFinanceOpen);
    }
  };

  const toggleEcommerce = () => {
    if (!isClicked) {
      setIsEcommerceOpen(!isEcommerceOpen);
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
 
  const getLinkClass = ({ isActive }) => {
    return `px-3 py-3 transition-all duration-300 flex gap-2 font-[500] hover:bg-primary-light hover:text-white rounded-md ${
      isActive
        ? 'bg-primary-light text-white p-2'
        : 'bg-white'
    } ${isClicked ? 'justify-center' : ''}`;
  };

  return (
    <div className={`h-screen bg-white transition-all duration-300 ${isClicked ? 'w-20' : 'w-64'} overflow-y-auto overflow-x-hidden shadow-lg relative`}>
        <aside className={`${isClicked ? 'p-3' : 'p-6'} flex flex-col justify-between h-full transition-all duration-300`}>
            <div className="mb-8 flex justify-between items-center">
                <h2 className={`text-xl text-brand-400 font-semibold flex items-center gap-2 transition-all duration-300 ${isClicked ? 'w-10' : ''}`}>
                  <img src={FinaLogo} alt="" className="w-8 h-8 flex-shrink-0" />
                  {!isClicked && <span className="whitespace-nowrap">Fina Inc</span>}
                </h2>

                {!isClicked && (
                  <span className="text-brand-100 cursor-pointer" onClick={handleClick}>
                    <ChevronsLeft />
                  </span>
                )}
            </div>

            {/* Expand button when collapsed */}
            {isClicked && (
              <button 
                onClick={handleClick}
                className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex justify-center"
              >
                <ChevronsRight className="text-brand-100" />
              </button>
            )}

            <nav className="flex flex-col gap-4 text-base text-brand-300">
                <NavLink 
                  className={getLinkClass} 
                  to="/"
                  title={isClicked ? "Dashboard" : ""}
                >
                  <LayoutGrid />
                  {!isClicked && <span>Dashboard</span>}
                </NavLink>

                {/* Finance Section */}
                <div 
                  className="relative"
                  onMouseEnter={() => isClicked && setHoveredMenu('finance')}
                  onMouseLeave={() => isClicked && setHoveredMenu(null)}
                >
                  <div
                    onClick={toggleFinance}
                    className={`w-full flex items-center justify-between px-3 py-3 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer ${isClicked ? 'justify-center' : ''}`}
                    title={isClicked ? "Finance" : ""}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet size={20} />
                      {!isClicked && <span className="font-semibold">Finance</span>}
                    </div>
                    {!isClicked && (isFinanceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
                  </div>
                  
                  {/* Finance Submenu - expanded sidebar */}
                  {isFinanceOpen && !isClicked && (
                    <div className="flex flex-col ml-6 mt-2 gap-2">
                      <NavLink to="/finance/my-card" className={getLinkClass}>
                        My Card
                      </NavLink>
                      <NavLink to="/finance/savings" className={getLinkClass}>
                        Savings
                      </NavLink>
                      <NavLink to="/finance/in-out" className={getLinkClass}>
                        In & Out
                      </NavLink>
                    </div>
                  )}

                  {/* Finance Submenu - collapsed sidebar (hover dropdown) */}
                  {isClicked && hoveredMenu === 'finance' && (
                    <div 
                      className="fixed bg-white shadow-xl rounded-lg py-2 w-48 z-50 border border-gray-200"
                      style={{
                        left: '80px',
                        top: 'auto'
                      }}
                    >
                      <div className="px-4 py-2 font-semibold text-brand-400 border-b border-gray-200">Finance</div>
                      <NavLink 
                        to="/finance/my-card" 
                        className="block px-4 py-2 hover:bg-purple-50 transition-colors text-brand-300"
                      >
                        My Card
                      </NavLink>
                      <NavLink 
                        to="/finance/savings" 
                        className="block px-4 py-2 hover:bg-purple-50 transition-colors text-brand-300"
                      >
                        Savings
                      </NavLink>
                      <NavLink 
                        to="/finance/in-out" 
                        className="block px-4 py-2 hover:bg-purple-50 transition-colors text-brand-300"
                      >
                        In & Out
                      </NavLink>
                    </div>
                  )}
                </div>

                {/* E-Commerce Section */}
                <div 
                  className="relative"
                  onMouseEnter={() => isClicked && setHoveredMenu('ecommerce')}
                  onMouseLeave={() => isClicked && setHoveredMenu(null)}
                >
                  <div
                    onClick={toggleEcommerce}
                    className={`w-full flex items-center justify-between px-3 py-3 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer ${isClicked ? 'justify-center' : ''}`}
                    title={isClicked ? "E-Commerce" : ""}
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart />
                      {!isClicked && <span className="font-semibold">E-Commerce</span>}
                    </div>
                    {!isClicked && (isEcommerceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
                  </div>
                  
                  {/* E-Commerce Submenu - expanded sidebar */}
                  {isEcommerceOpen && !isClicked && (
                    <div className="flex flex-col ml-6 mt-2 gap-2">
                      <NavLink to="/ecommerce/product" className={getLinkClass}>
                        Product
                      </NavLink>
                      <NavLink to="/ecommerce/category" className={getLinkClass}>
                        Category
                      </NavLink>
                      <NavLink to="/ecommerce/orders" className={getLinkClass}>
                        Orders
                      </NavLink>
                      <NavLink to="/ecommerce/customer" className={getLinkClass}>
                        Customer
                      </NavLink>
                    </div>
                  )}

                  {/* E-Commerce Submenu - collapsed sidebar (hover dropdown) */}
                  {isClicked && hoveredMenu === 'ecommerce' && (
                    <div 
                      className="fixed bg-white shadow-xl rounded-lg py-2 w-48 z-50 border border-gray-200"
                      style={{
                        left: '80px',
                        top: 'auto'
                      }}
                    >
                      <div className="px-4 py-2 font-semibold text-brand-400 border-b border-gray-200">E-Commerce</div>
                      <NavLink 
                        to="/ecommerce/product" 
                        className="block px-4 py-2 hover:bg-purple-50 transition-colors text-brand-300"
                      >
                        Product
                      </NavLink>
                      <NavLink 
                        to="/ecommerce/category" 
                        className="block px-4 py-2 hover:bg-purple-50 transition-colors text-brand-300"
                      >
                        Category
                      </NavLink>
                      <NavLink 
                        to="/ecommerce/orders" 
                        className="block px-4 py-2 hover:bg-purple-50 transition-colors text-brand-300"
                      >
                        Orders
                      </NavLink>
                      <NavLink 
                        to="/ecommerce/customer" 
                        className="block px-4 py-2 hover:bg-purple-50 transition-colors text-brand-300"
                      >
                        Customer
                      </NavLink>
                    </div>
                  )}
                </div>

                <NavLink 
                  className={getLinkClass} 
                  to="/project"
                  title={isClicked ? "Project" : ""}
                >
                  <ClipboardCheck />
                  {!isClicked && <span>Project</span>}
                </NavLink>

                <NavLink 
                  className={getLinkClass} 
                  to="/campaign"
                  title={isClicked ? "Campaign" : ""}
                >
                  <Rocket />
                  {!isClicked && <span>Campaign</span>}
                </NavLink>

                <NavLink 
                  className={getLinkClass} 
                  to="/calendar"
                  title={isClicked ? "Calendar" : ""}
                >
                  <Calendar />
                  {!isClicked && <span>Calendar</span>}
                </NavLink>

                <NavLink 
                  className={getLinkClass} 
                  to="/chat"
                  title={isClicked ? "Chat" : ""}
                >
                  <MessageSquareText />
                  {!isClicked && <span>Chat</span>}
                </NavLink>
            </nav>

            <div className="mt-auto text-base text-brand-300 font-[500]">
                <a 
                  href="#" 
                  className={`flex gap-2 px-3 py-3 hover:bg-gray-100 rounded-lg transition-colors ${isClicked ? 'justify-center' : ''}`}
                  title={isClicked ? "Support" : ""}
                >
                  <CircleQuestionMark />
                  {!isClicked && <span>Support</span>}
                </a>
                <a 
                  href="#" 
                  className={`flex gap-2 px-3 py-3 hover:bg-gray-100 rounded-lg transition-colors ${isClicked ? 'justify-center' : ''}`}
                  title={isClicked ? "Contact Us" : ""}
                >
                  <Phone />
                  {!isClicked && <span>Contact Us</span>}
                </a>
            </div>
        </aside>
    </div>
  );
}