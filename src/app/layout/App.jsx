import React, { Component } from "react";

const identity = arg => arg;

// const identityf = arg => () => arg;
function identityf(x) {
  return function() {
    return x;
  };
}

// const addf = a => b => a + b;
function addf(first) {
  return function(second) {
    return first + second;
  };
}

// const liftf = func => a => b => func(a, b);
function liftf(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}

// const curry = (func, a) => b => func(a, b);
function curry(func, first) {
  return function(second) {
    return func(first, second);
  };
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;

const binary = (a, b) => {
  return a * b;
};

const twice = func => {
  return function(a) {
    return func(a, a);
  };
};

class App extends Component {
  render() {
    console.log("identity(3) = ", identity(3));
    console.log("identityf(3) = ", identityf(3));
    console.log(twice(binary)(3));
    console.log("addf(3)(4)", addf(3)(4));
    console.log("liftf(mul)(5)(6)", liftf(mul)(5)(6));
    console.log("curry(mul, 5)(7)", curry(mul, 5)(7));

    return (
      <div className="App">
        <h1>Re-vents</h1>
      </div>
    );
  }
}

export default App;
