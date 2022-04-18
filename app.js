import express from 'express';
import authRouter from './api/auth.js';
import postsRouter from './api/posts.js';
import usersRouter from './api/users.js';

import 'dotenv/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

// routes
// app.get('/', (req, res) => res.send('Hello Social3 Server!'));
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

// heroku special env
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
	// npm run build for react app
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
	});
}

// Connect to DataBase
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB connected!!');
	} catch (err) {
		console.log('Failed to connect to MongoDB', err);
	}
};
connectDB();

// start the server - listen on port 3000
app.listen(process.env.PORT || 5000);
