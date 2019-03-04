import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink, withRouter } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(e => console.log(e));
  }

  addSmurf = smurf => {
    axios.post("http://localhost:3333/smurfs", smurf).then(res => {
      this.setState({
        smurfs: res.data
      });
      this.props.history.push("/");
    });
  };

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(e => console.log(e));
  };

  editSmurf = (id, smurf) => {
    axios
      .put(`http://localhost:3333/smurfs/${id}`, smurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
        this.props.history.push("/");
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="App">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/smurf-form">Add Smurf</NavLink>

        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm
              {...props}
              addSmurf={this.addSmurf}
              editSmurf={this.editSmurf}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
