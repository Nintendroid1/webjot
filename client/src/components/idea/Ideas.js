import React, {Component} from 'react';
import Idea from "./Idea";
import {Redirect} from 'react-router-dom';

class Ideas extends Component {
  render() {
    // if(!this.props.isAuthenticated) return <Redirect to='/users/login'/>;
    return (
      <div>
         {this.props.ideas.map(idea => {
            return <Idea key={idea.title} idea={idea}/>
         })}
      </div>
    );
  }
}

export default Ideas;