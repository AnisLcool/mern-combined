const express = require('express');
const {check} = require('express-validator')
const { getPlacesByUserId, getPlaceById, getAllPlaces, createPlace, updatePlaceById, deletePlaceById } = require('../controllers/places-controller');

const router = express.Router();
const fileUpload = require('../middleware/file-upload');
const authMiddleware = require('../middleware/check-auth');

router.get('/', getAllPlaces);


router.get('/user/:uid', getPlacesByUserId);

router.get('/:pid', getPlaceById)

router.use(authMiddleware);

router.post('/', fileUpload.single('image'), [check('title').not().isEmpty().withMessage('This field cannot be empty'), check('description').isLength({min: 5}).withMessage('This field must have a minimum of 4 characters'), check('address').not().isEmpty().withMessage('This field cannot be empty')] ,createPlace)

router.patch('/:pid', [check('title').not().isEmpty().withMessage('This field cannot be empty'), check('description').isLength({min: 5}).withMessage('This field must have a minimum of 4 characters')],updatePlaceById)
router.delete('/:pid', deletePlaceById)


module.exports = router;
