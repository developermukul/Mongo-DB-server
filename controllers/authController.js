
const Student = require('../models/studentModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminLogin = async (req, res) => {
    const { email, password } = req.body

    let login_data = await Student.findOne({email : email})
    
    if(!login_data){
        res.status(400).json({
            message : 'Invalid email'
        })
    }else{
        if(await bcrypt.compare(password, login_data.password)){
            // create token
            let token = await jwt.sign({id:login_data.id}, process.env.JWT_TOKEN, {
                expiresIn : '1d'
            })
            res.status(200).json({
               id        : login_data.id,
               name      : login_data.name,
               email     : login_data.email,
               cell      : login_data.cell,
               token     : token
            })
        }else{
            res.status(400).json({
                message : 'Wrong password'
            })
        }
    }
}

module.exports = adminLogin