import "./sidebar.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsBank2 } from "react-icons/bs";
import { RiDashboard2Fill } from "react-icons/ri";
import { GiShop } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { GiPackedPlanks } from "react-icons/gi";

import Logo from '../../assets/images/logo.png';
import MiniLogo from '../../assets/images/MiniSebmlogo.png';

const Sidebar = () => {
    let sidebarOpen = true;
    return (
        // w-52 = open sidebar // w-20: closed sidebar
        <div id="main__sidebar" className="sidebar h-full   transition-shadow duration-300 ease-in-out py-4 rounded-2xl shadow-sm bg-white px-10 ">
            <div className="h-16  bg-white flex items-center justify-center ">
                {sidebarOpen ? (
                    <Link to='/'>
                    <img src={Logo} alt="Sebn_TN" className="w-auto h-10" /></Link>
                ) : (
                    <img src={MiniLogo} alt="Sebn_TN" className="w-auto h-10" />
                )}
            </div>
            <div className="flex flex-col w-full gap-4  py-6 px- ">
                {/* Dashboard:::: */}
                <div className=" flex justify-between items-center text-slate-500 hover:text-lime-500 text-xl py-3 ">
                    <div
                        className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${sidebarOpen ? "" : "text-3xl"
                            }`}
                    >
                        <RiDashboard2Fill className="" />
                        <Link
                            to="#"
                            className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
                        >
                            Dashboard
                        </Link>
                        <br />
                    </div>
                </div> 
                <span className="text-sm text-slate-400">
                    APPS
                </span>

                {/* Users:::: */}
                
                <div className=" flex justify-between items-center text-slate-500 hover:text-lime-500  ">
                    <div
                        className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${sidebarOpen ? "" : "text-3xl"
                            }`}
                    >
                        <FiUsers className="" />
                        <Link
                            to="/user"
                            className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
                        >
                            Liste Users
                        </Link>
                    </div>
                </div>


                <div className=" flex justify-between items-center text-slate-500 hover:text-lime-500  ">
                    <div
                        className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${sidebarOpen ? "" : "text-3xl"
                            }`}
                    >
                        <GiShop className="" />
                        <Link
                            to="/pdv"
                            className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
                        >
                            points de ventes
                        </Link>
                    </div>
                    
                </div>
                {/* Users:::: */}
                <div className=" flex justify-between items-center text-slate-500 hover:text-lime-500  ">
                    <div
                        className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${sidebarOpen ? "" : "text-3xl"
                            }`}
                    >
                        <BsBank2 className="" />
                        <Link
                            to="/finance"
                            className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
                        >
                            Micro-Finanaces
                        </Link>
                    </div>
                </div>
                {/* Users:::: */}
                <div className=" flex justify-between items-center text-slate-500 hover:text-lime-500  ">
                    <div
                        className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${sidebarOpen ? "" : "text-3xl"
                            }`}
                    >
                        <GiPackedPlanks className="" />
                        <Link
                            to="/packs"
                            className={`sidebar__link font-medium ${sidebarOpen ? "" : "hidden"}`}
                        >
                            Les Packs
                        </Link>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Sidebar;
