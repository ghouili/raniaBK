import React from "react";
import { Link } from "react-router-dom";

const PackDetaille = () => {
  return (
    <div className="w-full  flex gap-10 py-6 px-20 ">

        
      <div className="w-4/6 ">
        <img
          src="https://www.usinenouvelle.com/mediatheque/4/2/7/000935724_896x598_c.jpg"
          alt="intro"
          className="w-full"
        />
      </div>
      <div className="w-1/4 h-20 mx-auto border rounded-lg  ">
        <div className="bg-gray-200 p-2 flex flex-col gap-2  ">
          <div className="flex h-10 gap-2 border-b border-gray-100 cursor-pointer ">
            <div className="border rounded-full h-full w-2 border-orange-500 bg-orange-500 -ml-2 " />
            <span className="text-lg font-semibold">Micro-credit</span>
          </div>
          <div className="flex flex-col gap-2 px-6 py-2 -mt-2 border-b border-gray-100 ">
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Agroalimentaire
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Librairie
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Parfumerie
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Itech
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Drugstore
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Autres
            </Link>
          </div>
          <div className="flex h-10 gap-2 border-b border-gray-100 cursor-pointer ">
            <div className="border rounded-full h-full w-2 border-orange-500 bg-orange-500 -ml-2 " />
            <span className="text-lg font-semibold">Micro-credit</span>
          </div>
          <div className="flex h-10 gap-2 cursor-pointer ">
            <div className="border rounded-full h-full w-2 border-orange-500 bg-orange-500 -ml-2 " />
            <span className="text-lg font-semibold">Service digitaux</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackDetaille;
