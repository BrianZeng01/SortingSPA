import React, { Component } from "react";

class GenerateBars extends Component {
  render() {
    return (
      <>
        <div className="animation">
          <div className="data">
            <h3>Swaps = {this.props.swaps}</h3>
            <h3 style={{ display: "inline" }}>
              Comparisons = {this.props.comparisons}
            </h3>
            {this.props.sortingMethod === "Merge Sort" ||
            this.props.sortingMethod === "Quick Sort" ? (
              <p style={{ float: "right", margin: "0", marginRight: "1em" }}>
                Animation Incomplete
              </p>
            ) : null}
          </div>
          <div className="bars">
            <div className="alignBottom">
              {this.props.array.map((vertical, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      index === this.props.indexSelected
                        ? "red"
                        : this.props.sortingMethod === "Bubble Sort"
                        ? index >= this.props.indexCompleted
                          ? "green"
                          : "white"
                        : index < this.props.indexCompleted
                        ? "green"
                        : "white",
                    width: this.props.width,
                    height: vertical * 5,
                    display: "inline-block",
                    marginRight: "2px",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GenerateBars;
