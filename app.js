const   express         = require('express'),
        bodyParser      = require("body-parser")
        mongoose        = require("mongoose"),
        User            = require("./models/user"),
        nodemailer      = require("nodemailer"),
        _               = require("lodash"),
        request         = require("request"),
        path            = require("path"),
        app             = express();


        // require('dotenv').config();

const {initializePayment, verifyPayment} = require('./config/paystack')(request);

//CONECTION TO DB
var url = process.env.DATABASE_URL || "mongodb://localhost:27017/fashionApp";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// setup email config
var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: "Gmail",
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.get("/", (req, res)=>{
    res.render("landing");
});


app.get("/register", (req, res)=>{
    res.render("register");
})

var user = {
    firstname: "",
    lastname: "",
    amount: "",
    gender: "",
    age: "",
    phone: "",
    payment_status: "",
    reference: "",
    email: "",
    course: ""
}

app.post("/register", (req, res)=>{
    User.findOne({"email": req.body.email}, (err, foundMail)=>{
        if(err){
            console.log(err)
        }else if(foundMail){
            console.log(foundMail)
           return res.redirect("/error/"+foundMail._id)
        }else{
            // console.log(registeredUser)
            // res.render("paystack", {user: registeredUser})
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.amount = req.body.amount;
            user.gender = req.body.gender;
            user.age = req.body.age;
            user.phone = req.body.phone;
            user.email = req.body.email;
            user.course = req.body.course;
            const form = {
                fullName: user.firstname + " " + user.lastname,
                amount: Number(req.body.amount),
                email: user.email
            }
            form.metadata = {
                full_name : form.fullName
            }
            form.amount *= 100;
            initializePayment(form, (error, body)=>{
                if(error){
                    //handle errors
                    return console.log(error);
                    // return res.redirect('/error')
                    return;
                } else {
                    console.log(body)
                    response = JSON.parse(body);
                    return res.redirect(response.data.authorization_url)
                }
            });
        }
    })
   
})

app.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/');
        }
        response = JSON.parse(body);        
        user.payment_status = "Paid";
        user.reference = response.data.reference;
                
        User.create(user, (err, registeredUser)=>{
            if(err || !registeredUser){
                return console.log(err)
            }else{
                console.log(registeredUser)
                var mail = {
                    from: "Ibadan Fashion Week",
                    to: registeredUser.email,
                    subject: 'Registeration Complete',
                    html: "Congratulations: "+ registeredUser.firstname + " "+registeredUser.lastname + 
                    "<br />Your Payment has been recieved and confirmed for ibadan fashion week. <br />Please come along to the event with this mail as proof",
                }
                smtpTransport.sendMail(mail, function(error, response){
                    if(error){
                       return console.log(error);
                    }else{
                        console.log(mail)
                        // res.send("successful, a mail has been sent to you")
                        res.redirect("/success/"+registeredUser._id)
                    }
                    smtpTransport.close();
                });
            
            }
        })
    })
});

app.get("/error/:id", (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        if(err || !foundUser){
            console.log(err)
            res.redirect("/")
        }else{
            return res.render("error", {user: foundUser})
        }
    })
})

app.get('/success/:id', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        if(err ||!foundUser){
            console.log(err)
            return res.redirect("/")
        }else{
           return res.render("success", {user: foundUser})
        }
    })
})

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("App is running")
});