const mustPass = require("../middlewares/mustPassword");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {refreshTokens} = require('../middlewares/testdb');
const setTokens = require("../middlewares/setToken");
function Login(app,accounts){
   app.post("/login", mustPass, setTokens, (req,res) => {
      const {email, password} = req.body
      
      // if account has found;
      if(req.account){
         req.session.authorized = true ;
         if(!req.cookies.jwt){
            req.setRToken();
         }
         res.json(res.data)
         // logging refreshTokensList
         console.log(`refreshTokensList ${JSON.stringify(refreshTokens)}`);
      } else {
         // if account is not found;
         res.json({failed : true, msg : "incorrect email or password"});
      }
      
      
      console.log("from routes/login/78", req.cookies)
   })
}

module.exports = Login;