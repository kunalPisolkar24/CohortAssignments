const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/sum", (req, res) => {
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let sum = num1 + num2;
    res.send({ sum: sum });
});

app.get("/interest", (req, res) => {
    let principal = parseInt(req.query.principal);
    let rate = parseInt(req.query.rate);
    let time = parseInt(req.query.time);
    let interest = (principal * rate * time) / 100;
    res.send({ interest: interest });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');

});
