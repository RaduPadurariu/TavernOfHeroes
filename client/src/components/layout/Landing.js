import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/posts" />;
	}

	return (
		<div className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<div className="buttons">
						<Link to="/login" className="btn btn-landing btn-primary">
							Login
						</Link>
						<Link to="/register" className="btn btn-landing btn-primary">
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
