import React, { Component } from "react";
import AlgorithmDescriptions from "./algorithmDescriptions.js";
import GenerateBars from "./generateBars.js";
import "./css/styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      arraySize: 30,
      sortingMethod: "Selection Sort",
      indexSelected: 0,
      indexCompleted: 0,
      swaps: 0,
      traversals: 0,
      sortInProgress: false,
      array: this.randomArray(30),
    };
  }
  randomArray(size) {
    var arr = [];
    for (var i = 1; i <= size; i++) {
      arr.push(Math.floor(Math.random() * 100 + 1));
    }

    return arr;
  }

  changeSort = () => {
    this.setState({
      sortingMethod: document.getElementById("sortingMethod").value,
    });
  };

  newArray = () => {
    this.setState({ array: this.randomArray(this.state.arraySize) });
    this.setState({ indexSelected: 0 });
    this.setState({ indexCompleted: 0 });
    this.setState({ swaps: 0 });
    this.setState({ traversals: 0 });

    this.forceUpdate();
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  sort = () => {
    this.setState({ sortInProgress: true });

    var method = this.state.sortingMethod;
    if (method === "Selection Sort") {
      this.selectionSort();
    } else if (method === "Insertion Sort") {
      this.insertionSort();
    } else if (method === "Bubble Sort") {
      this.bubbleSort();
    } else if (method === "Merge Sort") {
      this.mergeSort();
    } else if (method === "Quick Sort") {
      this.quickSort();
    } else {
      this.heapSort();
    }
  };

  selectionSort = async () => {
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
        await this.sleep();
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      this.setState({ indexCompleted: this.state.indexCompleted + 1 });
      this.setState({ array: arr });
      this.setState({ swaps: this.state.swaps + 1 });
      this.forceUpdate();
    }
    this.setState({ indexSelected: this.state.indexSelected + 1 });
    this.setState({ sortInProgress: false });
    this.forceUpdate();
    console.log(this.state);
  };

  insertionSort = async () => {
    console.log("Insert Work In Progress");
  };
  bubbleSort = async () => {
    console.log("Bubble Work In Progress");
  };
  mergeSort = async () => {
    console.log("Merge Work In Progress");
  };
  quickSort = async () => {
    console.log("Quick Work In Progress");
  };
  heapSort = async () => {
    console.log("Heap Work In Progress");
  };
  render() {
    return (
      <>
        <div className="featureBar">
          <select id="sortingMethod" onChange={this.changeSort}>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Heap Sort">Heap Sort</option>
          </select>
          <button onClick={this.state.sortInProgress ? null : this.newArray}>
            New Array
          </button>
          <button onClick={this.state.sortInProgress ? null : this.sort}>
            Sort!
          </button>
        </div>

        <AlgorithmDescriptions sortingMethod={this.state.sortingMethod} />

        <GenerateBars
          array={this.state.array}
          indexSelected={this.state.indexSelected}
          indexCompleted={this.state.indexCompleted}
          swaps={this.state.swaps}
          traversals={this.state.traversals}
        />
      </>
    );
  }
}

export default App;
