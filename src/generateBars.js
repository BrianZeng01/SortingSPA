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
              <h3 style={{ display: "inline", marginLeft: "2em" }}>
                **Animation Incomplete**
              </h3>
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
                        ? "#ef4c4c"
                        : this.props.sortingMethod === "Bubble Sort"
                        ? index >= this.props.indexCompleted
                          ? "#62e562"
                          : "white"
                        : index < this.props.indexCompleted
                        ? "#62e562"
                        : "white",
                    width: this.props.width,
                    height: vertical * 6,
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
