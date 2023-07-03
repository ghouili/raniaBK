const express = require('express');
const CreditController = require('../controller/credit');
const route = express.Router();

route.post('/add', CreditController.Addcredit);

route.put('/etat/:id', CreditController.Etat);

route.put('/pay/:id', CreditController.Pay);

route.get('/', CreditController.GetAll);

route.get('/:id', CreditController.FindById);

route.put('/:id', CreditController.Update);

route.delete('/:id', CreditController.Deletecredit);


module.exports = route