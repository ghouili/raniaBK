import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import swal from 'sweetalert';

const User = () => {

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(false);
  const [id, setId] = useState(null);


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

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/user`);
    setData(result.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const closeModal = () => {
    setName('');
    setEmail('');
    setId(null);
    setAvatar(null);
    setPreviewUrl(null);
    setOpenModal(false);
  }

  const Modifier = (item) => {
    setName(item.name);
    setId(item._id);
    setEmail(item.email);
    setOpenModal(true);
  }

  const onchange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'name') {
      setName(e.target.value);
    }
  }

  const submituser = async (e) => {
    e.preventDefault();

    if (email === '' || name === '') {
      return alert('Fill up your form first !!!');
    }
    let meth, url;

    if (id) {
      meth = 'PUT';
      url = `http://localhost:5000/user/${id}`

    } else {
      url = `http://localhost:5000/user/add`;
      meth = 'POST';
    }

    try {

      const response = await fetch(url, {
        method: meth,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, role: 'pdv' })
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {

        swal("Succès!", result.message, "success");
        fetchData();
        closeModal();
      } else {
        return swal("Erreur!", result.message, "error");

      }
    } catch (error) {
      return swal("Erreur!", "votre mot de passe ou votre email est inccorect ", "error");
    }
  }

  const SupprimerUser = async (id) => {
    const result = await axios.delete(`http://localhost:5000/user/${id}`);

    if (result.data.success) {
      swal("Succès!", result.data.message, "success");
      fetchData();
    } else {
      return swal("Erreur!", result.adta.message, "error");

    }

  }

  return (
    <div className="w-full relative py-16 px-10 bg">
      <div className="w-full px-4 py-2 flex justify-between items-center rounded-md shadow-md bg-white">
        <div className="flex gap-1 items-center">
          <Link to="/" className="font-medium hover:text-blue-900">
            Dashboard
          </Link>
          <span className="font-medium">/</span>
          <span className="">Users</span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className=" relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => setOpenModal(true)}
          >
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Ajouter User
            </span>
          </button>
        </div>

      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {data.slice(0).reverse().map(({ _id, email, name, role }) => {

          return (
            <div key={_id} className="flex flex-col border bg-white rounded-md shadow py-4 px-2">

              <div className="w-full flex justify-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                  alt="user Pic"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="w-full text-center">{name}</div>
              <div className="w-full text-center">{email}</div>

              <div className="w-full border my-2 "></div>
              <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                  onClick={() => Modifier({ _id, email, name, role })}
                >
                  <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <BsPencilSquare />
                    Modifier
                  </span>
                </button>

                <button
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                  onClick={()=>SupprimerUser(_id)}
                >
                  <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <IoTrashOutline />
                    Supprimer
                  </span>
                </button>
              </div>
            </div>
          );
        })}




      </div>

      {/* Modal */}
      {!openModal ? null : (
        <div className="absolute top-5 left-52 h-fit bg-white border rounded-md shadow-xl p-6 overflow-y-auto w-2/3" style={{ maxHeight: "88vh" }}>
          <form onSubmit={submituser} >
            <div className="w-full flex justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  className="w-auto h-40 object-cover object-center rounded-md"
                  alt="avatr"
                />
              ) : (
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
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">

              {/* Name:  */}
              <div className="">
                <label htmlFor="nameID" className="block text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="nameID"
                  name='name'
                  value={name}
                  onChange={(e) => onchange(e)}
                  placeholder='Name'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>

              {/* Email:  */}
              <div className="">
                <label htmlFor="emailID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="emailID"
                  name='email'
                  value={email}
                  onChange={(e) => onchange(e)}
                  placeholder='Email'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
            </div>
            <div className="w-full border my-6" />

            <div className="flex items-center justify-end gap-6">
              <button type="button"
                className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => closeModal()}
              >Annuler</button>

              <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">submit</button>

            </div>
          </form>
        </div >
      )}
    </div >
  )
}
export default User