const bcrypt = require("bcryptjs");

const hashPassword = async (password)=>{
    return await bcrypt.hash(password, 8)
}

const comparePassword = async (password, hashPassword)=>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = {hashPassword, comparePassword}