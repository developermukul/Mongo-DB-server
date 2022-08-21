
const jwt = require('jsonwebtoken')
const Student = require('../models/studentModel')

const authCheck = async (req, res, next) => {
    if(req.headers.authorization){
        // get token
        let token = req.headers.authorization.split(' ')[1]
        
        // verify token
        let verify = jwt.verify(token, process.env.JWT_TOKEN)
        
        // get user
        req.user = await Student.findById(verify.id)
        next()
    }else{
        res.status(400).json({
            message : 'Invalid Token'
        })
    }
}


module.exports = authCheck