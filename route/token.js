const {refreshTokens} = require("../middlewares/testdb");
const jwt = require("jsonwebtoken");
function verify(req,res,next){
   if(req.headers['token']){
      req.reftoken = req.headers['token'];
   jwt.verify(req.headers['token'], process.env.REFRESH_KEY, (err,user) => {
      if(err){
         res.json({failed : true, msg : `${err.message}`})
      }
      res.newPayload = {email : user.email, password: user.password} ;
      console.log("user: ",user);
   })
   } else if(req.cookies['jwt']){
      req.reftoken = req.cookies['jwt'];
      jwt.verify(req.headers['token'], process.env.REFRESH_KEY, (err,user) => {
      if(err){
         res.json({failed : true, msg : `${err.message}`})
      }
      res.newPayload = {email : user.email, password: user.password}
      console.log("user: ",user);
   })
   } else if(!req.cookies.jwt || !req.headers['token']){
         console.log("\n\t\t\tjwt\t\t\t\n",req.cookies.jwt);
         res.json({failed : true, msg : 'no refresh token provided'})
         return;
      }
      next();
}
function setTokens(req,res,next){
   const headerToken = req.headers['token'];
   const jwtCookie = req.cookies['jwt'];
   const secret = process.env.SECRET_KEY;
   const refresh = process.env.REFRESH_KEY;
   // logging
   const payload = res.newPayload;
   console.log(payload);
   const accesToken = jwt.sign(payload, secret, {expiresIn : "15s"})
      const data = accesToken ;
      res.data = {failed : false, msg : 'new token created', accesToken : data}
      console.log('from login 53\n\n accesToken:', accesToken);
      next();
}
function token(app){
   app.get("/token", verify, setTokens,(req,res) => {
      console.log('reftokens\t:',req.reftoken);
      const found = refreshTokens.find(tdata => tdata === req.reftoken);
      if(found){
         res.json(res.data);
      } else {
         res.json({failed : true, msg : 'refresh token provided is ethier expired or invalid'})
      }
      
      
   })
}

module.exports = token;