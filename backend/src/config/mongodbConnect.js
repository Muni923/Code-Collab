const mongoose = require('mongoose');
const { mongoURL } = require('./config')
const mongoConnect = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Mongodb connected");
    }
    catch (err) {
        console.log("message :", err.message);
    }
}

module.exports = mongoConnect;