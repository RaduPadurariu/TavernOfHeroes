import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
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

export default Landing;
