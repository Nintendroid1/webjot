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

class App extends Component {

  state = {
    authenticated: false,
    gotData: false
  };

  componentDidMount() {
    let arr =[];
    axios
      .get('/ideas')
      .then(res =>
        res.data.map(idea => arr.push(idea))
      ).then(result => this.setState({ideas: [...arr]}))
      .then(result => console.log(this.state.ideas))
      .then(result => this.setState({gotData: true}))
      .catch(err =>
        console.log(err)
      );
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

  registerUser = (newUser) => {

  };

  loginUser = (user) => {
    console.log(`loggin in user`);
    axios
      .post('/users/login', user)
      .then(res => {
        console.log(res)
      })
      .catch(err =>
        console.log(err)
      );
  };


  logoutUser = () => {
    axios
      .get('/users/logout')
      .then(res =>
        console.log(res)
      )
      .catch(err =>
        console.log(err)
      );
  };



  render() {
    return (
      <Router>
        <div className="App">
          <Navbar logoutUser={this.logoutUser}/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Welcome}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/users/login">
                <Login loginUser={this.loginUser}/>
              </Route>
              <Route exact path="/users/register">
                <Register />
              </Route>
              <Route exact path="/ideas">
                { this.state.gotData && <Ideas ideas={this.state.ideas}/>}
              </Route>
              <Route exact path="/ideas/add">
                <AddIdea addIdea={this.addIdea}/>
              </Route>
              <Route exact path="/ideas/edit">
                <EditIdea/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
