import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Breadcrumbs,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import {
  BsPencilSquare,
  BsPersonVcard,
  BsPhone,
  BsShop,
  BsPersonDash,
  BsPersonCheck,
  BsLock,
  BsUnlock,
} from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { TfiLocationPin } from "react-icons/tfi";
import { GiModernCity } from "react-icons/gi";
import { RxSection } from "react-icons/rx";

import InputField from "../../../components/inputField/InputField";
import { path } from "../../../utils/Variables";

const PdvRequests = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
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
    const result = await axios.get(`http://localhost:5000/user/pdvs/requests`);

    setfilterData(result.data.data);
    setmasterData(result.data.data);
    setData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ToggleLock = async (lock, id, tel) => {
    // Convert `tel` to a string and check if it starts with "216"
    const telString = String(tel);
    const recipientNumber = telString.startsWith("216")
      ? telString
      : `216${telString}`;

    const smsAPIUrl = "https://www.winsmspro.com/sms/sms/api";
    const apiKey = "eUVFc2k9RT1JcGpmQVBJb2FzeWE=";
    const senderName = "KHALLASLI";
    const message = `${
      lock
        ? "Congratulations! Your Request have been approved to become a Point de Vent for Khallasli."
        : "Unfortunately! You Request have been Declined to become a Point de Vent for Khallasli."
    }`;

    const willDelete = await swal({
      title: "Are you sure?",
      text: `Are you sure that you want to ${
        lock ? "Accept" : "Decline"
      } this PDV?`,
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.post(`http://localhost:5001/lock/${id}`, {
        lock,
      });

      if (result.data.success) {
        swal("Success!", result.data.message, "success");

        const url = `${smsAPIUrl}?action=send-sms&api_key=${apiKey}&to=${recipientNumber}&from=
        ${senderName}&sms=${encodeURIComponent(message)}`;

        fetch(url)
          .then((response) => {
            if (response.ok) {
              console.log("SMS sent successfully");
            } else {
              console.error("Failed to send SMS");
            }
          })
          .catch((error) => {
            console.error("Error occurred while sending SMS:", error);
          });

        fetchData();
      } else {
        return swal("Error!", result.adta.message, "error");
      }
    }
  };

  return (
    <div className="w-full border mt-4 bg-white p-4 shadow-sm rounded-sm">
      <div className="w-full flex items-center justify-between">
        <Breadcrumbs>
          <Link to="/" className="opacity-60 text-customColor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Link to="#">Users</Link>
        </Breadcrumbs>
        <div className="w-fit flex gap-10 items-center">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="search"
              label="Search users.."
              value={search}
              onChange={(e) => searchFilter(e.target.value)}
              className="pr-20 border-customColor"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-customColor"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      {filterData?.length === 0 ? (
        <div className="w-full h-96 flex items-center justify-center">
          <h1 className="text-4xl text-gray-700 font-bold">No Data </h1>
        </div>
      ) : (
        <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2  gap-4">
          {filterData
            .slice(0)
            .reverse()
            .map(
              ({
                _id,
                email,
                name,
                avatar,
                role,
                tel,
                ville,
                adress,
                register_comm,
                shop_name,
                secter,
                active,
                patent,
                cin,
              }) => {
                return (
                  <div
                    key={_id}
                    className="flex flex-col border bg-gray-100 rounded-md shadow py-4 px-2"
                  >
                    <div className="w-full flex justify-center">
                      <img
                        src={`${path}user/uploads/images/${avatar}`}
                        alt="user Pic"
                        className="w-20 h-20 rounded-full"
                      />
                    </div>
                    <div className="flex justify-evenly items-center">
                      <div className="w-full ">
                        <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950">
                          <h2>{name}</h2>
                        </div>
                        <div className="w-full flex  items-center  text-gray-700">
                          <HiOutlineMail size={20} />
                          <h2>{email}</h2>
                        </div>
                        <div className="w-full flex  items-center  text-gray-700">
                          <BsPhone size={20} />
                          <h2>{tel}</h2>
                        </div>
                        <div className="w-full flex items-center gap-2 text-sm font-medium text-gray-700">
                          <GiModernCity size={20} />
                          <h2>{ville}</h2>
                        </div>
                        <div className="w-full flex  items-center  text-gray-700">
                          <TfiLocationPin size={20} />
                          <h2>{adress} </h2>
                        </div>
                      </div>
                      <div className="w-full flex justify-center">
                        <object
                          data={`${path}user/uploads/images/${cin}`}
                          aria-label="pdv cin"
                          className="w-4/5 h-auto rounded-sm"
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="w-full border my-2 "></div>

                    <div className="flex justify-evenly items-center">
                      <div className="w-full ">
                        <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950">
                          <h2>{register_comm}</h2>
                        </div>
                        <div className="w-full flex  items-center  text-gray-700">
                          <BsShop size={20} />
                          <h2>{shop_name}</h2>
                        </div>
                        <div className="w-full flex  items-center  text-gray-700">
                          <RxSection size={20} />
                          <h2>{secter}</h2>
                        </div>
                      </div>
                      <div className="w-full flex justify-center ">
                        <embed
                          src={`${path}user/uploads/images/${patent}`}
                          // title="pdv patent"
                          className="w-4/5 h-auto rounded-sm"
                          // style={{ maxHeight: "100%", maxWidth: "100%" }}
                          typeof="application/pdf"
                          type="application/pdf"
                          width="100%"
                          height="400px"
                        />
                      </div>
                    </div>
                    <div className="w-full border my-2 "></div>
                    <div className="flex justify-evenly w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                      <button
                        type="button"
                        className={`relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 bg-gradient-to-br  from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 `}
                        onClick={() => ToggleLock(true, _id, tel)}
                      >
                        <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          <BsPersonCheck size={18} />
                          <span>Accept</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        className={`relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 bg-gradient-to-br  from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500`}
                        onClick={() => ToggleLock(false, _id)}
                      >
                        <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          <BsPersonDash size={18} />
                          <span>Decline</span>
                        </span>
                      </button>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      )}
    </div>
  );
};

export default PdvRequests;
