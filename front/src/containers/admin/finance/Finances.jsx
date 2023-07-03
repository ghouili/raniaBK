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

import { BsPencilSquare, BsPhone } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import InputField from "../../../components/inputField/InputField";
import { path } from "../../../utils/Variables";
import { TfiLocationPin } from "react-icons/tfi";
import { HiOutlineMail } from "react-icons/hi";

const Finances = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    tel: "",
    adress: "",
    matricule: "",
    avatar: "",
  });
  //image related
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  let subtitle;

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  // handelie uploading image:::
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
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
    const result = await axios.get(`http://localhost:5000/user/finance`);

    setfilterData(result.data.data);
    setmasterData(result.data.data);
    setData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ToggleDialog = () => {
    setOpen(!open);
    setPreviewUrl(null);
    setFile(null);
    setFormValues({
      name: "",
      email: "",
      tel: "",
      adress: "",
      matricule: "",
      avatar: null,
    });
  };

  const Update_Finance = (item) => {
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

    console.log(formValues);
    const formData = new FormData();
    if (File) {
      formData.append("avatar", File);
    }
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("tel", formValues.tel);
    formData.append("adress", formValues.adress);
    formData.append("matricule", formValues.matricule);
    formData.append("role", "finance");
    try {
      let url, result;
      if (formValues._id) {
        url = `${path}user/finance/${formValues._id}`;
        result = await axios.put(url, formData);
      } else {
        url = `${path}user/finance/add`;
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

  const deleteFinance = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Micr-Finance?",
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
          {/* <Link to="#" className="opacity-60">
        <span>Users</span>
    </Link> */}
          <Link to="#">Mico-Finance</Link>
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
            <span className="flex w-32 justify-center">Add Micro-Finance</span>
          </button>
        </div>
      </div>

      <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4">
        {filterData
          .slice(0)
          .reverse()
          .map(({ _id, email, name, tel, adress, matricule, avatar, role }) => {
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

                    <div className="w-full flex  items-center  text-gray-700">
                      <TfiLocationPin size={20} />
                      <h2>{adress} </h2>
                    </div>
                  </div>
                </div>
                <div className="w-full border my-2 "></div>
                <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                    onClick={() =>
                      Update_Finance({ _id, email, name, tel, adress, matricule, avatar, role })
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
                    onClick={() => deleteFinance(_id)}
                  >
                    <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                      <IoTrashOutline />
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <Fragment>
        <Dialog open={open} handler={ToggleDialog}>
          <DialogHeader>Add an Admin.</DialogHeader>
          <form onSubmit={handleSubmit} >
            <DialogBody divider>
              {previewUrl ? (
                <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                  <img
                    src={previewUrl}
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
                      ref={filePickerRef}
                      onChange={pickedHandler}
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
                      ref={filePickerRef}
                      onChange={pickedHandler}
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
                      ref={filePickerRef}
                      onChange={pickedHandler}
                    />
                    <span className="text-gray-700">Select a picture</span>
                  </label>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 pb-4">
                <InputField
                  type="text"
                  label="Name:"
                  name="name"
                  placeholder="Name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                <InputField
                  type="email"
                  label="Email:"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <InputField
                  type="tel"
                  label="Phone number:"
                  name="tel"
                  placeholder="Phone number."
                  value={formValues.tel}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Adress:"
                  name="adress"
                  placeholder="Adress.."
                  value={formValues.adress}
                  onChange={handleInputChange}
                />
                <InputField
                  type="matricule"
                  label="Matricule Fescale:"
                  name="matricule"
                  placeholder="Matricule Fescale"
                  value={formValues.matricule}
                  onChange={handleInputChange}
                />
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
    </div>
  );
};

export default Finances;
