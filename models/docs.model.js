const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const docsSchema = new Schema({
	file: {
		type: Buffer
	}
});
