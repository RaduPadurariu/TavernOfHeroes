import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';


const CreateProfile = ({ createProfile, history }) => {
	const [formData, setFormData] = useState({
		nickname: '',
		gender: '',
		status: '',
	});

	const { status, gender, nickname } = formData;

	const changeHandler = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const submitHandler = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};
	return (
		<div className="container">
                <h1 className="large text-primary">Create Your Profile</h1>
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
                                required
                                value={gender}
                                onChange={(e) => changeHandler(e)}
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

                        <input type="submit" className="btn btn-primary my-1" />
                        <Link className="btn btn-light my-1" to="/account">
                            Go Back
                        </Link>
                    </form>
                 </div>   
            </div>
	
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
};


export default connect(null, { createProfile })(withRouter(CreateProfile));