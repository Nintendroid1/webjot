import React, {Component} from 'react';
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
import Idea from "./components/idea/Idea";

// Check for token
if (localStorage.jwtToken) {
   // Set auth token header auth
   setAuthToken(localStorage.jwtToken);
   localStorage.auth = true;
}

class App extends Component {
   constructor(props) {
      super(props)
   }

   state = {
      user: {},
      gotData: false,
      ideas: [],
      auth: "false"
   };


   componentDidMount() {
      // Check for token
      if (localStorage.jwtToken) {
         // Set auth token header auth
         setAuthToken(localStorage.jwtToken);
         // Decode token and get user info and exp
         const decoded = jwt_decode(localStorage.jwtToken);
         // Set user and isAuthenticated
         this.setState({user: decoded});
         this.setState({auth: localStorage.auth})
         localStorage.auth = true;

         // Check for expired token
         const currentTime = Date.now() / 1000;
         if (decoded.exp < currentTime) {
            // Logout user
            this.logoutUser();
            // Redirect to login
            window.location.href = '/login';
         }
         this.displayIdeas();
      }
   }

   addIdea = (newIdea, history) => {
      this.setState({ideas: [...this.state.ideas, newIdea]});
      axios
         .post('/api/ideas', newIdea)
         .then(res =>
            console.log(res)
         ).then(this.displayIdeas)
         .then(res => history.push('/ideas'))
         .catch(err =>
            console.log(err)
         );
   };

   editIdea = (editedIdea) => {

   };

   onEditForm = (ideaID, history) => {
      this.displayIdeas();
      history.push(`ideas/edit/${ideaID}`)
   };

   deleteIdea = (ideaID) => {
      axios
         .delete(`/api/ideas/${ideaID}`)
         .then(() => this.setState({ideas: [...this.state.ideas.filter(idea => idea._id !== ideaID)]}))
         .catch(err =>
            console.log(err)
         );
   };

   displayIdeas = () => {
      this.setState({gotData: false});
      let arr = [];
      axios
         .get('/api/ideas', )
         .then(res =>
            res.data.map(idea => arr.push(idea))
         ).then(() => this.setState({ideas: [...arr]}))
         .then(() => this.setState({gotData: true}))
         .catch(err =>
            console.log(err)
         );
   };

   registerUser = (newUser, history) => {
      axios
         .post('/api/users/register', newUser)
         .then(res => history.push('/users/login'))
         .catch(err =>
            console.log(err)
         );

   };

   loginUser = (user, history) => {
      axios
         .post('/api/users/login', user)
         .then(res => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setState({
               user: decoded,
               auth: "true"
            });

            localStorage.auth = true;

         }).then(this.displayIdeas)
         .then(() => history.push('/ideas'))
         .catch(err =>
            console.log(err)
         );
   };


   logoutUser = (history) => {
      // Remove token from localStorage
      localStorage.removeItem('jwtToken');
      localStorage.auth = false;
      // Remove auth header for future requests
      setAuthToken(false);
      // Set current user to {} which will set isAuthenticated to false
      this.setState({user: {}, auth: "false"})
      history.push('/users/login')
   };


   render() {
      return (
         <Router>
            <div className="App">
               <Navbar auth={this.state.auth} logoutUser={this.logoutUser}/>
               <div className="container">
                  <Switch>
                     <Route exact path="/" component={Welcome}/>
                     <Route exact path="/about" component={About}/>
                     <Route exact path="/users/login">
                        <Login isAuthenticated={localStorage.auth} loginUser={this.loginUser}/>
                     </Route>
                     <Route exact path="/users/register">
                        <Register isAuthenticated={localStorage.auth} registerUser={this.registerUser}/>
                     </Route>
                     <Route exact path='/ideas'>
                        {this.state.gotData && <Ideas ideas={this.state.ideas} deleteIdea={this.deleteIdea} onEditForm={this.onEditForm}/>}
                     </Route>
                     <Route exact path='/ideas/edit/:id' render={props => <EditIdea ideas = {this.state.ideas} props={props} id={props.match.params.id} editIdea={this.editIdea}/>}>
                     </Route>
                  </Switch>
                  <Switch>
                     <AddIdea exact path='/ideas/add' addIdea={this.addIdea}/>
                  </Switch>

               </div>
            </div>
         </Router>
      );
   }
}

export default App;
