require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.routes');
const docsRouter = require('./routes/docs.routes');

const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/docs', docsRouter);

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/quark-demo';
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: true
}, () => {
	console.log('Connected to DB successfully!');
});

const port = process.env.HTTP_PORT || 3000;
app.listen(port, () => {
	console.log('Server started on port:', port);
});
