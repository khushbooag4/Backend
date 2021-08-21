const path = require('path')
const passport = require('passport')
const express = require('express')
const dotenv = require('dotenv')
const session = require('express-session')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()
const port = 5000

//Load Configuration
dotenv.config({
    path:'/config/config.env'
})

//Passport Config
require('./config/passport')(passport)

//Handlebars
app.engine('.hbs',exphbs({defaultLayout: 'main',extname:'.hbs'}));
app.set('view engine','.hbs')

//Static 
app.use(express.static(path.join(__dirname,'public')))

//Session Middleware
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
})
)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


//Connection with MongoDB
const connect = async () => {
    try {
       const con =await mongoose.connect("mongodb://localhost/Quote",{
    useFindAndModify:false,
    useNewUrlParser: true,
    useUnifiedTopology:true
    })
        console.log('MongoDB CONNECTED')
    } 
    catch (err) {
        console.error(err)
        process.exit(1)
    }


}
connect()


//Routing
app.use('/',require('./routes/route'));
app.use('/auth',require('./routes/auth'));

//Axios API


//Basic Home Page
app.get(
    '/', (req, res) => {
     res.render('HomePage')
    })
app.listen(port, () => console.log(`App listening on port ${port}`))