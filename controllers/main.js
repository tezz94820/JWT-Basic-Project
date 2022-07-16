const BadRequest = require('../errors/index.js')
const jwt = require('jsonwebtoken')
const { request } = require('express')
require('dotenv')

const login = async (req, res) => {
    const { username , password } = req.body
    if(!username || !password){
        throw new BadRequest('please provide a username and password' )
    }

    //just for demo normally this is provided by database
    const id = new Date().getDate()

    //try to keep payload small , better experience for user
    const token = jwt.sign({ id , username } , process.env.JWT_SECRET , {expiresIn:'30d'})         
    //inside sign method we pass the payload as object and jwt secret and lastly the options .here in noptions we passed expiry date

    res.status(200).json({msg:'user created' , token})

}

const  dashboard = async (req, res) => {
    
    const luckyNumber = Math.floor(Math.random()*100)+1
    res.status(200).json({msg:`Hello ${req.user.username}` , secret:`here is your authorised data , your lucky number is ${luckyNumber}`})

}

module.exports = {login , dashboard}

//check username and password in post(login) request
//if exists create new JWT token
//send back to frontend
//setup authentication so that the request with JWT can access the information


//process
//sending the username and password from the frontend
//receiving the usename and giving the id and username and secret in the embeded format of token
//local storage of frontend stores it the token
//now when the user wants to connect again to server . then it will send the token in the authorization property in the header object.
//in the server we have our secret . we compare the secret from the authorisation token received and the secret we have .
//if it matches then ok the user is authenticated and send the response