const mongoose = require("mongoose");

const socketIdsSchema = new mongoose.Schema({

    userid: { type: mongoose.Types.ObjectId, ref: 'user' },
    socketid: { type: String },

});

module.exports = mongoose.model('socketIds', socketIdsSchema);