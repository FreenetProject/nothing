require("dotenv").config();
const jwt = require("jsonwebtoken");
const {refreshTokens} = require("../../middlewares/testdb");
const axios = require("axios");
function makeToken(token,req,res){
      const secret = process.env.SECRET_KEY;
      jwt.verify(token, process.env.REFRESH_KEY, (err,user) => {
      if(err){
         res.json({failed : true, msg : `session token has error, ${err.message}`});
         console.log(err);
      } else {
         const payload = {...user,iat: Date.now()}
         
      const accesToken = jwt.sign(payload, secret, {expiresIn : "30s"});
         res.json({failed : false, msg : 'new token created', token : jwt.sign(payload, secret, {expiresIn : "1s"})})
      }
   })
   
}
function generate(req,res){
   // if token is spicified
   const token = req.headers['token'];
   const cJwt = req.cookies['jwt'];
   if(token){
      makeToken(token,req,res);
      console.log('token is created with header');
   } else if(cJwt){
      makeToken(cJwt,req,res);
      console.log('token is created with cookie');
   }
}




module.exports = generate;