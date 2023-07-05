import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { path } from "../../../utils/Variables";

const Packs = () => {
  const [search, setSearch] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = Object.values(item).join(" ").toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/service`);

    setfilterData(result.data.data);
    setmasterData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 ">
      {filterData
        .slice(0)
        .reverse()
        .map(
          (
            {
              _id,
              nom,
              description,
              critere_eligibility,
              document_requis,
              delai_traitement,
              montant_min,
              montant_max,
              picture
            }
          ) => {
            return (
              <div key={_id} className="bg-white rounded-md shadow flex">
                <div className="relative  w-1/3 h-52">
                  <div className="absolute left-5 -top-5 w-full h-0 z-20 flex items-center justify-center  border-2 bg-white shadow-md rounded aspect-w-4 aspect-h-5">
                  
                    <img
                      src={`${path}uploads/images/${picture}`}
                      alt={`${picture} pic`}
                      className="w-full h-full bg-cover rounded"
                    />
                  </div>
                  <div className="absolute left-0 bottom-2 w-52 h-fit flex justify-between">
                    <h1 className="text-gray-900 bg-white  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-2 py-1 ">
                      {montant_min} dt
                    </h1>
                    <h1 className="text-gray-900 bg-white  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-2 py-1 ">
                      {montant_max} dt
                    </h1>
                  </div>
                </div>
                <div className="relative w-2/3 pl-12 pr-3 py-1 ">
                  <h1 className="text-2xl font-semibold">{nom}</h1>
                  <div className="w-full border -ml-2 my-1"   />
                  <p className="font-medium line-clamp-3">{description} </p>
                  <Link
                    to={`/pack/${_id}`}
                    className="absolute right-4 bottom-4 text-blue-900 font-medium"
                  >
                    {" "}
                    More Detaille
                  </Link>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default Packs;
