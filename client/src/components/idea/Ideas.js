import React, {Component} from 'react';
import Idea from "./Idea";

class Ideas extends Component {
  render() {
     console.log(this.props.ideas);
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