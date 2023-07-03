const express = require('express');
const ServiceController = require('../controller/services');
const fileuploader = require('../MiddleWare/UploadFiles');
const route = express.Router();

route.post('/add', fileuploader.single('picture'), ServiceController.AddService);

route.get('/', ServiceController.GetAll);

route.get('/:id', ServiceController.FindById);

route.put('/:id',fileuploader.single('picture') , ServiceController.Update);

route.delete('/:id', ServiceController.DeleteService);
 
module.exports = route