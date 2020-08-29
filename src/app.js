import React, { Component } from "react";
import AlgorithmDescriptions from "./algorithmDescriptions.js";
import GenerateBars from "./generateBars.js";
import "./css/styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      arraySize: 30,
      speed: "fast",
      width: "10px",
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
      await this.sleep(0);
      this.newArray();
    } else {
      await this.sleep(1000);
      this.changeSort();
    }
  };

  changeSize = async () => {
    if (!this.state.sortInProgress) {
      var size = document.getElementById("size").value;
      this.setState({ arraySize: size });
      if (size === "50") {
        this.setState({ width: "5px" });
      } else if (size === "30") {
        this.setState({ width: "10px" });
      } else {
        this.setState({ width: "30px" });
      }
      await this.sleep(0);
      this.newArray();
    } else {
      await this.sleep(1000);
      this.changeSize();
    }
  };

  changeSpeed = () => {
    this.setState({ speed: document.getElementById("speed").value });
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
    return new Promise((resolve) => setInterval(resolve, ms));
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
    var speed;
    if (this.state.speed === "fast") {
      speed = 0;
    } else if (this.state.speed === "moderate") {
      speed = 10;
    } else {
      speed = 20;
    }
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
          await this.sleep(speed);
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
    var speed;
    if (this.state.speed === "fast") {
      speed = 0;
    } else if (this.state.speed === "moderate") {
      speed = 10;
    } else {
      speed = 30;
    }
    var arr = this.state.array;
    for (var i = 1; i < this.state.arraySize; i++) {
      this.setState({ indexSelected: i });
      for (var k = i; k >= 0; k--) {
        this.setState({ comparisons: this.state.comparisons + 1 });
        if (arr[k] <= arr[k - 1]) {
          [arr[k], arr[k - 1]] = [arr[k - 1], arr[k]];
          this.setState({ array: arr });
          this.setState({ indexSelected: k });
          this.setState({ swaps: this.state.swaps + 1 });
          if (!this.state.skip) {
            await this.sleep(speed);
          }

          this.forceUpdate();
        } else {
          break;
        }
      }
      this.setState({ indexCompleted: i + 2 });
      this.forceUpdate();
    }
    this.setState({ indexSelected: i });
    this.setState({ sortInProgress: false });
    this.setState({ skip: false });
    document.getElementById("skip").onclick = null;
    this.forceUpdate();
    console.log(this.state);
  };

  bubbleSort = async () => {
    document.getElementById("skip").onclick = this.skip;
    var speed;
    if (this.state.speed === "fast") {
      speed = 0;
    } else if (this.state.speed === "moderate") {
      speed = 10;
    } else {
      speed = 100;
    }
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
          await this.sleep(speed);
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
    document.getElementById("skip").onclick = this.skip;
    var arr = this.state.array;
    function merge() {}

    document.getElementById("skip").onclick = null;
    this.forceUpdate();
    console.log(this.state);
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
          <div className="title">
            <h1>Sorting Visualizer</h1>
          </div>
          <div className="features">
            <select id="sortingMethod" onChange={this.changeSort}>
              <option value="Selection Sort">Selection Sort</option>
              <option value="Insertion Sort">Insertion Sort</option>
              <option value="Bubble Sort">Bubble Sort</option>
              <option value="Merge Sort">Merge Sort</option>
              <option value="Quick Sort">Quick Sort</option>
              <option value="Heap Sort">Heap Sort</option>
            </select>
            <select id="size" onChange={this.changeSize}>
              <option value="10">10</option>
              <option value="30" selected="selected">
                30
              </option>
              <option value="50">50</option>
            </select>
            <select id="speed" onChange={this.changeSpeed}>
              <option value="fast">Fast</option>
              <option value="moderate">Moderate</option>
              <option value="slow">Slow</option>
            </select>
            <button onClick={this.state.sortInProgress ? null : this.newArray}>
              New Array
            </button>
            <button id="skip">Skip</button>
            <button onClick={this.state.sortInProgress ? null : this.sort}>
              Sort!
            </button>
          </div>
        </div>

        <AlgorithmDescriptions sortingMethod={this.state.sortingMethod} />

        <GenerateBars
          array={this.state.array}
          indexSelected={this.state.indexSelected}
          indexCompleted={this.state.indexCompleted}
          swaps={this.state.swaps}
          comparisons={this.state.comparisons}
          width={this.state.width}
          sortingMethod={this.state.sortingMethod}
        />
      </>
    );
  }
}

export default App;
