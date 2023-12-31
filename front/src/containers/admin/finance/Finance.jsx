import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import swal from 'sweetalert';
import {GrView} from "react-icons/gr"
const Finance = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [matriculeFiscale, setMatriculeFiscale] = useState('');
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
    const result = await axios.get(`http://localhost:5000/finance`);
    setData(result.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const closeModal = () => {
    setName('');
    setTel('');
    setAdresse('');
    setMatriculeFiscale('');
    setId(null);
    setAvatar(null);
    setPreviewUrl(null);
    setOpenModal(false);
    setOpenView(false);
  }

  const Modifier = (item) => {
    setName(item.name);
    setTel(item.tel);
    setAdresse(item.adresse);
    setMatriculeFiscale(item.matriculeFiscale);
    setId(item._id);
    setOpenModal(true);
  }
  const get = (item) => {
    setName(item.name);
    setTel(item.tel);
    setAdresse(item.adresse);
    setMatriculeFiscale(item.matriculeFiscale);
    setId(item._id);
    setOpenView(true);
  }

  const onchange = (e) => {
    if (e.target.name === 'tel') {
      setTel(e.target.value);
    } else if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'adresse') {
      setAdresse(e.target.value);
    } else if (e.target.name === 'matriculeFiscale') {
      setMatriculeFiscale(e.target.value);
    }
  }

  const submitfinance = async (e) => {
    e.preventDefault();

    if (tel === '' || name === '' || adresse === '' || matriculeFiscale === '') {
      return alert('Fill up your form first !!!');
    }
    let meth, url;

    if (id) {
      meth = 'PUT';
      url = `http://localhost:5000/finance/${id}`

    } else {
      url = `http://localhost:5000/finance/add`;
      meth = 'POST';
    }

    try {

      const response = await fetch(url, {
        method: meth,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tel, name, adresse, matriculeFiscale })
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {

        swal("Succès!", result.message, "success");
        fetchData();
        closeModal();
      } else {
        return swal("Erreur! ooo", result.message, "error");

      }
    } catch (error) {
      return swal("Erreur!", "errorr ", "erroreeefff");
    }
  }

  const Supprimerfinance = async (id) => {
    const result = await axios.delete(`http://localhost:5000/finance/${id}`);

    if (result.data.success) {
      swal("Succès!", result.data.message, "success");
      fetchData();
    } else {
      return swal("Erreur!", result.data.message, "error ohh");

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
          <span className="">Micro-Finance</span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className=" relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => setOpenModal(true)}
          >
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Ajouter Finanace
            </span>
          </button>
        </div>

      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {data.slice(0).reverse().map(({ _id, tel, name, adresse, matriculeFiscale }) => {

          return (
            <div key={_id} className="flex flex-col border bg-white rounded-md shadow py-4 px-">

              <div className="w-full flex justify-center">
                <img
                  src="https://www.leconomistemaghrebin.com/wp-content/uploads/2022/03/banques-l-economiste-maghrebin.jpg"
                  alt="user Pic"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="w-full text-center">{name}</div>
              
              <div className="w-full border my-2 "></div>
              <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                  onClick={() => Modifier({ _id, tel, name, adresse, matriculeFiscale })}
                >
                  <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <BsPencilSquare />
                    Modifier
                  </span>
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                  onClick={() => get({ _id, tel, name, adresse, matriculeFiscale })}
                >
                  <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <GrView />
                    consulter
                  </span>
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                  onClick={() => Supprimerfinance(_id)}
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
          <form onSubmit={submitfinance} >
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
                <label htmlFor="nomID" className="text-2xl font-medium">
                Nom 
              </label>
                <input
                  type="text"
                  id="nameID"
                  name='name'
                  value={name}
                  onChange={(e) => onchange(e)}
                  placeholder='Name'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>

              {/* tel:  */}
              <div className="">
                <label htmlFor="telID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <label htmlFor="nomID" className="text-2xl font-medium">
                Téléphone 
              </label>
                <input
                  type="text"
                  id="telID"
                  name='tel'
                  value={tel}
                  onChange={(e) => onchange(e)}
                  placeholder='tel'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className="">
                <label htmlFor="adresseID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <label htmlFor="nomID" className="text-2xl font-medium">
                Adresse 
              </label>
                <input
                  type="text"
                  id="adresseID"
                  name='adresse'
                  value={adresse}
                  onChange={(e) => onchange(e)}
                  placeholder='adresse'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className="">
                <label htmlFor="matriculeFiscaleID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <label htmlFor="nomID" className="text-2xl font-medium">
                Matricule Fiscale 
              </label>
                <input
                  type="text"
                  id="matriculeFiscaleID"
                  name='matriculeFiscale'
                  value={matriculeFiscale}
                  onChange={(e) => onchange(e)}
                  placeholder='matriculeFiscale'
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


      {!openView ? null : (
        <div className="absolute top-5 left-52 h-fit bg-white border rounded-md shadow-xl p-6 overflow-y-auto w-2/3" style={{ maxHeight: "88vh" }}>
          <form  >
            <div className="w-full flex justify-center">
              <span className='text-3xl text-cyan-800 font-bold'>Plus des détails</span>
            </div>
            <div className="grid grid-cols-2 gap-4">

              {/* Name:  */}
              <div className="">
                <label htmlFor="nameID" className="block text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <label htmlFor="nomID" className="text-2xl font-medium">
                Nom 
              </label>
                <input
                  
                  type="text"
                  id="nameID"
                  name='name'
                  value={name}
                  onChange={(e) => onchange(e)}
                  placeholder='Name'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>

              {/* tel:  */}
              <div className="">
                <label htmlFor="telID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <label htmlFor="nomID" className="text-2xl font-medium">
                Téléphone 
              </label>
                <input
                  type="text"
                  id="telID"
                  name='tel'
                  value={tel}
                  onChange={(e) => onchange(e)}
                  placeholder='tel'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className="">
                <label htmlFor="adresseID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <label htmlFor="nomID" className="text-2xl font-medium">
                Adresse 
              </label>
                <input
                  type="text"
                  id="adresseID"
                  name='adresse'
                  value={adresse}
                  onChange={(e) => onchange(e)}
                  placeholder='adresse'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className="">
                <label htmlFor="matriculeFiscaleID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <label htmlFor="nomID" className="text-2xl font-medium">
                Matricule Fiscale 
              </label>
                <input
                  type="text"
                  id="matriculeFiscaleID"
                  name='matriculeFiscale'
                  value={matriculeFiscale}
                  onChange={(e) => onchange(e)}
                  placeholder='matriculeFiscale'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
            </div>
            <div className="w-full border my-6" />

            <div className="flex items-center justify-end gap-6">
              <button type="button"
                className="text-white bg-gradient-to-r from-light-green-800 to-light-green-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => closeModal()}
              >Annuler</button>

              
            </div>
          </form>
        </div >
      )}
    </div >
  )
}

export default Finance