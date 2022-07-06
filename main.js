require("dotenv").config();
const ethers = require('ethers');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const cors = require('cors');
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const createUser = require("./middlewares/createUser");
const standard = require("./middlewares/standardResponse");
const tokengenarator = require("./middlewares/tools/generateNewAcessToken.js")
const {accounts, refreshTokens} = require('./middlewares/testdb')
app.use(session({secret : "freenet comunity", cookies : {
   maxAge : 1000 * 60 * 24 * 7 ,
}, 
resave : true,
saveUninitialized : true
   
}))
app.use(createUser);
app.use(standard);
app.use(cookie())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
const port = process.env.PORT;
require('./route/Login')(app,accounts);
app.get("/",  require("./middlewares/auth"),(req,res) => {
   console.log(`standard : ${JSON.stringify(req.standard)}`);
   const data = req.newStandard(true, "noError");
   console.log("data :", data);
   res.json(req.standard);
})

// app.get("/token", (r,s) => {
//    tokengenarator(r,s);
// })
require("./route/token")(app);
require("./route/signup")(app);
require("./route/logout")(app);

app.listen(port, () => console.log(`Spinning ${port}`))





