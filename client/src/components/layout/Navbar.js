import React from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAccountBox, MdOutlineAccountCircle } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({auth : {isAuthenticated, loading }, logout}) => {
	if (loading) {
		return <Spinner />;
	}
	const logo = (
				<div className='logo-container'>
					<div className='logo-position'>
						<div className='chain'>
							<div className='chainLink'></div>
							<div className='chainLink'></div>
							<div className='chainSupport'></div>
							<div className='chainHook'></div>
							<Link className='logo-img' to="/"></Link>
						</div>
					</div>
				</div>);

	const visitorLinks = (
				<ul>
					<li>
						<Link to="/posts">
						<BiEditAlt /> Posts
						</Link>
					</li>
					<li>
						<Link to="/login">
							<AiOutlineLogin /> Log in
						</Link>
					</li>
					<li>
						<Link to="/register">
							<MdOutlineAccountBox />
							Sign up
						</Link>
					</li>
				</ul>
	);
	
	const authLinks = (
		<ul>
			<li>
				<Link to="/users">
					<FiSearch /> <span className="hide-sm"> Find new friends</span>
				</Link>
			</li>
			<li>
				<Link to="/posts">
					<BiEditAlt /> <span className="hide-sm">Posts</span>
				</Link>
			</li>
			<li>
				<Link to="/account">
					<MdOutlineAccountCircle /> <span className="hide-sm">My account</span>
				</Link>
			</li>
			<li></li>
			<li>
				<Link to="/" onClick={() => logout()}>
					<AiOutlineLogout />
					<span className="hide-sm">Log out</span>
				</Link>
			</li>
		</ul>
	);

	return (
		<div>
			<nav className="navbar bg-primary">
				{logo}
				{isAuthenticated ? authLinks : visitorLinks}
			</nav>
		</div>
	);
};


Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
