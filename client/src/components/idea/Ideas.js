import React, {Component} from 'react';
import Idea from "./Idea";
import {Redirect, withRouter} from 'react-router-dom';

class Ideas extends Component {

   componentDidMount() {
      if (localStorage.auth === "false") {
         this.props.history.push('/users/login')
      }
   }

   render() {
      if (localStorage.auth === "false") return <Redirect to='/users/login'/>;
      return (
            <div>
               {this.props.ideas.map(idea => {
                  return <Idea key={idea.title} idea={idea} deleteIdea={this.props.deleteIdea} onEditForm={this.props.onEditForm}/>
               })}
            </div>
      );
   }
}

export default withRouter(Ideas);