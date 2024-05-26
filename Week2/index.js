const express = require("express")
const port = 3000;

const app = express()
app.get("/", (req, res) => {
    res.send(req.params);
});

app.get("/one", (req, res) => {
    res.send("<h1>Heading 1</h1>");
})

app.listen(port, () => {
    console.log(`Example app ${port}!`)
})