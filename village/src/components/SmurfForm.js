import React, { Component } from "react";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: "",
      id: ""
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        name: this.props.location.state.name,
        age: this.props.location.state.age,
        height: this.props.location.state.height,
        id: this.props.location.state.id
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const newSmurf = {
      name: this.state.name,
      age: Number(this.state.age),
      height: this.state.height
    };

    if (!this.state.id) {
      this.props.addSmurf(newSmurf);
    } else {
      this.props.editSmurf(this.state.id, newSmurf);
    }

    this.setState({
      name: "",
      age: "",
      height: ""
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          {this.state.id ? (
            <button type="submit">Edit this smurf</button>
          ) : (
            <button type="submit">Add to the village</button>
          )}
        </form>
      </div>
    );
  }
}

export default SmurfForm;
