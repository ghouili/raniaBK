import React, { useState } from "react";


function PMT(ir,np,pv){
    var pmt,pvif;
    if(ir==0)pmt=-pv/np;
    pvif=Math.pow(1+ir,np);
    if(ir!=0)pmt=(-ir*pv*pvif)/(pvif-1);
    return pmt

    
}


function Test() {

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
        <div className="flex flex-col justify-center items-center py-10 bg-gray-200">
            <h1 className="text-3xl font-bold mb-6">Simulation de crédit bancaire</h1>
            <div className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                        Montant du crédit
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="repayment" className="block text-gray-700 font-bold mb-2">
                        Durée du remboursement (en mois)
                    </label>
                    <input
                        type="number"
                        id="repayment"
                        name="repayment"
                        value={repayment}
                        onChange={handleRepaymentChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                        type="range"
                        id="repayment-range"
                        name="repayment-range"
                        value={repayment}
                        onChange={handleRepaymentRangeChange}
                        min="1"
                        max="360"
                        step="1"
                        className="mt-4"
                    />
                    <label htmlFor="repayment-range" className="block text-gray-700 font-bold mb-2">
                        {`Durée du remboursement: ${repayment} mois`}
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="benefit" className="block text-gray-700 font-bold mb-2">
                        Taux d'intérêt annuel (%) min 0,0025(0,25) et max 0,3(30)
                    </label>
                    <input
                        type="number"
                        id="benefit"
                        name="benefit"
                        value={benefit}
                        onChange={handleBenefitChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
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
                    <label htmlFor="benefit-range" className="block text-gray-700 font-bold mb-2">
                        {`Taux d'intérêt annuel: ${benefit}%`}
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="grace" className="block text-gray-700 font-bold mb-2">
                        Période de grâce (en mois)
                    </label>
                    <input
                        type="number"
                        id="grace"
                        name="grace"
                        value={grace}
                        onChange={handleGraceChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                        type="range"
                        id="grace-range"
                        name="grace-range"
                        value={grace}
                        onChange={handleGraceRangeChange}
                        min="0"
                        max="120"
                        step="1"
                        className="mt-4"
                    />
                    <label htmlFor="grace-range" className="block text-gray-700 font-bold mb-2">
                        {`Période de grâce: ${grace} mois`}
                    </label>
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
                        <span className="ml-2 text-gray-700 font-bold">Remboursement en un an</span>
                    </label>
                </div>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Calculer
                    </button>
                </div>
                <div className="mt-4">
                    <label htmlFor="total" className="block text-gray-700 font-bold mb-2">
                        {refund ? "Mensualités" : "Montant total à rembourser (en 3 ans)"}
                    </label>
                    <label htmlFor="total" className="block text-gray-700 font-bold mb-2">
                        {refund ? "Mensualités" : "Montant total à rembourser (en 3 ans)"}
                    </label>
                </div>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCalculate}
            >
                Calculer
            </button>
            <div className="mt-4">
                <span className="font-bold">Montant total du crédit:</span>{" "}
                <span className="font-bold text-blue-700">{total}€</span>
            </div>
        </div>
        // </div>
    );
}




export default Test;