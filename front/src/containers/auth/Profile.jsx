import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsPersonVcard, BsPhone, BsShop } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import InputField from "../../components/inputField/InputField";
import { path } from "../../utils/Variables";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import {
  Breadcrumbs,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BiEdit } from "react-icons/bi";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { FiUpload } from "react-icons/fi";
import { RxSection } from "react-icons/rx";
import { GiDiploma } from "react-icons/gi";

const Profile = () => {
  const params = useParams();
  let id = params.id;
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({
    _id: "6486e61fb62ab3d78349cd4a",
    email: "test01@gmail.com",
    name: "Rania Boukabous",
    role: "pdv",
    avatar: "042421a0-0904-11ee-b2e8-fb0ff6cd4d0c.jpeg",
    tel: 53972874,
    ville: "soussa",
    adress: "sousse",
    register_comm: "2565653",
    shop_name: "chez azza",
    secter: "drugstore",
    patent: "0424e4f1-0904-11ee-b2e8-fb0ff6cd4d0c.pdf",
    cin: "0424e4f0-0904-11ee-b2e8-fb0ff6cd4d0c.pdf",
    matricule: null,
    newPass: null,
    confirmPass: null,
  });

  const ToggleDialog = () => {
    setOpen(!open);
    setAvatarPreviewUrl(null);
    setAvatarFile(null);
    if (open) {
      setUser({
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
        newPass: null,
        confirmPass: null,
      });
      fetchData();
    }
  };
  //image related
  const [avatarFile, setAvatarFile] = useState();

  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState();

  const [isAvatarValid, setIsAvatarValid] = useState(false);

  const avatarFilePickerRef = useRef();

  useEffect(() => {
    if (avatarFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setAvatarPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(avatarFile);
    }
  }, [avatarFile]);

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

  const fetchData = async () => {
    const result = await axios.get(`${path}user/${id}`);

    setUser(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    const formData = new FormData();
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    formData.append("name", user.name);
    formData.append("tel", user.tel);
    formData.append("ville", user.ville);
    formData.append("adress", user.adress);
    if (user.newPass) {
      formData.append("newPass", user.newPass);
    }
    if (user.confirmPass) {
      formData.append("confirmPass", user.confirmPass);
    }
    try {
      let url, result;

      url = `${path}user/pdv/${user._id}`;
      result = await axios.put(url, formData);

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

  return (
    <div
      className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover relative"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')",
      }}
    >
      <div className=" max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-0">
        {/* Main Col */}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-left">
            {/* Image for mobile view */}

            <div className="flex items-center gap-4">
              <img
                // src="https://i.pinimg.com/236x/6c/70/49/6c7049c585471eee8e292c7a10012a09.jpg"
                src={`${path}user/uploads/images/${user.avatar}`}
                className="w-20 h-20 rounded-full "
                alt="profile_picture"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user.name}</h1>
                <h6 className="text-sm font-medium -mt-1.5"> {user.email}</h6>
              </div>
            </div>
            <div className="mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-start gap-4">
              <BsPhone color="#17491B" size={22} />
              {user.tel}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-start gap-4">
              <CiLocationOn color="#17491B" size={24} />
              {user.adress}, {user.ville}
            </p>
            {user?.role !== "pdv" ? null : (
              <>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

                <div className="w-full flex flex-col gap-2 pt-4">
                  {/* <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950">
                <h2>user.register_comm</h2>
              </div> */}
                  <div className="w-full flex  items-center  text-gray-700 gap-4">
                    <GiDiploma size={22} />
                    <h2>{user.register_comm}</h2>
                  </div>
                  <div className="w-full flex  items-center  text-gray-700 gap-4">
                    <BsShop size={20} />
                    <h2>{user.shop_name}</h2>
                  </div>
                  <div className="w-full flex  items-center  text-gray-700 gap-4">
                    <RxSection size={20} />
                    <h2>{user.secter}</h2>
                  </div>
                </div>
              </>
            )}
            {/* Buttons */}
            <div className="pt-12 pb-8">
              <button
                onClick={ToggleDialog}
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
              >
                Modifier
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-4"
                onClick={ToggleDialog}
              >
                Message
              </button>
            </div>
          </div>
        </div>
        {/* 
        <div className="absolute h-screen py-20 inset-y-1/3 inset-x-1/2 flex flex-col bg-rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-black opacity-75">
       pic</div>
       */}
      </div>
      <Fragment>
        <Dialog open={open} size="xl" handler={ToggleDialog}>
          <DialogHeader>Ajouter an Admin.</DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogBody divider>
              <div className="overflow-y-auto" style={{ maxHeight: "68vh" }}>
                <div className="w-full flex items-center justify-center ">
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
                    ) : user.avatar ? (
                      <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                        <img
                          src={`${path}user/uploads/images/${user.avatar}`}
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
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4">
                  <InputField
                    type="text"
                    label="Nom:"
                    name="name"
                    placeholder="Nom de PDV"
                    value={user.name}
                    onChange={handleInputChange}
                  />

                  <InputField
                    type="number"
                    label="Telephone:"
                    name="tel"
                    placeholder="PDV Telephone"
                    value={user.tel}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Ville:"
                    name="ville"
                    placeholder="PDV ville"
                    value={user.ville}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="text"
                    label="Adress:"
                    name="adress"
                    placeholder="PDV Adress"
                    value={user.adress}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="password"
                    label="Mot de Passe:"
                    name="newPass"
                    placeholder="Mot de Passe"
                    value={user?.newPass}
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="password"
                    label="Confirmer Mot de Passe:"
                    name="confirmPass"
                    placeholder="Confirmer Mot de Passe"
                    value={user?.confirmPass}
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

export default Profile;
