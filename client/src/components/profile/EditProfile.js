import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentUserProfile } from '../../actions/profile';

const EditProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentUserProfile,
	history,
}) => {
	const [formData, setFormData] = useState({
		nickname: '',
		gender: '',
		status: '',
		phoneNumber: '',
		city: '',
	});

	useEffect(() => {
		getCurrentUserProfile();

		if (profile !== null) {
			setFormData({
				nickname: loading || !profile.nickname ? '' : profile.nickname,
				gender: loading || !profile.gender ? '' : profile.gender,
				status: loading || !profile.status ? '' : profile.status,
			});
		}
	}, [loading, getCurrentUserProfile, profile]);

	const { phoneNumber, city, status, gender, nickname } = formData;

	const changeHandler = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const submitHandler = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};
	return (
		<div className="container">
                <h1 className="large text-dark">Edit Your Profile</h1>
                <div className='secondary-container'>
                    <form className="form" onSubmit={(e) => submitHandler(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="* Nickname"
                                name="nickname"
                                required
                                value={nickname}
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="gender"
                                onChange={(e) => changeHandler(e)}
                                value={gender}
                            >
                                <option value="0">* Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Status"
                                name="status"
                                value={status}
                                onChange={(e) => changeHandler(e)}
                            />
                            <small className="form-text">Single, Married ...</small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="City"
                                name="city"
                                value={city}
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>

                        <input type="submit" className="btn btn-primary my-1" />
                        <a className="btn btn-light my-1" href="dashboard.html">
                            Go Back
                        </a>
                    </form>
                </div>
            </div>
	);
};

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentUserProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, {
	createProfile,
	getCurrentUserProfile,
})(withRouter(EditProfile));