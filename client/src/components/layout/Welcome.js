import React, {Component} from 'react';

class Welcome extends Component {
  render() {
    return (
        <div className="jumbotron text-center">
          <h1 className="display-3">WebJot</h1>
          <p className="lead">Jot down ideas for your next web app project</p>
          <a href="/ideas/add" className="btn btn-outline-dark btn-lg">Add Web Project Idea</a>
        </div>
    );
  }
}

export default Welcome;