const Docs = require('../models/docs.model');

const createDoc = async (req, res) => {

	try {
		const data = await Docs.findOneAndUpdate({ userId: req.user._id, name: req.files[0].filename }, {
			userId: req.user._id,
			name: req.files[0].filename,
			file: req.files[0].path
		}, {
			upsert: true,
			new: true
		});

		res.status(200).send(data);
	}
	catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

const updateDoc = async (req, res) => {
	try {
		const data = await Docs.findOneAndUpdate({ userId: req.user._id, _id: req.body.docId }, {
			name: req.body.fileName
		}, {
			new: true
		});

		if (data)
			res.status(200).send(data);
		else
			res.status(404).send('Can not find document');
	}
	catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
}

module.exports = {
	createDoc,
	updateDoc
};
