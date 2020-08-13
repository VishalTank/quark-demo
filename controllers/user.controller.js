const User = require('../models/user.model');

const createUser = async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();

		res.status(200).send({ user, token });
	}
	catch (err) {
		res.status(500).json({ errorMessage: 'User already exists' });
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();

		res.status(200).send({ user, token });
	}
	catch (err) {
		res.status(400).send(err);
	}
};

const getUser = (req, res) => {
	res.status(200).send(req.user);
};

module.exports = {
	createUser,
	loginUser,
	getUser
};
