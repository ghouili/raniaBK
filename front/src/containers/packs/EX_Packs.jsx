import React, { useState,Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import {GrView} from "react-icons/gr"
import swal from 'sweetalert';

const Packs = () => {

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [montant_min, setMontant_min] = useState('');
  const [montant_max, setMontant_max] = useState('');
  const [critere_eligibility , setCritere_eligibility]=useState('');
  const [document_requis , setDocument_requis]=useState('');
  const [delai_traitement , setDelai_traitement]=useState('');
  
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
    const result = await axios.get(`http://localhost:5000/service`);
    // console.log(result);
    setData(result.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const closeModal = () => {
    setNom('');
    setDescription('');
    setMontant_max('');
    setMontant_min('');
    setCritere_eligibility('');
    setDelai_traitement('');
    setDocument_requis('');
    setId(null);
    setAvatar(null);
    setPreviewUrl(null);
    setOpenModal(false);
  }

  const Modifier = (item) => {
    setNom(item.nom);
    setDescription(item.description);
    setMontant_min(item.montant_min);
    setMontant_max(item.montant_max);
    setCritere_eligibility(item.critere_eligibility);
    setDocument_requis(item.document_requis);
    setDelai_traitement(item.delai_traitement);
    setId(item._id);
    setOpenModal(true);
  }

  const onchange = (e) => {
    if (e.target.name === 'nom') {
      setNom(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }else if (e.target.name === 'montant_min') {
      setMontant_min(e.target.value);
    }else if (e.target.name === 'montant_max') {
      setMontant_max(e.target.value);
    }else if (e.target.name === 'critere_eligibility') {
      setCritere_eligibility(e.target.value);
    }else if (e.target.name === 'document_requis') {
      setDocument_requis(e.target.value);
    }else if (e.target.name === 'delai_traitement') {
      setDelai_traitement(e.target.value);
    }
  }

  const submitpack = async (e) => {
    e.preventDefault();

    if (description=== '' || nom === '' || montant_min ==='' || montant_max ==='' || critere_eligibility===''||
    document_requis===''||delai_traitement==='' ) {
      return alert('Fill up your form first !!!');
    }
    let meth, url;

    if (id) {
      meth = 'PUT';
      url = `http://localhost:5000/service/${id}`

    } else {
      url = `http://localhost:5000/service/add`;
      meth = 'POST';
    }

    try {

      const response = await fetch(url, {
        method: meth,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ montant_max, nom , description , montant_min ,critere_eligibility,delai_traitement,document_requis })
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
      return swal("Erreur!", "errorr ", "error");
    }
  }

  const Supprimerpack = async (id) => {
    const result = await axios.delete(`http://localhost:5000/service/${id}`);

    if (result.data.success) {
      swal("Succès!", result.data.message, "success");
      fetchData();
    } else {
      return swal("Erreur!", result.data.message, "error ");

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
          <span className="">Les Services disponible</span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className=" relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => setOpenModal(true)}
          >
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Ajouter Packs
            </span>
          </button>
        </div>

      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {data.slice(0).reverse().map(({ _id, description, nom , montant_min , montant_max , delai_traitement, document_requis ,critere_eligibility}) => {

          return (
            <div key={_id} className="flex flex-col border bg-white rounded-md shadow py-4 px-2">

              <div className="w-full flex justify-center">
                <img
                  src="https://www.boursedescredits.com/pics/data/guides/images/297-650x320.jpg"
                  alt="user Pic"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="w-full text-center">{nom}</div>
             {/*<div className="w-full text-center">{description}</div>
              <div className="w-full text-center">{montant_min}</div>
          <div className="w-full text-center">{montant_max}</div>*/}

              <div className="w-full border my-2 "></div>
              <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                  onClick={() => Modifier({ _id, description, nom , montant_min , montant_max ,critere_eligibility ,delai_traitement ,document_requis})}
                >
                  <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <BsPencilSquare />
                    Modifier
                  </span>
                </button>
                <Link to='/offres'
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                  >
                  <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <GrView />
                    Consulter 
                  </span>
                </Link>

                <button
                  type="button"
                  className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                  onClick={()=>Supprimerpack(_id)}
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
          <form onSubmit={submitpack} >
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
                <label htmlFor="nomID" className="block text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="nomID"
                  name='nom'
                  value={nom}
                  onChange={(e) => onchange(e)}
                  placeholder='nom'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>

              {/* description:  */}
              <div className="">
                <label htmlFor="descriptionID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="descriptionID"
                  name='description'
                  value={description}
                  onChange={(e) => onchange(e)}
                  placeholder='description'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className="">
                <label htmlFor="montant_minID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="montant_minID"
                  name='montant_min'
                  value={montant_min}
                  onChange={(e) => onchange(e)}
                  placeholder='montant_min'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
              <div className="">
                <label htmlFor="montant_maxID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="montant_maxID"
                  name='montant_max'
                  value={montant_max}
                  onChange={(e) => onchange(e)}
                  placeholder='montant_max'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>
            
            
                {/* critére:  */}
              <div className="">
                <label htmlFor="critere_eligibilityID" className="block text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="critere_eligibilityID"
                  name='critere_eligibility'
                  value={critere_eligibility}
                  onChange={(e) => onchange(e)}
                  placeholder='critere_eligibility'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>

              {/* document_requis:  */}
              <div className="">
                <label htmlFor="document_requisID" className="block text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="document_requisID"
                  name='document_requis'
                  value={document_requis}
                  onChange={(e) => onchange(e)}
                  placeholder='document_requis'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              </div>

              {/* Name:  */}
              <div className="">
                <label htmlFor="delai_traitementID" className="block text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                <input
                  type="text"
                  id="delai_traitementID"
                  name='delai_traitement'
                  value={delai_traitement}
                  onChange={(e) => onchange(e)}
                  placeholder='delai_traitement'
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

export default Packs