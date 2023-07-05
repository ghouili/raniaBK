import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Cookies from "universal-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { path } from "../../../utils/Variables";

// import {
//   //Tab,
//   initTE,
// } from "tw-elements";

// initTE({ Tab });
const Offres = () => {
  const pamars = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [credits, setCredits] = useState([]);
  const [open, setOpen] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const fetchCredits = async (id) => {
    const result = await axios.get(`http://localhost:5000/offre/pack/${id}`);
    // console.log(result);
    setCredits(result.data.data);
  };

  const fetchData = async (id) => {
    const result = await axios.get(`http://localhost:5000/service/${id}`);
    // console.log(result);
    setData(result.data.data);
  };
  // console.log('data', data[0]?.critere_eligibility)
  useEffect(() => {
    // console.log('check');
    let id = pamars.id;
    fetchData(id);
    fetchCredits(id);
    // console.log(data.critere_eligibility);
  }, []);
  //const cookies = new Cookies();
  //let user;
  //user = cookies.get('user');

  const dataa = [
    {
      id: "critere_eligibility",
      label: "Critères d'éligibilité",
      value: "Critères d'éligibilité",
      desc: `* Etre de nationalité tunisienne ou une carte séjour valide en Tunisie 
      * Être âgé entre  18 et 65 ans 
      * Habitant etdétenant son projet dans la zone d’intervention
      * Ayant une activité exercée :
      • A domicile sans local dédié
      • A domicile avec local dédié à l’activité
      • Ambulant
      • Local indépendant
      • En Voiture`,
    },
    {
      id: "document_requis",

      label: "Documents requis",
      value: "Documents requis",
      desc: ` • Copie de la Carte d’identité nationale (CIN)
      • Copie de facture de la STEG ou SONEDE ou TELECOM prouvant l’adresse de l’emprunteur
      NB : d’autres documents peuvent vous être demandés après l’étude de dossier`,
    },

    {
      id: "delai_traitement",
      label: "Délais de traitement",
      value: "Délais de traitement",
      desc: ` Délais d’attente maximum à partir de la signature de la demande et la confirmation de la garantie :
      • Nouveau client : 15 jours ouvrables dès la signature de la demande à l’approbation du crédit
      • Renouvellement : 48 heures selon la validité de la garantie
      NB : La durée de l’étude du dossier peut varier selon le processus d’octroi des produits demandés.
    `,
    },
  ];

  return (
    <div className="w-full  flex gap-10 py-6 px-20 ">
      <div className="w-4/6 ">
        <img
          // src="https://www.usinenouvelle.com/mediatheque/4/2/7/000935724_896x598_c.jpg"
          src={`${path}service/uploads/images/${data.picture}`}
          alt="intro"
          className="w-full"
        />

        <div className="flex flex-col gap-4 mt-10">
          <div className="">
            <h1 className="text-2xl font-bold">{data.nom}</h1>
            <div className="border rounded-full h-2 w-14 border-orange-500 bg-orange-500 -ml-2" />
          </div>
          <p>{data.description}</p>
          <div className="py-8">
            <div className="bg-blue-gray-50 rounded-lg">
              <Fragment>
                {credits.map(
                  (
                    {
                      _id,
                      title,
                      description,
                      montant_min,
                      montant_max,
                      picture,
                    },
                    idx
                  ) => (
                    <Accordion key={_id} open={open === idx}>
                      <AccordionHeader
                        onClick={() => handleOpen(idx)}
                        className="px-4"
                      >
                        <div className="flex gap-6 items-center">
                          <FaPlus />
                          <span>{title}</span>
                        </div>
                      </AccordionHeader>
                      <AccordionBody className="px-10 text-lg font-medium ">
                        <div className="flex gap-4 items-start">
                          <Avatar
                            src={`${path}credit/uploads/images/${picture}`}
                            alt="credit_pic"
                            variant="rounded"
                            size="xxl"
                          />
                          <div className="flex flex-col items-start gap-4">
                            <span>{description}</span>
                            <span className="font-semibold">
                              Montant : De {montant_min} à {montant_max} DT
                            </span>
                            <Button
                              variant="outlined"
                              color="blue-gray"
                              size="sm"
                              onClick={() => navigate("/credit")}
                            >
                              Demander
                            </Button>
                          </div>
                        </div>
                      </AccordionBody>
                    </Accordion>
                  )
                )}
                {/* <Accordion open={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="px-4"
                  >
                    Crédit Tanmya
                  </AccordionHeader>
                  <AccordionBody className="px-10 text-lg font-medium">
                    Ce produit est destiné à financer les activités agricoles.{" "}
                    <br />
                    L’objectif de ce prêt est de donner l’accès au financement
                    aux petits exploitants agricoles <br />
                    <br />
                    Montant : De 200 à 5 000 DT
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="px-4"
                  >
                    Crédit Mostathmer
                  </AccordionHeader>
                  <AccordionBody className="px-10 text-lg font-medium">
                    Ce prêt est destiné à financer les micro-entrepreneurs
                    agricoles à fort potentiel de développement afin de
                    satisfaire leurs besoins et de promouvoir d’un côté les
                    investissements agricoles en milieu rural et de l’autre
                    faire face aux lourdes charges et dépenses liées aux
                    exploitations agricoles.
                    <br />
                    <br />
                    Montant : De 21 000 à 40 000 DT
                  </AccordionBody>
                </Accordion> */}
              </Fragment>
            </div>
            {/* <div className="py-2">
              <h1 className="text-2xl font-bold"></h1>
            </div> */}
          </div>

          <Tabs
            className="bg-blue-gray-50 rounded-lg "
            id="custom-animation"
            // value={data.critere_eligibility}
          >
            <TabsHeader className="py-6">
              {dataa.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              {dataa.map(({ id, label, value, desc }, index) => (
                <TabPanel key={index} value={label}>
                  {data[id]}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>

          {/* <div className="py-2">
            <h1 className="text-2xl font-bold"></h1>
          </div>

          <div className="py-8">
            <h1 className="text-2xl font-bold"></h1>
          </div> */}
        </div>
        {/* <div className=" flex flex-col gap-3">
          <Link to='/simulateur' className="border border-gray-500 bgb italic font-medium text-center bg-blue-950 px-2 py-4 text-white text-lg ">
            Simuler Vos Crédit

          </Link>
</div>*/}
        {/* Dialog::*/}
        {/*{user.role === 'admin' ? null : (*/}
      </div>
      <div className="w-1/4 h-20 mx-auto border rounded-lg  ">
        <div className="bg-gray-200 p-2 flex flex-col gap-2  ">
          <div className="flex h-10 gap-2 border-b border-gray-100 cursor-pointer ">
            <div className="border rounded-full h-full w-2 border-orange-500 bg-orange-500 -ml-2 " />
            <span className="text-lg font-semibold">Micro-credit</span>
          </div>
          <div className="flex flex-col gap-2 px-6 py-2 -mt-2 border-b border-gray-100 ">
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Agroalimentaire
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Librairie
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Parfumerie
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Itech
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Drugstore
            </Link>
            <Link to="/offers" className="text-gray-900 hover:text-gray-500">
              pack Autres
            </Link>
          </div>
          <div className="flex h-10 gap-2 border-b border-gray-100 cursor-pointer ">
            <div className="border rounded-full h-full w-2 border-orange-500 bg-orange-500 -ml-2 " />
            <span className="text-lg font-semibold">Micro-credit</span>
          </div>
          <div className="flex h-10 gap-2 cursor-pointer ">
            <div className="border rounded-full h-full w-2 border-orange-500 bg-orange-500 -ml-2 " />
            <span className="text-lg font-semibold">Service digitaux</span>
          </div>
        </div>
        {/* <div className="pt-10">
          <Fragment>
            <Button
              className="border border-gray-500  italic font-medium text-center bg-blue-950 px-2 py-4 text-white text-lg "
              onClick={handleOpenDialog}
              variant="gradient"
            >
              Simuler Vos Crédit
            </Button>
            <Dialog open={openDialog} handler={handleOpenDialog}>
              <DialogHeader>
                <h1 className="text-5xl font-bold text-blue-900 my-6">
                  Simulateur de crédit{" "}
                </h1>
              </DialogHeader>
              <DialogBody divider>
                <div className=" flex flex-row gap-20 ">
                  <form className="w-full  " action="">
                    <div class="grid gap-4 mb-4 sm:grid-cols-2 ">
                      <div className="flex flex-col gap-3">
                        <label htmlFor="nomID" className="text-2xl font-medium">
                          Montant du financement
                        </label>
                      </div>
                      <div className="flex flex-col gap-3">
                        <input
                          type="montant"
                          name="montant"
                          id="MontantID"
                          placeholder="100... Dt"
                          className="border border-gray-500  bg-white px-2 py-4 "
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          for="steps-range"
                          className=" text-2xl font-medium block mb-2  text-gray-900 dark:text-black"
                        >
                          Durée (mois)
                        </label>
                        <input
                          id="steps-range"
                          type="range"
                          min="12"
                          max="18"
                          value="2.5"
                          step="1"
                          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <input
                          type="durée"
                          name="durée"
                          id="DuréelID"
                          placeholder="12(mois)"
                          className="border border-gray-500  bg-white px-2 py-4"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          for="steps-range"
                          className=" text-2xl font-medium block mb-2  text-gray-900 dark:text-black"
                        >
                          Taux d'intéret (mois)
                        </label>
                        <input
                          id="steps-range"
                          type="range"
                          min="12"
                          max="18"
                          value="2.5"
                          step="1"
                          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <input
                          type="taux"
                          name="taux"
                          id="TaixID"
                          placeholder="Votre Adresse..."
                          className="border border-gray-500  bg-white px-2 py-4"
                        />
                      </div>

                      <label htmlFor="nomID" className="text-2xl font-medium">
                        Remboursement
                      </label>

                      <div className="flex flex-col gap-3">
                        <div class="flex items-center mb-4">
                          <input
                            id="default-radio-1"
                            type="radio"
                            value=""
                            name="default-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="default-radio-1"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Mensuel
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            checked
                            id="default-radio-2"
                            type="radio"
                            value=""
                            name="default-radio"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="default-radio-2"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Trimestriel
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpenDialog}
                  className="mr-1"
                >
                  <span>Annuler</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={handleOpenDialog}
                >
                  <span>Simuler</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </Fragment>
        </div> */}
      </div>
    </div>
  );
};

export default Offres;
