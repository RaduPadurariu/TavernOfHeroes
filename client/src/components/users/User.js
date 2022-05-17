import React from 'react';
import PropTypes from 'prop-types';
import { FaFemale, FaMale } from 'react-icons/fa';



const User = ({
	profile: { user, nickname, gender, status },
}) => {
	return (
        user && (
		<div className="profile">
			<div>
				<img src={user.avatar} alt="" className="round-img" />
			</div>

			<div className='user-data'>
				<h1>{user.name}</h1>
				<p>
                    <i>alias: {nickname}</i>
				</p>
				<p >
                    <span className='my-1'>
					{gender && (
						<span>	
							{gender === 'male' ? <FaMale /> : <FaFemale />}
						</span>
					)}</span>
			    </p>
			</div>
       
		</div>
	)
    )
};

User.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default User;