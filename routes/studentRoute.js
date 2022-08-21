const express = require('express')
const router = express()

const { allStudentDataGet, singleStudent, createStudent, updateStudent, deleteStudent, studentProfile, studentHome } = require('../controllers/studentController')
const adminLogin = require('../controllers/authController')
const authCheck = require('../middleware/authMiddleware')



// login route manage
router.post('/login', adminLogin)
router.get('/profile', authCheck, studentProfile)
router.get('/home', authCheck, studentHome)


// route manage
router.get('/', allStudentDataGet)
router.get('/:id', singleStudent)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.patch('/:id', updateStudent)
router.delete('/:id', deleteStudent)


module.exports = router