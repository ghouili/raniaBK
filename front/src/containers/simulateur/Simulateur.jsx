import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function PMT(ir, np, pv) {
  var pmt, pvif;
  if (ir == 0) pmt = -pv / np;
  pvif = Math.pow(1 + ir, np);
  if (ir != 0) pmt = (-ir * pv * pvif) / (pvif - 1);
  return pmt;
}
const Simulateur = () => {
  //const [open, setOpen] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
    if (openDialog) {
      return;
    }
    handleCalculate();
  };

  const [amount, setAmount] = useState(0);
  const [repayment, setRepayment] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [grace, setGrace] = useState(0);
  const [refund, setRefund] = useState(false);
  const [total, setTotal] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRepaymentChange = (e) => {
    setRepayment(e.target.value);
  };

  const handleBenefitChange = (e) => {
    setBenefit(e.target.value);
  };

  const handleGraceChange = (e) => {
    setGrace(e.target.value);
  };

  const handleRefundChange = (e) => {
    setRefund(e.target.checked);
  };

  const handleRepaymentRangeChange = (e) => {
    setRepayment(e.target.value);
  };

  const handleGraceRangeChange = (e) => {
    setGrace(e.target.value);
  };

  const handleBenefitRangeChange = (e) => {
    setBenefit(e.target.value);
  };

  const handleCalculate = () => {
    //const amount=setAmount.value;
    const PMTV = PMT(benefit / 12, repayment - grace, -1 * amount);

    if (refund) {
      setTotal(Math.round(PMTV));
    } else {
      setTotal(Math.round(PMTV * 3));
    }
  };

  return (
    <div className="w-full  px-36 ">
      <h1 className="text-5xl font-bold text-blue-900 my-20">
        Simulateur de crédits{" "}
      </h1>
      <div className=" flex flex-row gap-20 ">
        <form className="w-full flex flex-col items-center py-4 " action="">
          <div class="grid gap-10 mb-10 sm:grid-cols-2 ">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="nomID"
                className="text-2xl font-medium text-light-green-300"
              >
                Montant du financement
              </label>
            </div>
            <div className="">
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={handleAmountChange}
                //placeholder="1000 Dt"
                className="border border-gray-300  bg-white px-1 py-2 "
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                for="steps-range"
                className=" text-2xl font-medium  mb-2  text-light-green-300"
              >
                Durée (mois)
              </label>

              <input
                type="range"
                id="repayment-range"
                name="repayment-range"
                value={repayment}
                onChange={handleRepaymentRangeChange}
                min="1"
                max="360"
                step="1"
                className=" w-full h-2 "
              />
            </div>
            <div className="">
              <input
                type="number"
                id="repayment"
                name="repayment"
                value={repayment}
                onChange={handleRepaymentChange}
                placeholder="12(mois)"
                className="border border-gray-300  bg-white px-1 py-2"
              />
            </div>
            <div className="">
              <label
                for="steps-range"
                className="  text-2xl font-medium block mb-2  text-light-green-300"
              >
                Taux d'intéret (mois)
              </label>
              <input
                type="range"
                id="benefit-range"
                name="benefit-range"
                value={benefit}
                onChange={handleBenefitRangeChange}
                min="0.0025"
                max="0,3"
                step="1"
                className="mt-4"
              />
            </div>
            <div className="">
              <input
                type="number"
                id="benefit"
                name="benefit"
                value={benefit}
                onChange={handleBenefitChange}
                placeholder="0.25"
                className="border border-gray-300  bg-white px-1 py-2"
              />
            </div>

            <div className="">
              <label
                for="steps-range"
                className="  text-2xl font-medium block mb-2  text-light-green-300"
              >
                grace (mois)
              </label>
              <input
                type="range"
                id="grace-range"
                name="grace-range"
                value={grace}
                onChange={handleGraceRangeChange}
                min="0"
                max="120"
                step="1"
                className=" w-full h-2 "
              />
            </div>
            <div className="">
              <input
                type="number"
                id="grace"
                name="grace"
                value={grace}
                onChange={handleGraceChange}
                className="border border-gray-300  bg-white px-1 py-2 "
              />
            </div>

            <div className="mb-4">
              <label htmlFor="refund" className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="refund"
                  name="refund"
                  checked={refund}
                  onChange={handleRefundChange}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="text-2xl font-medium block mb-2  text-light-green-300">
                  Remboursement en un an
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <div className="mt-4">
                <label
                  htmlFor="total"
                  className="text-2xl font-medium block mb-2 text-blue-gray-300"
                >
                  {refund ? "Mensualités" : "Trimestriel (en 3 ans)"}
                </label>
              </div>
              {/* <span className="text-2xl font-medium block mb-2  text-light-green-300">Remboursement en un an</span>
                 {refund ?
              <div class="flex items-center mb-4">
                <input id="default-radio-1" type="radio" value="refund" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mensuel</label>
              </div>
              :
              <div class="flex items-center">
                <input checked id="default-radio-2" type="radio" value="refund" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Trimestriel</label>
                 </div>}*/}
            </div>
          </div>

          <Fragment>
            <Button
              className="border border-gray-500 bgb italic font-medium text-center bg-blue-950 px-2 py-4 text-white text-lg "
              onClick={handleOpenDialog}
              variant="gradient"
            >
              Simuler
            </Button>
            <Dialog open={openDialog} handler={handleOpenDialog}>
              <DialogHeader className="text-5xl font-medium text-light-green-400">
                Montant de l'échéance
              </DialogHeader>
              <DialogBody divider>
                <span className="font-bold px-10 text-5xl text-blue-900">
                  {total} TND
                </span>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="bleu"
                  //onClick={handleOpenDialog}
                  onClick={handleCalculate}
                  className="mr-1"
                >
                  <span>Calculer</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={handleOpenDialog}
                >
                  <span>ok</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </Fragment>
        </form>
      </div>
    </div>
  );
};
export default Simulateur;
