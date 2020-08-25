import React, { Component } from "react";
import "./css/styles.css";

class GenerateBars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arraySize: this.props.size,
      indexSelected: 0,
      indexCompleted: 0,
      swaps: 0,
      traversals: 0,
      array: this.randomArray(this.props.size),
    };
  }
  randomArray(size) {
    var arr = [];
    for (var i = 1; i <= size; i++) {
      arr.push(Math.floor(Math.random() * 100 + 1));
    }

    return arr;
  }

  changeSort = (method) => {
    this.setState({ sortingMethod: method });
  };

  newArray = () => {
    this.setState({ array: this.randomArray(this.state.arraySize) });
    this.setState({ indexSelected: 0 });
    this.setState({ indexCompleted: 0 });
    this.setState({ swaps: 0 });
    this.setState({ traversals: 0 });
    clearTimeout();

    this.forceUpdate();
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  sort = async () => {
    var sortingMethod = document.getElementById("sortingMethod").value;
    console.log(sortingMethod);
    var arr = this.state.array;
    var min = 2500;
    var minIndex = 0;
    for (var i = 0; i < arr.length; i++) {
      minIndex = i;
      min = arr[i];
      for (var k = i + 1; k < arr.length; k++) {
        if (arr[k] < min) {
          min = arr[k];
          minIndex = k;
        }
        this.setState({ indexSelected: k });
        this.setState({ traversals: this.state.traversals + 1 });
        this.forceUpdate();
        await this.sleep(2);
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      this.setState({ indexCompleted: this.state.indexCompleted + 1 });
      this.setState({ array: arr });
      this.setState({ swaps: this.state.swaps + 1 });
      this.forceUpdate();
    }
    this.setState({ indexSelected: this.state.indexSelected + 1 });
    this.forceUpdate();
    console.log(this.state);
  };

  render() {
    return (
      <>
        <div>
          <select id="sortingMethod">
            <option value="Seletion Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
          </select>
          <button onClick={this.newArray}>New Array</button>
          <button onClick={this.sort}>Sort!</button>
        </div>
        <div style={{ backgroundColor: "black", height: "150px" }}>
          {this.state.array.map((vertical, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  index === this.state.indexSelected
                    ? "red"
                    : index < this.state.indexCompleted
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
          <h3>Swaps = {this.state.swaps}</h3>
          <h3>Traversals = {this.state.traversals}</h3>
        </div>
      </>
    );
  }
}

export default GenerateBars;
