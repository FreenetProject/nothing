var {refreshTokens} = require("../middlewares/testdb");

function removeRefreshToken(token,req,res){
   console.log("refreshTokens not filtered:", refreshTokens);
   refreshTokens = refreshTokens.filter(tkn => tkn != token);
   console.log("filtered refreshTokens", refreshTokens);
}
function Logout(app){
   app.post('/logout', (req,res) => {
      const header = req.headers['token'];
      const cookies = req.cookies['jwt'];
      const session = req.session.authorized;
      if(session === true){
         req.session.authorized = false ;
      } else if(header){
         removeRefreshToken(header,req,res);
      } else if(cookies){
         removeRefreshToken(cookies,req,res);
   } else if(!header){
      res.json({failed : true, msg : 'you have token provided'})
   } else {
      res.json({failed : true, msg : 'you have no session saved'})
   }
         res.json({failed : false, msg: "you have successfuly log out"})
   })
}


module.exports = Logout;