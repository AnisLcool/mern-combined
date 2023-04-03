/**
 * Get all users from the database and return a list of users with their
 * username, image, and places.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getAllUsers = async (req, res, next) => {
    let users;
  
    try {
      users = await User.find();
    } catch (error) {
      // Return a 500 error if there is an issue with the database connection.
      return next(new HttpError('Something went wrong, could not get users', 500));
    }
  
    // Return a 404 error if no users are found.
    if (users.length === 0) {
      return next(new HttpError('Could not find users', 404));
    }
  
    // Map users to a new object containing only the necessary fields.
    const usersToSend = users.map(({ username, image, places }) => ({ username, image, places }));
  
    // Send the response with a 200 status and the usersToSend object.
    res.status(200).json({ users: usersToSend });
  };
  
  module.exports = getAllUsers;