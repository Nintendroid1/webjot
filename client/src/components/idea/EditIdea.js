import React, {Component} from 'react';

class EditIdea extends Component {
  render() {
    return (
      <div className="card card-body">
        <h3>Edit Video Idea</h3>
        <form action="/ideas/{{idea.id}}?_method=PUT" method="post">
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" name="title" value="{{idea.title}}" required>
              </input>
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea className="form-control" name="details" required>Idea Detail</textarea>
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditIdea;