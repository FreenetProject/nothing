function responseData(req,res,next){
   const data = req.previousData
   if(typeof data !== 'object'){
      res.json();
   }
    req.resData = function(config){
       var data = config;
       
       
    }
}