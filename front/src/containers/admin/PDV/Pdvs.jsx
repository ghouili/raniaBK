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
import { DisplayBigger } from "../../../components";

const Pdvs = () => {
  const [open, setOpen] = useState(false);
  const [fileDisplay, setFileDisplay] = useState(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    avatar: "",
    tel: "",
    ville: "",
    adress: "",
    register_comm: "",
    shop_name: "",
    secter: "",
    patent: "",
    cin: "",
  });
  //display bigger files::
  const [openDisplay, setOpenDisplay] = useState(false);
  //handel display bigger files::
  const handleOpenDisplay = (file) => {
    setOpenDisplay(!openDisplay);
    setFileDisplay(file);
  };

  //image related
  const [avatarFile, setAvatarFile] = useState();
  const [cinFile, setCinFile] = useState();
  const [patentFile, setPatentFile] = useState();
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState();
  const [cinPreviewUrl, setCinPreviewUrl] = useState();
  const [patentPreviewUrl, setPatentPreviewUrl] = useState();
  const [isAvatarValid, setIsAvatarValid] = useState(false);
  const [isCinValid, setIsCinValid] = useState(false);
  const [isPatentValid, setIsPatentValid] = useState(false);

  const avatarFilePickerRef = useRef();
  const cinFilePickerRef = useRef();
  const patentFilePickerRef = useRef();

  useEffect(() => {
    if (avatarFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setAvatarPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(avatarFile);
    }
  }, [avatarFile]);

  useEffect(() => {
    if (cinFile) {
      console.log(cinFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setCinPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(cinFile);
    }
  }, [cinFile]);

  useEffect(() => {
    if (patentFile) {
      console.log(patentFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPatentPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(patentFile);
    }
  }, [patentFile]);

  const handleAvatarFilePick = (event) => {
    let pickedFile;
    let fileIsValid = isAvatarValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setAvatarFile(pickedFile);
      setIsAvatarValid(true);
      fileIsValid = true;
    } else {
      setIsAvatarValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const handleCinFilePick = (event) => {
    let pickedFile;
    let fileIsValid = isCinValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setCinFile(pickedFile);
      setIsCinValid(true);
      fileIsValid = true;
    } else {
      setIsCinValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const handlePatentFilePick = (event) => {
    let pickedFile;
    let fileIsValid = isPatentValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setPatentFile(pickedFile);

      setIsPatentValid(true);
      fileIsValid = true;
    } else {
      setIsPatentValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

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

  const handleOpen = () => setOpen(!open);

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/user/pdvs`);

    setfilterData(result.data.data);
    setmasterData(result.data.data);
    setData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ToggleDialog = () => {
    setOpen(!open);
    setAvatarPreviewUrl(null);
    setCinPreviewUrl(null);
    setPatentPreviewUrl(null);
    setAvatarFile(null);
    setCinFile(null);
    setPatentFile(null);
    setFormValues({
      email: "",
      name: "",
      avatar: "",
      tel: "",
      ville: "",
      adress: "",
      register_comm: "",
      shop_name: "",
      secter: "",
      patent: "",
      cin: "",
    });
  };

  const Update_User = (item) => {
    console.log(item);
    setFormValues(item);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    // console.log(formValues);
    const formData = new FormData();
    // console.log(avatarFile);
    // console.log(cinFile);
    // console.log(patentFile);
    if (avatarFile) {
      // formData.append("image", previewUrl);
      formData.append("avatar", avatarFile);
    }
    if (cinFile) {
      formData.append("cin", cinFile);
    }
    if (patentFile) {
      formData.append("patent", patentFile);
    }

    formData.append("email", formValues.email);
    formData.append("name", formValues.name);
    formData.append("role", "pdv");
    formData.append("tel", formValues.tel);
    formData.append("ville", formValues.ville);
    formData.append("adress", formValues.adress);
    formData.append("register_comm", formValues.register_comm);
    formData.append("shop_name", formValues.shop_name);
    formData.append("secter", formValues.secter);
    // formData.append("active", true);
    try {
      let url, result;
      if (formValues._id) {
        url = `${path}user/pdv/${formValues._id}`;
        result = await axios.put(url, formData);
      } else {
        url = `${path}user/add_pdv`;
        result = await axios.post(url, formData);
      }
      console.log(result);
      if (result.data.success === true) {
        fetchData();
        swal("Success!", result.data.message, "success");
      } else {
        return swal("Error!", result.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  const deleteUser = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Admin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`http://localhost:5000/user/${id}`);

      if (result.data.success) {
        swal("Success!", result.data.message, "success");
        fetchData();
      } else {
        return swal("Error!", result.adta.message, "error");
      }
    }
  };

  const ToggleLock = async (lock, id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: `Are you sure that you want to ${
        lock ? "UnLock" : "Lock"
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

          <button
            type="button"
            className="py-1.5 px-3 text-sm font-medium text-customColor focus:outline-none  
            rounded-lg border-2 border-customColor bg-gray-100 hover:bg-customColor hover:text-gray-100 focus:z-10 
            focus:ring-4 focus:ring-gray-200 "
            onClick={handleOpen}
          >
            <span className="flex w-16 justify-center">Add User</span>
          </button>
        </div>
      </div>

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
              if (active == "null") {
                return null;
              }
              return (
                <div
                  key={_id}
                  className="flex flex-col border bg-gray-100 rounded-md shadow py-4 px-2"
                >
                  <div
                    className="w-full flex justify-center"
                  >
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
                      <h1
                        className=" cursor-pointer text-blue-700 hover:text-blue-900 underline font-semibold text-lg "
                        onClick={() => handleOpenDisplay(cin)}
                      >
                        CIN
                      </h1>
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
                      <h1
                        className=" cursor-pointer text-blue-700 hover:text-blue-900 underline font-semibold text-lg "
                        onClick={() => handleOpenDisplay(patent)}
                      >
                        Patent
                      </h1>
                      {/* <embed
                        src={`${path}user/uploads/images/${patent}`}
                        // title="pdv patent"
                        className="w-4/5 h-auto rounded-sm"
                        // style={{ maxHeight: "100%", maxWidth: "100%" }}
                        typeof="application/pdf"
                        type="application/pdf"
                        width="100%"
                        height="400px"
                      /> */}
                    </div>
                  </div>
                  <div className="w-full border my-2 "></div>
                  <div className="flex justify-evenly w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                    <button
                      type="button"
                      className={`relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 bg-gradient-to-br  ${
                        active
                          ? "from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500"
                          : "from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500"
                      } `}
                      onClick={() => ToggleLock(!active, _id)}
                    >
                      <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        {active === true ? <BsLock /> : <BsUnlock />}
                        {active === true ? (
                          <span>Lock</span>
                        ) : (
                          <span>UnLock</span>
                        )}

                        {/* <BsPersonCheck />
                        <BsPersonDash />
                        <span>Block</span> */}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                      onClick={() =>
                        Update_User({
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
                        })
                      }
                    >
                      <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <BsPencilSquare />
                        Update
                      </span>
                    </button>

                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                      onClick={() => deleteUser(_id)}
                    >
                      <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <IoTrashOutline />
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              );
            }
          )}
      </div>

      <Fragment>
        <Dialog open={open} size="xl" handler={ToggleDialog}>
          <DialogHeader>Add an Admin.</DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogBody divider>
              <div className="overflow-y-auto" style={{ maxHeight: "68vh" }}>
                <div className="w-full grid grid-cols-3 gap-10 ">
                  <div>
                    {avatarPreviewUrl ? (
                      <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                        <img
                          src={avatarPreviewUrl}
                          alt="product_pic"
                          className="h-full w-full object-cover object-center rounded-md"
                        />
                        <label
                          htmlFor="pictureID"
                          className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                        >
                          <BiEdit size={20} />
                          <input
                            type="file"
                            name="picture"
                            id="pictureID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg"
                            ref={avatarFilePickerRef}
                            onChange={handleAvatarFilePick}
                          />
                        </label>
                      </div>
                    ) : formValues.avatar ? (
                      <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                        <img
                          src={`${path}user/uploads/images/${formValues.avatar}`}
                          alt="product_pic"
                          className="h-full w-full object-cover object-center rounded-md"
                        />
                        <label
                          htmlFor="pictureID"
                          className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                        >
                          <BiEdit size={20} />
                          <input
                            type="file"
                            name="picture"
                            id="pictureID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg"
                            ref={avatarFilePickerRef}
                            onChange={handleAvatarFilePick}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="w-full flex justify-center items-center pb-6 ">
                        <label
                          htmlFor="pictureID"
                          className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                        >
                          <FiUpload size={30} />
                          <input
                            type="file"
                            name="picture"
                            id="pictureID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg"
                            ref={avatarFilePickerRef}
                            onChange={handleAvatarFilePick}
                          />
                          <span className="text-gray-700">Select a Avatar</span>
                        </label>
                      </div>
                    )}
                  </div>
                  <div>
                    {cinPreviewUrl ? (
                      <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                        <object
                          data={cinPreviewUrl}
                          aria-label="cin"
                          className="h-full w-full object-cover object-center rounded-md"
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                        <label
                          htmlFor="cinID"
                          className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                        >
                          <BiEdit size={20} />
                          <input
                            type="file"
                            name="picture"
                            id="cinID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg,.pdf"
                            ref={cinFilePickerRef}
                            onChange={handleCinFilePick}
                          />
                        </label>
                      </div>
                    ) : formValues.cin ? (
                      <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                        <object
                          data={`${path}user/uploads/images/${formValues.cin}`}
                          aria-label="CIN"
                          className="h-full w-full object-cover object-center rounded-md"
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                        <label
                          htmlFor="cinID"
                          className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                        >
                          <BiEdit size={20} />
                          <input
                            type="file"
                            name="cin"
                            id="cinID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg,.pdf"
                            ref={cinFilePickerRef}
                            onChange={handleCinFilePick}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="w-full flex justify-center items-center pb-6 ">
                        <label
                          htmlFor="cinID"
                          className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                        >
                          <BsPersonVcard size={30} />
                          <input
                            type="file"
                            name="cin"
                            id="cinID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg,.pdf"
                            ref={cinFilePickerRef}
                            onChange={handleCinFilePick}
                          />
                          <span className="text-gray-700">Select CIN</span>
                        </label>
                      </div>
                    )}
                  </div>
                  <div>
                    {patentPreviewUrl ? (
                      <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                        <object
                          data={patentPreviewUrl}
                          // alt="product_pic"
                          aria-label="Patent"
                          className="h-full w-full object-cover object-center rounded-md"
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                        <label
                          htmlFor="patentID"
                          className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                        >
                          <BiEdit size={20} />
                          <input
                            type="file"
                            name="patent"
                            id="patentID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg,.pdf"
                            ref={patentFilePickerRef}
                            onChange={handlePatentFilePick}
                          />
                        </label>
                      </div>
                    ) : formValues.patent ? (
                      <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                        <object
                          data={`${path}user/uploads/images/${formValues.patent}`}
                          aria-label="Patent"
                          className="h-full w-full object-cover object-center rounded-md"
                        />
                        <label
                          htmlFor="patentID"
                          className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                        >
                          <BiEdit size={20} />
                          <input
                            type="file"
                            name="patent"
                            id="patentID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg,.pdf"
                            ref={patentFilePickerRef}
                            onChange={handlePatentFilePick}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="w-full flex justify-center items-center pb-6 ">
                        <label
                          htmlFor="patentID"
                          className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                        >
                          <HiOutlineDocumentArrowUp size={30} />
                          <input
                            type="file"
                            name="patent"
                            id="patentID"
                            className="hidden"
                            accept=".jpg,.png,.jpeg,.pdf"
                            ref={patentFilePickerRef}
                            onChange={handlePatentFilePick}
                          />
                          <span className="text-gray-700 font-medium">
                            Select Patente
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4">
                  <InputField
                    type="text"
                    label="Name:"
                    name="name"
                    placeholder="PDV Name"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="email"
                    label="Email:"
                    name="email"
                    placeholder="Admin Email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="number"
                    label="Phone Number:"
                    name="tel"
                    placeholder="PDV phone number"
                    value={formValues.tel}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Ville:"
                    name="ville"
                    placeholder="PDV ville"
                    value={formValues.ville}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Adress:"
                    name="adress"
                    placeholder="PDV Adress"
                    value={formValues.adress}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="register de commerce:"
                    name="register_comm"
                    placeholder="PDV register de commerce"
                    value={formValues.register_comm}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="shop name:"
                    name="shop_name"
                    placeholder="PDV shop name"
                    value={formValues.shop_name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Secter:"
                    name="secter"
                    placeholder="PDV Secter"
                    value={formValues.secter}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={ToggleDialog}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" type="submit">
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>

      {/* //display bigger files:: */}
      <Fragment>
        <DisplayBigger
          file={fileDisplay}
          handleOpen={handleOpenDisplay}
          open={openDisplay}
        />
      </Fragment>
    </div>
  );
};

export default Pdvs;
