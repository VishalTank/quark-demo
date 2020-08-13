const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { createDoc, updateDoc } = require('../controllers/docs.controller');
const auth = require('../middlewares/auth.middleware');

const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, uploadDir);
	},
	path(req, file, cb) {
		cb(null, file.path);
	},
	filename(req, file, cb) {
		path.extname(file.originalname);
		cb(null, `${file.originalname} - ${Date.now()}${path.extname(file.originalname)}`);
	},
});

const upload = multer({ storage });

const router = new express.Router();

router.post('/upload', auth, upload.any(), createDoc);
router.post('/update', auth, updateDoc);

module.exports = router;
