import React, {Component} from 'react';

class Idea extends Component {
  render() {
    return (
      <div className="card mb-5">
        <div className="card-header p-4">
          <h3 className="">Create a Blogging App </h3>
          <span  className=""> Posted on 3/29/2019</span>
        </div>
        <div className="card-body p-4">
          <p className="card-text lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aut consectetur cum deleniti error ex expedita facere fugit illo, iure labore magni nam nisi odit omnis quae quas quasi quibusdam quos sit tenetur vitae. Dolorum magnam nobis tempore temporibus.</p>
          <h5 className="mb-3">Features</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Users can register and login</li>
            <li className="list-group-item">Logged in user can added or edit post</li>
            <li className="list-group-item">Passport authentication used</li>
          </ul>
          <br/>
          <h5 className="mb-3">Technologies</h5>
          <span className="lead">Nodejs, React, Redux</span>
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