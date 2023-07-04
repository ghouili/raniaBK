import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Breadcrumbs,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { BsPencilSquare, BsPhone } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import InputField from "../../components/inputField/InputField";
import { path } from "../../utils/Variables";
import Cookies from "universal-cookie";

const Packs = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [formValues, setFormValues] = useState({
    nom: "",
    description: "",
    critere_eligibility: "",
    document_requis: "",
    delai_traitement: "",
    picture: null,
    userid: user?._id
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
    const result = await axios.get(`http://localhost:5000/service`);

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
      nom: "",
      description: "",
      critere_eligibility: "",
      document_requis: "",
      delai_traitement: "",
      picture: null,
      userid: user?._id
    });
  };

  const Update_Pack = (item) => {
    // console.log(item);
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
      formData.append("picture", File);
    }
    formData.append("nom", formValues.nom);
    formData.append("description", formValues.description);
    formData.append("critere_eligibility", formValues.critere_eligibility);
    formData.append("document_requis", formValues.document_requis);
    formData.append("delai_traitement", formValues.delai_traitement);
    formData.append("userid", user?._id);

    try {
      let url, result;
      if (formValues._id) {
        url = `${path}service/${formValues._id}`;
        result = await axios.put(url, formData);
      } else {
        url = `${path}service/add`;
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

  const deletePack = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Pack?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`http://localhost:5000/service/${id}`);

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
          <Link to="#">Packs</Link>
        </Breadcrumbs>
        <div className="w-fit flex gap-10 items-center">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="search"
              label="Search pack.."
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
          {user && user?.role === "admin" ? (
            <button
              type="button"
              className="py-1.5 w-36 px-3 text-sm font-medium text-customColor focus:outline-none  
          rounded-lg border-2 border-customColor bg-gray-100 hover:bg-customColor hover:text-gray-100 focus:z-10 
          focus:ring-4 focus:ring-gray-200 "
              onClick={handleOpen}
            >
              <span className="flex w-full justify-center">Add Packs</span>
            </button>
          ) : null}
        </div>
      </div>
        {filterData.length === 0 ? 
          <div className="w-full h-96 flex items-center justify-center">
            <h1 className="text-4xl text-gray-700 font-bold">No Data </h1>
          </div>
        :
      <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterData
          .slice(0)
          .reverse()
          .map(
            ({
              _id,
              nom,
              description,
              critere_eligibility,
              document_requis,
              delai_traitement,
              picture,
            }) => {
              return (
                <Card key={_id} className="max-w-[24rem] overflow-hidden">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none"
                  >
                    <img
                      src={`${path}service/uploads/images/${picture}`}
                      alt="ui/ux review check"
                      className="h-60"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h4" color="blue-gray">
                      {nom}
                    </Typography>
                    <Typography
                      variant="lead"
                      color="gray"
                      className="mt-3 font-normal h-36 overflow-y-auto"
                    >
                      {description}
                    </Typography>
                    <div className="w-full border my-1" />
                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                      onClick={() => navigate(`/offres/${_id}`)}
                    >
                      <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        <AiOutlineEye />
                        Details
                      </span>
                    </button>
                    {user?.role === "admin" ? (
                      <button
                        type="button"
                        className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                        onClick={() =>
                          Update_Pack({
                            _id,
                            nom,
                            description,
                            critere_eligibility,
                            document_requis,
                            delai_traitement,
                            picture,
                          })
                        }
                      >
                        <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          <BsPencilSquare />
                          Update
                        </span>
                      </button>
                    ) : null}
                    {user?.role === "admin" ? (
                      <button
                        type="button"
                        className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                        onClick={() => deletePack(_id)}
                      >
                        <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          <IoTrashOutline />
                          Delete
                        </span>
                      </button>
                    ) : null}
                  </CardFooter>
                </Card>
              );
            }
          )}
      </div>
      }
      <Fragment>
        <Dialog size="lg" open={open} handler={ToggleDialog}>
          <DialogHeader>Add an Admin.</DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="overflow-auto"
            style={{ maxHeight: "85vh" }}
          >
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
              ) : formValues.picture ? (
                <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                  <img
                    src={`${path}service/uploads/images/${formValues.picture}`}
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
                  name="nom"
                  placeholder="Name"
                  value={formValues.nom}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Description:"
                  name="description"
                  placeholder="Description.."
                  value={formValues.description}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="document_requis:"
                  name="document_requis"
                  placeholder="document_requis.."
                  value={formValues.document_requis}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="critere_eligibility:"
                  name="critere_eligibility"
                  placeholder="critere_eligibility.."
                  value={formValues.critere_eligibility}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="delai_traitement:"
                  name="delai_traitement"
                  placeholder="delai_traitement.."
                  value={formValues.delai_traitement}
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

export default Packs;
