const mongoose = require("mongoose")

const CreditSchema = new mongoose.Schema({

    montant:{type:Number} ,
    montant_ech:{type:Number} ,
    interet:{type:Number, default: 1.25} ,
    duree:{type:Number} ,
    grasse:{type:Number} ,
    payed:{type:Number} ,
    etat:{type:String, default: 'En Cours'} ,
    date:{type:String} ,
    rembource:{type:String} ,
    packid:{type: mongoose.Types.ObjectId, ref: 'service', required: true} ,
    offreid:{type: mongoose.Types.ObjectId, ref: 'offre', required: true} ,
    userid:{type: mongoose.Types.ObjectId, ref: 'user', required: true} ,


});

module.exports = mongoose.model('credit', CreditSchema);