import axios from 'axios';
import { setAlert } from './alert';


import {
	CLEAR_PROFILE,
	GET_PROFILE,
	PROFILE_ERROR,
	ACCOUNT_DELETED,
} from './constants';

// get the current user profile
export const getCurrentUserProfile = () => async (dispatch) => {
	// dispatch({ type: CLEAR_PROFILE });
	try {
		const response = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// create/update profile

export const createProfile =
	(formData, history, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await axios.post('/api/profile', formData, config);

			dispatch({
				type: GET_PROFILE,
				payload: response.data,
			});

			dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created'));
			if (!edit) {
				history.push('/home');
			}
		} catch (error) {
			const errors = error.response.data.errors;

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, 'danger', 3000));
				});
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status,
				},
			});
		}
	};

// delete account
export const deleteAccount = () => async (dispatch) => {
	if (
		window.confirm('Are you sure? You want to permanently delete your account?')
	) {
		try {
			const response = await axios.delete('/api/profile');

			dispatch({
				type: CLEAR_PROFILE,
			});
			dispatch({
				type: ACCOUNT_DELETED,
			});

			dispatch(setAlert('Your account has been permanently deleted', 'danger'));
		} catch (error) {}
	}
};