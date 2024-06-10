const express = require("express");
const cors = require("cors");
const {connectDB, Card} = require("./db");
const { connect } = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

connectDB().then(()=> {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});