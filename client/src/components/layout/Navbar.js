import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <div className="container">
          <a className="navbar-brand" href="/">WebJot</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false"
                  aria-label="Toggle navigation">
              <span className="navbar-toggler-icon">
              </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">

              <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" id="navbarDropdownMenuLink">Project
                  Ideas</a>
                <div className="dropdown-menu">
                  <a href="/ideas" className="dropdown-item">Ideas</a>
                  <a href="/ideas/add" className="dropdown-item">Add Idea</a>
                </div>
              </li>
              <li className="nav-item">
                <button onClick={this.props.logoutUser} className="nav-link">Logout</button>
              </li>

              <li className="nav-item">
                <a href="/users/login" className="nav-link">Login</a>
              </li>
              <li className="nav-item">
                <a href="/users/register" className="nav-link">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;