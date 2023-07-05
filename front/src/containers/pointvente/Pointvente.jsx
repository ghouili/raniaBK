import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import swal from 'sweetalert';

const Pointvente = () => {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [adresse, setAdresse]=useState('');
    const [ville, setVille]= useState('');
    const [registre_de_commerce, setRegistre_de_commerce]= useState('');
    const [nom_boutique, setNom_boutique]= useState('');
    const [secteur_activiti, setSecteur_activiti]= useState('');
    const [patente, setPatente]= useState('');
    const [cin, setCin]= useState('');
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
      const result = await axios.get(`http://localhost:5000/pdv`);
      setData(result.data.data);
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const closeModal = () => {
      setPrenom('');
      setTel('');
      setAdresse('');
      setNom_boutique('');
      setCin('');
      setPatente('');
      setSecteur_activiti('');
      setVille('');
      setRegistre_de_commerce('');
      setId(null);
      setAvatar(null);
      setPreviewUrl(null);
      setOpenModal(false);
    }
  
    const update = (item) => {
      setPrenom(item.prenom);
      setTel(item.tel);
      setAdresse(item.adresse);
      setVille(item.ville);
      setRegistre_de_commerce(item.registre_de_commerce);
      setNom_boutique(item.nom_boutique);
      setSecteur_activiti(item.secteur_activiti);
      setPatente(item.patente);
      setCin(item.cin);
      
      setId(item._id);
      setOpenModal(true);
    }
  
    const onchange = (e) => {
      if (e.target.name === 'tel') {
        setTel(e.target.value);
      } else if (e.target.name === 'prenom') {
        setPrenom(e.target.value);
      }else if (e.target.name === 'adresse') {
        setAdresse(e.target.value);
      }else if (e.target.name === 'ville') {
        setVille(e.target.value);
      }
        else if (e.target.name === 'registre_de_commerce') {
        setRegistre_de_commerce(e.target.value);
      }
        else if (e.target.name === 'nom_boutique') {
        setNom_boutique(e.target.value);
      }
      else if (e.target.name === 'secteur_activiti') {
        setSecteur_activiti(e.target.value);
      }
      else if (e.target.name === 'patente') {
        setPatente(e.target.value);
      }
      else if (e.target.name === 'cin') {
        setCin(e.target.value);
      }
    }
  
    const submitpdv = async (e) => {
      e.preventDefault();
  
      if (tel === '' || prenom === '' || adresse==='' ||ville==='' || registre_de_commerce===''||nom_boutique===''
      ||secteur_activiti===''||patente===''||cin==='') {
        return alert('Fill up your form first !!!');
      }
      let meth, url;
  
      if (id) {
        meth = 'PUT';
        url = `http://localhost:5000/pdv/${id}`
  
      } else {
        url = `http://localhost:5000/pdv/add`;
        meth = 'POST';
      }
  
      try {
  
        const response = await fetch(url, {
          method: meth,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tel, prenom , adresse , ville , registre_de_commerce , nom_boutique, secteur_activiti
        , patente , cin })
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
  
    const Supprimerpdv = async (id) => {
      const result = await axios.delete(`http://localhost:5000/pdv/${id}`);
  
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
            <span className="">Point de vente</span>
          </div>
          <div className="flex gap-4 items-center">
            <button
              className=" relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
              onClick={() => setOpenModal(true)}
            >
              <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                Ajouter pdv
              </span>
            </button>
          </div>
  
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {data.slice(0).reverse().map(({ _id, tel, prenom , adresse , ville , registre_de_commerce , secteur_activiti , nom_boutique
          , patente , cin}) => {
  
            return (
              <div key={_id} className="flex flex-col border bg-white rounded-md shadow py-4 px-2">
  
                <div className="w-full flex justify-center">
                  <img
                    src="https://images.ctfassets.net/63bmaubptoky/Xc6Tcq87KUMdl4lCEiipNEfY26Z2u2I1mhuwS5un4bQ/129895172de17c692cc975b13e80cbd4/systeme-de-pdv-FR-SoftwareAdvice-Header.png"
                    alt="user Pic"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="w-full text-center">{prenom}</div>
                <div className="w-full text-center">{tel}</div>
                <div className="w-full text-center">{adresse}</div>
                {/*<div className="w-full text-center">{registre_de_commerce}</div>
                <div className="w-full text-center">{secteur_activiti}</div>
                <div className="w-full text-center">{nom_boutique}</div>
                <div className="w-full text-center">{patente}</div>
            <div className="w-full text-center">{cin}</div>*/}

  
                <div className="w-full border my-2 "></div>
                <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                    onClick={() => update({ _id, tel, prenom , adresse , ville, registre_de_commerce,secteur_activiti
                    ,nom_boutique, patente, cin})}
                  >
                    <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                      <BsPencilSquare />
                      Update
                    </span>
                  </button>
  
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                    onClick={()=>Supprimerpdv(_id)}
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
            <form onSubmit={submitpdv} >
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
  
                {/* prenom:  */}
                <div className="">
                  <label htmlFor="prenomID" className="block text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                  <input
                    type="text"
                    id="prenomID"
                    name='prenom'
                    value={prenom}
                    onChange={(e) => onchange(e)}
                    placeholder='prenom'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
  
                {/* tel:  */}
                <div className="">
                  <label htmlFor="telID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
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
                  <label htmlFor="villeID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                  <input
                    type="text"
                    id="villeID"
                    name='ville'
                    value={ville}
                    onChange={(e) => onchange(e)}
                    placeholder='ville'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>

                <div className="">
                  <label htmlFor="registre_de_commerceID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                  <input
                    type="text"
                    id="registre_de_commerceID"
                    name='registre_de_commerce'
                    value={registre_de_commerce}
                    onChange={(e) => onchange(e)}
                    placeholder='registre_de_commerce'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <div className="">
                  <label htmlFor="secteur_activitiID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                  <input
                    type="text"
                    id="secteur_activitiID"
                    name='secteur_activiti'
                    value={secteur_activiti}
                    onChange={(e) => onchange(e)}
                    placeholder='secteur_activiti'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <div className="">
                  <label htmlFor="nom_boutiqueID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                  <input
                    type="text"
                    id="nom_boutiqueID"
                    name='nom_boutique'
                    value={nom_boutique}
                    onChange={(e) => onchange(e)}
                    placeholder='nom_boutique'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <div className="">
                  <label htmlFor="patenteID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                  <input
                    type="text"
                    id="patenteID"
                    name='patente'
                    value={patente}
                    onChange={(e) => onchange(e)}
                    placeholder='patente'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <div className="">
                  <label htmlFor="cinID" className="block  text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                  <input
                    type="text"
                    id="cinID"
                    name='cin'
                    value={cin}
                    onChange={(e) => onchange(e)}
                    placeholder='cin'
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

export default Pointvente