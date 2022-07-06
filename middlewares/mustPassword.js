const {accounts} = require('./testdb')
function mustPassword(req,res,next){
   const {email,password} = req.body ;
   // if there is no email or password
   if(!email || !password){
      res.status(400);
      res.type("application/json");
      res.json({failed : true, msg : "password and email must be provided"})
      return ;
   }  
   else 
      if(email.length < 7 || password.length < 6){
         // check the input lengths
         res.status(400);
         res.json({failed : true, msg : "email or password seems too short"})
         return ;
      } else {
         const myAccount = accounts.find(myAcc => myAcc.email == email && myAcc.password == password);
         req.account = myAccount;
         
      }
         
   next();
   
}

module.exports = mustPassword ;