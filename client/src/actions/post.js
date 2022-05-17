import axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, USER_LOADED } from './constants';

// get all posts
export const getPosts = () => async (dispatch) => {
	try {
		const response = await axios.get('/api/posts');
        dispatch({
			type: USER_LOADED,
			payload: response.data,
		});
		dispatch({
			type: GET_POSTS,
			payload: response.data,
		});
	} catch (error) {
        dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// add like
export const addLike = (postId) => async (dispatch) => {
	try {
		const response = await axios.put(`/api/posts/like/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id: postId, likes: response.data },
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// add like
export const unLike = (postId) => async (dispatch) => {
	try {
		const response = await axios.put(`/api/posts/unlike/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id: postId, likes: response.data },
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};