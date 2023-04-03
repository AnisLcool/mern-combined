const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const HttpError = require('./models/http-error');

const placesRouter = require('./routes/places-routes');
const usersRouter = require('./routes/users-routes');
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fvu0lck.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const app = express();
app.use(cors());

app.use(bodyParser.json());

const path = require('path');
// 'uploads/images' filter requests where URL starts with /uploads/images
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);

app.use((req, res, next) => {
    const error = new HttpError('Cound not find this route', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, (error) => {
            console.log('error when deleting file : ', error);
        })
    }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.errorCode || 500);
    res.json({ message: error.message || 'An unknown error occured!' })
})
console.log('POSRT ', process.env.PORT);
const PORT = process.env.PORT || 5000;
mongoose.connect(DB_URL).then(response => { 
    console.log('DATABASE CONNEXION IS ESTABLISHED') 
    app.listen(PORT, () => console.log('Server is listening at port ', PORT));

}).catch(error => console.log("Connection to databased failed",error))