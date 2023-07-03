const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    name: {type: String},
    role: {type: String},
    avatar: {type: String},
    password: {type: String},
    
    tel: {type: Number},
    ville: {type: String},
    adress: {type: String},
    register_comm: {type: String},
    shop_name: {type: String},
    secter: {type: String},
    patent: {type: String},
    cin: {type: String},
    matricule: {type: String, default: null},
    active: {type: mongoose.Schema.Types.Mixed},
    
});

module.exports = mongoose.model('user', UserSchema); 