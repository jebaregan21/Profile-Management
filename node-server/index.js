const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const port = process.env.PORT || 8000;

//Cors config
let corsOption = {
    origin:'http://localhost:3000',
    methods:['POST','GET','PUT','DELETE'],
    credentials : true
}

const dataBaseUrl = 'mongodb://127.0.0.1:27017/direct';         //Local mongoDB url

//Estabilishing mongodb connection
mongoose.connect(dataBaseUrl,{
    useNewUrlParser:true,
    useUnifiedTopology : true
});

mongoose.connection.once('open',()=>{
    console.log('Connected with DB');
})
.on('error',err =>{
    console.log(err);
})

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

//RouterHandlers and Auth middleware
const Login = require('./RouteHandlers/Login');
const GAuth = require('./RouteHandlers/GAuth');
const middleware = require('./middleware/middleware');
const Logout = require('./RouteHandlers/Logout')
const Create = require('./RouteHandlers/Create');
const Auth = require('./RouteHandlers/Auth');
const Upload = require('./RouteHandlers/Upload');
const Home = require('./RouteHandlers/Home');
const Profile = require('./RouteHandlers/profile');
const Settings = require('./RouteHandlers/Settings');

app.use(middleware);
app.use('/static/profile',express.static(path.join(__dirname+'\\images','profile')));
app.use('/static/company',express.static(path.join(__dirname+'\\images','company')));
app.use(Home);
app.use(Login);
app.use(GAuth);
app.use(Logout);
app.use(Auth);
app.use(Create);
app.use(Upload);
app.use(Profile);
app.use(Settings);

app.listen(port,()=>{
    console.log('Server is listening on port '+port);
})