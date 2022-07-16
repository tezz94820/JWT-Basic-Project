const UnauthenticatedError = require('../errors/index.js')
const jwt = require('jsonwebtoken')

//here from the frontend we send the Authorization property in header object of the http. in that property thaey have token . here we will use that token to authorise and then send the response
const authenticationMiddleware = (req,res,next) => {

    const authHeader = req.headers.authorization
    //format of authorization is 'Bearer token'
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token Prvided')
    }

    //here we extravted the token from the authorization property
    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)          //here in decoded we get the payload which included all the things we passed in it.
        //here we verified the token by using thejwt_secret because the token even has the scret attached to it. and if that matches then payload of the token is handed over to decoded variable
        const { id , username } = decoded
        req.user = {id,username}    ////we created a new property in req because we need to send it to further middlewarwe to access username and id
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorised to access this route')
    }
    
}

module.exports = authenticationMiddleware