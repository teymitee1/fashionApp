let express      = require('express'),
    app          = express();


//CONECTION TO DB
// url = process.env.DATABASEURL || "mongodb://localhost/fashionApp";
// mongoose.connect(url, { useNewUrlParser: true });


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res)=>{
    res.render("landing");
});



let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("App is running")
});