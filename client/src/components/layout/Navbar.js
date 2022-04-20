import React from 'react';
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai';
import { MdOutlineAccountBox } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Navbar = () => {
	return (
		<div>
			<nav className="navbar bg-primary">
				<div className='logo-container'>
					<div className='logo-position'>
						<div className='chain'>
							<div className='chainLink'></div>
							<div className='chainLink'></div>
							<div className='chainSupport'></div>
							<div className='chainHook'></div>
							
							<Link className='logo-img' to="/index"></Link>
						</div>
					</div>
					<h1>
						<Link to="/index">Tavern of Heroes</Link>
					</h1>
				</div>
				<ul>
					<li>
						<Link to="/">
							<AiFillHome /> Home
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
			</nav>
		</div>
	);
};

export default Navbar;
