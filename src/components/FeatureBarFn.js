import React, { useState, useEffect } from "react";

const FeatureBar = ({
  changeSize,
  changeSpeed,
  changeSort,
  newArray,
  sort,
  sortInProgress,
}) => {
  return (
    <div className="featureBar">
      <div className="title">
        <h1>Sorting Visualizer</h1>
      </div>
      <div className="features">
        <div>
          <label htmlFor="sortingMethod">Sorting Method</label>
          <select
            className="feature"
            id="sortingMethod"
            onChange={() => changeSort()}
          >
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
          </select>
        </div>
        <div>
          <label htmlFor="size">Size</label>
          <select
            className="feature"
            id="size"
            defaultValue="30"
            onChange={() => changeSize()}
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          <label htmlFor="speed">Speed</label>
          <select className="feature" id="speed" onChange={() => changeSpeed()}>
            <option value="0">Fast</option>
            <option value="10">Moderate</option>
            <option value="30">Slow</option>
          </select>
        </div>
        <div className="buttons">
          <button
            className="feature"
            onClick={sortInProgress ? null : () => newArray()}
          >
            New Array
          </button>
          <button className="feature" id="skip">
            Skip
          </button>
          <button
            className="feature"
            id="sort"
            onClick={sortInProgress ? null : () => sort()}
          >
            Sort!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;
