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

let initialIdeas = [{
  title: 'Create a Blogging App',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aut consectetur cum deleniti error ex expedita facere fugit illo, iure labore magni nam nisi odit omnis quae quas quasi quibusdam quos sit tenetur vitae. Dolorum magnam nobis tempore temporibus.',
  technologies: 'Nodejs, React, Redux',
  features: [
    'Users can register and login',
    'Logged in user can added or edit post',
    'Passport authentication used'
  ]
},
  {
    title: 'Chatting App',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aut consectetur cum deleniti error ex expedita facere fugit illo, iure labore magni nam nisi odit omnis quae quas quasi quibusdam quos sit tenetur vitae. Dolorum magnam nobis tempore temporibus.',
    technologies: 'Nodejs, React, Socket.io',
    features: [
      'Users can chat in private and public',
      'Logged in user can add and edit their profile',
      'Email Authentication'
    ]
  }];

class App extends Component {

  state = {
    ideas: initialIdeas,
    authenticated: false,
  };

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

  };



  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
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
                <Ideas ideas={this.state.ideas}/>
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
