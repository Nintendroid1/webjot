import React, {Component} from 'react';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
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
              <h3 className="text-center">Account Register</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label >Name</label>
                  <input onChange={this.handleChange} type="text" placeholder="Name" className="form-control" name="name" value={this.state.name} required>
                  </input>
                </div>
                <div className="form-group">
                  <label >Email</label>
                  <input onChange={this.handleChange} type="email" placeholder="Email" name="email" className="form-control" value={this.state.email} required>
                  </input>
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input onChange={this.handleChange} type="password" placeholder="Password" name="password" className="form-control" value={this.state.password} required>
                  </input>
                </div>
                <div className="form-group">
                  <label >Confirm Password</label>
                  <input onChange={this.handleChange} type="password" placeholder="Confirm Password" name="password2" className="form-control" value={this.state.password2} required>
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