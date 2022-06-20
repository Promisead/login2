const express = require("express");
const router = express.Router();

const credential = {
  email: "admin@champions.com",
  password: "admin123",
};
// login User
router.post("/login", (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email
    //res.send("Login successfully!")
   res.redirect('/route/dashboard')
  } else {
    res.end("invalid Username or password")
  }
});

//Dashboard route
router.get('/dashboard', (req,res)=>{
    if (req.session.user) {
        res.render('dashboard', {user: req.session.user})
    } else {
        res.send("Unauthorized User")
    }
})

// Logout route
router.get("/logout", (req,res)=>{
  req.session.destroy(function(err){
    if(err){
      console.log(err)
      res.send("Error")
    }else{
      res.render('base',{title:"Champions", logout:"logout successfully"})
    }
  })     
})

module.exports = router
