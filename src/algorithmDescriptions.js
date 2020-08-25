import React, { Component } from "react";

class AlgorithmDescriptions extends Component {
  render() {
    return (
      <>
        <div className="algorithmDescriptions">
          <h1>{this.props.sortingMethod}</h1>
        </div>
      </>
    );
  }
}

export default AlgorithmDescriptions;
