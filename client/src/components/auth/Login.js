import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';

class Login extends Component {
   state = {
      email: '',
      password: ''
   };

   handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
   };

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.loginUser(this.state, this.props.history);
   };

   componentDidMount() {
      if(localStorage.auth === true) {
         this.props.history.push('/ideas');
      }
   }

   componentWillReceiveProps() {
      if (localStorage.auth === true) {
         this.props.history.push('/ideas');
      }
   }

   render() {
     // if(this.props.isAuthenticated) return <Redirect to='/ideas'/>;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card card-body">
              <h3 className="text-center">Account Login</h3>
              <form onSubmit={event => this.handleSubmit(event)}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input onChange={this.handleChange} placeholder="Email"  type="email" name="email" className="form-control" required>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input onChange={this.handleChange} placeholder="Password" type="password" name="password" className="form-control" required>
                  </input>
                </div>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
              </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);