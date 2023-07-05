import "./sidebar.css";
import React, { Fragment, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsShop, BsBank, BsCalculator } from "react-icons/bs";
import { TbLayoutDashboard, TbMoneybag } from "react-icons/tb";
import { GiShop } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { GiPackedPlanks } from "react-icons/gi";

import { GeneralContext } from "../../Hooks/context/GeneralContext";
import Logo from "../../assets/images/logo.png";
import MiniLogo from "../../assets/images/MiniSebmlogo.png";
import { GrBusinessService } from "react-icons/gr";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Alert,
} from "@material-tailwind/react";
import Cookies from "universal-cookie";
import { IoDocumentTextOutline } from "react-icons/io5";

const Sidebar = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");
  const { sidebarOpen, alert, alertData, setAlert } =
    useContext(GeneralContext);
  const location = useLocation();

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);
  return (
    <div
      id="main__sidebar"
      className="sidebar h-screen relative flex flex-col gap-4"
    >
      <Link
        to="/"
        className={`w-full bg-white flex justify-center items-center ${
          sidebarOpen ? "px-6 py-4" : "p-3"
        } `}
      >
        <img
          src={sidebarOpen ? Logo : MiniLogo}
          alt="logo"
          className={`${sidebarOpen ? "w-full h-auto" : "w-full h-auto"}`}
        />
      </Link>

      <div
        className=" relative px-3 flex flex-col gap-3"
        style={{ height: "75vh" }}
      >
        {/* Dashboard::: */}
        {user?.role === "pdv" ? null : (
          <Link
            to="/"
            className={`rounded-md flex flex-row items-center ${
              sidebarOpen ? "" : "justify-center"
            } px-3 py-2 gap-2 text-base font-semibold hover:text-gray-800 hover:bg-gray-200 ${
              location.pathname === "/"
                ? "text-gray-100 bg-customColor"
                : "text-gray-800"
            } `}
          >
            <TbLayoutDashboard size={26} />
            <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
              Dashboard
            </span>
          </Link>
        )}
        {/* user::: */}
        {user?.role === "admin" ? (
          <Link
            to="/users"
            className={`rounded-md flex flex-row items-center ${
              sidebarOpen ? "" : "justify-center"
            } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 ${
              location.pathname === "/users"
                ? "text-gray-100 bg-customColor"
                : "text-gray-800"
            } `}
          >
            <FiUsers size={26} />
            <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
              Admins
            </span>
          </Link>
        ) : null}
        {/* Finance::: */}
        {user?.role === "admin" ? (
          <Link
            to="/finance"
            className={`rounded-md flex flex-row items-center ${
              sidebarOpen ? "" : "justify-center"
            } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 ${
              location.pathname === "/finance"
                ? "text-gray-100 bg-customColor"
                : "text-gray-800"
            } `}
          >
            <BsBank size={26} />
            <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
              Micro-Finances
            </span>
          </Link>
        ) : null}

        {/* pdvs::: */}
        {user?.role === "admin" ? (
          <Link
            to="/pdvs"
            className={`rounded-md flex flex-row items-center ${
              sidebarOpen ? "" : "justify-center"
            } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 ${
              location.pathname === "/pdvs"
                ? "text-gray-100 bg-customColor"
                : "text-gray-800"
            } `}
          >
            <BsShop size={26} />
            <span className={` ${sidebarOpen ? "block" : "hidden"}`}>PDVs</span>
          </Link>
        ) : null}

        {/* pdvsRequests::: */}
        {user?.role === "admin" ? (
          <Link
            to="/requests"
            className={`rounded-md flex flex-row items-center ${
              sidebarOpen ? "" : "justify-center"
            } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 ${
              location.pathname === "/requests"
                ? "text-gray-100 bg-customColor"
                : "text-gray-800"
            } `}
          >
            <BsShop size={26} />
            <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
              PDVs Requests
            </span>
          </Link>
        ) : null}

        {/* PACKS::: */}
        <Link
          to="/packs"
          className={`rounded-md flex flex-row items-center ${
            sidebarOpen ? "" : "justify-center"
          } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 ${
            location.pathname === "/packs"
              ? "text-gray-100 bg-customColor"
              : "text-gray-800"
          } `}
        >
          <TbMoneybag size={26} />
          <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
            Les Packs
          </span>
        </Link>

        {/* packs/credit::: */}
        <Link
          to="/packs/credit"
          className={`rounded-md flex flex-row items-center ${
            sidebarOpen ? "" : "justify-center"
          } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 ${
            location.pathname === "/packs/credit"
              ? "text-gray-100 bg-customColor"
              : "text-gray-800"
          } `}
        >
          <IoDocumentTextOutline size={26} />
          <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
            Les Packs Credits{" "}
          </span>
        </Link>

        {/* credit::: */}
        <Link
          to="/credit"
          className={`rounded-md flex flex-row items-center ${
            sidebarOpen ? "" : "justify-center"
          } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 ${
            location.pathname === "/credit"
              ? "text-gray-100 bg-customColor"
              : "text-gray-800"
          } `}
        >
          <IoDocumentTextOutline size={26} />
          <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
            Les Credits
          </span>
        </Link>
        {/* Simulation::: */}
        <Link
          to="/simulateur"
          // onClick={handleOpenDialog}
          className={`rounded-md  text-gray-800 flex flex-row items-center ${
            sidebarOpen ? "" : "justify-center"
          } px-3 py-2 gap-2 text-base font-semibold  hover:text-gray-800 hover:bg-gray-200 
               
           `}
        >
          <BsCalculator size={26} />
          <span className={` ${sidebarOpen ? "block" : "hidden"}`}>
            Simulateur
          </span>
        </Link>

        <Fragment>
          <Dialog open={openDialog} handler={handleOpenDialog}>
            <DialogHeader>
              <h1 className="text-5xl font-bold text-blue-900 my-6">
                Simulateur de crédit{" "}
              </h1>
            </DialogHeader>
            <DialogBody divider>
              <div className=" flex flex-row gap-20 ">
                <form className="w-full  " action="">
                  <div class="grid gap-4 mb-4 sm:grid-cols-2 ">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="nomID" className="text-2xl font-medium">
                        Montant du financement
                      </label>
                    </div>
                    <div className="flex flex-col gap-3">
                      <input
                        type="montant"
                        name="montant"
                        id="MontantID"
                        placeholder="100... Dt"
                        className="border border-gray-500  bg-white px-2 py-4 "
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        for="steps-range"
                        className=" text-2xl font-medium block mb-2  text-gray-900 dark:text-black"
                      >
                        Durée (mois)
                      </label>
                      <input
                        id="steps-range"
                        type="range"
                        min="12"
                        max="18"
                        value="2.5"
                        step="1"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <input
                        type="durée"
                        name="durée"
                        id="DuréelID"
                        placeholder="12(mois)"
                        className="border border-gray-500  bg-white px-2 py-4"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        for="steps-range"
                        className=" text-2xl font-medium block mb-2  text-gray-900 dark:text-black"
                      >
                        Taux d'intéret (mois)
                      </label>
                      <input
                        id="steps-range"
                        type="range"
                        min="12"
                        max="18"
                        value="2.5"
                        step="1"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <input
                        type="taux"
                        name="taux"
                        id="TaixID"
                        placeholder="Votre Adresse..."
                        className="border border-gray-500  bg-white px-2 py-4"
                      />
                    </div>

                    <label htmlFor="nomID" className="text-2xl font-medium">
                      Remboursement
                    </label>

                    <div className="flex flex-col gap-3">
                      <div class="flex items-center mb-4">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value=""
                          name="default-radio"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          for="default-radio-1"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Mensuel
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          checked
                          id="default-radio-2"
                          type="radio"
                          value=""
                          name="default-radio"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          for="default-radio-2"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Trimestriel
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpenDialog}
                className="mr-1"
              >
                <span>Annuler</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleOpenDialog}
              >
                <span>Simuler</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
        {/* <Fragment>

          <Alert
            open={alert}
            onClose={() => setAlert(false)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            className="absolute left-5 top-full z-20 bg-[#267e2a]/70 text-[#61ff69] border-l-4 border-[#61ff69] rounded-none font-medium"
            style={{ width: "40vw" }}
          >
            {alertData}
          </Alert>
        </Fragment> */}
      </div>
    </div>
  );
};

export default Sidebar;
