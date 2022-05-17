import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './constants';

// get all posts
export const getPosts = () => async (dispatch) => {
	try {
		const response = await axios.get('/api/posts');

		dispatch({
			type: GET_POSTS,
			payload: response.data,
		});
	} catch (error) {
		console.log('salut');
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};