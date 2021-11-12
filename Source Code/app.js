const express = require ('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");
const port = 3000;

app.get("/", (req,res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("A user requested this page");
})

app.listen (port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
})

app.post( "/addApartments", (req, res) => {
    res.render("addApartments");
});