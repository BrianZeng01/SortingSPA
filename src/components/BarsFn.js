import React, { useState, useEffect } from "react";

const Bars = ({array ,swaps, comparisons, sortingMethod, indexSelected, indexCompleted, width}) => {
  useEffect(() => {

  },[indexSelected,indexCompleted,swaps,comparisons])

  return (
    <div className="animation">
      <div className="data">
        <h3>Swaps = {swaps}</h3>
        <h3 style={{ display: "inline" }}>
          Comparisons = {comparisons}
        </h3>
        {sortingMethod === "Merge Sort" ||
        sortingMethod === "Quick Sort" ? (
          <h3 style={{ display: "inline", marginLeft: "2em" }}>
            **Animation Incomplete**
          </h3>
        ) : null}
      </div>
      <div className="bars">
        <div className="alignBottom">
          {array.map((vertical, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  index === indexSelected
                    ? "#ef4c4c"
                    : sortingMethod === "Bubble Sort"
                    ? index >= indexCompleted
                      ? "#62e562"
                      : "white"
                    : index < indexCompleted
                    ? "#62e562"
                    : "white",
                width: width,
                height: vertical * 5,
                display: "inline-block",
                marginRight: "2px",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bars;
