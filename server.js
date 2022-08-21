const express = require('express')
const dotenv = require('dotenv').config()
const colors = require ('colors')
const app = express()
const connectMongoDB = require('./config/db')
connectMongoDB()
const multer = require('multer')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// multer config

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if(file.fieldname === 'photo'){
            cb(null, './upload/images')
        }else if(file.fieldname === 'cv'){
            cb(null, './upload/pdf')
        }
    },
    filename : (req, file, cb) => {
        if(file.fieldname === 'photo'){
            let extName = path.extname(file.originalname)
            let fileName = Date.now() + '-' + Math.round(Math.random() * 1000) + extName
            cb(null, fileName)
        }else if(file.fieldname === 'cv'){
            let date = new Date()
            let current_date = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + '-' + file.originalname
            cb(null, current_date)
        }

    }
})

const upload = multer({
    storage : storage,
    fileFilter : (req, file, cb) => {
        if(file.fieldname === 'photo'){
            if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
                cb(null, true)
            }else{
                cb(console.log('Invalid file type'))
            }
        }else if(file.fieldname === 'cv'){
            if( file.mimetype === 'application/pdf'){
                cb(null, true)
            }else{
                cb(console.log('Invalid file type'))
            }
        }
    }
})

const cpUpload = upload.fields([
    {
        name    : 'photo',
        maxCount: 10
    },
    {
        name    : 'cv',
        maxCount: 10
    }
])


app.post('/upload', cpUpload, (req, res) => {
    res.send('File Uploaded')
})






app.use('/api/student', require('./routes/studentRoute'))


// server listen
let PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    console.log(`our server is running on port http://localhost/${PORT}`.bgBlue);
})
