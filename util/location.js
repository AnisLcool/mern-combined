const { default: axios } = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.GOOGLE_API_KEY;


const getCoordsForAddress = async(address) => {
    // for example address : 20 W 34th St, New York, NY 10001, United States
    // transformedAddress : 20%20W%2034th%20St%2C%20New%20York%2C%20NY%2010001%2C%20United%20States
    console.log('addresse : ', address);
    const transformedAddress = encodeURIComponent(address);
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${transformedAddress}&key=${API_KEY}`);
    const data = response.data;
    if(!data || data.status == 'ZERO_RESULTS'){
        throw new HttpError('Could not find location for specified address', 404)
    }
    const coordinates = response.data.results[0].geometry.location;
    return coordinates


}

module.exports = getCoordsForAddress;