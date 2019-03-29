import React, {Component} from 'react';

class AddIdea extends Component {

  constructor(props) {
    super(props);
    this.addFeatureInput = this.addFeatureInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    featureCount: 1,
    title: '',
    content: '',
    technology: '',
    feature0: ''
  };

  addFeatureInput() {
    this.setState({featureCount: this.state.featureCount + 1});
    let featureName = `feature${this.state.featureCount}`;
    this.setState({[featureName]: ''})
  }

  handleSubmit(e) {
    e.preventDefault();


    const newIdea = {
      title: this.state.title,
      content: this.state.content,
      technologies: this.state.technology,
      features: [],
      date: '000/000/0000'
    };

    let list = Object.keys(this.state);
    let values =  Object.entries(this.state);

    for(let i = 0; i < this.state.featureCount; i++) {
      for(let j = 0; j < list.length; j++) {
          if(`feature${i}` === list[j]) {
            newIdea.features.push(values[j][1]);
          }
      }
    }

    this.props.addIdea(newIdea);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {

    const features = [];

    for(let i = 0; i < this.state.featureCount; i++) {
      features.push(<input onChange={this.handleChange} key={i} type="text" className="form-control m-2" name={`feature${i}`} placeholder="Add a new feature..." required>
      </input>)
    }

    return (
      <div className="card">
        <form onSubmit={this.handleSubmit}>
          <div className="card-header">
            <h3>Add Project Idea</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Title</label>
              <input onChange={this.handleChange} type="text" className="form-control" name="title"  placeholder="Title..." required>
              </input>
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea onChange={this.handleChange} className="form-control" name="content"  placeholder="This project does..." required>
            </textarea>
            </div>
            <div className="form-group">
              <label>Technologies</label>
              <input onChange={this.handleChange} type="text" className="form-control" name="technology" placeholder="Nodejs, React, Express etc." required>
              </input>
            </div>
              <div className="form-group" id="features">
                <label>Features</label>
                {features}
              </div>
            <button onClick={this.addFeatureInput} className="btn btn-outline-secondary">More</button>
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-outline-primary ">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddIdea;