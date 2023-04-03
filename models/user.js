const { Schema, model, Types: { ObjectId } } = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
// Define the user Schema 

/**
 * @typedef {Object} User
 * @property {string} username - The user's username
 * @property {string} email - The user's email address
 * @property {string} password - The user's password
 * @property {string} image - The URL of the user's profile image
 * @property {ObjectId[]} places - An array of place IDs that the user has visited
 */
const userSchema = new Schema({
    username: { type: String, required: true, minlength: 2, maxlength: 30 },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: { type: String, required: true, minlength: 4  },
    image: { type: String, required: true },
    places: [{ type: ObjectId, required: true, ref: 'Place' }]
})

// Hash the password before saving
userSchema.pre('save', async function (next) {
      // Check if the password field has been modified
      console.log('IM IN PRE');
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.plugin(mongooseUniqueValidator);
/**
 * @typedef {import('mongoose').Model<User>} UserModel
 */
const UserModel = model('User', userSchema);
module.exports = UserModel;