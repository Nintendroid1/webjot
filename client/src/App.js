import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./components/layout/Navbar";
import Welcome from "./components/layout/Welcome";
import About from './components/layout/About';
import Ideas from "./components/idea/Ideas";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AddIdea from "./components/idea/AddIdea";
import EditIdea from "./components/idea/EditIdea";

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import PrivateRoute from "./components/common/PrivateRoute";


class App extends Component {

  state = {
    isAuthenticated: false,
    gotData: false,
    user: {}
  };



  componentDidMount() {
    // this.setState({gotData: false});
    // let arr =[];
    // axios
    //   .get('/ideas')
    //   .then(res =>
    //     res.data.map(idea => arr.push(idea))
    //   ).then(result => this.setState({ideas: [...arr]}))
    //   .then(result => console.log(this.state.ideas))
    //   .then(result => this.setState({gotData: true}))
    //   .catch(err =>
    //     console.log(err)
    //   );



// Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.setState({user: decoded});

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        this.logoutUser();
        // Redirect to login
        window.location.href = '/login';
      }
    }
  }

  addIdea =(newIdea) => {
    this.setState({ideas: [...this.state.ideas, newIdea]});
    axios
      .post('/ideas', newIdea)
      .then(res =>
        console.log(res)
      )
      .catch(err =>
        console.log(err)
      );
  };

  editIdea = (editedIdea) => {

  };

  deleteIdea = (ideaID) => {

  };

  displayIdeas = () => {

  };

  registerUser = (newUser, history) => {
    axios
       .post('/api/users/register', newUser)
       .then(res => history.push('/users/login'))
       .catch(err =>
          console.log(err)
       );

  };

  loginUser = (user) => {
    axios
      .post('/api/users/login', user)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        this.setState({
          isAuthenticated: true,
          user: decoded
        });
      })
      .catch(err =>
        console.log(err)
      );
  };



  logoutUser = () => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    this.setState({user: {}})
  };



  render() {
    return (
      <Router>
        <div className="App">
          <Navbar logoutUser={this.logoutUser}/>
          <div className="container">
              <Route exact path="/" component={Welcome}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/users/login">
                <Login isAuthenticated={this.state.isAuthenticated} loginUser={this.loginUser}/>
              </Route>
              <Route exact path="/users/register">
                <Register isAuthenticated={this.state.isAuthenticated} registerUser={this.registerUser} />
              </Route>

            <Switch>
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} exact path="/ideas">
                 <Ideas ideas={this.state.ideas}/>
              </PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} exact path="/ideas/add">
                <AddIdea addIdea={this.addIdea}/>
              </PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} exact path="/ideas/edit">
                <EditIdea/>
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
