const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//configure dotenv
dotenv.config();

//mongodb connection
connectDB();

//creating an instance of express
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

const user = require("./routes/userRoute")
const admin=require('./routes/adminRoute')
const doctor=require('./routes/doctorRoute')

//routes
app.use("/api/v1/user", user);
app.use("/api/v1/admin",admin);
app.use("/api/v1/doctor",doctor);

//routing
app.get("/", (req, res) => {
  res.status(200).send({
    message: "server running",
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`
  );
});
