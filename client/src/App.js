import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Navbar from "./components/Nav";
import Home from './pages/Home';
import Saved from "./pages/SavedArticles";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
			<div className="App">
        { this.state.loggedIn && (
          <div>
            <Navbar user={this.state.user} logout={this.logout}/>
            <div className="main-view">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/articles" />} />
                <Route exact path="/articles" render={() => <Home />}/>
                <Route exact path="/articles/:id" render={props => <Detail {...props} user={this.state.user}/>} />
								<Route exact path="/watched-articles" render={() => <Saved user={this.state.user}/>} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        )}
        { !this.state.loggedIn && (
          <div className="auth-wrapper" style={{paddingTop:40}}>
						<Switch>
							{<Route exact path="/" component={() => <LoginForm login={this.login}/>} />}
							{ <Route exact path="/articles" component={() => <Redirect to="/" />} /> }
							{ <Route exact path="/articles/:id" component={() => <Redirect to="/" />} /> }
							{ <Route exact path="/watched-articles" component={() => <Redirect to="/" />} /> }
							<Route exact path="/signup" component={SignupForm} />
							<Route component={NoMatch} />
						</Switch>
          </div>
        )}
			</div>
		)
	}
}

export default App;
