const credit = require("../model/credit");
const socketIds = require("../model/socketIds");
const moment = require("moment");


const Addcredit = async (req, res) => {
    const {
        montant,
        montant_ech,
        duree,
        grasse,
        payed,
        rembource,
        packid,
        offreid,
        userid
    } = req.body;
    // console.log(req.body);

    const Newcredit = new credit({
        montant,
        montant_ech,
        duree,
        grasse,
        payed,
        date: moment().format('LLL'),
        rembource,
        packid,
        offreid,
        userid
    });

    try {
        await Newcredit.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error', data: error });
    }

    return res.status(201).json({ success: true, message: 'credit added successfully', data: Newcredit });

}

const GetAll = async (req, res) => {

    let allcredit;
    try {
        // allcredit = await credit.deleteMany({});
        // allcredit = await credit.find().populate('packid','service');
        allcredit = await credit.find();
        // await credit.deleteMany({});
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all credit', data: allcredit });

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existingcredit;
    try {
        existingcredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingcredit) {
        return res.status(200).json({ success: false, message: 'credit exist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'credit founded successfully', data: existingcredit });

}

const Update = async (req, res) => {

    const {
        montant,
        montant_ech,
        duree,
        grasse,
        payed,
        etat,
        rembource,
        packid,
        userid
    } = req.body;
    const { id } = req.params;

    let existingcredit;
    try {
        existingcredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingcredit) {
        return res.status(200).json({ success: false, message: 'credit existe pas!!', data: null });
    }

    existingcredit.montant = montant;
    existingcredit.montant_ech = montant_ech;
    existingcredit.duree = duree;
    existingcredit.grasse = grasse;
    existingcredit.payed = payed;
    existingcredit.etat = etat;
    existingcredit.rembource = rembource;
    existingcredit.packid = packid;
    existingcredit.userid = userid;
    try {
        await existingcredit.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'credit updated successfully', data: existingcredit });

}

const Etat = async (req, res) => {

    const { etat, interet, duree, grasse, montant_ech } = req.body;
    const { id } = req.params;

    let socketID = null;
    let existingcredit;
    try {
        existingcredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingcredit) {
        return res.status(200).json({ success: false, message: 'credit existe pas!!', data: null });
    }

    existingcredit.etat = etat;

    if (montant_ech) {
        existingcredit.montant_ech = montant_ech;
    }

    if (duree) {
        existingcredit.duree = duree;
    }

    if (grasse) {
        existingcredit.grasse = grasse;
    }

    if (interet) {
        existingcredit.interet = interet;
    }

    if (etat === "Acceptee") {
        console.log('Accepted');
        let existingsocketIds;
        try {
            existingsocketIds = await socketIds.findOne({ userid: existingcredit.userid });
        } catch (error) {
            console.log(error);
        }
        console.log(existingsocketIds);
        
        if (existingsocketIds) {
            socketID =  existingsocketIds.socketid;
            console.log(socketID);
        }
        // io.emit("Alert", { success: true, data: "credit was accepted congrats" });
    }

    try {
        await existingcredit.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'credit updated successfully', data: existingcredit, socketID });

}

const Pay = async (req, res) => {

    const {
        montant,
    } = req.body;
    const { id } = req.params;

    let existingcredit;
    try {
        existingcredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingcredit) {
        return res.status(200).json({ success: false, message: 'credit existe pas!!', data: null });
    }

    existingcredit.payed = existingcredit.payed + montant;
    try {
        await existingcredit.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'credit updated successfully', data: existingcredit });

}

const Deletecredit = async (req, res) => {
    const { id } = req.params;

    let existingcredit;
    try {
        existingcredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingcredit) {
        return res.status(200).json({ success: false, message: 'credit nexiste pas!!', data: null });
    }

    try {
        await existingcredit.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }


    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}

exports.Addcredit = Addcredit
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Deletecredit = Deletecredit
exports.Etat = Etat
exports.Pay = Pay