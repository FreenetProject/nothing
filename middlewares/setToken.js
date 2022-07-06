const jwt = require("jsonwebtoken");
const {refreshTokens} = require("./testdb");
function setTokens(req,res,next){
   const secret = process.env.SECRET_KEY;
   const refresh = process.env.REFRESH_KEY;
   const payload = {email : req.body.email, password : req.body.password}
   // logging
   console.log('payload\r:\r',payload);
   const accesToken = jwt.sign(payload, secret, {expiresIn : "1m"})
      const refreshToken = jwt.sign(payload, refresh);
      const data =  req.body;
      data.accesToken = accesToken;
      console.log("at 15:\n\n\n",req.cookies);
      req.setRToken =  () => {refreshTokens.push(refreshToken)};
      if(!req.cookies.jwt){
         console.log("no token saved in cookies \t\t\t\n",req.cookies.jwt);
         res.cookie("jwt", refreshToken, {httpOnly : true, maxAge : 1000 * 60 * 24 * 3});
         data.refreshToken = refreshToken;
      }
      
      res.data = data;
      console.log('from setToken 22', data );
      next();
}

module.exports = setTokens;