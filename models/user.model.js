const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { secretKey } = require('../config/config');

const validateEmail = function (email) {
	var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(email);
};

const userSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate: [validateEmail, 'Please enter a valid email']
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"')
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, secretKey);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
}

const User = model('users', userSchema);
module.exports = User;
