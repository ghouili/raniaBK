import React, { useEffect, useRef, useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.png";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { path } from "../../utils/Variables";
import { FiUpload } from "react-icons/fi";
import { BsPersonVcard } from "react-icons/bs";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import InputField from "../../components/inputField/InputField";
import swal from "sweetalert";

const Request = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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
    formData.append("password", formValues.password);
    formData.append("tel", formValues.tel);
    formData.append("ville", formValues.ville);
    formData.append("adress", formValues.adress);
    formData.append("register_comm", formValues.register_comm);
    formData.append("shop_name", formValues.shop_name);
    formData.append("secter", formValues.secter);
    formData.append("active", null);
    try {
      let url = `${path}user/add_pdv`;
      let result = await axios.post(url, formData);

      console.log(result);
      if (result.data.success === true) {
        swal("Success!", "request was sent successfully", "success");
        return navigate("/");
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

  return (
    <div className="w-full h-full pb-10  ">
      <div className="w-full flex justify-center py-4 cursor-pointer ">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="w-full px-16 lg:px-28 flex items-center justify-center ">
        {/* <div className="absolute top-0 left-1/2 h-2 w-32 rounded-b-md bg-blue-950"></div> */}
        <div className="w-full   bg-white rounded-md py-10 px-16 ">
          <div className="w-full py-4 px-8">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step onClick={() => setActiveStep(0)}>
                <UserIcon className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 0 ? "blue" : "blue-gray"}
                  >
                    Personal Details
                  </Typography>
                </div>
              </Step>
              <Step onClick={() => setActiveStep(1)}>
                <CogIcon className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 1 ? "blue" : "blue-gray"}
                  >
                    Business Details
                  </Typography>
                </div>
              </Step>
              <Step onClick={() => setActiveStep(2)}>
                <BuildingLibraryIcon className="h-5 w-5" />
                <div className="absolute -bottom-[4.5rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 2 ? "blue" : "blue-gray"}
                  >
                    Submit
                  </Typography>
                </div>
              </Step>
            </Stepper>
            <form onSubmit={handleSubmit} className=" mt-24">
              {/* Personal info Form::::: */}

              {activeStep === 0 ? (
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
                        src={`${path}uploads/images/${formValues.avatar}`}
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
              ) : (
                <div className={`w-full grid grid-cols-2 gap-10  `}>
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
                          data={`${path}uploads/images/${formValues.cin}`}
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
                          data={`${path}uploads/images/${formValues.patent}`}
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
              )}
              {activeStep === 0 ? (
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
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 pb-4">
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
              )}
              <div className="mt-10 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                  Prev
                </Button>
                {!isLastStep ? (
                  <Button onClick={handleNext} type="button">
                    <span>Next</span>
                  </Button>
                ) : (
                  <Button type="submit">
                    <span>Submit</span>
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
