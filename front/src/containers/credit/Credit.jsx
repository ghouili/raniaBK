import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

import { BsFileEarmarkPlus, BsPhone, BsShop } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { FaCoins, FaPercent } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { path } from "../../utils/Variables";
import InputField from "../../components/inputField/InputField";
import swal from "sweetalert";
import { socket } from "../../Socket";
import { DisplayBigger } from "../../components";
import { HiOutlineMail } from "react-icons/hi";
import { GiModernCity } from "react-icons/gi";
import { TfiLocationPin } from "react-icons/tfi";
import { RxSection } from "react-icons/rx";

const TABS = [
  {
    label: "Tout",
    value: "Tout",
  },
  {
    label: "EnCours",
    value: "En cours",
  },
  {
    label: "Accepte",
    value: "Acceptee",
  },
  {
    label: "Refusee",
    value: "Refusee",
  },
];

const TABLE_HEAD = ["Pack", "PDV", "duree", "etat", "date", ""];

const Credit = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [pdvs, setPdvs] = useState([]);
  const [packs, setPacks] = useState([]);
  const [packCredits, setPackCredits] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);

  const [autre, setAutre] = useState(7);
  const [fraisDoc, setFraisDoc] = useState(120);
  const [montant_ech, setMontant_ech] = useState(0);
  const [id, setId] = useState(null);

  const [credit, setCredit] = useState({
    // _id: "",
    montant: 0,
    interet: 1.25,
    duree: 0,
    grasse: 0,
    montant_ech: 0,
    rembource: "Mensuel",
    etat: "Acceptee",
  });

  const [formValues, setFormValues] = useState({
    montant: 0,
    duree: 0,
    grasse: 0,
    rembource: "Mensuel",
    packid: "",
    offreid: "",
    userid: user?._id,
    montant_ech: 0,
  });
  const [minMant, setMinMant] = useState(0);
  const [maxMant, setMaxMant] = useState(0);
  const [errors, setErrors] = useState({
    montant: null,
    montant_ech: null,
    duree: null,
    grasse: null,
    rembource: null,
  });

  const [pdvCreditopen, setPdvCreditopen] = useState(false);
  const [displayEcheance, setDisplayEcheance] = useState(0);

  const [fileDisplay, setFileDisplay] = useState(null);
  //display bigger files::
  const [openDisplay, setOpenDisplay] = useState(false);
  //handel display bigger files::
  const handleOpenDisplay = (file) => {
    setOpenPdvDisplay(false);
    setOpenDisplay(!openDisplay);
    setFileDisplay(file);
  };

  const [pdvDisplay, setPdvDisplay] = useState(null);
  //display bigger pdv::
  const [openPdvDisplay, setOpenPdvDisplay] = useState(false);
  //handel display bigger pdv::
  const handleOpenPdvDisplay = async (id) => {
    const result = await axios.get(`${path}user/${id}`);

    // console.log(result.data.data);
    setPdvDisplay(result.data.data);

    setOpenPdvDisplay(!openPdvDisplay);
  };

  const handelPdvD = () => setOpenPdvDisplay(!openPdvDisplay);
  const handelPdvCreditopen = () => setPdvCreditopen(!pdvCreditopen);

  const handleOpenAccept = () => {
    setOpenAccept(!openAccept);
    if (openAccept) {
      setFraisDoc(120);
      setMontant_ech(0);
      setAutre(7);
    }
    // if (openAccept) {
    //   setId(null);
    //   return;
    // }
    // handleCalculate(id);
  };

  const handleOpen = () => {
    setOpen(!open);
    setMinMant(0);
    setMaxMant(0);
    setFormValues({
      montant: 0,
      montant_ech: 0,
      duree: 0,
      grasse: 0,
      rembource: "Mensuel",
      date: "",
      packid: "",
      offreid: "",
      userid: user?._id,
    });
  };

  const searchFilter = (text) => {
    if (text === "Tout") {
      setfilterData(masterData);
      setSearch(text);
      return;
    }
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

  const fetchCredit = async (id, display) => {
    const result = await axios.get(`${path}credit/${id}`);

    console.log(result.data.data);
    setCredit(result.data.data);
    let echeance = await handleCalculate(
      result.data.data.montant,
      result.data.data.interet,
      result.data.data.duree,
      result.data.data.grasse,
      result.data.data.rembource,
      autre,
      fraisDoc
    );

    setDisplayEcheance(echeance);
    setMontant_ech(echeance);
    if (display) {
      return handelPdvCreditopen();
    }
    return handleOpenAccept();
  };

  const fetchPdvData = async () => {
    const result = await axios.get(`${path}user/pdvs`);

    // console.log(result.data.data);
    setPdvs(result.data.data);
  };

  const fetchPackData = async () => {
    const result = await axios.get(`${path}service`);

    console.log(result.data.data);
    setPacks(result.data.data);
  };

  const fetchPackCreditsData = async (id) => {
    const result = await axios.get(`${path}offre/pack/${id}`);

    setPackCredits(result.data.data);
  };

  const fetchData = async () => {
    const result = await axios.get(`${path}credit`);

    setmasterData(result.data.data);
    setfilterData(result.data.data);
  };

  useEffect(() => {
    fetchPdvData();
    fetchPackData();
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === "montant") {
      if (e.target.value < minMant || e.target.value > maxMant) {
        setErrors({
          ...errors,
          montant: "Montant de finnencssement must be correct",
        });
      } else {
        setErrors({
          ...errors,
          montant: null,
        });
      }
    }
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    // console.log("calculate :");
    // handleCalculate();
    let echeance = await handleCalculate(
      formValues.montant,
      1.25,
      formValues.duree,
      formValues.grasse,
      formValues.rembource,
      autre,
      fraisDoc
    );

    // console.log(echeance);
    let values = {
      montant: formValues.montant,
      montant_ech: echeance,
      duree: formValues.duree,
      grasse: formValues.grasse,
      rembource: formValues.rembource,
      packid: formValues.packid,
      offreid: formValues.offreid,
      userid: formValues.userid,
    };

    try {
      let url, result;
      if (formValues._id) {
        url = `${path}credit/${formValues._id}`;
        result = await axios.put(url, formValues);
      } else {
        url = `http://localhost:5004/add`;
        result = await axios.post(url, values);
      }
      // console.log(result);
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

  const Refuse = async (id) => {
    const willSupprimer = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Refuse this credit?",
      icon: "warning",
      dangerMode: true,
    });

    if (willSupprimer) {
      const result = await axios.put(`http://localhost:5004/etat/${id}`, {
        etat: "Refusee",
      });
      console.log(result.data);
      if (result.data.success) {
        if (result.data.socketID) {
          console.log(`socket  id :  ${result.data.socketID}`);
          socket.emit("alertUser", {
            userID: result.data.socketID,
            data: {
              success: false,
              msg: "Desole, Votre demande n'a pas acceptee .",
            },
          });
        }
        swal("Succès!", result.data.message, "success");
        fetchData();
      } else {
        return swal("Erreur!", result.adta.message, "error");
      }
    }
  };

  const Accept = async (e) => {
    e.preventDefault();
    const willSupprimer = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Refuse this credit?",
      icon: "warning",
      dangerMode: true,
    });

    if (willSupprimer) {
      const result = await axios.put(
        `http://localhost:5004/etat/${credit._id}`,
        {
          interet: credit.interet,
          duree: credit.duree,
          grasse: credit.grasse,
          montant_ech: displayEcheance,
          etat: "Acceptee",
        }
      );

      if (result.data.success) {
        if (result.data.socketID) {
          console.log(`socket  id :  ${result.data.socketID}`);
          socket.emit("alertUser", {
            userID: result.data.socketID,
            data: {
              success: true,
              msg: "Felicitation, Votre demande a été accepte.",
            },
          });
        }
        swal("Succès!", result.data.message, "success");
        setAutre(7);
        setFraisDoc(120);
        fetchData();
      } else {
        return swal("Erreur!", result.adta.message, "error");
      }
    }
  };

  const handleCalculate = async (
    montant,
    interet,
    duree,
    grasse,
    rembource,
    autre,
    fraisDoc
  ) => {
    let montFrais = parseInt(montant) + parseInt(fraisDoc);

    interet = (montant * parseFloat(interet)) / 100;
    autre = (montant * parseFloat(autre)) / 100;
    let time = duree - grasse;
    console.log("montant: " + montant);
    console.log("montant + frais: " + montFrais);
    // console.log("interet: " + interet);
    // console.log("duree: " + time);
    // console.log("duree: " + duree);
    // console.log("grasse: " + grasse);
    // console.log("v rembource: " + rembource);
    // console.log("v autre: " + autre);
    console.log("fraisDoc: " + fraisDoc);

    const echeance = (montFrais + interet + autre) / time;

    const roundedEcheance = Math.round(echeance);
    console.log(echeance);
    if (rembource === "Mensuel") {
      return roundedEcheance;
    } else {
      return roundedEcheance * 3;
    }
  };

  return (
    <div className=" mt-4 ">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Liste des Credits
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="outlined"
                color="green"
                size="sm"
                onClick={() => searchFilter("")}
              >
                Tout
              </Button>
              {user.role !== "pdv" ? null : (
                <Button
                  className="flex items-center gap-3"
                  color="green"
                  size="sm"
                  onClick={handleOpen}
                >
                  <BsFileEarmarkPlus className="h-4 w-4" /> Demande Credit
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="Tout" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => {
                      searchFilter(value);
                      // console.log(value);
                    }}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Recherche"
                value={search}
                onChange={(e) => searchFilter(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {filterData?.length === 0 ? (
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
                        montant,
                        montant_ech,
                        duree,
                        grasse,
                        payed,
                        etat,
                        rembource,
                        date,
                        packid,
                        userid,
                      },
                      index
                    ) => {
                      console.log(
                        "userId: " + userid + " user._id: " + user._id
                      );
                      // console.log('userId: ' + userid  +' user._id: ' + user._id);
                      if (user.role === "pdv" && user._id !== userid) {
                        return null;
                      }

                      console.log(user._id);
                      let pack = packs.filter((item) => item._id === packid);
                      let pdv = pdvs.filter((item) => item._id === userid);
                      // console.log(pack);
                      // console.log(pdv);
                      const isLast = index === filterData.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <Link
                                  to={`/offres/${packid}`}
                                  className="text-blue-700 hover:text-blue-900 underline "
                                >
                                  {pack[0]?.nom}
                                </Link>{" "}
                                (<b>{montant}</b> DT)
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <Link
                                  // to={`/offres/${packid}`}
                                  className="text-blue-700 hover:text-blue-900 underline "
                                  onClick={() => handleOpenPdvDisplay(userid)}
                                >
                                  {pdv[0]?.name}
                                </Link>
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <b>{duree}</b> par <b>{rembource}</b> apres{" "}
                                <b>{grasse}</b> mois
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                color={
                                  etat === "Acceptee"
                                    ? "green"
                                    : etat === "Refusee"
                                    ? "red"
                                    : "blue-gray"
                                }
                                value={
                                  etat === "Acceptee" ? "Accepté" : "Refusé"
                                }
                                // color="blue-gray"
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Detaille de Credit">
                              <IconButton
                                variant="text"
                                color="blue"
                                onClick={() => fetchCredit(_id, true)}
                              >
                                <EyeIcon className="h-5 w-5 text-green-900 " />
                              </IconButton>
                            </Tooltip>
                            
                            {etat === "Refusee" || user.role !== "finance"  ? null : (
                              <Tooltip content="Reffusé Credit">
                                <IconButton
                                  variant="text"
                                  color="red"
                                  onClick={() => Refuse(_id)}
                                >
                                  <XMarkIcon className="h-5 w-5 text-red-900" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {etat === "Acceptee" || user.role !== "finance"  ? null : (
                              <Tooltip content="Accepté Credit">
                                <IconButton
                                  variant="text"
                                  color="green"
                                  onClick={() => fetchCredit(_id)}
                                >
                                  <CheckIcon className="h-5 w-5 text-green-900 " />
                                </IconButton>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          )}
        </CardBody>
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" color="blue-gray" size="sm">
              Previous
            </Button>
            <Button variant="outlined" color="blue-gray" size="sm">
              Next
            </Button>
          </div>
        </CardFooter> */}
      </Card>

      <Fragment>
        <Dialog
          open={open}
          handler={handleOpen}
          size="lg"
          // animate={{
          //   mount: { scale: 1, y: 0 },
          //   unmount: { scale: 0.9, y: -100 },
          // }}
        >
          <DialogHeader>Demande de Credit</DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogBody divider>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label
                    htmlFor="Packid"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Pack:
                  </label>
                  <Select
                    id="Packid"
                    value={formValues.packid}
                    onChange={(value) => {
                      // console.log(e);
                      fetchPackCreditsData(value);
                      setFormValues({
                        ...formValues,
                        packid: value,
                      });
                    }}
                    label="Select a Pack"
                  >
                    {packs
                      .slice(0)
                      .reverse()
                      .map(({ _id, nom }) => (
                        <Option key={_id} value={_id}>
                          {nom}
                        </Option>
                      ))}
                  </Select>
                </div>
                <div className="">
                  <label
                    htmlFor="crditid"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Credit:
                  </label>
                  <Select
                    id="crditid"
                    value={formValues.offreid}
                    onChange={(value) => {
                      setMinMant(value.montant_min);
                      setMaxMant(value.montant_max);
                      setFormValues({
                        ...formValues,
                        offreid: value._id,
                      });
                    }}
                    label="Select a Credit"
                  >
                    {packCredits
                      .slice(0)
                      .reverse()
                      .map(({ _id, title, montant_min, montant_max }) => (
                        <Option
                          key={_id}
                          value={{ _id, montant_min, montant_max }}
                        >
                          {title} : [ {montant_min} -- {montant_max}]
                        </Option>
                      ))}
                  </Select>
                </div>

                <InputField
                  type="number"
                  label="Montant :"
                  name="montant"
                  placeholder="Montant de credit"
                  value={formValues.montant}
                  onChange={handleInputChange}
                  error={errors.montant}
                />
                <InputField
                  type="number"
                  label="Interet :"
                  name="montant"
                  placeholder="Montant de credit"
                  value={1.25}
                  onChange={handleInputChange}
                  disabled={true}
                />
                <InputField
                  type="number"
                  label="Duree par mois:"
                  name="duree"
                  placeholder="Duree de payement"
                  value={formValues.duree}
                  onChange={handleInputChange}
                />
                <InputField
                  type="number"
                  label="Period de grace par mois:"
                  name="grasse"
                  placeholder="Period de grasse par mois"
                  value={formValues.grasse}
                  onChange={handleInputChange}
                />
                <div className="">
                  <label
                    htmlFor="rembourceid"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Type De rembourcement:
                  </label>
                  <Select
                    id="rembourceid"
                    value={formValues.rembource}
                    onChange={(value) => {
                      setFormValues({
                        ...formValues,
                        rembource: value,
                      });
                    }}
                    label="Select Type De Rembourcement"
                  >
                    <Option value="Mensuel">Mensuel</Option>
                    <Option value="Trimestriel">Trimestriel</Option>
                  </Select>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
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

      <Fragment>
        <Dialog size="lg" open={openAccept} handler={handleOpenAccept}>
          <div className="flex items-center justify-between">
            <DialogHeader>
              <span className="text-center text-sm font-medium mr-4">
                Traitement de credit
              </span>
              <span className="text-green-500 font-semibold">
                {displayEcheance} Dt
              </span>
            </DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpenAccept} />
          </div>
          <form onSubmit={Accept}>
            <DialogBody divider>
              <div className="grid grid-cols-2 gap-6">
                <Input
                  label="Mantant demander"
                  value={credit.montant}
                  // onChange={(e) => setMontant_ech(e.target.value)}
                  disabled
                />
                <Input
                  label="Taux d'intret en %"
                  type="number"
                  value={credit.interet}
                  onChange={async (e) => {
                    setCredit({
                      ...credit,
                      interet: e.target.value,
                    });
                    if (e.target.value) {
                      // } else if (
                      //   typeof e.target.value === "string" &&
                      //   !isNaN(e.target.value)
                      // ) {
                      //   setCredit({
                      //     ...credit,
                      //     interet: parseFloat(e.target.value),
                      //   });
                      // } else {
                      //   setCredit({
                      //     ...credit,
                      //     interet: 1.25,
                      //   });
                      // }
                      let echeance = await handleCalculate(
                        credit.montant,
                        e.target.value,
                        credit.duree,
                        credit.grasse,
                        credit.rembource,
                        autre,
                        fraisDoc
                      );
                      console.log(echeance);
                      setDisplayEcheance(echeance);
                    }
                  }}
                />
                <Input
                  label="Frais de dossier en DT"
                  type="number"
                  value={fraisDoc}
                  onChange={async (e) => {
                    // console.log(typeof e.target.value);
                    setFraisDoc(e.target.value);
                    if (e.target.value) {
                      // } else if (
                      //   typeof e.target.value === "string" &&
                      //   e.target.value !== ''
                      // ) {
                      //   setFraisDoc(parseFloat(e.target.value));
                      // } else {
                      //   setFraisDoc(0);
                      // }
                      let echeance = await handleCalculate(
                        credit.montant,
                        credit.interet,
                        credit.duree,
                        credit.grasse,
                        credit.rembource,
                        autre,
                        e.target.value
                      );
                      console.log(echeance);
                      setDisplayEcheance(echeance);
                    }
                  }}
                />
                <Input
                  label="Assurance en %"
                  value={autre}
                  type="number"
                  onChange={async (e) => {
                    setAutre(e.target.value);
                    if (e.target.value) {
                      let echeance = await handleCalculate(
                        credit.montant,
                        credit.interet,
                        credit.duree,
                        credit.grasse,
                        credit.rembource,
                        e.target.value,
                        fraisDoc
                      );
                      console.log(echeance);
                      setDisplayEcheance(echeance);
                    }
                  }}
                />
                <Input
                  label="Durrée (mois)"
                  value={credit.duree}
                  onChange={async (e) => {
                    setCredit({
                      ...credit,
                      duree: e.target.value,
                    });
                    if (e.target.value) {
                      let echeance = await handleCalculate(
                        credit.montant,
                        credit.interet,
                        e.target.value,
                        credit.grasse,
                        credit.rembource,
                        autre,
                        fraisDoc
                      );
                      console.log(echeance);
                      setDisplayEcheance(echeance);
                    }
                  }}
                />
                <Input
                  label="Periode Grace (mois)"
                  value={credit.grasse}
                  onChange={async (e) => {
                    setCredit({
                      ...credit,
                      grasse: e.target.value,
                    });
                    if (e.target.value) {
                      let echeance = await handleCalculate(
                        credit.montant,
                        credit.interet,
                        credit.duree,
                        e.target.value,
                        credit.rembource,
                        autre,
                        fraisDoc
                      );
                      console.log(echeance);
                      setDisplayEcheance(echeance);
                    }
                  }}
                />
              </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button variant="outlined" color="red" onClick={handleOpenAccept}>
                Annuler
              </Button>
              <Button variant="gradient" color="green" type="submit">
                Accepté
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>

      <Fragment>
        {/* <Button onClick={handelPdvCreditopen} variant="gradient">
          Open Dialog
        </Button> */}
        <Dialog
          open={pdvCreditopen}
          handler={handelPdvCreditopen}
          className="p-4"
        >
          <div className="w-full rounded-md border-gray-500 border">
            <div className="w-full p-4 flex gap-2 flex-col justify-center items-center border-b border-gray-500 ">
              <div className="bg-green-400 p-2 text-green-900 rounded-full ">
                <IoCalendarOutline size={24} />
              </div>
              <span className="text-center text-sm font-medium">
                Remboursement Mensuel
              </span>
              <span className="text-green-500 font-semibold">
                {displayEcheance} Dt
              </span>
            </div>
            <div className="grid grid-cols-3">
              <div className="p-4 flex gap-2 flex-col justify-center items-center ">
                <div className="bg-green-400 p-2 text-green-900 rounded-full ">
                  <FaCoins size={24} />
                </div>
                <span className="text-center text-sm font-medium">
                  Financement Sollicite
                </span>
                <span className="text-green-500 font-semibold">
                  {credit.montant} Dt
                </span>
              </div>
              <div className="p-4 flex gap-2 flex-col justify-center items-center border-l border-gray-500 ">
                <div className="bg-green-400 p-2 text-green-900 rounded-full ">
                  <HiOutlineClipboardDocumentList size={24} />
                </div>
                <span className="text-center text-sm font-medium">
                  Frais d'etudes de Dossier
                </span>
                <span className="text-green-500 font-semibold">
                  {fraisDoc} Dt
                </span>
              </div>
              <div className="p-4 flex gap-2 flex-col justify-center items-center border-l border-gray-500 ">
                <div className="bg-green-400 p-2 text-green-900 rounded-full ">
                  <FaPercent size={20} />
                </div>
                <span className="text-center text-sm font-medium">
                  Frais d'Endettement Mensuel
                </span>
                <span className="text-green-500 font-semibold">
                  {credit.interet} %
                </span>
              </div>
            </div>
          </div>
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

      {/* //display PDV:: */}
      <Fragment>
        <Dialog open={openPdvDisplay} handler={handelPdvD} className="p-4">
          <div className="flex flex-col border bg-gray-100 rounded-md shadow py-4 px-2">
            <div className="w-full flex justify-center">
              <img
                src={`${path}user/uploads/images/${pdvDisplay?.avatar}`}
                alt="user Pic"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex justify-evenly items-center">
              <div className="w-full ">
                <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950">
                  <h2>{pdvDisplay?.name}</h2>
                </div>
                <div className="w-full flex  items-center  text-gray-700">
                  <HiOutlineMail size={20} />
                  <h2>{pdvDisplay?.email}</h2>
                </div>
                <div className="w-full flex  items-center  text-gray-700">
                  <BsPhone size={20} />
                  <h2>{pdvDisplay?.tel}</h2>
                </div>
                <div className="w-full flex items-center gap-2 text-sm font-medium text-gray-700">
                  <GiModernCity size={20} />
                  <h2>{pdvDisplay?.ville}</h2>
                </div>
                <div className="w-full flex  items-center  text-gray-700">
                  <TfiLocationPin size={20} />
                  <h2>{pdvDisplay?.adress} </h2>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <h1
                  className=" cursor-pointer text-blue-700 hover:text-blue-900 underline font-semibold text-lg "
                  onClick={() => handleOpenDisplay(pdvDisplay?.cin)}
                >
                  CIN
                </h1>
              </div>
            </div>
            <div className="w-full border my-2 "></div>

            <div className="flex justify-evenly items-center">
              <div className="w-full ">
                <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950">
                  <h2>{pdvDisplay?.register_comm}</h2>
                </div>
                <div className="w-full flex  items-center  text-gray-700">
                  <BsShop size={20} />
                  <h2>{pdvDisplay?.shop_name}</h2>
                </div>
                <div className="w-full flex  items-center  text-gray-700">
                  <RxSection size={20} />
                  <h2>{pdvDisplay?.secter}</h2>
                </div>
              </div>
              <div className="w-full flex justify-center ">
                <h1
                  className=" cursor-pointer text-blue-700 hover:text-blue-900 underline font-semibold text-lg "
                  onClick={() => handleOpenDisplay(pdvDisplay?.patent)}
                >
                  Patent
                </h1>
              </div>
            </div>
          </div>
          {/* <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={handelPdvD}>
              Annuler
            </Button>
          </DialogFooter> */}
        </Dialog>
      </Fragment>
    </div>
  );
};

export default Credit;
