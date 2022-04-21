import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
	<Router>
		<div className="App">
			<Navbar />
			<div className='content'>
				
				<Route exact path="/" component={Landing} />
				<Switch>
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Switch>
				
			</div>
			<h3 className='footer'>@ copywrite 2022 - Radu Padurariu</h3>
			
		</div>
	</Router>
);

export default App;
