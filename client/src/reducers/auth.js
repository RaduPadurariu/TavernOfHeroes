import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
    LOGOUT,
} from '../actions/constants';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

const registerState = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
			// put the token in the local storage
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case REGISTER_FAIL:
        case AUTH_ERROR:
		case LOGIN_FAIL:
        case LOGOUT:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, loading: false };
            case USER_LOADED:
			return { ...state, isAuthenticated: true, loading: false, user: payload };
		default:
			return state;
	}
}

export default registerState;