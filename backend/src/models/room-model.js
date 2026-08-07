const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const roomSchema = Schema({
    roomname: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

const Room = model('Room', roomSchema);

module.exports = {
    Room
}