require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")

const contactRoute = require('./route/contactRoute')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🔥 ADD THIS

app.use(cors());

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
