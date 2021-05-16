import React, { useState, useEffect } from "react";

const Descriptions = ({ sortingMethod }) => {
  const selection = {
    time: ["n", "n²", "n²"],
    swaps: ["1", "n", "n"],
    space: ["1", "1", "1"],
    pros: [
      "Works well with small arrays",
      "No additional memory used, sorting is done in-place",
    ],
    cons: [
      "n² average results in poor performance for large arrays",
      "Has no potential to terminate early even with an already sorted array",
    ],
    logic:
      "Selection Sort views the given list in two sublists; the sorted and unsorted sublists. " +
      "Initially the sorted sublist is empty and the unsorted sublist is just the given list. " +
      "The unsorted list is fully traversed and the smallest element is kept track of, once " +
      "the end of the array is reached the smallest element found is then swapped with the left most " +
      "element of the unsorted sublist. This left most element now becomes part of the " +
      "sorted sublist as the boundary between the sublists move one to the right. " +
      "This process is repeated until the boundary reachs the end of the given array. ",
    example:
      "Think of organizing cards in your hand, we often intuitively sort by " +
      "some process similar to selection sort. Keeping track of a sorted pile and " +
      "unsorted pile we look for the next biggest card.",
  };
  const insertion = {
    time: ["n", "n²", "n²"],
    swaps: ["1", "n²", "n²"],
    space: ["1", "1", "1"],
    pros: [
      "No additional memory used, sorting is done in-place",
      "n runtime for nearly sorted arrays",
      "simple, intuitive, and easy to code",
    ],
    cons: ["n² average results in poor performance for large arrays"],
    logic:
      "Like Selection Sort the given array is viewed as a sorted sublist and unsorted sublist. " +
      "The sorted sublist occupies the leftmost space and is built up as we traverse the given array. " +
      "The given array is traversed once but every item is then sorted in the sorted sublist. " +
      "The selected element goes through the sorted sublist from right till left. " +
      "As it searches for where it belongs it swaps places with the elements that are greater " +
      "than itself until it finds the element that is less than or equal to it. " +
      "Then it stops searching and the next element of the given array repeats this.",
    example:
      "Similar to Selection Sort we often intuitively use some form of Insertion Sort " +
      "when sorting a deck of cards. Keeping track of a sorted and unsorted pile we " +
      "insert the next card in the unsorted pile into the right spot in the sorted one.",
  };
  const bubble = {
    time: ["n", "n²", "n²"],
    swaps: ["1", "n²", "n²"],
    space: ["1", "1", "1"],
    pros: [
      "No additional memory used, sorting is done in-place",
      "Simple, intuitive, and easy to implement",
    ],
    cons: [
      "n² average results in poor performance for large arrays",
      "Good for academic lessons but few real life use cases",
    ],
    logic:
      "This sorting method views the given array as a unsorted sublist and " +
      "sorted sublist which builds up in-place at the far right. " +
      "Bubble Sort traverses the array and compares the current element to " +
      "the next element, swapping them if current > next. " +
      "This 'bubbles' up the largest element in the unsorted sublist to the " +
      "end of it. This element then becomes part of the sorted sublist as the " +
      "boundary between sublists is moved one to the left. " +
      "This repeats until there are no swaps done after traversing the " +
      "unsorted sublist since this tells us that the array is empty or already " +
      "sorted",
    example:
      "Think of class photos in elementary school, " +
      "teachers would often sort us in height. It's common for some form " +
      "of bubble sort to be intuitively used. Taller kids would make their way " +
      "to the front of the line in a similar manner to elements 'bubbling' " +
      "up to the top of the array.",
  };
  const merge = {
    time: ["nlog(n)", "nlog(n)", "nlog(n)"],
    swaps: ["X", "X", "X"],
    space: ["n", "n", "n"],
    pros: [
      "Very Efficient",
      "Worst case of nlog(n)",
      "Stable sorting algorithm",
    ],
    cons: [
      "Uses additional memory to store sub elements",
      "Slower than quick sort in practice",
    ],
    logic:
      "We divide the array in two and sort them seperately then merge " +
      "the sorted sublists by comparing and taking the smallest element " +
      "of the two sublists until they've both become merged to one. " +
      "Now how are these sublists sorted? By recursion! These sublists " +
      "are divided and merged together aswell. The sublists are divided " +
      "until there are a bunch of sublists 1 element long. One element " +
      "arrays are already sorted thus the dividing stops here and " +
      "merging commences.",
    example:
      "Think of organizing a stack of 250 exams by grade. You'd " +
      "likely seperate the initial pile into multiple piles and sort them all. " +
      "Then you'd merge all the sorted sub piles into one sorted pile.",
  };
  const quick = {
    time: ["nlog(n)", "n²", "nlog(n)"],
    swaps: ["-", "-", "-"],
    space: ["n", "n", "n"],
    pros: [
      "Used by bult in librays of popular languages to sort",
      "No additional memory used, sorting is done in-place",
      "Traverses large arrays quickly",
    ],
    cons: [
      "Certain cases where it is inefficient such as already sorted arrays",
      "It is not stable; swaps non-adjacent elements",
    ],
    logic:
      "Quicksort is a recursive and very popular sorting method. " +
      "It utilizes a divide and conquer method. " +
      "Given an array a 'pivot' is selected. This pivot is best selected at " +
      "random but that is not a necessary condition. The array is then " +
      "partitioned so that all elements less than the pivot element are " +
      "on the left of it and elements greater or equal to the pivot " +
      "are on the right. Now the same thing is done to the left and right " +
      "partitions recursively. By keeping track of relevant indexes it knows " +
      "what to go over again.",
    example:
      "Most built in sort functions in programming languages " +
      "use quicksort. They may also use a combination of other sorts " +
      "depending on the input.",
  };

  const description = (method) => {
    let dict;
    if (method === "Selection Sort") {
      dict = selection;
    } else if (method === "Insertion Sort") {
      dict = insertion;
    } else if (method === "Bubble Sort") {
      dict = bubble;
    } else if (method === "Merge Sort") {
      dict = merge;
    } else {
      dict = quick;
    }

    return (
      <>
        <div className="algorithmDescriptions">
          <div className="table">
            <h1>{method}</h1>
            <h3>Performance Complexities</h3>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Best Case</th>
                  <th>Worst Case</th>
                  <th>Average Case</th>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>{dict.time[0]}</td>
                  <td>{dict.time[1]}</td>
                  <td>{dict.time[2]}</td>
                </tr>
                <tr>
                  <td>Space</td>
                  <td>{dict.space[0]}</td>
                  <td>{dict.space[1]}</td>
                  <td>{dict.space[2]}</td>
                </tr>
                <tr>
                  <td>Swaps</td>
                  <td>{dict.swaps[0]}</td>
                  <td>{dict.swaps[1]}</td>
                  <td>{dict.swaps[2]}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pros">
            <h3>Pros</h3>
            <ul>
              {dict.pros.map((arr, index) => {
                return <li key={index}>{arr}</li>;
              })}
            </ul>
          </div>
          <div className="cons">
            <h3>Cons</h3>
            <ul>
              {dict.cons.map((arr, index) => {
                return <li key={index}>{arr}</li>;
              })}
            </ul>
          </div>

          <div className="paragraphs">
            <h3>Logic</h3>
            <p>{dict.logic}</p>

            <h3>Real-life Example</h3>
            <p>{dict.example}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="algorithmDescriptions">{description(sortingMethod)}</div>
  );
};

export default Descriptions;
