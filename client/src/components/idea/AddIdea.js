import React, {Component} from 'react';

class AddIdea extends Component {
  render() {
    return (
      <div className="card card-body">
        <h3>Project Idea</h3>
        <form action="/ideas" method="post">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" name="title"  placeholder="Title..." required>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <textarea className="form-control" name="details"  placeholder="This project does..." required>
            </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="title">Technologies</label>
            <input type="text" className="form-control" name="technology" placeholder="Nodejs, React, Express etc." required>
            </input>
          </div>
          <button type="submit" className="btn btn-outline-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default AddIdea;