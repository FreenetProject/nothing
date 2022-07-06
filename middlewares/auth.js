const jwt = require('jsonwebtoken');
const {refreshTokens} = require("./testdb");
require("dotenv").config();
console.log("REFRESHToken", refreshTokens);
const generateToken = require("./tools/generateNewAcessToken.js")
function authenticate(req,res,next){
      if(req.session.authorized === true){
      next();
      console.log(req.cookies);
      console.log("session based");
      return ;
   } else if(req.headers['authorization']){
      const accessTokenArr = req.headers['authorization'].split(' ');
      const accessToken = accessTokenArr[accessTokenArr.length - 1];
      jwt.verify(accessToken, process.env.SECRET_KEY, (err,acc) => {
         console.log("jwt based");
         if (err) {
            console.log(err.message);
            if(err.message == "jwt expired"){
               res.redirect("/token")
               console.log('error in jwt\n');
               return;
            } else {
            res.json({failed : true, msg : `${err.message}`})
            }
         } else {
            next()
         }
      })
      // .then((err , good) => {
      //    if (err) {
      //       res.sendStatus(500)
      //       console.log(good);
      //    } else {
      //    next()
      //    return ;
      //    }
      // })
      
   }
   else if (!req.session.authorized && !req.headers['authorization']){
      res.json({failed : true, msg : `youre not authenticated`});
      console.log("none of this");
   }
   else {
      res.sendStatus(403);
      res.end()
   }
}
module.exports = authenticate;