const express = require('express');
const { check } = require('express-validator');
const { getAllUsers, signup, login } = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');


const router = express.Router();




router.get('/', getAllUsers);
router.post('/signup',fileUpload.single('image') , [check('username').not().isEmpty().withMessage('This field cannot be empty'), check('email').normalizeEmail().isEmail().withMessage('Invalid email format'), check('password').isLength({min: 4, max: 10}).withMessage('Password value must be at least 8 characters mininum and 10 characters maximum')],signup);


router.post('/login',[check('email').normalizeEmail().isEmail().withMessage('Invalid email format'), check('password').isLength({min: 4, max: 10}).withMessage('Password value must be at least 4 characters mininum and 10 characters maximum')],login);




module.exports = router;
