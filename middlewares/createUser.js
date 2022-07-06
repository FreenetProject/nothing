function createUser(req,res,next){
   if(req.session.authorized){
      next();
   } else {
      req.session.authorized = false;
      next();
   }
}

module.exports = createUser;