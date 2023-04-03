// Import the necessary modules
const HttpError = require('http-errors');
const User = require('../models/user');

/**
 * Retrieves all users from the database.
 * @async
 * @function getAllUsers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves with the users data if successful, or rejects with an error if unsuccessful.
 */
const getAllUsers = async (req, res, next) => {
  // Extract the page, limit and sort options from the query parameters
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sort = req.query.sort || 'createdAt';
  const lean = req.query.lean || false;

  // Define the options object to be passed to the User.find() method
  const options = {
    sort: { [sort]: 1 }, // Sort the results by the specified field
    lean, // Return plain JavaScript objects instead of full Mongoose documents if lean is true
    skip: (page - 1) * limit, // Skip the first n results based on the current page number and limit
    limit: parseInt(limit) // Return a maximum of n results based on the current limit
  };

  try {
    // Query the database to get all the users based on the options object
    const users = await User.find({}, '-password', options);

    // If no users are found, return a 404 error
    if (users.length === 0) {
      return next(new HttpError('Could not find users', 404));
    }

    // If users are found, return a 200 success response with the users data
    res.status(200).json({ users });
  } catch (error) {
    // If an error occurs while querying the database, return a 500 error
    return next(new HttpError('Something went wrong, could not get users', 500));
  }
};

// Export the getAllUsers function
module.exports = getAllUsers;