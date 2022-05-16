import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
} from '../actions/constants';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: false,
	error: {},
};

const profileState = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return { ...state, profile: payload, loading: false };
		case PROFILE_ERROR:
			return { ...state, error: payload, profile: null, loading: false };
		case CLEAR_PROFILE:
			return { ...state, profile: null, loading: false };
		default:
			return state;
	}
}

export default profileState;