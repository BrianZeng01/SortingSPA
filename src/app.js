import React, { Component } from "react";
import AlgorithmDescriptions from "./algorithmDescriptions.js";
import GenerateBars from "./generateBars.js";
import "./css/styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      arraySize: 30,
      speed: 0,
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  sort = async () => {
    this.setState({ swaps: 0 });
    this.setState({ comparisons: 0 });
    this.setState({ sortInProgress: true });
    this.setState({ indexSelected: 0 });
    this.state.sortingMethod === "Bubble Sort"
      ? this.setState({ indexCompleted: this.state.arraySize })
      : this.setState({ indexCompleted: 0 });
    document.getElementById("skip").onclick = this.skip;
    await this.sleep();

    var method = this.state.sortingMethod;
    var arr = this.state.array;
    if (method === "Selection Sort") {
      this.selectionSort(arr);
    } else if (method === "Insertion Sort") {
      this.insertionSort(arr);
    } else if (method === "Bubble Sort") {
      this.bubbleSort(arr);
    } else if (method === "Merge Sort") {
      this.mergeSort(arr, 1);
    } else {
      this.quickSort(arr, 0, this.state.arraySize - 1);
    }
  };

  selectionSort = async (arr) => {
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
        this.setState({ comparisons: this.state.comparisons + 1 });
        this.setState({ indexSelected: k });
        if (!this.state.skip) {
          await this.sleep(this.state.speed);
          this.forceUpdate();
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

  insertionSort = async (arr) => {
    document.getElementById("skip").onclick = this.skip;

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
            await this.sleep(this.state.speed);
            this.forceUpdate();
          }
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

  bubbleSort = async (arr) => {
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
        this.setState({ comparisons: this.state.comparisons + 1 });
        if (!this.state.skip) {
          await this.sleep(this.state.speed);
          this.setState({ indexSelected: i });
          this.forceUpdate();
        }
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

  merge = async (l, r, arr) => {
    var i = 0;
    var j = 0;
    var k = 0;
    while (i < l.length || j < r.length) {
      if (i >= l.length) {
        arr[k] = r[j];
        j += 1;
      } else if (j >= r.length) {
        arr[k] = l[i];
        i += 1;
      } else if (l[i] <= r[j]) {
        arr[k] = l[i];
        i += 1;
      } else {
        arr[k] = r[j];
        j += 1;
      }

      this.setState({ comparisons: this.state.comparisons + 1 });
      await this.sleep(15);
      k += 1;
    }
  };

  mergeSort = async (arr) => {
    var len = arr.length;
    var mid = Math.floor(len / 2);
    if (len < 2) {
      return;
    }

    var l = arr.slice(0, mid);
    var r = arr.slice(mid, len);

    this.mergeSort(l);
    this.mergeSort(r);
    this.merge(l, r, arr);
    this.setState({ array: arr });

    document.getElementById("skip").onclick = null;
    this.setState({ sortInProgress: false });
    this.setState({ skip: false });
    this.forceUpdate();
  };

  partition = (arr, start, end) => {
    var pivot = arr[end];
    var index = start;
    for (var i = start; i < end; i++) {
      if (arr[i] <= pivot) {
        [arr[i], arr[index]] = [arr[index], arr[i]];
        index += 1;
      }
      this.setState({ comparisons: this.state.comparisons + 1 });
      this.setState({ swaps: this.state.swaps + 1 });
    }
    [arr[index], arr[end]] = [arr[end], arr[index]];
    this.setState({ swaps: this.state.swaps + 1 });
    this.setState({ array: arr });
    this.setState({ indexSelected: index });
    this.forceUpdate();
    return index;
  };

  quickSort = async (arr, start, end) => {
    if (start < end) {
      var pIndex = this.partition(arr, start, end);
      await this.sleep(this.state.speed * 20 + 200);
      this.quickSort(arr, start, pIndex - 1);
      this.quickSort(arr, pIndex + 1, end);
      this.setState({ array: arr });
      this.forceUpdate();
      console.log(this.state);
    }
    this.setState({ sortInProgress: false });
  };
  render() {
    return (
      <>
        <div className="featureBar">
          <div className="title">
            <h1>Sorting Visualizer</h1>
          </div>
          <div className="features">
            <select
              className="feature"
              id="sortingMethod"
              onChange={this.changeSort}
            >
              <option value="Selection Sort">Selection Sort</option>
              <option value="Insertion Sort">Insertion Sort</option>
              <option value="Bubble Sort">Bubble Sort</option>
              <option value="Merge Sort">Merge Sort</option>
              <option value="Quick Sort">Quick Sort</option>
            </select>
            <select
              className="feature"
              id="size"
              defaultValue="30"
              onChange={this.changeSize}
            >
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
            <select className="feature" id="speed" onChange={this.changeSpeed}>
              <option value="0">Fast</option>
              <option value="10">Moderate</option>
              <option value="30">Slow</option>
            </select>
            <button
              className="feature"
              onClick={this.state.sortInProgress ? null : this.newArray}
            >
              New Array
            </button>
            <button className="feature" id="skip">
              Skip
            </button>
            <br></br>
            <button
              className="feature"
              id="sort"
              onClick={this.state.sortInProgress ? null : this.sort}
            >
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
