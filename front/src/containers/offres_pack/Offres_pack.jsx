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
  Select,
  Option,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie";

import { BsPencilSquare, BsPhone } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

import InputField from "../../components/inputField/InputField";
import { path } from "../../utils/Variables";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Image", "Titre", "Description", "Montant", "Pack", ""];

const Offres_pack = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [packs, setPacks] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    montant_min: "",
    montant_max: "",
    packid: "",
    picture: null,
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

  const fetchPacks = async () => {
    const result = await axios.get(`http://localhost:5000/service`);

    setPacks(result.data.data);
  };
  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/offre`);

    setfilterData(result.data.data);
    setmasterData(result.data.data);
    setData(result.data.data);
  };

  useEffect(() => {
    fetchData();
    fetchPacks();
  }, []);

  const ToggleDialog = () => {
    setOpen(!open);
    setPreviewUrl(null);
    setFile(null);
    setFormValues({
      title: "",
      description: "",
      montant_min: "",
      montant_max: "",
      packid: "",
      picture: null,
    });
  };

  const Modifier_offre = ({
    _id,
    title,
    description,
    montant_min,
    montant_max,
    packid,
    picture,
  }) => {
    // console.log(item);
    setFormValues({
      _id: _id,
      title: title,
      description: description,
      montant_min: montant_min,
      montant_max: montant_max,
      packid: packid._id,
      picture: picture,
    });
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
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("montant_min", formValues.montant_min);
    formData.append("montant_max", formValues.montant_max);
    formData.append("packid", formValues.packid);

    try {
      let url, result;
      if (formValues._id) {
        url = `${path}offre/${formValues._id}`;
        result = await axios.put(url, formData);
      } else {
        url = `${path}offre/add`;
        result = await axios.post(url, formData);
      }
      console.log(result);
      if (result.data.success === true) {
        fetchData();
        swal("Succès!", result.data.message, "success");
      } else {
        return swal("Erreur!", result.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal("Erreur!", "Veuillez réessayer plus tard.", "error");
    }
  };

  const SupprimerPack = async (id) => {
    const willSupprimer = await swal({
      title: "Êtes-vous sûr?",
      text: "Êtes-vous sûr de vouloir supprimer ce Credit?",
      icon: "warning",
      dangerMode: true,
    });

    if (willSupprimer) {
      const result = await axios.delete(`http://localhost:5000/offre/${id}`);

      if (result.data.success) {
        swal("Succès!", result.data.message, "success");
        fetchData();
      } else {
        return swal("Erreur!", result.adta.message, "error");
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
          <Link to="/packs" className="opacity-60">
            Packs
          </Link>
          <Link to="#">Credits</Link>
        </Breadcrumbs>
        <div className="w-fit flex gap-10 items-center">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="search"
              label="Recherche Credits.."
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
              Recherche
            </Button>
          </div>
          {user.role !== "admin" ? null : (
            <button
              type="button"
              className="py-1.5 w-36 px-3 text-sm font-medium text-customColor focus:outline-none  
          rounded-lg border-2 border-customColor bg-gray-100 hover:bg-customColor hover:text-gray-100 focus:z-10 
          focus:ring-4 focus:ring-gray-200 "
              onClick={handleOpen}
            >
              <span className="flex w-full justify-center">Ajouter Credit</span>
            </button>
          )}
        </div>
      </div>

      {filterData.length === 0 ? (
        <div className="w-full h-96 flex items-center justify-center">
          <h1 className="text-4xl text-gray-700 font-bold">il n'y a pas de données à afficher </h1>
        </div>
      ) : (
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterData
              .slice(0)
              .reverse()
              .map(
                (
                  {
                    _id,
                    title,
                    description,
                    montant_min,
                    montant_max,
                    packid,
                    picture,
                  },
                  index
                ) => {
                  // console.log(packid);
                  const isLast = index === filterData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={`${path}offre/uploads/images/${picture}`}
                            alt="avatar"
                            variant="rounded"
                            withBorder={true}
                            color="gray"
                            className="p-0.5"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {title}
                          </Typography>
                        </div>
                      </td>
                      <td className={` max-w-lg ${classes}`}>
                        <div className="flex flex-col">
                          <Tooltip
                            content={description}
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            className="max-w-screen-lg text-costumBlue font-medium bg-costumGreen p-1"
                          >
                            <p className="line-clamp-2">{description}</p>
                          </Tooltip>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            [{montant_min} ~~ {montant_max}]
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Link
                          to={`/offres/${packid._id}`}
                          className="text-blue-700 hover:text-blue-900 underline "
                        >
                          {packid.nom}
                        </Link>
                      </td>
                      {user.role !== "admin" ? null : (
                        <td
                          className={`max-w-md flex items-center gap-4 py-6  ${classes}`}
                        >
                          <Tooltip content="Modifier Credit">
                            <IconButton
                              variant="text"
                              color="blue-gray"
                              onClick={() =>
                                Modifier_offre({
                                  _id,
                                  title,
                                  description,
                                  montant_min,
                                  montant_max,
                                  packid,
                                  picture,
                                })
                              }
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Supprimer Credit">
                            <IconButton
                              variant="text"
                              color="red"
                              onClick={() => SupprimerPack(_id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      )}
      <Fragment>
        <Dialog size="lg" open={open} handler={ToggleDialog}>
          <DialogHeader>Modifier Credit {formValues.title}.</DialogHeader>
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
                    src={`${path}offre/uploads/images/${formValues.picture}`}
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
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    {" "}
                    Selectionner Pack :
                  </label>
                  <Select
                    label="Select Pack"
                    name="packid"
                    value={formValues.packid}
                    onChange={(value) =>
                      setFormValues({
                        ...formValues,
                        packid: value,
                      })
                    }
                  >
                    {packs.map(({ _id, nom }) => (
                      <Option key={_id} value={_id}>
                        {nom}
                      </Option>
                    ))}
                  </Select>
                </div>
                <InputField
                  type="text"
                  label="Titre:"
                  name="title"
                  placeholder="Title"
                  value={formValues.title}
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
                  type="number"
                  label="montant minimum:"
                  name="montant_min"
                  placeholder="Minimum.."
                  value={formValues.montant_min}
                  onChange={handleInputChange}
                />
                <InputField
                  type="number"
                  label="montant maximum:"
                  name="montant_max"
                  placeholder="Maxixmum.."
                  value={formValues.montant_max}
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
                <span>Annuler</span>
              </Button>
              <Button variant="gradient" color="green" type="submit">
                <span>confirmer</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default Offres_pack;
