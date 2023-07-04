import "./dashboard.css";
import React, { useEffect, useState } from "react";

import { ImFacebook2 } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import { SiTwitter } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io";
import { ChartComponent } from "../../components";
import axios from "axios";
import { path } from "../../utils/Variables";
const Dashboard = () => {
  const [pie, setPie] = useState({
    offerTitles: ["offre01", "offre02"],
    offerIdCounts: [0, 0],
  });
  const [data, setData] = useState({
    credit: 0,
    pdv: 0,
    finance: 0,
    service: 0,
    offre: 0,
  });

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/stats`);
    const resultPie = await axios.get(`http://localhost:5000/piestats`);

    setData(result.data.data);
    setPie(resultPie.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full ">
      <div className="w-full flex flex-col gap-6 pt-6">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
          <div className="bg-white rounded-md shadow-md p-6">
            <h1 className="text-xl text-gray-800 font-semibold"> PDVs</h1>
            <h1 className="text-end font-medium text-gray-700"> {data.pdv}</h1>
          </div>
          <div className="bg-white rounded-md shadow-md p-6">
            <h1 className="text-xl text-gray-800 font-semibold"> Financers</h1>
            <h1 className="text-end font-medium text-gray-700">
              {" "}
              {data.finance}
            </h1>
          </div>
          <div className="bg-white rounded-md shadow-md p-6">
            <h1 className="text-xl text-gray-800 font-semibold"> Packs</h1>
            <h1 className="text-end font-medium text-gray-700">
              {" "}
              {data.offre}
            </h1>
          </div>
          <div className="bg-white rounded-md shadow-md p-6">
            <h1 className="text-xl text-gray-800 font-semibold"> service</h1>
            <h1 className="text-end font-medium text-gray-700">
              {" "}
              {data.service}
            </h1>
          </div>
          <div className="bg-white rounded-md shadow-md p-6">
            <h1 className="text-xl text-gray-800 font-semibold"> Credits</h1>
            <h1 className="text-end font-medium text-gray-700">
              {" "}
              {data.credit}
            </h1>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-4 ">
          <div className="bg-white rounded-md shadow-md p-6">
            <ChartComponent
              pieLabels={pie.offerTitles}
              pieData={pie.offerIdCounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

//{/* <button className='border rounded-md bg-blue-900 text-white  font-medium py-0 ' >ALcnx</button> */ }

//est la première plateforme de paiement tunisienne qui vous permet d'effectuer diverses transactions sécurisées instantanément.
