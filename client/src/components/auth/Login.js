import React, {Component} from 'react';

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
      console.log(this.state);
   };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card card-body">
              <h3 className="text-center">Account Login</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input onChange={this.handleChange} placeholder="Email"  type="email" name="email" className="form-control" required>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input onChange={this.handleChange} placeholder="Password"  type="password" name="password" className="form-control" required>
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

export default Login;