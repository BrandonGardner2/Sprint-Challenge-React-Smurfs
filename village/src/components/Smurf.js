import React from "react";
import { Link } from "react-router-dom";

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <button type="button" onClick={() => props.deleteSmurf(props.id)}>
        Delete Smurf
      </button>
      <Link
        to={{
          pathname: `/smurf-form/${props.id}`,
          state: {
            name: props.name,
            height: props.height,
            age: props.age,
            id: props.id
          }
        }}
      >
        Edit Smurf
      </Link>
    </div>
  );
};

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
