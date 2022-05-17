import React from 'react';
import PropTypes from 'prop-types';
import { FaFemale, FaMale } from 'react-icons/fa';



const User = ({
	profile: {
		user: { _id, name, avatar },
		nickname,
		gender,
		status,
	},
}) => {
	return (
		<div className="profile">
			<div>
				<img src={avatar} alt="" className="round-img" />
			</div>
			<div>
				<h1>{name}</h1>
				<p>
                <i>Alias: {nickname}</i>
				</p>
				<p className="my-1">
					{gender && (
						<span>	
							{gender === 'male' ? <FaMale /> : <FaFemale />}
						</span>
					)}
				</p>
			</div>
		</div>
	);
};

User.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default User;