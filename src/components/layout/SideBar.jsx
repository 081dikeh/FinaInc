import { NavLink } from "react-router-dom";
import { useState } from "react";
import FinaLogo from '../../assets/FinaLogo.png'
import { ClipboardCheck, MessageSquareText, Calendar, LayoutGrid, ShoppingCart, Rocket, Banknote } from 'lucide-react';



export default function SideBar() {
  
  const getLinkClass = ({ isActive }) => {
    return `px-6 py-3 transition-all duration-300 flex gap-2 font-[500] ${
      isActive 
        ? 'bg-primary-light text-white p-2 rounded-md' 
        : 'bg-white'
    }`;
  };


  return (
    <div className=" h-screen bg-white fixed top-0 left-0 h-screen w-64 overflow-y-auto">
        <aside className="w-64 p-6">
            <div className="mb-8">
                <h2 className=" text-xl text-brand-400 font-semibold flex items-center gap-2"><img src={FinaLogo} alt="" />Fina Inc</h2>
            </div>

            <nav className=" flex flex-col gap-4 text-base text-brand-300">
                <NavLink className={getLinkClass} to="/"> 
                  <LayoutGrid />
                  Dashboard
                </NavLink>

                <NavLink className={getLinkClass} to="/finance">
                  <Banknote />
                  Finance
                </NavLink>

                <NavLink className={getLinkClass} to="/ecommerce">
                  <ShoppingCart />
                  E-Commerce
                </NavLink>

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
        </aside>
    </div>
  );
}

/* className={`${isOpen ? 'bg-primary' : 'bg-white'}`} */