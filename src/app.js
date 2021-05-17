import React, { useState, useEffect } from "react";
import Bars from "./components/BarsFn.js";
import Descriptions from "./components/DescriptionsFn.js";
import FeatureBar from "./components/FeatureBarFn.js";
import "./css/styles.css";

const App = () => {
  const randomArray = (size) => {
    let arr = [];
    for (let i = 1; i <= size; i++) {
      arr.push(Math.floor(Math.random() * 100 + 1));
    }
    return arr;
  };

  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(0);
  const [indexCompleted, setIndexCompleted] = useState(0);
  const [indexSelected, setIndexSelected] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [sortInProgress, setSortInProgress] = useState(false);
  const [skip, setSkip] = useState(false);
  const [array, setArray] = useState(randomArray(arraySize));
  const [sortingMethod, setSortingMethod] = useState("Selection Sort");
  const [width, setWidth] = useState("10px");
  const [value, updateState] = useState(0);

  useEffect(() => {
    forceUpdate();
    console.log("skipeffect");
  }, [skip]);

  const forceUpdate = () => {
    updateState(value + 1);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const newArray = async () => {
    setArray(randomArray(arraySize));
    stateDefaults();
    console.log("new array generated");
  };

  const handleSkip = () => {
    setSkip(true);
    setArray(array.sort());
    console.log("skipping");
  };

  const stateDefaults = () => {
    setIndexSelected(0);
    sortingMethod === "Bubble Sort"
      ? setIndexCompleted(arraySize)
      : setIndexCompleted(0);
    setSwaps(0);
    setComparisons(0);
  };

  const changeSort = async () => {
    if (!sortInProgress) {
      setSortingMethod(document.querySelector("#sortingMethod").value);
      await sleep(20);
      sortingMethod === "Bubble Sort"
        ? setIndexCompleted(arraySize)
        : setIndexCompleted(0);
    } else {
      await sleep(250);
      changeSort();
    }
    console.log("sort changed");
  };

  const changeSize = async () => {
    if (!sortInProgress) {
      let size = document.querySelector("#size").value;
      setArraySize(size);
      if (size === "50") {
        setWidth("5px");
      } else if (size === "30") {
        setWidth("10px");
      } else {
        setWidth("30px");
      }
      await sleep(0);
      newArray();
    } else {
      await sleep(1000);
      changeSize();
    }
    console.log("size changed");
  };

  const changeSpeed = () => {
    setSpeed(document.querySelector("#speed").value);
    console.log("speed changed");
  };

  const sort = async () => {
    setSortInProgress(true);
    stateDefaults();
    document.querySelector("#skip").onclick = () => handleSkip();
    await sleep();

    let method = sortingMethod;
    let arr = array;
    if (method === "Selection Sort") {
      selectionSort(arr);
    } else if (method === "Insertion Sort") {
      insertionSort(arr);
    } else if (method === "Bubble Sort") {
      bubbleSort(arr);
    } else if (method === "Merge Sort") {
      mergeSort(arr, 1);
    } else {
      quickSort(arr, 0, arraySize - 1);
    }
    console.log("sorting");
  };

  const selectionSort = async (arr) => {
    let min = 2500;
    let minIndex = 0;
    let comps = 0;
    let swap = 0;
    let completed = 0;
    for (let i = 0; i < arr.length; i++) {
      minIndex = i;
      min = arr[i];
      for (let k = i + 1; k < arr.length; k++) {
        if (arr[k] < min) {
          min = arr[k];
          minIndex = k;
        }
        comps++;
        setComparisons(comps++);
        setIndexSelected(k);
        if (skip) {
          return;
        }
        await sleep(speed);
      }

      if (arr[i] !== arr[minIndex]) {
        setSwaps(swap++);
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setIndexCompleted(completed++);
      setArray(arr);
    }
    setIndexSelected(arr.length - 1);
    setSortInProgress(false);
    setSkip(false);
    document.querySelector("#skip").onclick = null;
  };

  const insertionSort = async (arr) => {
    document.querySelector("#skip").onclick = () => handleSkip()();
    let comp = 0;
    let swap = 0;

    for (var i = 1; i < arraySize; i++) {
      setIndexSelected(i);
      for (let k = i; k >= 0; k--) {
        setComparisons(comp++);
        if (arr[k] < arr[k - 1]) {
          [arr[k], arr[k - 1]] = [arr[k - 1], arr[k]];
          setArray(arr);
          setIndexSelected(k - 1);
          setSwaps(swap++);
        } else {
          break;
        }
        if (!skip) {
          await sleep(speed);
        }
      }
      setIndexCompleted(i + 2);
    }
    setIndexSelected(i);
    setSkip(false);
    setSortInProgress(false);
    document.querySelector("#skip").onclick = null;
  };

  const bubbleSort = async (arr) => {
    let index = arraySize;
    let swapped = true;
    let comp = 0;
    let swap = 0;
    setIndexCompleted(index);
    while (swapped) {
      swapped = false;
      setIndexCompleted(index);
      for (let i = 0; i < index - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          setSwaps(swap++);
          swapped = true;
        }
        setComparisons(comp++);
        if (!skip) {
          await sleep(speed);
          setIndexSelected(i);
        }
      }
      index -= 1;
    }
    setArray(arr);
    setIndexSelected(-1);
    setIndexCompleted(0);
    setSortInProgress(false);
    setSkip(false);
    document.querySelector("#skip").onclick = null;
  };

  // Used by mergeSort
  const merge = async (l, r, arr) => {
    let i = 0;
    let j = 0;
    let k = 0;
    let comp = 0;

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

      setComparisons(comp++);
      if (!skip) {
        await sleep(speed);
      }
      k += 1;
    }
    return arr;
  };

  const mergeSort = async (arr) => {
    let len = arr.length;
    let mid = Math.floor(len / 2);
    if (len < 2) {
      return;
    }

    let l = arr.slice(0, mid);
    let r = arr.slice(mid, len);

    mergeSort(l);
    mergeSort(r);
    merge(l, r, arr);
    setArray(arr);

    document.querySelector("#skip").onclick = null;
    setSortInProgress(false);
    setIndexCompleted(arraySize);
    setSkip(false);
  };

  // Used by quickSort
  const partition = (arr, start, end) => {
    let pivot = arr[end];
    let index = start;
    for (let i = start; i < end; i++) {
      if (arr[i] <= pivot) {
        [arr[i], arr[index]] = [arr[index], arr[i]];
        index += 1;
      }
      setComparisons(comparisons + 1);
      setSwaps(swaps + 1);
    }
    [arr[index], arr[end]] = [arr[end], arr[index]];
    setSwaps(swaps + 1);
    setArray(arr);
    setIndexSelected(index);
    return index;
  };

  const quickSort = async (arr, start, end) => {
    if (start < end) {
      let pIndex = partition(arr, start, end);
      if (!skip) {
        await sleep(speed * 20 + 200);
      }
      quickSort(arr, start, pIndex - 1);
      quickSort(arr, pIndex + 1, end);
      setArray(arr);
    }
    setIndexCompleted(arraySize);
    setSortInProgress(false);
    setSkip(false);
    document.querySelector("#skip").onclick = null;
  };

  return (
    <>
      <FeatureBar
        changeSpeed={changeSpeed}
        changeSize={changeSize}
        changeSort={changeSort}
        newArray={newArray}
        sort={sort}
        sortInProgress={sortInProgress}
      />
      <Descriptions sortingMethod={sortingMethod} />
      <Bars
        array={array}
        swaps={swaps}
        comparisons={comparisons}
        sortingMethod={sortingMethod}
        indexSelected={indexSelected}
        indexCompleted={indexCompleted}
        width={width}
      />
    </>
  );
};

export default App;
