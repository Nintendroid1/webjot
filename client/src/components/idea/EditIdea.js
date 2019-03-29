import React, {Component} from 'react';

class EditIdea extends Component {

   constructor(props) {
      super(props);
      this.addFeature = this.addFeature.bind(this);
   }

   state = {
      featureCount: 1
   };

   addFeature() {
      this.setState({featureCount: this.state.featureCount + 1});
   }

   render() {

      const features = [];

      for(let i = 0; i < this.state.featureCount; i++) {
         features.push(<input type="text" className="form-control m-2" name="feature" placeholder="Add a new feature..." required>
         </input>)
      }

      return (
         <div className="card">
            <div className="card-header">
               <h3>Edit Project Idea</h3>
            </div>
            <div className="card-body">
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
                  <div className="form-group" id="features">
                     <label htmlFor="title">Features</label>
                     {features}
                  </div>
                  <button onClick={this.addFeature} className="btn btn-outline-secondary">More</button>

               </form>
            </div>
            <div className="card-footer text-center">
               <button type="submit" className="btn btn-outline-primary ">Create</button>
            </div>
         </div>
      );
   }
}

export default EditIdea;