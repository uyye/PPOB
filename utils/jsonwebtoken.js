const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.JWTSECRETKEY


const signToken = (payload)=>{
    return  jwt.sign(payload, jwtSecretKey, {expiresIn:"12h"})
}

const verifyToken = (token)=>{
    return  jwt.verify(token, jwtSecretKey)
}

module.exports = {signToken, verifyToken}