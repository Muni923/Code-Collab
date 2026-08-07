const express = require('express');
const app = express();

const { PORT } = require('./config/config');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const cors =require('cors');
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

const mongoConnect = require('./config/mongodbConnect');
mongoConnect();

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const roomRoutes=require('./routes/roomRoutes')
app.use('/room', roomRoutes);

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)
});
