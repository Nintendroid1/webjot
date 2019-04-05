import React, {Component} from 'react';

class EditIdea extends Component {

   state = {
      featureCount: 1,
      gotData: false
   };

   addFeature = () => {
      this.setState({featureCount: this.state.featureCount + 1});
   };

   componentDidMount() {
      let result;
      if (this.props.ideas.length === 1) {
         result = this.props.ideas[0];
      } else {
         result = this.props.ideas.find(idea => idea.id === this.props.id);
      this.props.ideas.forEach(idea => {
         if(idea._id === this.props.id) {
            result = idea;
         }
      })

      }

      this.setState({currentIdea: result, gotData: true});
      console.log(this.state.currentIdea);
   }

   render() {

      const features = [];

      for(let i = 0; i < this.state.featureCount; i++) {
         features.push(<input type="text" key={i} className="form-control m-2" name="feature" placeholder="Add a new feature..." required>
         </input>)
      }

      return (
         <div className="card">
            <div className="card-header">
               <h3>Edit Project Idea</h3>
            </div>
            {this.state.gotData && <div className="card-body">
               <form action="/ideas" method="post">
                  <div className="form-group">
                     <label htmlFor="title">Title</label>
                     <input type="text" className="form-control" name="title" value={this.state.currentIdea.title}  placeholder="Title..." required>
                     </input>
                  </div>
                  <div className="form-group">
                     <label htmlFor="details">Details</label>
                     <textarea className="form-control" name="details"    placeholder="This project does..." required>
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
            </div>}

            <div className="card-footer text-center">
               <button type="submit" className="btn btn-outline-primary ">Edit</button>
            </div>
         </div>
      );
   }
}

export default EditIdea;