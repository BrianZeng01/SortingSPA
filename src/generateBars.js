import React, { Component } from "react";

class GenerateBars extends Component {
  render() {
    return (
      <>
        <div
          className="bars"
          style={{ backgroundColor: "black", height: "150px" }}
        >
          {this.props.array.map((vertical, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  index === this.props.indexSelected
                    ? "red"
                    : index < this.props.indexCompleted
                    ? "green"
                    : "white",
                width: "5px",
                height: vertical,
                display: "inline-block",
                marginRight: "2px",
              }}
            ></div>
          ))}
        </div>

        <div>
          <h3>Swaps = {this.props.swaps}</h3>
          <h3>Traversals = {this.props.traversals}</h3>
        </div>
      </>
    );
  }
}

export default GenerateBars;
