const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res, next) => {
    let users ;
    try {
        users = await User.find({}, 'image places username');
    } catch (error) {
        return next(new HttpError('Something went wrong, could not get users', 500))
    }
    if(users.length === 0){
        return next(new HttpError('Could not find users', 404));
    }
    res.status(200).json({users: users.map((user) => user.toObject({getters: true}))});
}

const signup = async(req, res, next) => {
    const errorsObj = validationResult(req);
    if(!errorsObj.isEmpty()){
        console.log('Errors : ', errorsObj);
        const errorsArr = errorsObj.errors.map(error => ({message: error.msg, field: error.param, value:error.value}))
        return res.status(422).json({errors: errorsArr})
    }
    console.log('SIGNUP');
    const {username, email, password} = req.body;
    let user ;
    try {
        user = await User.findOne({email: email})
    } catch (error) {
        console.log(error);
        return next(new HttpError('Something went wrong, could not create user', 500))
    }
    if(user){
        return next(new HttpError('Email allready exists!', 422))
    }

    const newUser = new User({username, email, password, image: req.file.path, places:[]})

    try {
        user = await newUser.save();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Something went wrong, could not create user', 500))
    }
   
    res.status(201).json({message: 'user was created successfully'})
}

const login = async (req, res, next) => {
    const errorsObj = validationResult(req);
    if(!errorsObj.isEmpty()){
        console.log('Errors : ', errorsObj);
        const errorsArr = errorsObj.errors.map(error => ({message: error.msg, field: error.param, value:error.value}))
        return res.status(422).json({errors: errorsArr})
    }
    const {email, password} = req.body;
    let user ;
    try {
        user = await User.findOne({email: email})
    } catch (error) {
        
    }

    
    if(!user){
        return next(new HttpError('User doesnt existed with the provided email!', 422))
        
    }
    let isValid = false;
    try {
        isValid = await bcrypt.compare(password, user.password);
    } catch (error) {
        return next(new HttpError('Could not log you in , check your credentials', 403))
    }
    

    if(!isValid)
        return next(new HttpError('Wrong password', 422))

    let token ;
    try {
        token = jwt.sign({userId: user.id , email: user.email}, process.env.JWT_KEY,
        
            {expiresIn: '1h'}
            )
    } catch (error) {
        
    }
    console.log('token ', token);
   
    res.status(200).json({message: 'user is signed in!', userId: user.id, token: token})
}

exports.getAllUsers = getAllUsers
exports.signup = signup;
exports.login = login;