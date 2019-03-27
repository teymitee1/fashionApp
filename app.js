const   express         = require('express'),
        bodyParser      = require("body-parser")
        mongoose        = require("mongoose"),
        app             = express();


//CONECTION TO DB
var url = process.env.DATABASEURL || "mongodb://localhost:27017/fashionApp";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// user models
var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    course: String,
    age: String,
    phone: String,
    email: String,
    gender: String
});
const User = mongoose.model("User", UserSchema)

app.get("/", (req, res)=>{
    res.render("landing");
});


app.get("/register", (req, res)=>{
    res.render("register");
})

app.post("/register", (req, res)=>{
    User.create(req.body.user, (err, registeredUser)=>{
        if(err || !registeredUser){
            console.log(err)
        }else{
            console.log(registeredUser)
            res.redirect("/")
        }
    })
})
let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("App is running")
});