import express from 'express';
import { request } from 'express';
import auth from '../middleware/auth.js';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import 'dotenv/config';

const router = express.Router();

// @route         GET api/profile/me
// @description   get user profile
// @access        Public
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: request.user.id }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({ msg: 'No profile for this user'});
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

// @route         POST api/profile
// @description   Create/Update Profile
// @access        Private
router.post(
	'/',
	[ auth, [ check('gender', 'Gender is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { status, gender, nickname, creationDate } =
			req.body;

		// create profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (status) profileFields.status = status;
		if (gender) profileFields.gender = gender;
		if (nickname) profileFields.nickname = nickname;
		if (creationDate) profileFields.creationDate = creationDate;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}

			// create
			profile = new Profile(profileFields);
			await profile.save();

			return res.json(profile);
		} catch (error) {}
	}
);

// @route         GET api/profile
// @description   Get All Profiles
// @access        Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);

		res.json(profiles);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

// @route         GET api/profile/user/:user_id
// @description   Get profile by user id
// @access        Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'No profile found for this user id' });
		}

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		if (error.kind == 'ObjectId') {
			return res
				.status(400)
				.json({ msg: 'No profile found for this user id' });
		}
		res.status(500).send('Server error');
	}
});

// @route         DELETE api/profile
// @description   Delete profile, user and posts
// @access        Private
router.delete('/', auth, async (req, res) => {
	try {
		// remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});
export default router;