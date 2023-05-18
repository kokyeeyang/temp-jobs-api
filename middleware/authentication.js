const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async (req,res,next) => {
    // check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Invalid authentication')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        //attach the user to the job routes
        // refer back to User.js in models
        req.user = {userId:payload.userId, name:payload.name}
        next()
    }catch(error){
        throw new UnauthenticatedError('Invalid authentication')
    }
}

module.exports = auth