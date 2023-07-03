const express = require('express');
const UserController = require('../controller/user');
const fileuploader = require('../MiddleWare/UploadFiles');


const route = express.Router();

route.get('/admins', UserController.GetAllAdmins);

route.get('/finance', UserController.GetAllFinance);

route.get('/all', UserController.GetAll);

route.get('/pdvs', UserController.GetAllPdv);

route.post('/pdvs', UserController.GetRequestPdv);

route.get('/:id', UserController.FindById);

route.put('/:id', fileuploader.single('avatar'), UserController.Update);

route.put('/finance/:id', fileuploader.single('avatar'), UserController.Update_Finance);

route.put('/pdv/:id', fileuploader.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cin', maxCount: 1 },
    { name: 'patent', maxCount: 1 }
]), UserController.Update_PDV);

route.delete('/:id', UserController.DeleteUser);

route.post('/register', UserController.Register);

route.post('/login', UserController.Login);

route.post('/lock/:id', UserController.Lock);

route.post('/add', fileuploader.single('avatar'), UserController.Add);

route.post('/finance/add', fileuploader.single('avatar'), UserController.Add_Finance);

route.post('/add_pdv', fileuploader.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cin', maxCount: 1 },
    { name: 'patent', maxCount: 1 }
]), UserController.Add_PDV);

module.exports = route