

const Student = require('../models/studentModel')
const bcrypt = require('bcryptjs')

// all student data get
const allStudentDataGet = async (req, res) => {
    let data = await Student.find()
    res.status(200).json(data)
}

// single student data
const singleStudent = async (req, res) => {
    let data = await Student.findById(req.params.id)
    res.status(200).json(data)
}


// create student
const createStudent = async (req, res) => {
    // salt password
    const { password } = req.body
    let salt = await bcrypt.genSalt(10)
    let hash_password = await bcrypt.hash(password, salt)

    await Student.create({
        ...req.body,
        password : hash_password
    })
    res.status(200).json({
        message : 'student data created'
    })
}


// update student
const updateStudent = async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body, {
        new : true
    })
    res.status(200).json({
        message : 'student data updated'
    })
}

// delete student
const deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message : 'student data deleted'
    })
}


// student profile
const studentProfile = (req, res) => {
    res.json(req.user)
}


// student home page
const studentHome = (req, res) => {
    res.json(req.user)
}




module.exports = {
    allStudentDataGet,
    singleStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    studentProfile,
    studentHome
}