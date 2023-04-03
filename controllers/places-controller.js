const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('./../models/place');
const User = require('./../models/user');
const { default: mongoose } = require('mongoose');
const fs = require('fs');

const getAllPlaces = (req, res, next) => {


}

const getPlacesByUserId = async (req, res, next) => {
    const { uid } = req.params;
    let result;
    try {
        result = await Place.find({ creator: uid })
    } catch (error) {
        return next(new HttpError('Something went wrong, couldnt get places', 500))
    }
    console.log('RESULT : ', result);
    if (!result || result.length === 0)
        return next(new HttpError('Could not find plaes for the provided user id ', 404))

    res.status(200).json({ places: result.map(place => place.toObject({ getters: true })) })
}

const getPlaceById = async (req, res, next) => {
    const { pid } = req.params;
    let result;
    try {
        result = await Place.findById(pid);
    } catch (error) {
        return next(new HttpError('Something went wrong , could not find the place', 500))
    }
    console.log('RESULT : ', result);
    if (!result) {
        return next(new HttpError('Couldnt find the place with the provided id ' + pid, 404))
    }

    return res.status(200).json({ place: result.toObject({ getters: true }) })
}

const createPlace = async (req, res, next) => {
    const errorsObj = validationResult(req);
    if (!errorsObj.isEmpty()) {
        console.log('Errors : ', errorsObj);
        const errorsArr = errorsObj.errors.map(error => ({ message: error.msg, field: error.param, value: error.value }))
        return res.status(422).json({ errors: errorsArr })
    }
    const { title, description, address } = req.body;
    let user;
    try {
        user = await User.findById(req.userData.userId)
    } catch (error) {
        console.log(error);
        return next(new HttpError('Something went wrong , couldn\'t create place!', 500))
    }
    if (!user) {
        return next(new HttpError('Error, user was not found', 404))
    }    


    let location;
    try {

        location = await getCoordsForAddress(address)
    } catch (error) {
        console.log(error);
        return next(new HttpError('Something went wrong , couldn\'t create place!', 500))
    }

    if(!req.file){
        return next(new HttpError('Place image is not provided', 422))
    }

    const newPlace = new Place({ title, description, address, creator: req.userData.userId, location, image: req.file.path });
    let result;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        result = await newPlace.save({ session: session });
        user.places.push(newPlace);
        await user.save({ session: session });
        await session.commitTransaction();

    } catch (error) {
        console.log(error);
        return next(new HttpError('Something went wrong , couldn\'t create place!', 500))
    }
    res.status(201).json({ message: 'Place was created successfully!', place: result })
}

const updatePlaceById = async (req, res, next) => {
    const errorsObj = validationResult(req);
    if (!errorsObj.isEmpty()) {
        console.log('Errors : ', errorsObj);
        const errorsArr = errorsObj.errors.map(error => ({ message: error.msg, field: error.param, value: error.value }))
        return res.status(422).json({ errors: errorsArr })
    }

    // 2nd solution :
    const { pid } = req.params
    console.log('pid : ', pid);
    let result;
    try {
        result = await Place.findById(pid);
    } catch (error) {
        return next(new HttpError('Something went wrong while trying to find the place', 500))
    }

    if (!result) {
        return next(new HttpError('Could not find place with provided id', 404))
    }

    console.log(req.userData.userId !== result.creator)
    console.log(typeof result.creator);
    console.log(typeof req.userData.userId);

    if(req.userData.userId !== result.creator.toString()){
        return next(new HttpError('You are unauthorized to make this action', 401))
    }

    const { title, description } = req.body;
    result.title = title;
    result.description = description;
    try {
        await result.save();
    } catch (error) {
        return next(new HttpError('Something went wrong while trying to update the place', 500))
    }
    res.status(200).json({ message: 'Place updated successfully', place: result.toObject({ getters: true }) });

}

const deletePlaceById = async (req, res, next) => {
    const { pid } = req.params;
    let result;
    let place;
    let user;
    try {
        place = await Place.findById(pid);
        user = await User.findById(place.creator);
        if (!place) {
            return next(new HttpError('Could not find the place with provided id', 404))
        }
        if (!user) {
            return next(new HttpError('Could not find the creator of the place', 404))
        }
    } catch (error) {
        console.log(error);
        return next(new HttpError('Something went wrong, could not delete place', 500))
    }
    

    if(req.userData.userId !== user.id){
        return next(new HttpError('You are unauthorized to make this action', 401))
    }

    let session;

    try {
        session = await mongoose.startSession();
        session.startTransaction();
        result = await place.remove({ session: session })
        console.log('user before pull ', user);
        user.places.pull(place);
        console.log('user after pull', user);
        await user.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        return next(new HttpError('Something went wrong, Could not delete place', 500))

    }

    fs.unlink(place.image, (error) => {
        console.log('error when deleting file : ', error);
    })


    res.status(200).json({ message: 'Place deleted successfully', deletedPlace: result });

}

exports.getAllPlaces = getAllPlaces;
exports.getPlacesByUserId = getPlacesByUserId;
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;

