import React, {Component} from 'react';

class Idea extends Component {
  render() {
     const {idea} = this.props;
    return (
      <div className="card mb-5">
        <div className="card-header p-4">
          <h3 className="">{idea.title}</h3>
          <span  className=""> Posted on 00/00/0000</span>
        </div>
        <div className="card-body p-4">
          <p className="card-text lead">{idea.content}</p>
          <h5 className="mb-3">Features</h5>
          <ul className="list-group list-group-flush">
             {idea.features.map(feature => {
                return <li key={feature} className="list-group-item">{feature}</li>
             })}
          </ul>
          <br/>
          <h5 className="mb-3">Technologies</h5>
          <span className="lead">{idea.technologies}</span>
        </div>
        <div className="card-footer p-4">
          <button className="btn btn-outline-dark btn-block mb-2">Edit</button>
          <button type="submit" className="btn btn-outline-danger btn-block">Delete</button>
        </div>
      </div>
    );
  }
}

export default Idea;