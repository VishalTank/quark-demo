const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const docsSchema = new Schema({
	name: {
		type: Schema.Types.String
	},
	file: {
		type: Schema.Types.String
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = model('docs', docsSchema);
