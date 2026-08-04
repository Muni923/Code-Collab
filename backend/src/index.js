const express = require('express');
const app = express();

const { PORT } = require('./config/config');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoConnect = require('./config/mongodbConnect');
mongoConnect();

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Server Started at localhost://${PORT}`)
});
