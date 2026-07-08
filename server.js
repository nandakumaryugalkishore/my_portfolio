require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")

const contactRoute = require('./route/contactRoute')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🔥 ADD THIS
app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://yugalkishore.tech"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }));
app.use("/api", contactRoute)

const port = process.env.PORT || 5001;
app.listen(port, console.log(`server listening to port ${port} only`))
