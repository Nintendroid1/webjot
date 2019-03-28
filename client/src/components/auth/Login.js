import React, {Component} from 'react';

class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card card-body">
              <h3 className="text-center">Account Login</h3>
              <form method="post">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" className="form-control" required>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" className="form-control" required>
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