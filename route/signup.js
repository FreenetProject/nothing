const mustPass = require("../middlewares/mustPassword");
require("dotenv").config();
const {refreshTokens, accounts} = require('../middlewares/testdb');
const setTokens = require("../middlewares/setToken");

function signup(app){
   app.post('/signup',mustPass,setTokens, (req,res) => {
      console.log(signup);
      // find if there is a cuncurent accounts
      const {email,password, name,last} = req.body;
      if(!last || !name){
         console.log(`name : ${name}, last: ${last}`);
         res.json({failed : true, msg: 'name and last name must be provided'});
         return;
      }
      // log 1
      console.log('this is on signup log 1:\r', req.body);
      const newAccount = {
         name : name,
         last : last,
         email: email,
         password : password,
         accountType : 'basics',
         allowable : 0,
         virefied : false
      }
      const concurent =  accounts.find(a => a.email === email);
      // if your account has cuncurent
      if(concurent){
         // log 2 log concurent
         console.log(`signup log 2 : ${JSON.stringify(concurent)}`);
         res.json({failed : true, msg : 'email is already taken' })
         return ;
      } else {
         accounts.push(newAccount);
         if(!req.cookies.jwt){
            req.setRToken();
         }
         res.data.failed = false,
      res.json(res.data)
      }
   })
}

module.exports = signup;
