import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Home from './components/home/Home';
import Users from './components/users/Users';
import Posts from './components/posts/Posts';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';


const App = () => {
	// put the second parameter [arr of states] to run only once when component did mount
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<div className='content'>
						
						<Route exact path="/" component={Landing} />
						<Alert />
						<Switch>
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/users" component={Users} />
							<PrivateRoute exact path="/posts" component={Posts} />
							<Route exact path="/account" component={Home} />
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						</Switch>
						
					</div>
					<h3 className='footer'>
						<NavLink to = {{ pathname: "https://radupadurariu.herokuapp.com" }} title="Contact - radupadurariu.herokuapp.com" target="_blank" className="footer-link">@ copywrite 2022 - Radu Padurariu

						</NavLink>
						
					</h3>
					
				</div>
			</Router>
		</Provider>);
};

export default App;
