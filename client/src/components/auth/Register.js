import React, {Component} from 'react';

class Register extends Component {


  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card card-body">
              <h3 className="text-center">Account Register</h3>
              <form action="/users/register" method="post">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" name="name" value="{{name}}" required>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" className="form-control" value="{{email}}" required>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" className="form-control" value="{{password}}" required>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input type="password" name="password2" className="form-control" value="{{password2}}" required>
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

export default Register;