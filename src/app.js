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
      comparisons: 0,
      sortInProgress: false,
      skip: false,
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

  changeSort = async () => {
    if (!this.state.sortInProgress) {
      this.setState({
        sortingMethod: document.getElementById("sortingMethod").value,
      });
      await this.sleep(100);
      this.newArray();
    } else {
      await this.sleep(1000);
      this.changeSort();
    }
  };

  skip = () => {
    this.setState({ skip: true });
  };

  newArray = async () => {
    this.setState({ array: this.randomArray(this.state.arraySize) });
    this.setState({ indexSelected: 0 });
    this.state.sortingMethod === "Bubble Sort"
      ? this.setState({ indexCompleted: this.state.arraySize })
      : this.setState({ indexCompleted: 0 });
    this.setState({ swaps: 0 });
    this.setState({ comparisons: 0 });

    console.log(this.state);
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
    document.getElementById("skip").onclick = this.skip;
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
        this.setState({ comparisons: this.state.comparisons + 1 });
        this.forceUpdate();
        if (!this.state.skip) {
          await this.sleep(1);
        }
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      this.setState({ indexCompleted: this.state.indexCompleted + 1 });
      this.setState({ array: arr });
      this.setState({ swaps: this.state.swaps + 1 });
      this.forceUpdate();
    }
    this.setState({ indexSelected: this.state.indexSelected + 1 });
    this.setState({ sortInProgress: false });
    this.setState({ skip: false });
    document.getElementById("skip").onclick = null;
    this.forceUpdate();
    console.log(this.state);
  };

  insertionSort = async () => {
    document.getElementById("skip").onclick = this.skip;
    var arr = this.state.array;
    for (var i = 1; i < this.state.arraySize; i++) {
      this.setState({ indexSelected: i });
      for (var k = i; k >= 0; k--) {
        if (arr[k] <= arr[k - 1]) {
          [arr[k], arr[k - 1]] = [arr[k - 1], arr[k]];
          this.setState({ array: arr });
          this.setState({ indexSelected: k });
          this.setState({ comparisons: this.state.comparisons + 1 });
          this.setState({ swaps: this.state.swaps + 1 });
          if (!this.state.skip) {
            await this.sleep(5);
          }

          this.forceUpdate();
        } else {
          this.setState({ comparisons: this.state.comparisons + 1 });
          this.setState({ indexCompleted: this.state.indexCompleted + 1 });
          this.setState();
          break;
        }
      }
    }
    this.setState({ indexSelected: i });
    this.setState({ indexCompleted: i });
    this.setState({ sortInProgress: false });
    this.setState({ skip: false });
    document.getElementById("skip").onclick = null;
    this.forceUpdate();
    console.log(this.state);
  };

  bubbleSort = async () => {
    document.getElementById("skip").onclick = this.skip;
    var arr = this.state.array;
    var index = this.state.arraySize;
    var swapped = true;
    this.setState({ indexCompleted: index });
    while (swapped) {
      swapped = false;
      this.setState({ indexCompleted: index });
      for (var i = 0; i < index - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          this.setState({ swaps: this.state.swaps + 1 });
          swapped = true;
        }
        this.setState({ indexSelected: i });
        this.setState({ comparisons: this.state.comparisons + 1 });
        if (!this.state.skip) {
          await this.sleep(5);
        }
        this.forceUpdate();
      }
      index -= 1;
    }
    this.setState({ array: arr });
    this.setState({ indexSelected: -1 });
    this.setState({ indexCompleted: 0 });
    this.setState({ sortInProgress: false });
    this.setState({ skip: false });
    document.getElementById("skip").onclick = null;
    this.forceUpdate();
    console.log(this.state);
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
          <button id="skip">Skip</button>
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
          comparisons={this.state.comparisons}
          sortingMethod={this.state.sortingMethod}
        />
      </>
    );
  }
}

export default App;
