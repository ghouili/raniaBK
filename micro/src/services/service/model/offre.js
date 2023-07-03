const mongoose = require("mongoose")

const offreSchema = new mongoose.Schema({

    title:{type:String},
    description:{type :String},
    montant_min:{type:Number},
    montant_max:{type:Number},
    picture: {type: String},
    packid:{type: mongoose.Types.ObjectId, ref: 'service', required: true},


});

module.exports = mongoose.model('offre', offreSchema);