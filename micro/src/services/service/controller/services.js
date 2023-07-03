const offre = require("../model/offre");
const service = require("../model/services");
const user = require("../model/user");
const fs = require('fs');

const AddService = async (req, res) => {
    const { nom, description,
        critere_eligibility,
        document_requis,
        delai_traitement,
        userid
    } = req.body;
    console.log(req.body);

    let picture = 'service.jpg';
    if (req.file) {
        picture = req.file.filename;
    }
    let existingService;
    try {
        existingService = await service.findOne({ Nom: nom });
    } catch (error) {
        return res.status(500).json({ success: false, message: ' error server', data: error });
    }

    if (existingService) {
        return res.status(200).json({ success: false, message: 'Service already exist!!', data: null });
    }

    let existingUser;
    try {
        existingUser = await user.findById(userid);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    let etat = false;

    if (existingUser?.role === 'admin') {
        etat = true;
    }

    const NewService = new service({
        nom,
        description,
        critere_eligibility,
        document_requis,
        delai_traitement,
        picture,
        etat,
        credits: []
    });

    try {
        await NewService.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error', data: error });
    }

    return res.status(201).json({ success: true, message: 'Service added successfully', data: NewService });

}

const GetAll = async (req, res) => {

    let allService;
    try {
        allService = await service.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all Service', data: allService });

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existingService;
    try {
        existingService = await service.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingService) {
        return res.status(200).json({ success: false, message: 'Service exist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'Service founded successfully', data: existingService });

}

const Update = async (req, res) => {

    const { nom, description,
        critere_eligibility,
        document_requis,
        delai_traitement } = req.body;
    const { id } = req.params;

    let existingService;
    try {
        existingService = await service.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingService) {
        return res.status(200).json({ success: false, message: 'Service existe pas!!', data: null });
    }

    if (req.file && existingService.picture) {
        let path = `./uploads/images/${existingService.picture}`;
        if (existingService.picture !== 'service.jpg' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
        existingService.picture = req.file.filename;

    }

    existingService.critere_eligibility = critere_eligibility;
    existingService.document_requis = document_requis;
    existingService.delai_traitement = delai_traitement;
    existingService.description = description;
    existingService.nom = nom;

    try {
        await existingService.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'Service updated successfully', data: existingService });

}

const DeleteService = async (req, res) => {
    const { id } = req.params;

    let existingService;
    try {
        existingService = await service.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingService) {
        return res.status(200).json({ success: false, message: 'Service nexiste pas!!', data: null });
    }

    try {
        await existingService.deleteOne();
        await offre.deleteMany({ packid: id });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }
    if (existingService.picture) {
        let path = `./uploads/images/${existingService.picture}`;
        if (existingService.picture !== 'service.jpg' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }

    }

    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}

exports.AddService = AddService
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.DeleteService = DeleteService