import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

const App = () => (
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
					</Switch>
					
				</div>
				<h3 className='footer'>@ copywrite 2022 - Radu Padurariu</h3>
				
			</div>
		</Router>
	</Provider>
);

export default App;
