import express from 'express';
import bcryptjs from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route         GET api/auth
// @description   Test route
// @access        Public

// router.get('/', auth, (req, res) => res.send('Test auth route'));
router.get('/', auth, async (req, res) => {
	try { 
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
		
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
		
	}
})

// @route         POST api/auth
// @description   Login registered user
// @access        Public

router.post(
	'/',
	[
		check('email', 'Please use a valid email').isEmail(),
		check(
			'password',
			'The password must contain at least 4 characters'
		).isLength({ min: 4 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email: email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User doesn't exist" }] });
			}

			const isValidPassword = await bcryptjs.compare(password, user.password);

			if (!isValidPassword) {
				return res
					.status(400)
					.json({errors: [{msg: "Password doesn't match"}]});
			}

			//json web token
			const payload = {
				user: {
					id: user.id,
				},
			};

			jsonwebtoken.sign(
				payload,
				process.env.jwtSecret,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					console.log('token = ', token);
					return res.json({ token: token });
				}
			);
		} catch (error) {
			// console.log(error.message);
			res.status(500).send('Server error');
		}
	}
);

export default router;
