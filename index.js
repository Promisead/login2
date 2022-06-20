const express = require("express")
const app = express()
const path = require("path")
const bodyParser= require("body-parser")
const session = require("express-session")
const {v4: uuidv4} = require("uuid")
const router = require("./router")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
    secret:uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.set('view engine','ejs' )

//
app.use("/static", express.static(path.join(__dirname,'public')))
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))
app.use("/route", router)

const port = process.env.PORT|| 3001

//home route
app.get("/",(req,res)=>{
    res.render('base',{title:"Login System"})
})

app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}` )
})