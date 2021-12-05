const jwt = require('jsonwebtoken');
const jwtPassword = require('../config/jwtPassword');
const verify = require('./verify');

const middleware = async function(req,res,next){
    next();
}

module.exports = middleware;