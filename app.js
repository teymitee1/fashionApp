const   express         = require('express'),
        bodyParser      = require("body-parser")
        flash           = require("connect-flash"),
        mongoose        = require("mongoose"),
        User            = require("./models/user"),
        methodOverride  = require("method-override"),
        nodemailer      = require("nodemailer"),
        _               = require("lodash"),
        request         = require("request"),
        path            = require("path"),
        app             = express();


require('dotenv').config();

const { initializePayment, verifyPayment } = require('./config/paystack')(request);

//CONECTION TO DB
var url = process.env.DATABASE_URL || "mongodb://localhost:27017/fashionApp";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(require("express-session")({
    secret: "cool app",
    resave: false,
    saveUninitialized: false
}))


// setting local variables for all routes
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

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
            req.flash("error", err)
            return res.redirect("/")
        }else if(req.body.email.trim() == "" || req.body.firstname.trim() == "" || req.body.lastname.trim() == "" ||req.body.age.trim() == "" ||req.body.amount.trim() == "" || req.body.course == "" || req.body.gender == "" || req.body.phone.trim() == ""){
            console.log("incomplete Form Details");
            req.flash("error", "Incomplete Form Details")
            res.redirect("/register")
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
                    console.log(error);
                    req.flash("error", "An error Occured, Please Try again")
                    return res.redirect('/register')
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
            req.flash("error", error)
            return res.redirect('/');
        }
        response = JSON.parse(body);        
        user.payment_status = "Paid";
        user.reference = response.data.reference;
                
        User.create(user, (err, registeredUser)=>{
            if(err || !registeredUser){
                console.log(err)
                req.flash("error", err)
                req.flash("error", err)

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
                       console.log(error);
                       req.flash("error", "Email error occured")
                       return res.redirect("/success/"+registeredUser._id)
                    }else{
                        console.log(mail)
                        // res.send("successful, a mail has been sent to you")
                        req.flash("success", "Registeration Successful, a mail has been sent to you")
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
            req.flash("error", err+" No such user exists")
            return res.redirect("/")
        }else{
            return res.render("error", {user: foundUser})
        }
    })
})

app.get('/success/:id', (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        if(err ||!foundUser){
            console.log(err)
            req.flash("error", err+" No such user exists" )
            return res.redirect("/")
        }else{
           return res.render("success", {user: foundUser})
        }
    })
})

app.get("/admin", (req, res)=>{
    res.render("admin-login")
})

app.post("/admin", (req, res)=>{
    if(req.body.username != process.env.ADMIN_USERNAME && req.body.password != process.env.ADMIN_PASSWORD){
        req.flash("error", "Sorry you're not an admin")
        res.redirect("back")
    }else{
        res.redirect("/admin/page")
    }
})

app.get("/admin/page", (req, res)=>{

    User.find({}, (err, foundUsers)=>{
        if(err || !foundUsers){
            console.log(err)
            req.flash("error", "An error occured while fetching users")
            res.redirect("/")
        }else{
            res.render("admin-page", {users: foundUsers})
        }
    })
})

app.delete("/admin/page/:id/delete", (req, res)=>{
    User.findByIdAndRemove(req.params.id, (err, removedUser)=>{
        if(err || !removedUser){
            console.log(err);
            req.flash("error", "An error occured while trying to delete user")
            return res.redirect("back");
        }else {
            console.log(removedUser);
            req.flash("success", "User Removed Successfully");
            return res.redirect("back")
        }
    })
})

app.get("*", (req, res) => {
    res.render("404")
})

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App is running")
});