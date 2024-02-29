const express = require("express")
const {connectToMonogDB} = require('./connect')
const urlRoute = require('./routes/url')
const path = require('path')
const app = express();
const PORT = 8000;
const URL = require("./models/url")
const staticRoute = require('./routes/staticRouter') 
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")


app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use("/url",restrictToLoggedinUserOnly,  urlRoute)
app.use("/user", userRoute)
app.use("/", checkAuth ,staticRoute) 

connectToMonogDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("Mongodb Connect"))


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))



// app.get("/test", async (req,res)=>{
//    const allUrls  = await URL.find({})
//     return res.render("home",{
//       urls:allUrls,
//     })
    
// })
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });

app.listen(PORT,()=>console.log(`Server Started at Port: ${PORT}`))