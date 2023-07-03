const express = require('express');
const offreController = require('../controller/offre');
const fileuploader = require('../MiddleWare/UploadFiles');
const route = express.Router();

route.post('/add', fileuploader.single('picture'), offreController.Addoffre);

route.get('/', offreController.GetAll);

route.get('/pack/:id', offreController.FindByPack);

route.get('/:id', offreController.FindById);

route.put('/:id', fileuploader.single('picture'), offreController.Update);

route.delete('/:id', offreController.Deleteoffre);
route.get('/d/:id', offreController.Deleteoffre);

module.exports = route