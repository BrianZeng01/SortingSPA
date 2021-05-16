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
  const [sortClicked, setSortClicked] = useState(false);
  const [array, setArray] = useState(randomArray(arraySize));
  const [sortingMethod, setSortingMethod] = useState("Selection Sort");
  const [width, setWidth] = useState("10px");

  const changeSort = () => {
    console.log("sort changed");
  };

  const changeSize = () => {
    console.log("size changed");
  };

  const changeSpeed = () => {
    console.log("speed changed");
  };

  const newArray = () => {
    console.log("new array generated");
  };

  const sort = () => {
    console.log("sorting");
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
        indexCompleted={indexCompleted}
        indexSelected={indexSelected}
        swaps={swaps}
        comparisons={comparisons}
        sortingMethod={sortingMethod}
        width={width}
      />
    </>
  );
};

export default App;
